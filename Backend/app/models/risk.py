from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Risk(Base):
    __tablename__ = "risks"

    risk_id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False, index=True)
    
    risk_title = Column(String(500), nullable=False)
    risk_description = Column(Text)
    category = Column(String(200))  # Data Security, Vulnerability, etc.
    
    # Risk assessment
    likelihood = Column(String(20))  # low, medium, high, critical
    impact = Column(String(20))  # low, medium, high, critical
    risk_score = Column(Float)  # Calculated: likelihood x impact
    
    # Risk status
    status = Column(String(50), default='open', index=True)  # open, mitigating, accepted, closed
    
    # Risk treatment
    treatment_plan = Column(Text)
    owner = Column(String(255))
    due_date = Column(DateTime)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    control_links = relationship("RiskControl", back_populates="risk", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Risk {self.risk_id}: {self.risk_title} (score={self.risk_score})>"


class RiskControl(Base):
    __tablename__ = "risk_controls"

    risk_control_id = Column(Integer, primary_key=True, index=True)
    risk_id = Column(Integer, ForeignKey("risks.risk_id"), nullable=False)
    control_id = Column(Integer, ForeignKey("controls.control_id"), nullable=False)
    mitigation_effectiveness = Column(Float)  # 0.0 - 1.0
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    risk = relationship("Risk", back_populates="control_links")

    def __repr__(self):
        return f"<RiskControl risk={self.risk_id} control={self.control_id}>"
