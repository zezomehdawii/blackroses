from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, BigInteger
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class EvidenceFile(Base):
    __tablename__ = "evidence_files"

    evidence_id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False, index=True)
    control_id = Column(Integer, ForeignKey("controls.control_id"), nullable=False, index=True)
    
    # File metadata
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)  # MinIO path
    file_hash = Column(String(64), nullable=False)  # SHA256
    file_type = Column(String(100))
    file_size = Column(BigInteger)  # bytes
    
    # Source tracking
    source = Column(String(20), nullable=False)  # 'automated' or 'manual'
    uploaded_by = Column(Integer)  # user_id (null for automated)
    uploaded_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Compliance context
    compliance_period = Column(String(50))  # Q4 2025
    notes = Column(Text)
    
    # Approval status
    status = Column(String(20), default='pending')  # pending, approved, rejected, verified
    reviewed_by = Column(Integer)  # user_id
    reviewed_date = Column(DateTime)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    control = relationship("Control", back_populates="evidences")

    def __repr__(self):
        return f"<EvidenceFile {self.file_name} ({self.source}) for control {self.control_id}>"
