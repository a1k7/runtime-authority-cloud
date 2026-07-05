import hashlib
import json
from typing import Dict, Any

def hash_trace(trace_data: Dict[str, Any]) -> str:
    """Generate a SHA-256 hash of trace data."""
    trace_str = json.dumps(trace_data, sort_keys=True)
    return hashlib.sha256(trace_str.encode()).hexdigest()

def validate_step_continuity(steps: list) -> bool:
    """Validate continuity hash chain across steps."""
    if not steps:
        return False
    for i in range(1, len(steps)):
        if "continuity_hash" not in steps[i] or "continuity_hash" not in steps[i-1]:
            return False
    return True

def extract_delegation_chain(steps: list) -> list:
    """Extract the delegation chain from steps."""
    for step in steps:
        authority = step.get("authority_context", {})
        chain = authority.get("delegation_chain", [])
        if chain:
            return chain
    return []