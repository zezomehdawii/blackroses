from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime

class ControlBase(BaseModel):
    original_code: str = Field(..., min_length=1, max_length=100, description="Framework's original control ID")
    title: str = Field(..., min_length=1, max_length=500, description="Control title")
    description: Optional[str] = None
    severity: str = Field(..., description="Control severity level")
    category: Optional[str] = Field(None, max_length=200)
    implementation_guidance: Optional[str] = None
    requires_user_input: bool = Field(default=False, description="Requires environment data input")
    user_input_description: Optional[str] = Field(None, description="Description of required user input")

    @validator('severity')
    def validate_severity(cls, v):
        allowed = ['critical', 'high', 'medium', 'low']
        if v.lower() not in allowed:
            raise ValueError(f'Severity must be one of: {", ".join(allowed)}')
        return v.lower()

class ControlCreate(ControlBase):
    org_id: int
    framework_id: int
    group_id: Optional[int] = None

class ControlUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=500)
    description: Optional[str] = None
    severity: Optional[str] = None
    category: Optional[str] = None
    implementation_guidance: Optional[str] = None
    requires_user_input: Optional[bool] = None
    user_input_description: Optional[str] = None
    is_active: Optional[bool] = None

    @validator('severity')
    def validate_severity(cls, v):
        if v is not None:
            allowed = ['critical', 'high', 'medium', 'low']
            if v.lower() not in allowed:
                raise ValueError(f'Severity must be one of: {", ".join(allowed)}')
            return v.lower()
        return v

class ControlResponse(ControlBase):
    control_id: int
    org_id: int
    internal_code: str = Field(..., description="BlackRoses internal ID (BR-001)")
    framework_id: int
    group_id: Optional[int]
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ControlWithStatus(ControlResponse):
    status: str = Field(..., description="Current implementation status")
    policy_linked: bool = Field(default=False, description="Has linked governance policy")
    evidence_count: int = Field(default=0, description="Number of evidence files")
    last_scan: Optional[datetime] = None

class ControlStatusUpdate(BaseModel):
    status: str = Field(..., description="New status: implemented, partial, not-implemented")
    comments: Optional[str] = None
    request_approval: bool = Field(default=True, description="Send to approval queue")

    @validator('status')
    def validate_status(cls, v):
        allowed = ['implemented', 'partial', 'not-implemented']
        if v not in allowed:
            raise ValueError(f'Status must be one of: {", ".join(allowed)}')
        return v
