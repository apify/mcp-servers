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
 * Charges the user for a chart generation request by analyzing the method string.
 * Extracts tool name from the method and applies appropriate billing tier.
 *
 * @param method - The full method string that may contain a chart tool name
 * @returns Promise<void>
 */
export async function chargeChartRequest(method: string): Promise<void> {
    // Find if any chart tool name is contained in the method string
    const chartToolNames = Object.keys(CHART_BILLING_MAP);

    for (const toolName of chartToolNames) {
        if (method.includes(toolName)) {
            const billingEvent = CHART_BILLING_MAP[toolName as keyof typeof CHART_BILLING_MAP];
            await Actor.charge({ eventName: billingEvent });
            log.info(`Charged for chart generation: ${toolName} -> ${billingEvent} (found in method: ${method})`);
            return;
        }
    }

    // If no specific chart tool found, don't charge
    log.info(`No chart tool found in method: ${method} - not charging`);
}

/**
 * Charges the user for a message request based on the method type.
 * For tool-related requests, delegates to chargeChartRequest.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string }): Promise<void> {
    const { method } = request;

    // Check if this is a tool-related request
    if (method.startsWith('tool')) {
        log.info(`Tool request detected: ${method}`);
        await chargeChartRequest(method);
    } else {
        log.info(`Not charging for method: ${method} - chart generation server only charges for tool calls`);
    }
}
