from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.framework import Framework
from app.schemas.framework import FrameworkCreate, FrameworkUpdate, FrameworkResponse, FrameworkWithStats
from app.dependencies import get_current_user, CurrentUser

router = APIRouter()

@router.get("/", response_model=List[FrameworkResponse])
async def get_frameworks(
    org_id: Optional[int] = None,
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get all frameworks for organization"""
    query = db.query(Framework)
    
    if org_id:
        query = query.filter(Framework.org_id == org_id)
    else:
        query = query.filter(Framework.org_id == current_user.org_id)
    
    if is_active is not None:
        query = query.filter(Framework.is_active == is_active)
    
    frameworks = query.all()
    return frameworks

@router.get("/{framework_code}", response_model=FrameworkWithStats)
async def get_framework(
    framework_code: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get framework by code with statistics"""
    framework = db.query(Framework).filter(
        Framework.framework_code == framework_code.upper(),
        Framework.org_id == current_user.org_id
    ).first()
    
    if not framework:
        raise HTTPException(status_code=404, detail="Framework not found")
    
    # TODO: Calculate stats from controls
    stats = {
        "implemented": 0,
        "partial": 0,
        "not_implemented": 0,
        "compliance_score": 0.0
    }
    
    return {**framework.__dict__, **stats}

@router.post("/", response_model=FrameworkResponse, status_code=status.HTTP_201_CREATED)
async def create_framework(
    framework: FrameworkCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Create a new custom framework"""
    # Check if framework code already exists
    existing = db.query(Framework).filter(Framework.framework_code == framework.framework_code.upper()).first()
    if existing:
        raise HTTPException(status_code=400, detail="Framework code already exists")
    
    db_framework = Framework(**framework.dict())
    db.add(db_framework)
    db.commit()
    db.refresh(db_framework)
    
    return db_framework

@router.put("/{framework_code}", response_model=FrameworkResponse)
async def update_framework(
    framework_code: str,
    framework_update: FrameworkUpdate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Update framework details"""
    framework = db.query(Framework).filter(
        Framework.framework_code == framework_code.upper(),
        Framework.org_id == current_user.org_id
    ).first()
    
    if not framework:
        raise HTTPException(status_code=404, detail="Framework not found")
    
    for key, value in framework_update.dict(exclude_unset=True).items():
        setattr(framework, key, value)
    
    db.commit()
    db.refresh(framework)
    
    return framework

@router.delete("/{framework_code}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_framework(
    framework_code: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Delete framework (soft delete)"""
    framework = db.query(Framework).filter(
        Framework.framework_code == framework_code.upper(),
        Framework.org_id == current_user.org_id
    ).first()
    
    if not framework:
        raise HTTPException(status_code=404, detail="Framework not found")
    
    framework.is_active = False
    db.commit()
    
    return None
