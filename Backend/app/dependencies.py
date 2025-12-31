from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

from app.database import get_db
from app.config import settings

# Security scheme
security = HTTPBearer()

# Mock user model (replace with actual model import)
class CurrentUser:
    def __init__(self, user_id: int, email: str, role: str, org_id: int):
        self.user_id = user_id
        self.email = email
        self.role = role
        self.org_id = org_id

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict:
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> CurrentUser:
    """
    Get current authenticated user from JWT token.
    Usage: current_user: CurrentUser = Depends(get_current_user)
    """
    token = credentials.credentials
    payload = verify_token(token)
    
    user_id: int = payload.get("sub")
    email: str = payload.get("email")
    role: str = payload.get("role")
    org_id: int = payload.get("org_id")
    
    if user_id is None or email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    # TODO: Fetch user from database
    # user = db.query(User).filter(User.user_id == user_id).first()
    # if not user or not user.is_active:
    #     raise HTTPException(status_code=401, detail="User not found or inactive")
    
    return CurrentUser(user_id=user_id, email=email, role=role, org_id=org_id)

async def get_current_active_user(
    current_user: CurrentUser = Depends(get_current_user)
) -> CurrentUser:
    """Ensure user is active"""
    # In production, check user.is_active from database
    return current_user

def require_role(required_roles: list[str]):
    """
    Dependency to require specific role(s).
    Usage: Depends(require_role(["admin", "ciso"]))
    """
    async def role_checker(current_user: CurrentUser = Depends(get_current_user)):
        if current_user.role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role: {', '.join(required_roles)}"
            )
        return current_user
    return role_checker

def require_org_access(org_id: int):
    """
    Dependency to ensure user has access to specific organization.
    Usage: Depends(require_org_access(org_id))
    """
    async def org_checker(current_user: CurrentUser = Depends(get_current_user)):
        if current_user.org_id != org_id and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied to this organization"
            )
        return current_user
    return org_checker
