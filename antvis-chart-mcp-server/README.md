## AntV Chart MCP Server

A Model Context Protocol server for generating charts using [AntV](https://github.com/antvis/). This server provides chart generation and data analysis capabilities with support for 25+ chart types including area, bar, line, pie, radar, scatter plots, maps, and specialized visualizations like treemaps, sankey diagrams, and word clouds.

**Chart Output:** All chart generation tools return direct links to high-quality PNG images of the generated charts, making them easy to view, share, and embed in documents or applications.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](https://mcp.apify.com).

## Connection URL

MCP clients can connect to this server at:

```text
https://mcp-servers--antvis-chart-mcp-server.apify.actor/mcp
```

## Client Configuration

To connect to this MCP server, use the following configuration in your MCP client:

```json
{
  "mcpServers": {
    "antvis-chart": {
      "url": "https://mcp-servers--antvis-chart-mcp-server.apify.actor/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

**Note:** Replace `YOUR_APIFY_TOKEN` with your actual Apify API token. You can find your token in the [Apify Console](https://console.apify.com/account/integrations).

## 🚩 Claim this MCP server

All credits to the original authors of [https://github.com/antvis/mcp-server-chart](https://github.com/antvis/mcp-server-chart)

---

## ✨ Features

Now 25+ charts supported.

1. `generate_area_chart`: Generate an `area` chart, used to display the trend of data under a continuous independent variable, allowing observation of overall data trends.
2. `generate_bar_chart`: Generate a `bar` chart, used to compare values across different categories, suitable for horizontal comparisons.
3. `generate_boxplot_chart`: Generate a `boxplot`, used to display the distribution of data, including the median, quartiles, and outliers.
4. `generate_column_chart`: Generate a `column` chart, used to compare values across different categories, suitable for vertical comparisons.
5. `generate_district_map` - Generate a `district-map`, used to show administrative divisions and data distribution.
6. `generate_dual_axes_chart`: Generate a `dual-axes` chart, used to display the relationship between two variables with different units or ranges.
7. `generate_fishbone_diagram`: Generate a `fishbone` diagram, also known as an Ishikawa diagram, used to identify and display the root causes of a problem.
8. `generate_flow_diagram`: Generate a `flowchart`, used to display the steps and sequence of a process.
9. `generate_funnel_chart`: Generate a `funnel` chart, used to display data loss at different stages.
10. `generate_histogram_chart`: Generate a `histogram`, used to display the distribution of data by dividing it into intervals and counting the number of data points in each interval.
11. `generate_line_chart`: Generate a `line` chart, used to display the trend of data over time or another continuous variable.
12. `generate_liquid_chart`: Generate a `liquid` chart, used to display the proportion of data, visually representing percentages in the form of water-filled spheres.
13. `generate_mind_map`: Generate a `mind-map`, used to display thought processes and hierarchical information.
14. `generate_network_graph`: Generate a `network` graph, used to display relationships and connections between nodes.
15. `generate_organization_chart`: Generate an `organizational` chart, used to display the structure of an organization and personnel relationships.
16. `generate_path_map` - Generate a `path-map`, used to display route planning results for POIs.
17. `generate_pie_chart`: Generate a `pie` chart, used to display the proportion of data, dividing it into parts represented by sectors showing the percentage of each part.
18. `generate_pin_map` - Generate a `pin-map`, used to show the distribution of POIs.
19. `generate_radar_chart`: Generate a `radar` chart, used to display multi-dimensional data comprehensively, showing multiple dimensions in a radar-like format.
20. `generate_sankey_chart`: Generate a `sankey` chart, used to display data flow and volume, representing the movement of data between different nodes in a Sankey-style format.
21. `generate_scatter_chart`: Generate a `scatter` plot, used to display the relationship between two variables, showing data points as scattered dots on a coordinate system.
22. `generate_treemap_chart`: Generate a `treemap`, used to display hierarchical data, showing data in rectangular forms where the size of rectangles represents the value of the data.
23. `generate_venn_chart`: Generate a `venn` diagram, used to display relationships between sets, including intersections, unions, and differences.
24. `generate_violin_chart`: Generate a `violin` plot, used to display the distribution of data, combining features of boxplots and density plots to provide a more detailed view of the data distribution.
25. `generate_word_cloud_chart`: Generate a `word-cloud`, used to display the frequency of words in textual data, with font sizes indicating the frequency of each word.

> **Note:** The geographic visualization chart generation tools use [AMap service](https://lbs.amap.com/) and currently only support map generation within China.

## 🤖 Usage Examples

### Generate a Simple Bar Chart
Ask the server to create a bar chart comparing sales data:
```
Generate a bar chart showing quarterly sales: Q1: 100, Q2: 150, Q3: 120, Q4: 180
```

### Create a Line Chart for Time Series
```
Create a line chart showing website traffic over 6 months: Jan: 1000, Feb: 1200, Mar: 1100, Apr: 1400, May: 1600, Jun: 1500
```

### Generate a Pie Chart for Distribution
```
Make a pie chart showing market share: Company A: 35%, Company B: 25%, Company C: 20%, Others: 20%
```

### Create Advanced Visualizations
```
Generate a treemap showing product categories and their revenue contribution
Generate a sankey diagram showing customer journey from awareness to purchase
Create a radar chart comparing product features across multiple dimensions
```

## References

To learn more about Apify and Actors, take a look at the following resources:
- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Apify MCP Server](https://docs.apify.com/platform/integrations/mcp)
- [Webinar: Building and Monetizing MCP Servers on Apify](https://www.youtube.com/watch?v=w3AH3jIrXXo)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
