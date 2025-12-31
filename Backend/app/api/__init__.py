from fastapi import APIRouter

# Import all routers
from app.api import frameworks, controls, policies, evidence, approvals

__all__ = ["frameworks", "controls", "policies", "evidence", "approvals"]
