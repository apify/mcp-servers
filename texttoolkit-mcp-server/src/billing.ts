/**
 * This module handles billing for different types of protocol requests in the MCP server.
 * It defines a function to charge users based on the type of protocol method invoked.
 */
import { Actor, log } from 'apify';

type TOOL_NAMES =
    | 'case_to_camel'
    | 'case_to_pascal'
    | 'case_to_snake'
    | 'case_to_kebab'
    | 'case_to_constant'
    | 'case_to_dot'
    | 'case_to_no'
    | 'case_to_pascal_snake'
    | 'case_to_path'
    | 'case_to_sentence'
    | 'case_to_train'
    | 'case_to_capital'
    | 'encode_base64'
    | 'decode_base64'
    | 'encode_url'
    | 'decode_url'
    | 'encode_html'
    | 'decode_html'
    | 'format_json'
    | 'format_xml'
    | 'format_sql'
    | 'format_html'
    | 'count_characters'
    | 'count_words'
    | 'count_lines'
    | 'analyze_readability'
    | 'string_trim'
    | 'string_substring'
    | 'string_replace'
    | 'string_split'
    | 'string_join'
    | 'generate_uuid'
    | 'validate_uuid'
    | 'generate_md5'
    | 'generate_sha1'
    | 'generate_sha256'
    | 'generate_sha512'
    | 'generate_hmac'
    | 'generate_lorem_ipsum'
    | 'regex_test'
    | 'regex_replace'
    | 'regex_extract'
    | 'regex_split';

/**
 * Charges the user for a message request based on the method type.
 * Supported method types are mapped to specific billing events.
 *
 * @param request - The request object containing the method string.
 * @returns Promise<void>
 */
export async function chargeMessageRequest(request: { method: string, params?: { name?: TOOL_NAMES }}): Promise<void> {
    const { method, params } = request;
    const { name } = params || {};

    if (name) {
        await Actor.charge({ eventName: 'tool' });
        log.info(`Charged for tool usage: ${name}`);
    } else {
        log.info(`No charge applied. Unrecognized tool name in method: ${method}`);
    }
}
