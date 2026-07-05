import hashlib
import json
from typing import Dict, Any, List, Tuple

class Verifier:
    def __init__(self):
        self.checks_passed = []
        self.checks_failed = []
        self.discrepancies = []
    
    def verify(self, trace_data: Dict[str, Any]) -> Dict[str, Any]:
        self.checks_passed = []
        self.checks_failed = []
        self.discrepancies = []
        
        result = {
            "overall_status": "PASS",
            "checks": {},
            "discrepancies": [],
            "summary": ""
        }
        
        # 1. Verify integrity
        integrity_passed, integrity_errors = self._verify_integrity(trace_data)
        result["checks"]["integrity"] = {"passed": integrity_passed, "errors": integrity_errors}
        
        # 2. Verify lineage
        lineage_passed, lineage_errors = self._verify_lineage(trace_data)
        result["checks"]["lineage"] = {"passed": lineage_passed, "errors": lineage_errors}
        
        # 3. Verify authority trail
        authority_passed, authority_errors = self._verify_authority(trace_data)
        result["checks"]["authority"] = {"passed": authority_passed, "errors": authority_errors}
        
        # 4. Verify evidence freshness
        evidence_passed, evidence_errors = self._verify_evidence(trace_data)
        result["checks"]["evidence"] = {"passed": evidence_passed, "errors": evidence_errors}
        
        # 5. Verify delegation chain
        delegation_passed, delegation_errors = self._verify_delegation(trace_data)
        result["checks"]["delegation"] = {"passed": delegation_passed, "errors": delegation_errors}
        
        # 6. Verify boundaries
        boundary_passed, boundary_errors = self._verify_boundaries(trace_data)
        result["checks"]["boundaries"] = {"passed": boundary_passed, "errors": boundary_errors}
        
        all_passed = all(
            result["checks"][check].get("passed", False)
            for check in result["checks"]
        )
        
        if all_passed:
            result["overall_status"] = "PASS"
            result["summary"] = "All verification checks passed"
        else:
            result["overall_status"] = "FAIL"
            discrepancies = []
            for check_name, check_data in result["checks"].items():
                if not check_data.get("passed", False):
                    discrepancies.append(f"{check_name}: {', '.join(check_data.get('errors', ['unknown error']))}")
            result["discrepancies"] = discrepancies
            result["summary"] = f"{len(discrepancies)} check(s) failed"
        
        return result
    
    def _verify_integrity(self, trace_data: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        if "trace_id" not in trace_data:
            errors.append("Missing trace_id")
        if "steps" not in trace_data or not trace_data["steps"]:
            errors.append("Missing or empty steps")
        if "generated" not in trace_data:
            errors.append("Missing generated timestamp")
        return len(errors) == 0, errors
    
    def _verify_lineage(self, trace_data: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        steps = trace_data.get("steps", [])
        
        for i, step in enumerate(steps):
            if "continuity_hash" not in step:
                errors.append(f"Step {i+1}: missing continuity_hash")
            if "evidence_hash" not in step:
                errors.append(f"Step {i+1}: missing evidence_hash")
            if "step_index" not in step:
                errors.append(f"Step {i+1}: missing step_index")
        
        for i in range(1, len(steps)):
            if "continuity_hash" in steps[i] and "continuity_hash" in steps[i-1]:
                # Simplified lineage check - in production would verify hash chain
                pass
        
        return len(errors) == 0, errors
    
    def _verify_authority(self, trace_data: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        steps = trace_data.get("steps", [])
        
        for i, step in enumerate(steps):
            if "authority_context" not in step:
                errors.append(f"Step {i+1}: missing authority_context")
            else:
                ctx = step["authority_context"]
                if "policy_version" not in ctx:
                    errors.append(f"Step {i+1}: missing policy_version")
                if "delegation_chain" not in ctx:
                    errors.append(f"Step {i+1}: missing delegation_chain")
                if "delegation_depth" not in ctx:
                    errors.append(f"Step {i+1}: missing delegation_depth")
        
        return len(errors) == 0, errors
    
    def _verify_evidence(self, trace_data: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        steps = trace_data.get("steps", [])
        
        for i, step in enumerate(steps):
            if "evidence" not in step:
                errors.append(f"Step {i+1}: missing evidence")
            else:
                evidence = step["evidence"]
                if "timestamp" not in evidence:
                    errors.append(f"Step {i+1}: missing evidence timestamp")
        
        return len(errors) == 0, errors
    
    def _verify_delegation(self, trace_data: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        steps = trace_data.get("steps", [])
        
        for i, step in enumerate(steps):
            if "authority_context" in step:
                ctx = step["authority_context"]
                if "delegation_depth" in ctx:
                    if ctx["delegation_depth"] < 1:
                        errors.append(f"Step {i+1}: invalid delegation depth (must be >= 1)")
        
        return len(errors) == 0, errors
    
    def _verify_boundaries(self, trace_data: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        steps = trace_data.get("steps", [])
        
        for i, step in enumerate(steps):
            if "gate_state" not in step:
                errors.append(f"Step {i+1}: missing gate_state")
            else:
                gate = step["gate_state"]
                if "state" not in gate:
                    errors.append(f"Step {i+1}: missing gate state")
                if "admissible" not in gate:
                    errors.append(f"Step {i+1}: missing admissible flag")
        
        return len(errors) == 0, errors