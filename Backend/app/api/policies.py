from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.policy import Policy, PolicyControlLink
from app.schemas.policy import PolicyCreate, PolicyUpdate, PolicyResponse, PolicyWithControls, PolicyControlLinkCreate
from app.dependencies import get_current_user, CurrentUser

router = APIRouter()

@router.get("/", response_model=List[PolicyWithControls])
async def get_policies(
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get all policies"""
    query = db.query(Policy).filter(Policy.org_id == current_user.org_id)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Policy.policy_name.ilike(search_term)) |
            (Policy.description.ilike(search_term))
        )
    
    policies = query.all()
    
    # TODO: Add linked_controls count
    return policies

@router.get("/{policy_id}", response_model=PolicyResponse)
async def get_policy(
    policy_id: int,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get policy by ID"""
    policy = db.query(Policy).filter(
        Policy.policy_id == policy_id,
        Policy.org_id == current_user.org_id
    ).first()
    
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    
    return policy

@router.post("/", response_model=PolicyResponse, status_code=status.HTTP_201_CREATED)
async def create_policy(
    policy: PolicyCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Create new governance policy"""
    db_policy = Policy(**policy.dict())
    db.add(db_policy)
    db.commit()
    db.refresh(db_policy)
    
    return db_policy

@router.post("/link", status_code=status.HTTP_201_CREATED)
async def link_policy_to_control(
    link: PolicyControlLinkCreate,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Link policy to control"""
    # Check if link already exists
    existing = db.query(PolicyControlLink).filter(
        PolicyControlLink.policy_id == link.policy_id,
        PolicyControlLink.control_id == link.control_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Policy already linked to this control")
    
    db_link = PolicyControlLink(**link.dict())
    db.add(db_link)
    db.commit()
    
    return {"message": "Policy linked successfully"}

@router.delete("/link/{policy_id}/{control_id}", status_code=status.HTTP_204_NO_CONTENT)
async def unlink_policy_from_control(
    policy_id: int,
    control_id: int,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Unlink policy from control"""
    link = db.query(PolicyControlLink).filter(
        PolicyControlLink.policy_id == policy_id,
        PolicyControlLink.control_id == control_id
    ).first()
    
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    
    db.delete(link)
    db.commit()
    
    return None
