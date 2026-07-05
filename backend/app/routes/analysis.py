from fastapi import APIRouter, HTTPException
from app.services.verifier import Verifier
from app.services.analyzer import Analyzer
import uuid
from datetime import datetime

router = APIRouter(prefix="/analyze", tags=["analysis"])

# Shared storage reference
storage = {}

@router.post("/{upload_id}")
async def analyze_trace(upload_id: str):
    if upload_id not in storage:
        raise HTTPException(status_code=404, detail="Trace not found")
    
    trace_data = storage[upload_id]["trace_data"]
    
    verifier = Verifier()
    analyzer = Analyzer()
    
    verification_result = verifier.verify(trace_data)
    analysis_result = analyzer.analyze(trace_data, verification_result)
    
    analysis_id = str(uuid.uuid4())
    
    storage[upload_id]["status"] = "analyzed"
    storage[upload_id]["analysis_id"] = analysis_id
    storage[upload_id]["verification_result"] = verification_result
    storage[upload_id]["analysis_result"] = analysis_result
    
    return {
        "analysis_id": analysis_id,
        "status": "success",
        "verification": verification_result,
        "analysis": analysis_result
    }