from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "BlackRoses GRC Platform"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    SECRET_KEY: str = "change-this-to-a-secure-random-key-in-production"
    
    # Database
    DATABASE_URL: str = "postgresql://blackroses:blackroses123@postgres:5432/blackroses"
    DB_ECHO: bool = False
    DB_POOL_SIZE: int = 20
    DB_MAX_OVERFLOW: int = 40
    
    # Kafka
    KAFKA_BOOTSTRAP_SERVERS: str = "kafka:29092"
    KAFKA_TOPIC_CONTROLS_SCANS: str = "controls.scans"
    KAFKA_TOPIC_NOTIFICATIONS: str = "notifications.alerts"
    KAFKA_TOPIC_AUDIT: str = "audit.trail"
    
    # Elasticsearch
    ELASTICSEARCH_URL: str = "http://elasticsearch:9200"
    ELASTICSEARCH_INDEX_CONTROLS: str = "compliance-controls"
    ELASTICSEARCH_INDEX_EVIDENCE: str = "compliance-evidence"
    
    # MinIO / S3
    MINIO_ENDPOINT: str = "minio:9000"
    MINIO_ACCESS_KEY: str = "minioadmin"
    MINIO_SECRET_KEY: str = "minioadmin"
    MINIO_BUCKET_NAME: str = "blackroses-evidence"
    MINIO_SECURE: bool = False
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000"
    ]
    
    # JWT
    JWT_SECRET_KEY: str = "jwt-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    
    # Audit Retention
    AUDIT_RETENTION_MONTHS: int = 24
    COMPLIANCE_LOG_RETENTION_MONTHS: int = 84
    
    # Ollama AI
    OLLAMA_BASE_URL: str = "http://ollama:11434"
    OLLAMA_MODEL: str = "llama3"
    OLLAMA_ENABLED: bool = False
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = 50
    MAX_PAGE_SIZE: int = 1000
    
    # File Upload
    MAX_UPLOAD_SIZE: int = 100 * 1024 * 1024  # 100 MB
    ALLOWED_EVIDENCE_EXTENSIONS: List[str] = [
        "pdf", "docx", "xlsx", "txt", "json", 
        "png", "jpg", "jpeg", "zip", "csv"
    ]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
