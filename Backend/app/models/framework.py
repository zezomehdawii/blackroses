from sqlalchemy import Column, Integer, String, Boolean, Date, JSON, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Framework(Base):
    __tablename__ = "frameworks"

    framework_id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False, index=True)
    framework_code = Column(String(50), unique=True, nullable=False, index=True)
    framework_name = Column(String(255), nullable=False)
    version = Column(String(50))
    region = Column(String(100))
    description = Column(Text)
    effective_date = Column(Date)
    grouping_strategy = Column(JSON)  # Flexible per-framework grouping
    is_active = Column(Boolean, default=True)
    is_custom = Column(Boolean, default=False)  # User-created framework
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    controls = relationship("Control", back_populates="framework", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Framework {self.framework_code}: {self.framework_name}>"
