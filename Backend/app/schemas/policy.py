from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime

class PolicyBase(BaseModel):
    policy_name: str = Field(..., min_length=1, max_length=255, description="Policy name")
    version: Optional[str] = Field(None, max_length=50, description="Policy version")
    policy_type: Optional[str] = Field(None, max_length=100, description="Type: security, privacy, operational")
    policy_document: Optional[str] = Field(None, description="Full policy text or markdown")
    owner: Optional[str] = Field(None, max_length=255, description="Policy owner")
    review_cycle_months: int = Field(default=12, ge=1, le=120, description="Review cycle in months")

class PolicyCreate(PolicyBase):
    org_id: int

class PolicyUpdate(BaseModel):
    policy_name: Optional[str] = Field(None, min_length=1, max_length=255)
    version: Optional[str] = None
    policy_type: Optional[str] = None
    policy_document: Optional[str] = None
    owner: Optional[str] = None
    review_cycle_months: Optional[int] = Field(None, ge=1, le=120)
    is_active: Optional[bool] = None

class PolicyResponse(PolicyBase):
    policy_id: int
    org_id: int
    approved_by: Optional[int]
    approved_date: Optional[datetime]
    next_review_date: Optional[datetime]
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PolicyWithControls(PolicyResponse):
    linked_controls: int = Field(default=0, description="Number of linked controls")
    frameworks: List[str] = Field(default=[], description="Associated frameworks")

class PolicyControlLinkCreate(BaseModel):
    policy_id: int
    control_id: int

class PolicyApproval(BaseModel):
    approved_by: int
    comments: Optional[str] = None
