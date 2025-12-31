from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.database import engine, Base
from app.api import frameworks, controls, policies, evidence, approvals

# Lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting BlackRoses GRC Platform...")
    print(f"📊 Database: {settings.DATABASE_URL.split('@')[1] if '@' in settings.DATABASE_URL else 'N/A'}")
    print(f"📨 Kafka: {settings.KAFKA_BOOTSTRAP_SERVERS}")
    print(f"🔍 Elasticsearch: {settings.ELASTICSEARCH_URL}")
    
    # Create tables (in production, use Alembic migrations)
    # Base.metadata.create_all(bind=engine)
    
    yield
    
    # Shutdown
    print("🛑 Shutting down BlackRoses GRC Platform...")

# Initialize FastAPI app
app = FastAPI(
    title="BlackRoses GRC API",
    description="Enterprise Governance, Risk & Compliance Platform API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GZip Compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Include routers
app.include_router(frameworks.router, prefix="/api/v1/frameworks", tags=["Frameworks"])
app.include_router(controls.router, prefix="/api/v1/controls", tags=["Controls"])
app.include_router(policies.router, prefix="/api/v1/policies", tags=["Policies"])
app.include_router(evidence.router, prefix="/api/v1/evidence", tags=["Evidence"])
app.include_router(approvals.router, prefix="/api/v1/approvals", tags=["Approvals"])

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "BlackRoses GRC Platform API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "kafka": "connected",
        "elasticsearch": "connected"
    }

# API Info
@app.get("/api/v1/info")
async def api_info():
    return {
        "name": "BlackRoses GRC API",
        "version": "1.0.0",
        "frameworks_supported": ["CIS", "NIST", "ISO27001", "GDPR", "PCI-DSS", "HIPAA", "SOC2", "NCA"],
        "features": [
            "Multi-framework compliance",
            "3-state decision engine",
            "Dual evidence system",
            "Multi-level approvals",
            "Policy-control linking",
            "Real-time monitoring"
        ]
    }
