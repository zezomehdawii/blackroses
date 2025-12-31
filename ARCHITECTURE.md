# BlackRoses Architecture

## Overview

BlackRoses is an enterprise-grade GRC (Governance, Risk & Compliance) platform built on a modern microservices architecture with event-driven design patterns.

## 15 Final Technical Decisions

### 1. PostgreSQL - Primary Database
- **Choice**: PostgreSQL 16
- **Rationale**: ACID compliance, proven scalability up to 50-100M rows
- **Capacity**: Handles 50+ frameworks with 5-10 years of data
- **Migration Path**: Citus for distributed PostgreSQL at Year 3-4 if needed

### 2. Apache Kafka - Event Sourcing & Audit Trail
- **Choice**: Apache Kafka with Confluent Platform
- **Rationale**: Immutable event log, perfect for compliance audit trails
- **Retention**: 24 months default (configurable per organization)
- **Alternative Considered**: Redpanda (future migration path for 10x performance)

### 3. KSQL - Real-Time Compliance Decisions
- **Choice**: KSQL for stream processing
- **Rationale**: Kafka-native, simpler than Apache Flink
- **Decision States**: 3-state system
  - **Implemented**: Policy enforced AND control implemented
  - **Partially Implemented**: One of policy/control missing
  - **Not Implemented**: Neither policy nor control present

### 4. Elasticsearch - Fast Search Engine
- **Choice**: Elasticsearch 8
- **Purpose**: Search controls, evidence, and findings
- **Performance Target**: Sub-300ms search on 1M+ controls
- **Scope**: Search only (not for analytics or dashboarding)

### 5. FastAPI - Backend API Layer
- **Choice**: FastAPI (Python 3.11+)
- **Rationale**: Async support, auto-generated OpenAPI docs, high performance
- **Performance**: Sub-2s API response time target

### 6. Next.js 14 - Frontend Framework
- **Choice**: Next.js 14 with App Router
- **Rationale**: Server Components, built-in SSR, excellent developer experience
- **Features**: Server-side rendering, streaming, and incremental static regeneration

### 7. MinIO/S3 - Object Storage
- **Choice**: MinIO (S3-compatible)
- **Purpose**: Evidence file storage with WORM (Write Once Read Many)
- **Integrity**: SHA256 hashing for file verification
- **Retention**: Configurable per compliance period

### 8. ElastAlert - Real-Time Notifications
- **Choice**: ElastAlert for alerting
- **Integration**: 
  - Email notifications for critical alerts
  - WebSocket push to frontend (notification bell)
  - API webhook for external integrations

### 9. GraphFrames - Control Dependency Analysis
- **Choice**: Apache Spark + GraphFrames
- **Purpose**: Analyze control relationships and dependencies
- **Use Cases**:
  - Find prerequisite control chains
  - Compliance impact analysis (cascade effects)
  - Critical path identification via PageRank

### 10. Ollama - AI-Powered Documentation
- **Choice**: Ollama with local LLMs (Llama 3, Mistral, CodeLlama)
- **Purpose**: 
  - Enhance control descriptions
  - Generate policy templates
  - Create remediation recommendations
- **Privacy**: Runs locally, no data sent to external APIs

### 11. Docker Compose - Local Development
- **Choice**: Docker Compose for dev, Kubernetes for production
- **Rationale**: Simple local setup, production-grade orchestration when needed

### 12. Multi-Tenant Architecture
- **Design**: Organization-level isolation
- **Isolation Method**: `orgid` column in all tables
- **Scope**: Each organization has separate:
  - Control frameworks
  - Policies
  - Evidence files
  - User access (RBAC)

### 13. RBAC - Role-Based Access Control
- **Roles**: Admin, Auditor, Compliance Manager, Viewer
- **Permissions**: Granular per resource type (frameworks, controls, policies, evidence)
- **Implementation**: PostgreSQL-enforced at query level

### 14. Dual ID System
- **Framework ID**: Original identifier (e.g., CIS 1.1, NIST AC-2)
- **Internal ID**: BlackRoses unified ID (e.g., BR-001)
- **Display**: Both IDs shown to users for cross-referencing

### 15. Audit Trail Retention
- **Default**: 24 months
- **Configurable**: 12-84 months (admin setting)
- **Storage**: Immutable Kafka logs (append-only)
- **Compliance Logs**: Separate from application logs

---

## System Architecture Diagram
┌─────────────────────────────────────────────────────────────────┐
│ Frontend (Next.js 14) │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │Dashboard │ │Compliance│ │ Controls │ │Approvals │ │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└────────────────────────┬────────────────────────────────────────┘
│ HTTP/REST + WebSocket
┌────────────────────────┴────────────────────────────────────────┐
│ Backend (FastAPI) │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │FrameworksAPI ControlsAPI │PoliciesAPI│EvidenceAPI│ │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└─────┬──────────┬──────────┬──────────┬──────────┬──────────────┘
│ │ │ │ │
┌─────▼──────────▼──────────▼──────────▼──────────▼──────────────┐
│ PostgreSQL 16 │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │Frameworks│ │ Controls │ │ Policies │ │ Evidence │ │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Apache Kafka (Event Stream) │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │controls.*.scans │ │notifications.alerts │
│ └──────────────────┘ └──────────────────┘ │
└────────────┬─────────────────────┬───────────────────────────────┘
│ │
┌────────────▼────────┐ ┌────────▼─────────┐
│ KSQL Engine │ │ ElastAlert │
│ (3-State Decisions) │ │ (Notifications) │
└─────────────────────┘ └──────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Supporting Services │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │Elasticsearch │ │ MinIO │ │ Ollama │ │
│ │ (Search) │ │ (Evidence) │ │ (AI Models) │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
└──────────────────────────────────────────────────────────────────┘


---

## Data Flow

### 1. Control Scan Result Processing
Agent Scan → Kafka Topic (controls.windows.scans)
↓
KSQL Stream Processing
↓
3-State Decision Logic
↓
PostgreSQL (control_status)
↓
Frontend (WebSocket Update)

### 2. Evidence Upload Flow
User Upload → FastAPI (evidence API)
↓
SHA256 Hash Calculation
↓
MinIO Storage (WORM)
↓
PostgreSQL (metadata + hash)
↓
Elasticsearch (indexing)

### 3. Multi-Level Approval Workflow

Control Status Change → Approval Queue (PostgreSQL)
↓
Level 1 Approver (Compliance Manager)
↓
Level 2 Approver (CISO)
↓
Kafka Audit Log (immutable)
↓
Status: Approved/Rejected
