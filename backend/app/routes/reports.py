from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.services.report_generator import ReportGenerator

router = APIRouter(prefix="/reports", tags=["reports"])

# Shared storage reference
storage = {}

@router.get("/{upload_id}")
async def get_report(upload_id: str):
    if upload_id not in storage:
        raise HTTPException(status_code=404, detail="Trace not found")
    
    data = storage[upload_id]
    
    if data["status"] != "analyzed":
        raise HTTPException(status_code=400, detail="Trace not analyzed yet")
    
    generator = ReportGenerator()
    report = generator.generate(
        data["trace_data"],
        data["verification_result"],
        data["analysis_result"]
    )
    
    return JSONResponse(content=report)