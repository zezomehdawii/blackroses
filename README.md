# BlackRoses

**Enterprise GRC Platform** - Governance, Risk & Compliance Automation with Multi-Framework Support

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)](https://www.docker.com/)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Supported Frameworks](#supported-frameworks)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [License](#license)

---

## Overview

BlackRoses is a production-ready, enterprise-grade GRC (Governance, Risk & Compliance) platform designed to automate compliance monitoring, risk management, and governance workflows across multiple regulatory frameworks.

### What Makes BlackRoses Different?

✅ **Multi-Framework Support** - CIS, NIST, ISO 27001, GDPR, PCI-DSS, HIPAA, SOC 2, NCA (Saudi Arabia), and 40+ more
✅ **Real-Time Compliance** - KSQL-powered 3-state decision engine (Implemented/Partially/Not Implemented)
✅ **Dual Evidence System** - Automated scan results + manual evidence uploads
✅ **Multi-Level Approvals** - RBAC-based workflow engine
✅ **AI-Powered Documentation** - Ollama integration for policy generation
✅ **Cross-Framework Mapping** - GraphFrames-based control relationship visualization
✅ **Multi-Tenant Architecture** - Organization-level isolation
✅ **Immutable Audit Trail** - Kafka-powered event sourcing (24-month default retention)
✅ **Custom Frameworks** - Admin-created frameworks and controls
✅ **Policy-Control Linking** - Each control enforced by governance policies
✅ **Jurisdiction Auto-Sync** - API-based framework updates from regulatory bodies

---

## ✨ Key Features

### Compliance Management
- 🛡️ **Automated Compliance Detection** - Real-time monitoring across 50+ frameworks
- 📊 **3-State Compliance Engine** - Implemented | Partially Implemented | Not Implemented
- 🔄 **Cross-Framework Mapping** - Map controls between CIS, NIST, ISO, GDPR, etc.
- 🎯 **Dual ID System** - Original framework ID (CIS 1.1) + Internal ID (BR-001)
- 📄 **Gap Analysis** - Identify missing controls and evidence

### Risk Management
- 🚨 **5-Stage Risk Cycle** - Identify → Assess → Mitigate → Monitor → Review
- 🎯 **Risk Register** - Centralized risk tracking with heatmap visualization
- 🔗 **Risk-Control Linkage** - Connect risks to mitigating controls
- 📈 **Impact Analysis** - Assess compliance cascade effects

### Evidence & Approval
- 📋 **Dual Evidence System**
  - Automated: Kafka scan results indexed in Elasticsearch
  - Manual: User uploads to MinIO/S3 with SHA256 integrity
- ✅ **Multi-Level Approvals** - Customizable RBAC workflow
- 🕒 **Approval Queue Dashboard** - Track pending/approved/rejected status
- ⏱️ **SLA Tracking** - Overdue approval notifications

### Governance & Policy
- 📜 **Policy Management** - Create, link, and enforce policies
- 🤖 **AI Policy Generation** - Ollama-powered template creation
- 🔗 **Policy-Control Linking** - Mandatory policy enforcement per control
- 📋 **Template Library** - Pre-built policy templates per framework

---

## 🎯 Supported Frameworks

### Compliance Standards (50+)

| Framework | Full Name | Region |
|-----------|-----------|--------|
| **CIS** | Center for Internet Security | Global |
| **NIST 800-53** | NIST Cybersecurity Framework | USA |
| **ISO 27001** | Information Security Management | Global |
| **GDPR** | General Data Protection Regulation | EU |
| **PCI-DSS** | Payment Card Industry Data Security | Global |
| **HIPAA** | Health Insurance Portability | USA |
| **SOC 2** | Service Organization Control 2 | Global |
| **NCA ECC** | National Cybersecurity Authority | Saudi Arabia |
| **FISMA** | Federal Information Security | USA |
| **COBIT** | Control Objectives for IT | Global |

> **Note**: BlackRoses supports 50+ frameworks. Custom frameworks can be added by admins.

---

## 🏗️ Architecture

### 15 Final Technical Decisions

1. **PostgreSQL** - Primary database (ACID compliance, 50-100M rows capacity)
2. **Apache Kafka** - Event sourcing & immutable audit trail
3. **KSQL** - Real-time 3-state compliance decisions
4. **Elasticsearch** - Fast search (controls, evidence, findings)
5. **FastAPI** - Backend API layer (async, high performance)
6. **Next.js 14** - Frontend with App Router & Server Components
7. **MinIO/S3** - Object storage for evidence files
8. **ElastAlert** - Real-time notifications (email + WebSocket)
9. **GraphFrames** - Control dependency analysis
10. **Ollama** - AI-powered document enhancement
11. **Docker Compose** - Local development & deployment
12. **Multi-Tenant** - Organization-level isolation (orgid)
13. **RBAC** - Role-based access control
14. **Dual ID System** - Framework ID + Internal ID
15. **Audit Retention** - 24 months default (configurable)

---

## 📁 Complete Repository Structure

```
blackroses/
├── frontend/                    # Next.js 14 Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── architecture/     # 15 Final Decisions page
│   │   │   ├── compliance/       # Compliance dashboard
│   │   │   ├── frameworks/       # Framework management
│   │   │   │   ├── builder/      # Custom framework creator
│   │   │   │   └── [frameworkCode]/ # Framework details
│   │   │   ├── controls/         # Control management
│   │   │   │   ├── builder/      # Custom control creator
│   │   │   │   └── [controlId]/  # Control detail + evidence
│   │   │   ├── policies/         # Policy management
│   │   │   ├── approvals/        # Multi-level approval queue
│   │   │   ├── evidence/         # Evidence viewer/uploader
│   │   │   ├── risk/             # 5-stage risk cycle
│   │   │   ├── admin/            # Admin dashboard
│   │   │   │   ├── settings/     # System settings
│   │   │   │   │   ├── retention/  # Audit retention config
│   │   │   │   │   └── integrations/ # API integrations
│   │   │   │   ├── users/        # RBAC user mgmt
│   │   │   │   └── organizations/ # Multi-tenant
│   │   │   └── reports/          # Report generation
│   │   ├── components/           # React components
│   │   │   ├── architecture/
│   │   │   ├── compliance/       # Compliance UI components
│   │   │   ├── frameworks/       # Framework UI components
│   │   │   ├── policies/         # Policy UI components
│   │   │   ├── approvals/        # Approval UI components
│   │   │   ├── evidence/         # Evidence mgmt components
│   │   │   ├── risk/             # Risk mgmt components
│   │   │   └── shared/           # Shared UI components
│   │   ├── hooks/                # React hooks
│   │   ├── lib/                  # Utilities & API client
│   │   ├── store/                # Zustand state management
│   │   └── styles/               # NCA Saudi theme CSS
│   ├── Dockerfile
│   └── package.json
├── backend/                     # FastAPI Application
│   ├── app/
│   │   ├── models/               # SQLAlchemy ORM
│   │   │   ├── framework.py
│   │   │   ├── control.py        # Dual ID system
│   │   │   ├── policy.py
│   │   │   ├── evidence.py
│   │   │   ├── approval.py       # Multi-level workflow
│   │   │   └── risk.py
│   │   ├── api/                  # FastAPI routes
│   │   │   ├── frameworks.py     # Framework CRUD
│   │   │   ├── controls.py       # Control CRUD
│   │   │   ├── policies.py       # Policy CRUD
│   │   │   ├── evidence.py       # Evidence upload/list
│   │   │   ├── approvals.py      # Approval workflow
│   │   │   └── risk.py           # Risk mgmt API
│   │   ├── services/             # Business logic
│   │   │   ├── ollama_service.py # AI doc enhancement
│   │   │   ├── framework_sync.py # Jurisdiction sync
│   │   │   ├── kafka_producer.py # Kafka integration
│   │   │   └── evidence_service.py
│   │   └── main.py               # FastAPI entry point
│   ├── alembic/                 # Database migrations
│   ├── Dockerfile
│   └── requirements.txt
├── infrastructure/              # Supporting services
│   ├── postgres/
│   ├── kafka/
│   ├── ksqldb/
│   ├── elasticsearch/
│   ├── minio/
│   └── ollama/
├── docker-compose.yml           # Multi-service orchestration
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── .env.example
├── README.md
├── ARCHITECTURE.md              # Detailed architecture doc
└── LICENSE
```

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling (NCA Saudi theme)
- **Ant Design** - Enterprise UI components
- **Zustand** - State management
- **TanStack Query** - Data fetching & caching
- **Axios** - HTTP client
- **WebSocket** - Real-time updates from Kafka

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for PostgreSQL
- **Alembic** - Database migrations
- **Pydantic** - Data validation
- **Python 3.11+**

### Infrastructure & Data
- **PostgreSQL 16** - Primary database
- **Apache Kafka** - Event sourcing & audit trail
- **KSQL** - Stream processing for compliance decisions
- **Elasticsearch 8** - Search engine
- **MinIO** - S3-compatible object storage
- **ElastAlert** - Alerting & notifications
- **Ollama** - Local AI (Llama 3, Mistral, CodeLlama)
- **Apache Spark + GraphFrames** - Control dependency analysis

### DevOps
- **Docker** & **Docker Compose** - Containerization
- **GitHub Actions** - CI/CD
- **Nginx** - Reverse proxy (production)

---

## 🚀 Getting Started

### Prerequisites

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
- **Git**
- **8GB RAM minimum** (16GB recommended)
- **10GB free disk space**

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/zezomehdawii/blackroses.git
cd blackroses
```

2. **Create environment file**

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start all services with Docker Compose**

```bash
docker compose up --build
```

4. **Access the application**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432
- **Kafka**: localhost:9092
- **Elasticsearch**: localhost:9200
- **MinIO Console**: http://localhost:9001

### Production Deployment

```bash
docker compose -f docker-compose.prod.yml up -d
```

---

## 📚 Documentation

- **[Architecture Documentation](./ARCHITECTURE.md)** - Complete technical architecture
- **[API Documentation](http://localhost:8000/docs)** - FastAPI interactive docs
- **[Implementation Roadmap](./docs/IMPLEMENTATION_ROADMAP.md)** - 5-week delivery plan

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please see our contributing guidelines.

---

**Built with ❤️ for enterprise GRC teams worldwide**
