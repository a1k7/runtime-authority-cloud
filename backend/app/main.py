from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import hashlib
import uuid
from datetime import datetime
from typing import Dict, Any, Optional

from app.services.verifier import Verifier
from app.services.analyzer import Analyzer
from app.services.report_generator import ReportGenerator

app = FastAPI(
    title="Runtime Authority Cloud API",
    version="1.0.0",
    description="Verify authority continuity for AI agent execution"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (replace with database in production)
storage = {}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat() + "Z"}

@app.post("/api/upload")
async def upload_trace(file: UploadFile = File(...)):
    try:
        content = await file.read()
        trace_data = json.loads(content)
        upload_id = str(uuid.uuid4())
        file_hash = hashlib.sha256(content).hexdigest()
        
        storage[upload_id] = {
            "trace_data": trace_data,
            "file_hash": file_hash,
            "filename": file.filename,
            "uploaded_at": datetime.utcnow().isoformat() + "Z",
            "status": "uploaded"
        }
        
        return {
            "upload_id": upload_id,
            "status": "success",
            "message": f"Trace {file.filename} uploaded successfully",
            "file_hash": file_hash
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze/{upload_id}")
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

@app.get("/api/report/{upload_id}")
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

@app.get("/api/trace/{upload_id}")
async def get_trace(upload_id: str):
    if upload_id not in storage:
        raise HTTPException(status_code=404, detail="Trace not found")
    
    return JSONResponse(content=storage[upload_id]["trace_data"])