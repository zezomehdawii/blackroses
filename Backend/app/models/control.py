from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Control(Base):
    __tablename__ = "controls"

    control_id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False, index=True)
    
    # Dual ID System
    internal_code = Column(String(50), unique=True, nullable=False, index=True)  # BR-001
    original_code = Column(String(100), nullable=False, index=True)  # CIS 1.1
    
    framework_id = Column(Integer, ForeignKey("frameworks.framework_id"), nullable=False)
    group_id = Column(Integer, ForeignKey("control_groups.group_id"))
    
    title = Column(String(500), nullable=False)
    description = Column(Text)
    severity = Column(String(20), index=True)  # critical, high, medium, low
    category = Column(String(200))
    implementation_guidance = Column(Text)
    
    # Environment data requirements
    requires_user_input = Column(Boolean, default=False)
    user_input_description = Column(Text)  # e.g., "Total device count"
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    framework = relationship("Framework", back_populates="controls")
    group = relationship("ControlGroup", back_populates="controls")
    evidences = relationship("EvidenceFile", back_populates="control", cascade="all, delete-orphan")
    policy_links = relationship("PolicyControlLink", back_populates="control", cascade="all, delete-orphan")
    approvals = relationship("ApprovalQueue", back_populates="control", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Control {self.internal_code} ({self.original_code}): {self.title}>"


class ControlGroup(Base):
    __tablename__ = "control_groups"

    group_id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False, index=True)
    framework_id = Column(Integer, ForeignKey("frameworks.framework_id"), nullable=False)
    group_code = Column(String(100), nullable=False)
    group_name = Column(String(255), nullable=False)
    parent_group_id = Column(Integer, ForeignKey("control_groups.group_id"))
    level = Column(Integer, default=1)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    controls = relationship("Control", back_populates="group")
    parent = relationship("ControlGroup", remote_side=[group_id], back_populates="children")
    children = relationship("ControlGroup", back_populates="parent")

    def __repr__(self):
        return f"<ControlGroup {self.group_code}: {self.group_name}>"


class ControlMapping(Base):
    __tablename__ = "control_mappings"

    mapping_id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False, index=True)
    source_control_id = Column(Integer, ForeignKey("controls.control_id"), nullable=False)
    target_control_id = Column(Integer, ForeignKey("controls.control_id"), nullable=False)
    mapping_type = Column(String(50))  # equivalent, related, parent, child
    confidence_score = Column(Float)  # 0.0 - 1.0
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<ControlMapping {self.source_control_id} -> {self.target_control_id}>"
