from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.database import get_db
from app.models.approval import ApprovalQueue, ApprovalWorkflowStep
from app.dependencies import get_current_user, CurrentUser

router = APIRouter()

@router.get("/", response_model=List[dict])
async def get_approvals(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get approval queue items"""
    query = db.query(ApprovalQueue).filter(ApprovalQueue.org_id == current_user.org_id)
    
    if status in ['pending', 'approved', 'rejected']:
        query = query.filter(ApprovalQueue.status == status)
    
    approvals = query.order_by(ApprovalQueue.requested_date.desc()).all()
    return approvals

@router.get("/{approval_id}", response_model=dict)
async def get_approval(
    approval_id: int,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get approval request by ID"""
    approval = db.query(ApprovalQueue).filter(
        ApprovalQueue.step_id == approval_id,
        ApprovalQueue.org_id == current_user.org_id
    ).first()
    
    if not approval:
        raise HTTPException(status_code=404, detail="Approval request not found")
    
    return approval

@router.post("/{approval_id}/approve", status_code=status.HTTP_200_OK)
async def approve_request(
    approval_id: int,
    comments: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Approve a control status change request"""
    approval = db.query(ApprovalQueue).filter(
        ApprovalQueue.step_id == approval_id,
        ApprovalQueue.org_id == current_user.org_id
    ).first()
    
    if not approval:
        raise HTTPException(status_code=404, detail="Approval request not found")
    
    if approval.status != 'pending':
        raise HTTPException(status_code=400, detail="Request already processed")
    
    # Create workflow step record
    workflow_step = ApprovalWorkflowStep(
        approval_queue_id=approval_id,
        level=approval.current_level,
        approver_role=current_user.role,
        approver_user_id=current_user.user_id,
        decision='approved',
        decision_date=datetime.utcnow(),
        comments=comments
    )
    db.add(workflow_step)
    
    # Check if this is the final level
    if approval.current_level >= approval.max_levels:
        # Final approval - update control status
        approval.status = 'approved'
        approval.approved_by = current_user.user_id
        approval.approval_date = datetime.utcnow()
        approval.comments = comments
        
        # TODO: Update control status in controls table
        # TODO: Send Kafka audit event
        
        message = "Request fully approved - control status updated"
    else:
        # Move to next approval level
        approval.current_level += 1
        
        # TODO: Send notification to next level approver
        
        message = f"Request approved at level {approval.current_level - 1}. Escalated to level {approval.current_level}."
    
    db.commit()
    
    return {
        "message": message,
        "approval_id": approval_id,
        "status": approval.status,
        "current_level": approval.current_level,
        "max_levels": approval.max_levels
    }

@router.post("/{approval_id}/reject", status_code=status.HTTP_200_OK)
async def reject_request(
    approval_id: int,
    comments: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Reject a control status change request"""
    approval = db.query(ApprovalQueue).filter(
        ApprovalQueue.step_id == approval_id,
        ApprovalQueue.org_id == current_user.org_id
    ).first()
    
    if not approval:
        raise HTTPException(status_code=404, detail="Approval request not found")
    
    if approval.status != 'pending':
        raise HTTPException(status_code=400, detail="Request already processed")
    
    if not comments or not comments.strip():
        raise HTTPException(status_code=400, detail="Rejection comments are required")
    
    # Create workflow step record
    workflow_step = ApprovalWorkflowStep(
        approval_queue_id=approval_id,
        level=approval.current_level,
        approver_role=current_user.role,
        approver_user_id=current_user.user_id,
        decision='rejected',
        decision_date=datetime.utcnow(),
        comments=comments
    )
    db.add(workflow_step)
    
    # Mark as rejected
    approval.status = 'rejected'
    approval.approved_by = current_user.user_id
    approval.approval_date = datetime.utcnow()
    approval.comments = comments
    
    # TODO: Send Kafka audit event
    # TODO: Send rejection notification to requester
    
    db.commit()
    
    return {
        "message": "Request rejected",
        "approval_id": approval_id,
        "status": "rejected",
        "rejected_at_level": approval.current_level,
        "comments": comments
    }

@router.get("/{approval_id}/history", response_model=List[dict])
async def get_approval_history(
    approval_id: int,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get approval workflow history"""
    approval = db.query(ApprovalQueue).filter(
        ApprovalQueue.step_id == approval_id,
        ApprovalQueue.org_id == current_user.org_id
    ).first()
    
    if not approval:
        raise HTTPException(status_code=404, detail="Approval request not found")
    
    history = db.query(ApprovalWorkflowStep).filter(
        ApprovalWorkflowStep.approval_queue_id == approval_id
    ).order_by(ApprovalWorkflowStep.level).all()
    
    return history
