## Chart MCP Server

A Model Context Protocol server for generating charts using [AntV](https://github.com/antvis/). We can use this mcp server for _chart generation_ and _data analysis_.

**About this MCP Server:** To understand how to connect to and utilize this MCP server, please refer to the official Model Context Protocol documentation at [mcp.apify.com](<https://mcp.apif>

This is a TypeScript-based MCP server that provides chart generation capabilities. It allows you to create various types of charts through MCP tools. You can also use it in [Dify](https://marketplace.dify.ai/plugins/antv/visualization).

## ✨ Features

Now 25+ charts supported.

<img width="768" alt="mcp-server-chart preview" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IyIRQIQHyKYAAAAAgCAAAAgAemJ7AQ/fmt.avif" />

1. `generate_area_chart`: Generate an `area` chart, used to display the trend of data under a continuous independent variable, allowing observation of overall data trends.
1. `generate_bar_chart`: Generate a `bar` chart, used to compare values across different categories, suitable for horizontal comparisons.
1. `generate_boxplot_chart`: Generate a `boxplot`, used to display the distribution of data, including the median, quartiles, and outliers.
1. `generate_column_chart`: Generate a `column` chart, used to compare values across different categories, suitable for vertical comparisons.
1. `generate_district_map` - Generate a `district-map`, used to show administrative divisions and data distribution.
1. `generate_dual_axes_chart`: Generate a `dual-axes` chart, used to display the relationship between two variables with different units or ranges.
1. `generate_fishbone_diagram`: Generate a `fishbone` diagram, also known as an Ishikawa diagram, used to identify and display the root causes of a problem.
1. `generate_flow_diagram`: Generate a `flowchart`, used to display the steps and sequence of a process.
1. `generate_funnel_chart`: Generate a `funnel` chart, used to display data loss at different stages.
1. `generate_histogram_chart`: Generate a `histogram`, used to display the distribution of data by dividing it into intervals and counting the number of data points in each interval.
1. `generate_line_chart`: Generate a `line` chart, used to display the trend of data over time or another continuous variable.
1. `generate_liquid_chart`: Generate a `liquid` chart, used to display the proportion of data, visually representing percentages in the form of water-filled spheres.
1. `generate_mind_map`: Generate a `mind-map`, used to display thought processes and hierarchical information.
1. `generate_network_graph`: Generate a `network` graph, used to display relationships and connections between nodes.
1. `generate_organization_chart`: Generate an `organizational` chart, used to display the structure of an organization and personnel relationships.
1. `generate_path_map` - Generate a `path-map`, used to display route planning results for POIs.
1. `generate_pie_chart`: Generate a `pie` chart, used to display the proportion of data, dividing it into parts represented by sectors showing the percentage of each part.
1. `generate_pin_map` - Generate a `pin-map`, used to show the distribution of POIs.
1. `generate_radar_chart`: Generate a `radar` chart, used to display multi-dimensional data comprehensively, showing multiple dimensions in a radar-like format.
1. `generate_sankey_chart`: Generate a `sankey` chart, used to display data flow and volume, representing the movement of data between different nodes in a Sankey-style format.
1. `generate_scatter_chart`: Generate a `scatter` plot, used to display the relationship between two variables, showing data points as scattered dots on a coordinate system.
1. `generate_treemap_chart`: Generate a `treemap`, used to display hierarchical data, showing data in rectangular forms where the size of rectangles represents the value of the data.
1. `generate_venn_chart`: Generate a `venn` diagram, used to display relationships between sets, including intersections, unions, and differences.
1. `generate_violin_chart`: Generate a `violin` plot, used to display the distribution of data, combining features of boxplots and density plots to provide a more detailed view of the data distribution.
1. `generate_word_cloud_chart`: Generate a `word-cloud`, used to display the frequency of words in textual data, with font sizes indicating the frequency of each word.

> [!NOTE]
> The above geographic visualization chart generation tool uses [AMap service](https://lbs.amap.com/) and currently only supports map generation within China.

## 📄 License

MIT@[AntV](https://github.com/antvis).

## 🚩 Claim this MCP server

All credits to the original authors of <https://github.com/antvis/mcp-server-chart>
To claim this server, please write to [ai@apify.com](mailto:ai@apify.com).

## Documentation reference

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
