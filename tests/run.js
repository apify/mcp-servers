/* eslint-disable no-console */
const { spawn } = require('node:child_process');

const fs = require('node:fs');
const path = require('node:path');

// Global timeout constants
const MCP_COMMAND_TIMEOUT = 120000;
const MCP_INIT_TIMEOUT = 60000;

/**
 * Adds and imports an MCP server configuration.
 * @param {string} url - The URL of the MCP server to evaluate.
 * @param {string} apifyToken - The Apify token for authentication.
 * @returns {Promise<void>}
 */
async function addAndImportMCPServer(url, apifyToken) {
    const configDir = '.amazonq';
    const configPath = path.join(configDir, 'mcp.json');
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }
    const config = {
        mcpServers: {
            'mcp-server-to-evaluate': {
                command: 'npx',
                args: [
                    '-y',
                    'mcp-remote',
                    url,
                    '--header',
                    `Authorization: Bearer ${apifyToken}`
                ],
                timeout: MCP_COMMAND_TIMEOUT,
            }
        }
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
    console.log(`Wrote MCP server config to ${configPath}`);

    console.log('Importing MCP server config...');
    const importCmd = spawn('qchat', ['mcp', 'import', '--file', configPath, 'global', '--force'], { stdio: ['ignore', 'pipe', 'pipe'] });
    await new Promise((resolve, reject) => {
        importCmd.stdout.on('data', (data) => process.stdout.write(data));
        importCmd.stderr.on('data', (data) => process.stderr.write(data));
        importCmd.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`qchat import exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

/**
 * Removes the MCP server configuration and cleans up.
 * This function also removes the .amazonq directory.
 * @returns {Promise<void>}
 * @throws {Error} If there is an error during the removal process.
 */
async function removeMCPServerAndCleanUp() {
    console.log('Removing MCP server config...');
    await new Promise((resolve, reject) => {
        const removeCmd = spawn('qchat', ['mcp', 'remove', '--name', 'mcp-server-to-evaluate'], { stdio: ['ignore', 'pipe', 'pipe'] });
        removeCmd.stdout.on('data', (data) => process.stdout.write(data));
        removeCmd.stderr.on('data', (data) => process.stderr.write(data));
        removeCmd.on('close', (code) => {
            if (code !== 0) {
                console.error(`qchat remove exited with code ${code}`);
                reject(new Error(`qchat remove exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
    // Remove the .amazonq directory after command completes
    try {
        fs.rmSync('.amazonq', { recursive: true, force: true });
        console.log('Removed .amazonq directory.');
    } catch (err) {
        console.error('Failed to remove .amazonq directory:', err);
    }
}

/**
 * Sets the MCP server initialization timeout using the 'q' CLI.
 * @returns {Promise<void>}
 */
async function setMCPInitTimeout() {
    const setTimeoutCmd = spawn('q', ['settings', 'mcp.initTimeout', String(MCP_INIT_TIMEOUT)], { stdio: ['ignore', 'pipe', 'pipe'] });
    await new Promise((resolve, reject) => {
        setTimeoutCmd.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`q settings exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

/**
 * Runs the evaluation of the MCP server tools.
 * This function writes the MCP server configuration, sets a longer timeout,
 * and runs a chat command to evaluate the tools.
 * It then checks the output for a verdict and cleans up the MCP server configuration.
 * @param {string} url - The URL of the MCP server to evaluate.
 * @param {string} apifyToken - The Apify token for authentication.
 * @returns {Promise<boolean>} - Returns true if the verdict is OK, false otherwise.
 */
async function runEval(url, apifyToken) {
    // Write .amazonq/mcp.json with the provided url and token
    await addAndImportMCPServer(url, apifyToken);

    // Set MCP server initialization timeout
    await setMCPInitTimeout();

    console.log('Evaluating scenario requirements...');
    const evalPrompt = `You are an MCP server tools QA tester. Run a simple test on all the tools of the connected MCP server, then give a final verdict: "OK" or "FAILED" in the format "VERDICT: OK" or "VERDICT: FAILED" on the last output line. Do not test tools like these, since they are built-in tools, not from the MCP server:
- dummy
- execute_bash
- fs_read
- fs_write
- report_issue
- use_aws
Never execute any command outside of calling the MCP server tools. The tools from the MCP server do not follow any naming convention, so any tool outside of the list above is from the MCP server and needs to be tested. First, reason step by step to find the list of correct tools to test. Then run the test on each tool, one by one, and finally give the verdict.`;
    return new Promise((resolve, reject) => {
        let output = '';
        const child = spawn('q', ['chat', '-a', '--no-interactive', evalPrompt], { stdio: ['ignore', 'pipe', 'pipe'] });
        child.stdout.on('data', (data) => {
            process.stdout.write(data);
            output += data.toString();
        });
        child.stderr.on('data', (data) => {
            process.stderr.write(data);
            output += data.toString();
        });
        child.on('close', (code) => {
            // Remove the MCP server and clean up
            removeMCPServerAndCleanUp().catch((err) => {
                console.error('Error during MCP server cleanup:', err);
            }).then(() => {
                if (code !== 0) {
                    reject(new Error(`q chat exited with code ${code}`));
                    return;
                }
                if (/VERDICT:\s*OK/.test(output)) {
                    console.log('VERDICT: OK');
                    resolve(true);
                } else if (/VERDICT:\s*FAILED/.test(output)) {
                    console.log('VERDICT: FAILED');
                    resolve(false);
                } else {
                    console.log('VERDICT: Not found in output, treating as FAILED');
                    resolve(false);
                }
            });
        });
    });
}


async function main() {
    const mcpServerUrl = process.argv[2];
    const apifyToken = process.env.APIFY_TOKEN;
    if (!mcpServerUrl || !apifyToken) {
        process.stderr.write('Usage: node run.js <mcp-server-url> (and set APIFY_TOKEN env var)\n');
        process.exit(1);
    }
    console.log(`Using MCP server URL: ${mcpServerUrl}`);
    const res = await runEval(mcpServerUrl, apifyToken);
    process.exit(res ? 0 : 1);
}

main();
