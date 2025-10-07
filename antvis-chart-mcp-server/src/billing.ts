/**
 * This module handles billing for different types of chart generation requests in the AntV Chart MCP server.
 * It defines functions to charge users based on the type of chart being generated.
 */
import { Actor, log } from 'apify';

/**
 * Maps chart types to billing categories for pricing
 */
const CHART_BILLING_MAP = {
    // Basic charts - simple visualizations
    'generate_area_chart': 'generate-basic-chart',
    'generate_bar_chart': 'generate-basic-chart',
    'generate_column_chart': 'generate-basic-chart',
    'generate_line_chart': 'generate-basic-chart',
    'generate_pie_chart': 'generate-basic-chart',

    // Advanced charts - complex statistical visualizations
    'generate_radar_chart': 'generate-advanced-chart',
    'generate_sankey_chart': 'generate-advanced-chart',
    'generate_treemap_chart': 'generate-advanced-chart',
    'generate_violin_chart': 'generate-advanced-chart',
    'generate_boxplot_chart': 'generate-advanced-chart',
    'generate_histogram_chart': 'generate-advanced-chart',
    'generate_scatter_chart': 'generate-advanced-chart',

    // Map charts - geographic visualizations
    'generate_district_map': 'generate-map-chart',
    'generate_pin_map': 'generate-map-chart',
    'generate_path_map': 'generate-map-chart',

    // Diagrams - structured visualizations
    'generate_flow_diagram': 'generate-diagram',
    'generate_fishbone_diagram': 'generate-diagram',
    'generate_mind_map': 'generate-diagram',
    'generate_organization_chart': 'generate-diagram',
    'generate_network_graph': 'generate-diagram',

    // Specialty charts - unique visualizations
    'generate_liquid_chart': 'generate-specialty-chart',
    'generate_venn_chart': 'generate-specialty-chart',
    'generate_word_cloud_chart': 'generate-specialty-chart',
    'generate_funnel_chart': 'generate-specialty-chart',
    'generate_dual_axes_chart': 'generate-specialty-chart',
};

/**
 * Charges the user for a chart generation request based on the chart type.
 * Different chart types have different pricing tiers based on complexity.
 *
 * @param toolName - The name of the chart generation tool being called
 * @returns Promise<void>
 */
export async function chargeChartRequest(toolName: string): Promise<void> {
    const billingEvent = CHART_BILLING_MAP[toolName as keyof typeof CHART_BILLING_MAP];

    if (billingEvent) {
        await Actor.charge({ eventName: billingEvent });
        log.info(`Charged for chart generation: ${toolName} -> ${billingEvent}`);
    } else {
        log.warning(`Unknown chart tool, not charging: ${toolName}`);
    }
}

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string }): Promise<void> {
    const { method } = request;

    // See https://modelcontextprotocol.io/specification/2025-06-18/server for more details
    // on the method names and protocol messages
    // Charge for list requests (e.g., tools/list, resources/list, etc.)
    if (method.endsWith('/list')) {
        await Actor.charge({ eventName: 'list-request' });
        log.info(`Charged for list request: ${method}`);
        // Charge for tool-related requests - this will handle chart generation
    } else if (method.startsWith('tools/call')) {
        // For tools/call, we'll handle charging in the server middleware based on the specific tool
        log.info(`Tool call request: ${method} - will charge based on specific chart type`);
        // Charge for resource-related requests
    } else if (method.startsWith('resources/')) {
        await Actor.charge({ eventName: 'resource-request' });
        log.info(`Charged for resource request: ${method}`);
        // Charge for prompt-related requests
    } else if (method.startsWith('prompts/')) {
        await Actor.charge({ eventName: 'prompt-request' });
        log.info(`Charged for prompt request: ${method}`);
        // Charge for completion-related requests
    } else if (method.startsWith('completion/')) {
        await Actor.charge({ eventName: 'completion-request' });
        log.info(`Charged for completion request: ${method}`);
        // Do not charge for other methods
    } else {
        log.info(`Not charging for method: ${method}`);
    }
}
