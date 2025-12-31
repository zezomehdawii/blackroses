from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class ApprovalQueue(Base):
    __tablename__ = "approval_queue"

    step_id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False, index=True)
    control_id = Column(Integer, ForeignKey("controls.control_id"), nullable=False, index=True)
    
    # Proposed change
    proposed_status = Column(String(50), nullable=False)  # implemented, partial, not-implemented
    
    # Multi-level workflow
    current_level = Column(Integer, default=1)
    max_levels = Column(Integer, default=2)
    
    # Request tracking
    requested_by = Column(Integer, nullable=False)  # user_id
    requested_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    due_date = Column(DateTime)
    
    # Approval status
    status = Column(String(20), default='pending', index=True)  # pending, approved, rejected
    approved_by = Column(Integer)  # user_id
    approval_date = Column(DateTime)
    comments = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    control = relationship("Control", back_populates="approvals")
    workflow_steps = relationship("ApprovalWorkflowStep", back_populates="approval", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<ApprovalQueue step={self.step_id} control={self.control_id} level={self.current_level}/{self.max_levels}>"


class ApprovalWorkflowStep(Base):
    __tablename__ = "approval_workflow_steps"

    workflow_step_id = Column(Integer, primary_key=True, index=True)
    approval_queue_id = Column(Integer, ForeignKey("approval_queue.step_id"), nullable=False)
    
    level = Column(Integer, nullable=False)
    approver_role = Column(String(100))  # compliance-manager, ciso
    approver_user_id = Column(Integer)
    
    decision = Column(String(20))  # approved, rejected
    decision_date = Column(DateTime)
    comments = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    approval = relationship("ApprovalQueue", back_populates="workflow_steps")

    def __repr__(self):
        return f"<ApprovalWorkflowStep level={self.level} decision={self.decision}>"
