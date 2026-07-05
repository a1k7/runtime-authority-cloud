from fastapi import APIRouter, UploadFile, File, HTTPException
import json
import hashlib
import uuid
from datetime import datetime

router = APIRouter(prefix="/upload", tags=["upload"])

# Shared storage reference (would be imported from main)
storage = {}

@router.post("/")
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