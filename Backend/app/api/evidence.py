from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import hashlib
from datetime import datetime

from app.database import get_db
from app.models.evidence import EvidenceFile
from app.dependencies import get_current_user, CurrentUser
from app.config import settings

router = APIRouter()

@router.get("/", response_model=List[dict])
async def get_evidence(
    control_id: Optional[str] = None,
    source: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get evidence files"""
    query = db.query(EvidenceFile).filter(EvidenceFile.org_id == current_user.org_id)
    
    if control_id:
        # TODO: Join with Control to filter by internal_code
        pass
    
    if source in ['automated', 'manual']:
        query = query.filter(EvidenceFile.source == source)
    
    evidence_files = query.all()
    return evidence_files

@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_evidence(
    file: UploadFile = File(...),
    control_id: str = Form(...),
    notes: Optional[str] = Form(None),
    compliance_period: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Upload manual evidence file"""
    # Validate file size
    contents = await file.read()
    if len(contents) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=400, detail="File too large")
    
    # Validate file extension
    file_ext = file.filename.split('.')[-1].lower() if '.' in file.filename else ''
    if file_ext not in settings.ALLOWED_EVIDENCE_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type .{file_ext} not allowed")
    
    # Calculate SHA256 hash
    file_hash = hashlib.sha256(contents).hexdigest()
    
    #
