import { Actor, log } from 'apify';

const CREATE_REPL_PRICE_USD = 0.005;
const RUN_CODE_PRICE_USD = 0.002;

export async function chargeMcpResponse(args: { method: string; toolName?: string }): Promise<void> {
    const { method, toolName } = args;

    if (method === 'tools/call' && toolName) {
        switch (toolName) {
            case 'create-python-repl':
                await Actor.charge({ eventName: 'create-python-repl' });
                log.info(`Charged $${CREATE_REPL_PRICE_USD} for creating Python REPL: ${toolName}`);
                break;
            case 'run-python-in-repl':
                await Actor.charge({ eventName: 'run-python-in-repl' });
                log.info(`Charged $${RUN_CODE_PRICE_USD} for running Python code: ${toolName}`);
                break;
            default:
                log.info(`No charge for unknown tool: ${toolName}`);
        }
    } else {
        log.info(`Not charging for non-tool method: ${method}`);
    }
}
