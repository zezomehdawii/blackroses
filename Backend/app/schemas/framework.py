from pydantic import BaseModel, Field, validator
from typing import Optional, Any
from datetime import date, datetime

class FrameworkBase(BaseModel):
    framework_code: str = Field(..., min_length=1, max_length=50, description="Unique framework code (e.g., CIS, NIST)")
    framework_name: str = Field(..., min_length=1, max_length=255, description="Full framework name")
    version: Optional[str] = Field(None, max_length=50)
    region: Optional[str] = Field(None, max_length=100, description="Geographic region (Global, USA, EU, etc.)")
    description: Optional[str] = None
    effective_date: Optional[date] = None
    grouping_strategy: Optional[Any] = Field(None, description="Framework-specific grouping configuration (JSON)")

class FrameworkCreate(FrameworkBase):
    org_id: int = Field(..., description="Organization ID")
    is_custom: bool = Field(default=False, description="User-created custom framework")

    @validator('framework_code')
    def validate_code(cls, v):
        if not v.replace('-', '').replace('_', '').isalnum():
            raise ValueError('Framework code must be alphanumeric (with - or _ allowed)')
        return v.upper()

class FrameworkUpdate(BaseModel):
    framework_name: Optional[str] = Field(None, min_length=1, max_length=255)
    version: Optional[str] = Field(None, max_length=50)
    region: Optional[str] = None
    description: Optional[str] = None
    effective_date: Optional[date] = None
    grouping_strategy: Optional[Any] = None
    is_active: Optional[bool] = None

class FrameworkResponse(FrameworkBase):
    framework_id: int
    org_id: int
    is_active: bool
    is_custom: bool
    created_at: datetime
    updated_at: datetime
    control_count: Optional[int] = Field(None, description="Total number of controls")

    class Config:
        from_attributes = True

class FrameworkWithStats(FrameworkResponse):
    implemented: int = 0
    partial: int = 0
    not_implemented: int = 0
    compliance_score: float = 0.0
