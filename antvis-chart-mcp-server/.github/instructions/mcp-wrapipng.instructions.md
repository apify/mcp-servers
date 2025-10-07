 ---
 applyTo: '**'
 ---
 # :mcp:[Template] MCP Server Actorization checklist

 This checklist will help you get started with the Actorization process and ensure nothing is missed when publishing MCP servers.

 *It’s a living document—please update it if you notice anything missing.*

 This guide was updated to be used in `cursor-agent` or `copilot` or `Junie`

 - [ ]  Copy this template to: [Professional Services MCP Server Actorization](https://www.notion.so/Professional-Services-MCP-Server-Actorization-20ff39950a2280269ac8ebcdc78c2e26?pvs=21) → MCP servers checklist

 ## 🚁 MCP server selection

 - [ ]  Choose an interesting MCP server from [Actorization MCP servers](https://www.notion.so/1f8f39950a2280a8b8f1de64243391a9?pvs=21) or from any other MCP server registry: https://mastra.ai/mcp-registry-registry
 - [ ]  Make sure the open-source server is working - test it, for example, using [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector)
 - [ ]  Make sure no other developer is already working on the selected server
 - [ ]  Add or update the entry in : [Actorization MCP servers](https://www.notion.so/1f8f39950a2280a8b8f1de64243391a9?pvs=21)
 - [ ]  Obtain API key(s) if payment necessary, contact  @Dušan Vystrčil. (For most services, free API keys will be sufficient. If MCP gains significant user traction or development is completely blocked due to the need for a paid key, please contact Dusko).

 ## ⌨️Start coding (or better use Agent)

 Follow this guide to create an MCP server and publish it at Apify.

 If any step below is not clear, stop coding and ask for clarification.

 The following GitHub MCP server will be Actorized (wrapped in Apify Actor) and published at Apify platform.

 Source repository: {GITHUB URL} (referred as source MCP server). Ask for URL if not specified

 Name: {SERVICE} MCP Server (ask for service name if not specified)

 `service-mcp-server` is placeholder, always use actual name, for example `weather-mcp-server`

 - [ ]  Check whether the mcp-servers repository is available locally using git status. If not, clone the GitHub repository and navigate to the directory.

 ```bash
 git clone git@github.com:apify/mcp-servers.git
 ```

 - [ ]  Navigate to the `mcp-servers` directory
 - [ ]  Check if the `feat/service-mcp-server` branch exists locally. If it doesn't exist, create it and switch to it.

 ```bash
 git checkout -b feat/service-mcp-server
 ```

 ## 👷 Programming language

 - [ ]  Examine the source repository to determine if it is Python or TypeScript based code, and whether it is stdio-based or remote server. Clone repository in the current working directory with name `service-mcp-server-tmp`. It will be deleted later.
 - [ ]  Select a template. If you’re actorizing `stdio-based` MCP servers, choose the template for the language the server is written in. If you’re actorizing a `remote` server you can select language based on your preference, Python: [https://apify.com/templates/python-mcp-server](https://apify.com/templates/python-mcp-server) and typescript [https://apify.com/templates/ts-mcp-server](https://apify.com/templates/ts-mcp-server)
 - [ ]  **Actor name**: Use the format `<SERVICE> MCP Server`
 - [ ]  **Initialize the Actor:** Use [Apify-CLI](https://docs.apify.com/cli/) to create a new MCP server from a template. This will create a subdirectory with `service-mcp-server` name

 ```bash
 # Typescript
 apify create service-mcp-server --template ts-mcp-server
 ```

 ```bash
 # OR for Python
 apify create service-mcp-server --template python-mcp-server
 ```

 - [ ]  Navigate to the subdirectory
 - [ ]  Create a file in service subdirectory  [`service-mcp-server-checklist.md`](http://service-mcp-server-checklist.md) to track progress. Update it after every step,

 ## ⌨️ Stdio-based vs remote server

 The following steps differ for stdio-based and remote servers. Please refer to the appropriate section below for detailed instructions.

 Check the `service-mcp-server-tmp` source github repository’s README for commands like `npx`, `npm`, or `uv`; these usually indicate a stdio-based server. If the README references a URL with `/mcp` or `/sse` endpoints, the server is likely remote.1. For `stdio-based` servers

 ### 1. Stdio-based

 - [ ]  Install the MCP server and its dependencies

 ```bash
 # Typescript
 npm i service-mcp-server-package -S
 ```

 ```bash
 # Python
 pip install service-mcp-server-package
 ```

 - [ ]  For Python, add `service-mcp-server-package` to requirements
 - [ ]  Remove any unused packages from the template to keep your project clean

 ```bash
 # Typescript
 npm uninstall @modelcontextprotocol/server-everything -S
 ```

 ```bash
 # Python
 pip uninstall arxiv-mcp-server
 ```

 - [ ]  Configure the run command
 - [ ]  Refer to the `service-mcp-server-tmp` source github repository’s README to find the recommended start command.
 - [ ]  Edit the run command in your main script
     - Typescript `src/main.ts`

     ```tsx
     const MCP_COMMAND = [
         'npx',
         '@modelcontextprotocol/server-everything',
     ];
     ```

     - Python `src/main.py`

     ```python
     MCP_SERVER_PARAMS = StdioServerParameters(
         command='uv',
         args=['run', 'arxiv-mcp-server'],
         env={'YOUR-ENV_VAR': os.getenv('YOUR-ENV-VAR')},
     )
     ```


 ### 2. For remote servers

 - [ ]  Use http-streamable transport whenever possible (over old and obsolete SSE transport)
 - [ ]  Expose remote sever
     - Typescript `src/main.ts` you can use the [mcp-remote](https://www.npmjs.com/package/mcp-remote) tool to turn a remote MCP server into an Actor. For example, to connect to a remote server over SSE with authentication:

     ```tsx
     const MCP_COMMAND = [
         'npx',
         'mcp-remote',
         'https://mcp.apify.com',
         '--transport',
         'streamable-only',
         '--header',
         'Authorization: Bearer TOKEN',
     ];
     ```

     - Python `src/main.py` provide URL to the MCP server

     ```python
     from .models import RemoteServerParameters  # noqa: ERA001

     server_type = ServerType.HTTP # or ServerType.SSE, depending on your server type # noqa: ERA001
     MCP_SERVER_PARAMS = RemoteServerParameters( # noqa: ERA001, RUF100
         url='MCP-SERVER-URL',  # noqa: ERA001
         headers={'Authorization':  'Bearer YOUR-API-KEY'},  # Optional headers, e.g., for authentication  # noqa: ERA001
     )  # noqa: ERA001, RUF100

     ```

 - Update checklist with completed tasks

 ## 📃Actor README file

 Since we want to publish servers into Apify store and make them discoverable, we need to provide description so that the server is found by search.

 📨What should be included in the README:

 - [ ]  <SERVICE> MCP Server as a title
 - [ ]  Short description
 - [ ]  URL that MCP clients can use for connecting
 - [ ]  Link to the mcp-servers git repo: [https://github.com/apify/mcp-servers](https://github.com/apify/mcp-servers)
 - [ ]  Link to the Actor git repo ([see bellow](https://www.notion.so/Professional-Services-MCP-Server-Actorization-20ff39950a2280269ac8ebcdc78c2e26?pvs=21)) (this will be done automatically if you Unhide source files)
 - [ ]  Link to Apify MCP docs: [http://mcp.apify.com](http://mcp.apify.com/)
 - [ ]  Claim contact info (in case original server is not owned by you or Apify)
 - [ ]  Add the Apify badge (e.g., `https://apify.com/actor-badge?actor=mcp-server/service-mcp-server`) to the service README.
 - [ ]  Add the Apify badge and entry into README.md at mcp-servers that is placed at the root in mcp-servers repository

 ```markdown
 All credits to the original authors of <https://github.com/repo-link>

 🚩 Claim this MCP server – write to [ai@apify.com](mailto:ai@apify.com).
 ```

 - [ ]  The actual server README (e.g. from git README)
 - Example README template

     ```markdown
     ## <SERVICE_NAME> MCP Server

     {Shortened description}

     **About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com)..

     ## Connection URL
     MCP clients can connect to this server at:

     ```text
     https://mcp-servers--{service}-mcp-server.apify.actor/mcp
     ```

     ## Client Configuration
     To connect to this MCP server, use the following configuration in your MCP client:

     ```json
     {
       "mcpServers": {
         "playwright": {
           "url": "https://mcp-servers--{service}-mcp-server.apify.actor/mcp",
           "headers": {
             "Authorization": "Bearer YOUR_APIFY_TOKEN"
           }
         }
       }
     }
     ```

     **Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

     ## 🚩 Claim this MCP server
     All credits to the original authors of [https://github.com/microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)
     To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

     --- COPY PASTE SOURCE REPOSITORY GITHUB README HERE ---
     **It would be best to also include Available tools**

     **BUT ONLY INCLUDE RELEVANT INFORMATION. OMIT INSTALLATION INSTRUCTIONS CONFIGURATIONS AND OTHER SETTINGS*

     ## References
     To learn more about Apify and Actors, take a look at the following resources:
     - [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
     - [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
     - [Apify Platform documentation](https://docs.apify.com/platform)
     - [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
     - [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
     - [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
     ```

 - [ ]  Update Actor description in the`.actor/actor.json` attribute `description`
 - [ ]  Update checklist with the completed tasks

 ### 💰Add pricing information into the code

 **Set up PPE (Pay Per Event) monetization**

 **Note**: The actual monetization is configured in the Apify console, but you need to prepare the code structure first

 - [ ]  Check the source server tools (either in `README.md` or source code)
 - [ ]  Modify `src/billing.ts` or `src/const.py` and other code to match the source server tools
 - [ ]  Update`.actor/pay_per_event.json` with estimated prices for each event

 Alternative: Use Apify SDK tools directly (Actor.charge) for custom implementation

 - [ ]  **Rename tools to match the actual server tools (when applicable)**

     **Example**  For SlideSpeak, rename generic events to match actual tools like `generateSlides` and `getTemplates`

 - [ ]  Make event names descriptive and match the actual functionality being charged
 - [ ]  Update checklist with the completed tasks

 ### 🧪Test the server locally

 <aside>
 💡

 When testing, make sure to provide the Actor with any required API tokens.

 For example

 e.g. `export API_TOKEN="123" apify run`

 </aside>

 To start the server, navigate to the `service-mcp-server` directory and run the main file with the following command, which will expose the server:

 ```bash
 APIFY_META_ORIGIN='STANDBY' ACTOR_WEB_SERVER_PORT=3002 apify run -p

 ```

 `APIFY_META_ORIGIN='STANDBY' ACTOR_WEB_SERVER_PORT=3002 apify run -p`

 Then, you can connect to the server using  [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector) and check whether it is working as expected.

 ## 🧪Test the server at Apify

 We want to host the servers on GitHub under the [mcp-server](https://console.apify.com/organization/wTV4Ur59SqfSEvQ3a) account.

 However, it’s often easier to deploy and test them on Apify using your own account first. Just use the Apify CLI:

 ```bash
 apify login
 apify push
 # don't forget to set up ENV variables in the console...
 ```

 ### 💪Push to GitHub repository

 - [ ]  Create a PR to the [https://github.com/apify/mcp-servers](https://github.com/apify/mcp-servers) → each Actor has its own separate directory!
 - [ ]  Ask for a code review

 ### 👷‍♂️Actor settings at platform

 ---

 - [ ]  Go to the Apify Console and log in at [https://console.apify.com/organization/wTV4Ur59SqfSEvQ3a](https://console.apify.com/organization/wTV4Ur59SqfSEvQ3a) (MCP server ORG account).
 - [ ]  Create a new Actor by linking a Git repository.
     - Specify the branch and directory.
     - Add the deployment key.
 - [ ]  Add environment variables—such as API tokens.
 - [ ]  In settings, enable “Actor Standby.
 - [ ]  Configure scaling. MCP servers can typically handle many requests, so for example, set `Max requests per run` to 200 and `desired requests per run` to 150. You should set this value depending on the nature of the MCP server. If the server needs to hold local state, then set some ridiculously large number to minimize the chance of losing the state. If there is some processing without local state or just API calls, it can be lower.
 - [ ]  Set reasonable memory limits for both normal runs and standby, based on the specific MCP server (can be 128MB or 256MB).

 ![image.png](mcp%20%5BTemplate%5D%20MCP%20Server%20Actorization%20checklist%20238f39950a22804598dace8cb49582ca/image.png)

 - [ ]  Build the Actor!

 ---

 ### 🖥️Actor publication

 - [ ]  In the console:

     ![Screenshot from 2025-07-08 15-38-52.png](mcp%20%5BTemplate%5D%20MCP%20Server%20Actorization%20checklist%20238f39950a22804598dace8cb49582ca/Screenshot_from_2025-07-08_15-38-52.png)

 - [ ]  Add Information about Auth - either API key or oAuth
 - [ ]  Add a clear and appealing Actor image.
 - [ ]  Add it to `MCP servers` category
 - [ ]  🤑 Set up monetization, we don’t need to generate revenue, but to inspire others.
 - [ ]  If the Actor doesn’t produce any datasets in a normal run, or if it requires secrets, disable automated tests in Admin settings → “Skip automated test”.
 - [ ]  When the Actor is run in normal mode, exit with 0 code (=success) and display this message:

 “This Actor is intended to run in standby mode. Please use an MCP client to connect.” Also include configuration below. It should be single line so that users can copy it easily

 ```bash
 {
  "mcpServers": {
    "playwright": {
      "type": "http",
      "url": "https://jiri-spilka--playwright-mcp-server.apify.actor",
      "headers": {
         "Authorization": "Bearer your-apify-token"
      }
    }
  }
 }
 ```

 - [ ]  Log the same configuration in standby mode logs

 ### 🚀Make it public

 Before you make the Actor public you should test it out, once again check if you filled all the descriptions and correct info.

 - [ ]  Make it public

 ### 🧪Verify that MCP Server is working

 - **Using [Apify MCP tester](https://apify.com/jiri.spilka/tester-mcp-client) (easiest end-to-end testing)**
     - Use the: https://apify.com/jiri.spilka/tester-mcp-client
     - Run it and follow the link to the chat UI.
     - Prompt your server to test functionality, for example, with the `national-parks-mcp-server`:
         1. `Hey connect to tool server "mcp-servers/national-parks-mcp-server" and list its tools.`
         2. `Find a California park suitable for hiking and its campgrounds.`

   > 💡 Alternatively, use Actor’s Standby URL as an input in the Apify MCP tester client: [`https://mcp-servers--national-parks-mcp-server.apify.actor](https://mcp-servers--national-parks-mcp-server.apify.actor/?token=<YOUR_APIFY_API_TOKEN>)/sse` and ask ``Find a California park``

 [Using MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector)

 There are some use-cases in what it would make sense to use the inspector, but it is a difficult to use tool — you have to choose the right tool and specify correct inputs for each call. This tedious job is for LLM to do, so it is recommended to just use the other method with Apify MCP server tester.

 - Inspecting a local server
     - Start your server locally (unwrapped or in standby mode):
         - For stdio transport:

             ```bash
             npx @modelcontextprotocol/inspector
             ```

         - For an Actorized server in standby mode:

             ```bash
             APIFY_META_ORIGIN="STANDBY" ACTOR_WEB_SERVER_PORT=8080 apify run
             ```

         - Make sure to set any required environment variables (e.g., API tokens).
     - Open the Inspector’s web interface (typically [http://localhost:6274](http://localhost:6274/)).
     - Select the appropriate transport: STDIO, http-streamable, SSE
     - Connect and test available tools and their inputs

 - Inspecting a published (Actorized) server
     - Ensure your Actor is deployed and running in standby mode on the Apify platform.
     - Start the Inspector:

         ```bash
         npx @modelcontextprotocol/inspector
         ```

     - Connect using:
         - **Transport:** Prefer `http-streamable`.
             - If not supported, use `SSE` (legacy).
         - **URL:** Use the Standby URL from your Actor’s Apify console (without query parameters).
         - **Authentication:** Enter your Apify API token as a Bearer token.
     - Once connected, browse tools, provide inputs, and review outputs.

 <aside>
 ➡️

 General tips

 - Always set required environment variables (API tokens, etc.) before testing.
 - Prefer the http-streamable transport where available—it is more reliable and efficient than SSE, which is now considered legacy.\
 - Test each tool with a variety of inputs and check for expected outputs.
 - For published Actors, verify external connectivity with a client (such as tester-mcp-client).
 </aside>

 ## 🔑 (optional) Put used API tokens to the 1Password

 In Apify’s 1Password there is a vault `MCP Servers Actorization`. If you need an access write a message to @Josef Jetmar.
