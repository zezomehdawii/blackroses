from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Policy(Base):
    __tablename__ = "policies"

    policy_id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False, index=True)
    policy_name = Column(String(255), nullable=False)
    version = Column(String(50))
    policy_type = Column(String(100))  # security, privacy, operational
    policy_document = Column(Text)
    
    # Approval tracking
    approved_by = Column(Integer)  # user_id
    approved_date = Column(DateTime)
    
    # Review cycle
    review_cycle_months = Column(Integer, default=12)
    next_review_date = Column(DateTime)
    
    owner = Column(String(255))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    control_links = relationship("PolicyControlLink", back_populates="policy", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Policy {self.policy_name} v{self.version}>"


class PolicyControlLink(Base):
    __tablename__ = "policy_control_links"

    link_id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.policy_id"), nullable=False)
    control_id = Column(Integer, ForeignKey("controls.control_id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    policy = relationship("Policy", back_populates="control_links")
    control = relationship("Control", back_populates="policy_links")

    def __repr__(self):
        return f"<PolicyControlLink policy={self.policy_id} control={self.control_id}>"
