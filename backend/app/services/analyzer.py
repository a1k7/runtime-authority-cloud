from typing import Dict, Any, List
from datetime import datetime, timedelta

class Analyzer:
    def analyze(self, trace_data: Dict[str, Any], verification_result: Dict[str, Any]) -> Dict[str, Any]:
        steps = trace_data.get("steps", [])
        
        return {
            "authority_timeline": self._analyze_timeline(steps),
            "authority_drift": self._detect_drift(steps),
            "delegation_graph": self._build_delegation_graph(steps),
            "expired_evidence": self._find_expired_evidence(steps),
            "risk_score": self._calculate_risk_score(steps, verification_result),
            "fix_recommendations": self._generate_recommendations(steps, verification_result)
        }
    
    def _analyze_timeline(self, steps: List[Dict]) -> List[Dict]:
        timeline = []
        for step in steps:
            state = step.get("gate_state", {}).get("state", "UNKNOWN")
            timestamp = step.get("timestamp", "")
            authority = step.get("authority_context", {})
            
            timeline.append({
                "step": step.get("step_index", 0),
                "timestamp": timestamp,
                "state": state,
                "policy_version": authority.get("policy_version", "unknown"),
                "delegation_depth": authority.get("delegation_depth", 0)
            })
        
        return timeline
    
    def _detect_drift(self, steps: List[Dict]) -> List[Dict]:
        drift_events = []
        prev_policy = None
        prev_delegation = None
        
        for step in steps:
            authority = step.get("authority_context", {})
            policy = authority.get("policy_version")
            delegation = authority.get("delegation_depth")
            
            if prev_policy and policy and prev_policy != policy:
                drift_events.append({
                    "step": step.get("step_index", 0),
                    "type": "policy_drift",
                    "from": prev_policy,
                    "to": policy,
                    "timestamp": step.get("timestamp", "")
                })
            
            if prev_delegation and delegation and prev_delegation != delegation:
                drift_events.append({
                    "step": step.get("step_index", 0),
                    "type": "delegation_drift",
                    "from": prev_delegation,
                    "to": delegation,
                    "timestamp": step.get("timestamp", "")
                })
            
            prev_policy = policy
            prev_delegation = delegation
        
        return drift_events
    
    def _build_delegation_graph(self, steps: List[Dict]) -> Dict[str, Any]:
        graph = {
            "nodes": [],
            "edges": []
        }
        
        for step in steps:
            authority = step.get("authority_context", {})
            chain = authority.get("delegation_chain", [])
            
            for i, node in enumerate(chain):
                if node not in [n["id"] for n in graph["nodes"]]:
                    graph["nodes"].append({"id": node, "label": node})
                
                if i > 0:
                    graph["edges"].append({
                        "from": chain[i-1],
                        "to": node,
                        "step": step.get("step_index", 0)
                    })
        
        return graph
    
    def _find_expired_evidence(self, steps: List[Dict]) -> List[Dict]:
        expired = []
        now = datetime.utcnow()
        
        for step in steps:
            evidence = step.get("evidence", {})
            timestamp_str = evidence.get("timestamp")
            
            if timestamp_str:
                try:
                    if timestamp_str.endswith("Z"):
                        timestamp_str = timestamp_str.replace("Z", "+00:00")
                    timestamp = datetime.fromisoformat(timestamp_str)
                    age = (now - timestamp).total_seconds()
                    
                    if age > 600:  # 10 minutes expiry threshold
                        expired.append({
                            "step": step.get("step_index", 0),
                            "age_seconds": age,
                            "timestamp": timestamp_str
                        })
                except:
                    pass
        
        return expired
    
    def _calculate_risk_score(self, steps: List[Dict], verification_result: Dict[str, Any]) -> Dict[str, Any]:
        score = 100
        risk_factors = []
        
        if verification_result.get("overall_status") == "FAIL":
            score -= 20
            risk_factors.append("Verification failed")
        
        denied_count = sum(1 for s in steps if s.get("gate_state", {}).get("state") == "DENIED")
        if denied_count > 0:
            score -= min(denied_count * 5, 30)
            risk_factors.append(f"{denied_count} DENIED states")
        
        unknown_count = sum(1 for s in steps if s.get("gate_state", {}).get("state") == "UNKNOWN")
        if unknown_count > 0:
            score -= min(unknown_count * 3, 15)
            risk_factors.append(f"{unknown_count} UNKNOWN states")
        
        drift_events = self._detect_drift(steps)
        if len(drift_events) > 0:
            score -= min(len(drift_events) * 5, 20)
            risk_factors.append(f"{len(drift_events)} drift events")
        
        expired = self._find_expired_evidence(steps)
        if len(expired) > 0:
            score -= min(len(expired) * 5, 20)
            risk_factors.append(f"{len(expired)} expired evidence records")
        
        score = max(0, min(100, score))
        
        return {
            "score": score,
            "level": self._risk_level(score),
            "factors": risk_factors
        }
    
    def _risk_level(self, score: int) -> str:
        if score >= 80:
            return "LOW"
        elif score >= 50:
            return "MEDIUM"
        else:
            return "HIGH"
    
    def _generate_recommendations(self, steps: List[Dict], verification_result: Dict[str, Any]) -> List[Dict]:
        recommendations = []
        
        if verification_result.get("overall_status") == "FAIL":
            recommendations.append({
                "severity": "HIGH",
                "title": "Verify trace integrity",
                "description": "The trace failed verification checks. Review the trace artifact and ensure it is complete and unmodified."
            })
        
        drift_events = self._detect_drift(steps)
        for drift in drift_events:
            recommendations.append({
                "severity": "MEDIUM" if drift["type"] == "policy_drift" else "HIGH",
                "title": f"Address {drift['type']}",
                "description": f"{drift['type'].replace('_', ' ').title()} detected at step {drift['step']}: {drift['from']} → {drift['to']}"
            })
        
        expired = self._find_expired_evidence(steps)
        if expired:
            recommendations.append({
                "severity": "MEDIUM",
                "title": "Refresh expired evidence",
                "description": f"{len(expired)} evidence records have expired. Re-attest evidence before execution."
            })
        
        denied_count = sum(1 for s in steps if s.get("gate_state", {}).get("state") == "DENIED")
        if denied_count > 0:
            recommendations.append({
                "severity": "HIGH",
                "title": "Review DENIED actions",
                "description": f"{denied_count} actions were denied. Review the authority trail and reauthorize if appropriate."
            })
        
        return recommendations