export default function ArchitecturePage() {
  const decisions = [
    {
      id: 1,
      title: "PostgreSQL",
      description: "Primary database (ACID compliance, 50-100M rows capacity)",
      category: "Database"
    },
    {
      id: 2,
      title: "Apache Kafka",
      description: "Event sourcing & immutable audit trail",
      category: "Message Broker"
    },
    {
      id: 3,
      title: "KSQL",
      description: "Real-time 3-state compliance decisions",
      category: "Stream Processing"
    },
    {
      id: 4,
      title: "Elasticsearch",
      description: "Fast search (controls, evidence, findings)",
      category: "Search Engine"
    },
    {
      id: 5,
      title: "FastAPI",
      description: "Backend API layer (async, high performance)",
      category: "Backend"
    },
    {
      id: 6,
      title: "Next.js 14",
      description: "Frontend with App Router & Server Components",
      category: "Frontend"
    },
    {
      id: 7,
      title: "MinIO/S3",
      description: "Object storage for evidence files",
      category: "Storage"
    },
    {
      id: 8,
      title: "ElastAlert",
      description: "Real-time notifications (email + WebSocket)",
      category: "Alerting"
    },
    {
      id: 9,
      title: "GraphFrames",
      description: "Control dependency analysis",
      category: "Analytics"
    },
    {
      id: 10,
      title: "Ollama",
      description: "AI-powered document enhancement",
      category: "AI/ML"
    },
    {
      id: 11,
      title: "Docker Compose",
      description: "Local development & deployment",
      category: "DevOps"
    },
    {
      id: 12,
      title: "Multi-Tenant",
      description: "Organization-level isolation (orgid)",
      category: "Architecture"
    },
    {
      id: 13,
      title: "RBAC",
      description: "Role-based access control",
      category: "Security"
    },
    {
      id: 14,
      title: "Dual ID System",
      description: "Framework ID + Internal ID",
      category: "Data Model"
    },
    {
      id: 15,
      title: "Audit Retention",
      description: "24 months default (configurable)",
      category: "Compliance"
    }
  ];

  const techStack = [
    { category: "Frontend", items: ["Next.js 14", "TypeScript", "Tailwind CSS", "Ant Design", "Zustand", "TanStack Query"] },
    { category: "Backend", items: ["FastAPI", "SQLAlchemy", "Alembic", "Pydantic", "Python 3.11+"] },
    { category: "Infrastructure", items: ["PostgreSQL 16", "Apache Kafka", "KSQL", "Elasticsearch 8", "MinIO", "Ollama"] },
    { category: "DevOps", items: ["Docker", "Docker Compose", "GitHub Actions", "Nginx"] }
  ];

  return (
    <div className="min-h-screen bg-nca-light">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">BlackRoses Architecture</h1>
          <p className="text-sm opacity-90">15 Final Technical Decisions</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Overview */}
        <section className="mb-12">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4 text-nca-primary">Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              BlackRoses is an enterprise-grade GRC (Governance, Risk & Compliance) platform built on a modern 
              microservices architecture with event-driven design patterns. The platform supports 50+ compliance 
              frameworks and provides real-time monitoring, automated evidence collection, and multi-level approval workflows.
            </p>
          </div>
        </section>

        {/* 15 Final Decisions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-nca-primary">15 Final Technical Decisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decisions.map((decision) => (
              <div key={decision.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-semibold text-nca-secondary">{decision.category}</span>
                  <span className="text-xs bg-nca-light-gray px-2 py-1 rounded">#{decision.id}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-nca-dark">{decision.title}</h3>
                <p className="text-sm text-gray-600">{decision.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-nca-primary">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((stack) => (
              <div key={stack.category} className="card">
                <h3 className="text-xl font-bold mb-4 text-nca-dark">{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <span 
                      key={item} 
                      className="bg-nca-light-gray px-3 py-1 rounded-full text-sm font-medium text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Architecture Diagram */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-nca-primary">System Architecture</h2>
          <div className="card bg-gray-50">
            <div className="overflow-x-auto">
              <pre className="text-xs font-mono text-gray-700 leading-relaxed">
{`┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 14)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │Dashboard │  │Compliance│  │ Controls │  │Approvals │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST + WebSocket
┌────────────────────────┴────────────────────────────────────────┐
│                     Backend (FastAPI)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │Frameworks│  │ Controls │  │ Policies │  │ Evidence │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└─────┬──────────┬──────────┬──────────┬──────────┬──────────────┘
      │          │          │          │          │
┌─────▼──────────▼──────────▼──────────▼──────────▼──────────────┐
│                    PostgreSQL 16                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │Frameworks│  │ Controls │  │ Policies │  │ Evidence │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│              Apache Kafka (Event Stream)                          │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │controls.*.scans  │  │notifications.alerts                    │
│  └──────────────────┘  └──────────────────┘                     │
└────────────┬─────────────────────┬───────────────────────────────┘
             │                     │
┌────────────▼────────┐  ┌────────▼─────────┐
│   KSQL Engine       │  │   ElastAlert     │
│ (3-State Decisions) │  │ (Notifications)  │
└─────────────────────┘  └──────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│              Supporting Services                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │Elasticsearch │  │    MinIO     │  │   Ollama     │          │
│  │  (Search)    │  │  (Evidence)  │  │ (AI Models)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└──────────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </div>
        </section>

        {/* 3-State Compliance Engine */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-nca-primary">3-State Compliance Engine</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card bg-green-50 border-l-4 border-status-implemented">
              <div className="flex items-center mb-2">
                <span className="badge-implemented">Implemented</span>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Policy enforced <strong>AND</strong> control implemented
              </p>
            </div>
            <div className="card bg-orange-50 border-l-4 border-status-partial">
              <div className="flex items-center mb-2">
                <span className="badge-partial">Partially Implemented</span>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                One of policy <strong>OR</strong> control missing
              </p>
            </div>
            <div className="card bg-red-50 border-l-4 border-status-not-implemented">
              <div className="flex items-center mb-2">
                <span className="badge-not-implemented">Not Implemented</span>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Neither policy <strong>NOR</strong> control present
              </p>
            </div>
          </div>
        </section>

        {/* Scalability Targets */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-nca-primary">Scalability Targets</h2>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Target</th>
                    <th>Scale Limit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Frameworks</td>
                    <td>50+</td>
                    <td>No practical limit</td>
                  </tr>
                  <tr>
                    <td>Controls per Framework</td>
                    <td>200-500</td>
                    <td>1,000 per framework</td>
                  </tr>
                  <tr>
                    <td>Total Controls</td>
                    <td>10,000</td>
                    <td>100,000</td>
                  </tr>
                  <tr>
                    <td>Organizations (Multi-Tenant)</td>
                    <td>100</td>
                    <td>1,000</td>
                  </tr>
                  <tr>
                    <td>Evidence Files</td>
                    <td>1M</td>
                    <td>10M</td>
                  </tr>
                  <tr>
                    <td>Kafka Events/Day</td>
                    <td>100K</td>
                    <td>1M</td>
                  </tr>
                  <tr>
                    <td>Concurrent Users</td>
                    <td>500</td>
                    <td>5,000</td>
                  </tr>
                  <tr>
                    <td>API Response Time</td>
                    <td>&lt;2s</td>
                    <td>&lt;5s at peak</td>
                  </tr>
                  <tr>
                    <td>Search Response Time</td>
                    <td>&lt;300ms</td>
                    <td>&lt;1s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
