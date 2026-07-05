from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class AuthorityContext(BaseModel):
    policy_version: str
    delegation_chain: List[str]
    delegation_depth: int
    observer_identity_hash: Optional[str] = None

class GateState(BaseModel):
    state: str  # ADMISSIBLE, DEGRADED, UNKNOWN, DENIED, RECOVERY
    admissible: bool
    reason_code: Optional[str] = None
    allowed_next_actions: List[str] = []
    blocked_next_actions: List[str] = []

class Step(BaseModel):
    step_index: int
    timestamp: str
    phase: str
    state: str
    admissible: bool
    reason_code: Optional[str] = None
    evidence: Dict[str, Any] = {}
    authority_context: AuthorityContext
    evidence_hash: str
    continuity_hash: str
    gate_state: GateState

class Trace(BaseModel):
    trace_id: str
    generated: str
    workflow: str
    external_bindings: List[Dict[str, Any]] = []
    steps: List[Step]
    gate_consumable_state: Optional[Dict[str, Any]] = None