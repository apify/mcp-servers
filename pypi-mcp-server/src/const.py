from enum import Enum


class ChargeEvents(str, Enum):
    """Chargeable events."""

    ACTOR_START = 'actor-start'
    TOOL_CALL = 'tool-call'  # flat fee for ANY PyPI tool invocation


# Whitelist ONLY the PyPI Query MCP tools.
# All are billed under TOOL_CALL with a default count of 1.
# (Names match the pypi-query-mcp-server tool identifiers.)
TOOL_WHITELIST = {
    # Package metadata & versions
    'get_package_info': (ChargeEvents.TOOL_CALL.value, 1),
    'get_package_versions': (ChargeEvents.TOOL_CALL.value, 1),
    # Dependencies & compatibility
    'get_package_dependencies': (ChargeEvents.TOOL_CALL.value, 1),
    'check_package_python_compatibility': (ChargeEvents.TOOL_CALL.value, 1),
    'get_package_compatible_python_versions': (ChargeEvents.TOOL_CALL.value, 1),
    'resolve_dependencies': (ChargeEvents.TOOL_CALL.value, 1),
    'resolve_dependency_conflicts': (ChargeEvents.TOOL_CALL.value, 1),
    # Downloads & trends
    'get_download_statistics': (ChargeEvents.TOOL_CALL.value, 1),
    'get_download_trends': (ChargeEvents.TOOL_CALL.value, 1),
    'get_top_downloaded_packages': (ChargeEvents.TOOL_CALL.value, 1),
    'analyze_daily_trends': (ChargeEvents.TOOL_CALL.value, 1),
    'find_trending_packages': (ChargeEvents.TOOL_CALL.value, 1),
    'track_package_updates': (ChargeEvents.TOOL_CALL.value, 1),
    # Quality, audits, comparisons
    'analyze_package_quality': (ChargeEvents.TOOL_CALL.value, 1),
    'audit_security_risks': (ChargeEvents.TOOL_CALL.value, 1),
    'compare_packages': (ChargeEvents.TOOL_CALL.value, 1),
    'suggest_alternatives': (ChargeEvents.TOOL_CALL.value, 1),
    # Planning & operations
    'plan_version_upgrade': (ChargeEvents.TOOL_CALL.value, 1),
    'plan_package_migration': (ChargeEvents.TOOL_CALL.value, 1),
    'generate_migration_checklist': (ChargeEvents.TOOL_CALL.value, 1),
    'analyze_environment_dependencies': (ChargeEvents.TOOL_CALL.value, 1),
    'check_outdated_packages': (ChargeEvents.TOOL_CALL.value, 1),
    'generate_update_plan': (ChargeEvents.TOOL_CALL.value, 1),
    # Artifact ops
    'download_package': (ChargeEvents.TOOL_CALL.value, 1),
}
