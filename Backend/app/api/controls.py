from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.control import Control
from app.schemas.control import ControlCreate, ControlUpdate, ControlResponse, ControlWithStatus, ControlStatusUpdate
from app.dependencies import get_current_user, CurrentUser

router = APIRouter()

@router.get("/", response_model=List[ControlWithStatus])
async def get_controls(
    framework: Optional[str] = None,
    status: Optional[str] = None,
    severity: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=1000),
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get all controls with filtering"""
    query = db.query(Control).filter(Control.org_id == current_user.org_id)
    
    if framework:
        query = query.join(Control.framework).filter(Framework.framework_code == framework.upper())
    
    if severity:
        query = query.filter(Control.severity == severity.lower())
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Control.title.ilike(search_term)) |
            (Control.internal_code.ilike(search_term)) |
            (Control.original_code.ilike(search_term))
        )
    
    controls = query.offset(skip).limit(limit).all()
    
    # TODO: Add status, policy_linked, evidence_count from joins
    return controls

@router.get("/{control_id}", response_model=ControlResponse)
async def get_control(
    control_id: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get control by internal ID"""
    control = db.query(Control).filter(
        Control.internal_code == control_id,
        Control.org_id == current_user.org_id
    ).first()
    
    if not control:
        raise HTTPException(status_code=404, detail="Control not found")
    
    return control

@router.post("/", response_model=ControlResponse, status_code=status.HTTP_201_CREATED)
async def create_control(
    control: ControlCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Create a new custom control"""
    # Generate internal code
    last_control = db.query(Control).filter(Control.org_id == current_user.org_id).order_by(Control.control_id.desc()).first()
    next_sequence = (last_control.control_id + 1) if last_control else 1
    internal_code = f"BR-{next_sequence:03d}"
    
    db_control = Control(**control.dict(), internal_code=internal_code)
    db.add(db_control)
    db.commit()
    db.refresh(db_control)
    
    return db_control

@router.patch("/{control_id}/status", response_model=ControlResponse)
async def update_control_status(
    control_id: str,
    status_update: ControlStatusUpdate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Update control implementation status (triggers approval workflow)"""
    control = db.query(Control).filter(
        Control.internal_code == control_id,
        Control.org_id == current_user.org_id
    ).first()
    
    if not control:
        raise HTTPException(status_code=404, detail="Control not found")
    
    if status_update.request_approval:
        # TODO: Create approval request in approval_queue
        pass
    
    return control

@router.delete("/{control_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_control(
    control_id: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Delete control (soft delete)"""
    control = db.query(Control).filter(
        Control.internal_code == control_id,
        Control.org_id == current_user.org_id
    ).first()
    
    if not control:
        raise HTTPException(status_code=404, detail="Control not found")
    
    control.is_active = False
    db.commit()
    
    return None
