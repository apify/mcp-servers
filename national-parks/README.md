# National Parks MCP Server

MCP Server for the National Park Service (NPS) API, providing real-time information about U.S. National Parks, including park details, alerts, and activities.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at mcp.apify.com.

## Tools

1. `findParks`
   - Search for national parks based on various criteria
   - Inputs:
     - `stateCode` (optional string): Filter parks by state code (e.g., "CA" for California). Multiple states can be comma-separated (e.g., "CA,OR,WA")
     - `q` (optional string): Search term to filter parks by name or description
     - `limit` (optional number): Maximum number of parks to return (default: 10, max: 50)
     - `start` (optional number): Start position for results (useful for pagination)
     - `activities` (optional string): Filter by available activities (e.g., "hiking,camping")
   - Returns: Matching parks with detailed information

2. `getParkDetails`
   - Get comprehensive information about a specific national park
   - Inputs:
     - `parkCode` (string): The park code of the national park (e.g., "yose" for Yosemite, "grca" for Grand Canyon)
   - Returns: Detailed park information including descriptions, hours, fees, contacts, and activities

3. `getAlerts`
   - Get current alerts for national parks including closures, hazards, and important information
   - Inputs:
     - `parkCode` (optional string): Filter alerts by park code (e.g., "yose" for Yosemite). Multiple parks can be comma-separated (e.g., "yose,grca")
     - `limit` (optional number): Maximum number of alerts to return (default: 10, max: 50)
     - `start` (optional number): Start position for results (useful for pagination)
     - `q` (optional string): Search term to filter alerts by title or description
   - Returns: Current alerts organized by park

4. `getVisitorCenters`
   - Get information about visitor centers and their operating hours
   - Inputs:
     - `parkCode` (optional string): Filter visitor centers by park code (e.g., "yose" for Yosemite). Multiple parks can be comma-separated (e.g., "yose,grca")
     - `limit` (optional number): Maximum number of visitor centers to return (default: 10, max: 50)
     - `start` (optional number): Start position for results (useful for pagination)
     - `q` (optional string): Search term to filter visitor centers by name or description
   - Returns: Visitor center information including location, hours, and contact details

5. `getCampgrounds`
   - Get information about available campgrounds and their amenities
   - Inputs:
     - `parkCode` (optional string): Filter campgrounds by park code (e.g., "yose" for Yosemite). Multiple parks can be comma-separated (e.g., "yose,grca")
     - `limit` (optional number): Maximum number of campgrounds to return (default: 10, max: 50)
     - `start` (optional number): Start position for results (useful for pagination)
     - `q` (optional string): Search term to filter campgrounds by name or description
   - Returns: Campground information including amenities, fees, and reservation details

6. `getEvents`
   - Find upcoming events at parks
   - Inputs:
     - `parkCode` (optional string): Filter events by park code (e.g., "yose" for Yosemite). Multiple parks can be comma-separated (e.g., "yose,grca")
     - `limit` (optional number): Maximum number of events to return (default: 10, max: 50)
     - `start` (optional number): Start position for results (useful for pagination)
     - `dateStart` (optional string): Start date for filtering events (format: YYYY-MM-DD)
     - `dateEnd` (optional string): End date for filtering events (format: YYYY-MM-DD)
     - `q` (optional string): Search term to filter events by title or description
   - Returns: Event information including dates, times, and descriptions

## Example Usage

### Finding Parks in a State

```
Tell me about national parks in Colorado.
```

### Getting Details About a Specific Park

```
What's the entrance fee for Yellowstone National Park?
```

### Checking for Alerts or Closures

```
Are there any closures or alerts at Yosemite right now?
```

### Finding Visitor Centers

```
What visitor centers are available at Grand Canyon National Park?
```

### Looking for Campgrounds

```
Are there any campgrounds with electrical hookups in Zion National Park?
```

### Finding Upcoming Events

```
What events are happening at Acadia National Park next weekend?
```

### Planning a Trip Based on Activities

```
Which national parks in Utah have good hiking trails?
```

## License

This MCP server is licensed under the MIT License. See the LICENSE file for details.

## Appendix: Popular National Parks and their codes

| Park Name | Park Code |
|-----------|-----------|
| Yosemite | yose |
| Grand Canyon | grca |
| Yellowstone | yell |
| Zion | zion |
| Great Smoky Mountains | grsm |
| Acadia | acad |
| Olympic | olym |
| Rocky Mountain | romo |
| Joshua Tree | jotr |
| Sequoia & Kings Canyon | seki |

For a complete list, visit the [NPS website](https://www.nps.gov/findapark/index.htm).

## 🚩 Claim this MCP server

All credits to the original authors of <https://github.com/KyrieTangSheng/mcp-server-nationalparks>

To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

## Documentation reference

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
