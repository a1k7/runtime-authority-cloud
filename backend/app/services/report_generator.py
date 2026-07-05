from typing import Dict, Any
import json
import hashlib
from datetime import datetime

class ReportGenerator:
    def generate(self, trace_data: Dict[str, Any], verification_result: Dict[str, Any], analysis_result: Dict[str, Any]) -> Dict[str, Any]:
        trace_str = json.dumps(trace_data, sort_keys=True)
        report = {
            "report_id": hashlib.sha256(trace_str.encode()).hexdigest()[:16],
            "generated_at": datetime.utcnow().isoformat() + "Z",
            "trace_id": trace_data.get("trace_id", "unknown"),
            "workflow": trace_data.get("workflow", "unknown"),
            "overall_status": verification_result.get("overall_status", "PASS"),
            "summary": {
                "total_steps": len(trace_data.get("steps", [])),
                "checks_passed": sum(1 for c in verification_result.get("checks", {}).values() if c.get("passed")),
                "checks_failed": sum(1 for c in verification_result.get("checks", {}).values() if not c.get("passed")),
                "risk_score": analysis_result.get("risk_score", {}).get("score", 0),
                "risk_level": analysis_result.get("risk_score", {}).get("level", "UNKNOWN")
            },
            "verification_details": verification_result.get("checks", {}),
            "authority_timeline": analysis_result.get("authority_timeline", []),
            "drift_events": analysis_result.get("authority_drift", []),
            "delegation_graph": analysis_result.get("delegation_graph", {}),
            "expired_evidence": analysis_result.get("expired_evidence", []),
            "risk_analysis": analysis_result.get("risk_score", {}),
            "recommendations": analysis_result.get("fix_recommendations", []),
            "signature": {
                "method": "sha256",
                "hash": hashlib.sha256(trace_str.encode()).hexdigest()
            },
            "claim_limit": "This report is based on the specific trace artifact verified. It does not imply blanket production-readiness or regulatory certification."
        }
        
        return report