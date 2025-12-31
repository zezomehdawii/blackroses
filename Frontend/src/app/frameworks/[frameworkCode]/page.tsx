'use client'

import { use } from 'react'
import Link from 'next/link'
import { useState } from 'react'

export default function FrameworkDetailPage({ params }: { params: Promise<{ frameworkCode: string }> }) {
  const { frameworkCode } = use(params)
  const [activeTab, setActiveTab] = useState<'overview' | 'controls' | 'mappings' | 'reports'>('overview')

  // Mock data - in real app, fetch from API
  const frameworkData = {
    CIS: {
      code: 'CIS',
      name: 'Center for Internet Security Controls',
      version: 'v8',
      region: 'Global',
      effectiveDate: '2021-05-18',
      lastUpdated: '2024-11-15',
      description: 'The CIS Critical Security Controls are a prioritized set of actions that collectively form a defense-in-depth set of best practices to mitigate the most common cyber attacks.',
      controlCount: 270,
      implemented: 185,
      partial: 52,
      notImplemented: 33,
      categories: [
        { name: 'Basic CIS Controls', controls: 56, implemented: 42 },
        { name: 'Foundational CIS Controls', controls: 94, implemented: 65 },
        { name: 'Organizational CIS Controls', controls: 120, implemented: 78 }
      ],
      recentActivity: [
        { date: '2025-12-30', action: 'Control CIS 1.1 status changed to Implemented', user: 'admin@company.com' },
        { date: '2025-12-29', action: 'Evidence uploaded for CIS 2.3', user: 'compliance@company.com' },
        { date: '2025-12-28', action: 'Control CIS 4.1 approved by CISO', user: 'ciso@company.com' }
      ]
    },
    NIST: {
      code: 'NIST',
      name: 'NIST Cybersecurity Framework 800-53',
      version: 'Rev 5',
      region: 'USA',
      effectiveDate: '2020-09-23',
      lastUpdated: '2024-09-20',
      description: 'Comprehensive security and privacy control catalog for all U.S. federal information systems except those related to national security.',
      controlCount: 300,
      implemented: 198,
      partial: 67,
      notImplemented: 35,
      categories: [
        { name: 'Access Control (AC)', controls: 25, implemented: 18 },
        { name: 'Awareness and Training (AT)', controls: 20, implemented: 15 },
        { name: 'Audit and Accountability (AU)', controls: 30, implemented: 22 },
        { name: 'Security Assessment (CA)', controls: 28, implemented: 20 },
        { name: 'Configuration Management (CM)', controls: 35, implemented: 25 }
      ],
      recentActivity: [
        { date: '2025-12-30', action: 'Control AC-2 evidence reviewed', user: 'auditor@company.com' },
        { date: '2025-12-29', action: 'Control AU-3 status updated', user: 'admin@company.com' }
      ]
    }
  }

  const framework = frameworkData[frameworkCode as keyof typeof frameworkData] || frameworkData.CIS

  const compliancePercentage = Math.round((framework.implemented / framework.controlCount) * 100)

  const sampleControls = [
    { id: 'BR-001', originalId: `${framework.code} 1.1`, title: 'Establish and Maintain Inventory', status: 'implemented', severity: 'critical' },
    { id: 'BR-002', originalId: `${framework.code} 1.2`, title: 'Address Unauthorized Assets', status: 'partial', severity: 'high' },
    { id: 'BR-003', originalId: `${framework.code} 2.1`, title: 'Software Inventory', status: 'implemented', severity: 'high' },
    { id: 'BR-004', originalId: `${framework.code} 2.2`, title: 'Unauthorized Software', status: 'not-implemented', severity: 'medium' },
    { id: 'BR-005', originalId: `${framework.code} 3.1`, title: 'Data Protection', status: 'partial', severity: 'critical' }
  ]

  const mappings = [
    { targetFramework: 'NIST 800-53', mappedControls: 45, confidence: 95 },
    { targetFramework: 'ISO 27001', mappedControls: 38, confidence: 90 },
    { targetFramework: 'PCI-DSS', mappedControls: 52, confidence: 88 },
    { targetFramework: 'SOC 2', mappedControls: 31, confidence: 92 }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'implemented':
        return <span className="badge-implemented">Implemented</span>
      case 'partial':
        return <span className="badge-partial">Partial</span>
      case 'not-implemented':
        return <span className="badge-not-implemented">Not Implemented</span>
      default:
        return <span className="badge-pending">Unknown</span>
    }
  }

  return (
    <div className="min-h-screen bg-nca-light">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/frameworks" className="text-white hover:underline text-sm">
              ← Back to Frameworks
            </Link>
          </div>
          <h1 className="text-3xl font-bold">{framework.name}</h1>
          <p className="text-sm opacity-90">{framework.code} {framework.version} • {framework.region}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Controls</div>
              <div className="text-3xl font-bold text-nca-dark">{framework.controlCount}</div>
            </div>
            <div className="card bg-green-50">
              <div className="text-sm text-gray-600 mb-1">Implemented</div>
              <div className="text-3xl font-bold text-status-implemented">{framework.implemented}</div>
              <div className="text-xs text-gray-500 mt-1">{Math.round((framework.implemented / framework.controlCount) * 100)}%</div>
            </div>
            <div className="card bg-orange-50">
              <div className="text-sm text-gray-600 mb-1">Partial</div>
              <div className="text-3xl font-bold text-status-partial">{framework.partial}</div>
              <div className="text-xs text-gray-500 mt-1">{Math.round((framework.partial / framework.controlCount) * 100)}%</div>
            </div>
            <div className="card bg-nca-primary text-white">
              <div className="text-sm opacity-90 mb-1">Compliance</div>
              <div className="text-3xl font-bold">{compliancePercentage}%</div>
              <div className="text-xs opacity-75 mt-1">Overall Score</div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-6">
          <div className="card">
            <div className="flex gap-6 border-b border-nca-gray">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 font-medium transition ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-nca-primary text-nca-primary'
                    : 'text-gray-600 hover:text-nca-primary'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('controls')}
                className={`pb-4 font-medium transition ${
                  activeTab === 'controls'
                    ? 'border-b-2 border-nca-primary text-nca-primary'
                    : 'text-gray-600 hover:text-nca-primary'
                }`}
              >
                Controls
              </button>
              <button
                onClick={() => setActiveTab('mappings')}
                className={`pb-4 font-medium transition ${
                  activeTab === 'mappings'
                    ? 'border-b-2 border-nca-primary text-nca-primary'
                    : 'text-gray-600 hover:text-nca-primary'
                }`}
              >
                Mappings
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`pb-4 font-medium transition ${
                  activeTab === 'reports'
                    ? 'border-b-2 border-nca-primary text-nca-primary'
                    : 'text-gray-600 hover:text-nca-primary'
                }`}
              >
                Reports
              </button>
            </div>
          </div>
        </section>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Framework Info */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-nca-primary">Framework Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Effective Date</div>
                  <div className="font-medium">{framework.effectiveDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Last Updated</div>
                  <div className="font-medium">{framework.lastUpdated}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-gray-600 mb-1">Description</div>
                  <div className="text-gray-700">{framework.description}</div>
                </div>
              </div>
            </div>

            {/* Categories Breakdown */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-nca-primary">Control Categories</h2>
              <div className="space-y-4">
                {framework.categories.map((category, index) => {
                  const categoryPercentage = Math.round((category.implemented / category.controls) * 100)
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-gray-600">
                          {category.implemented} / {category.controls} ({categoryPercentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-nca-primary h-2 rounded-full transition-all"
                          style={{ width: `${categoryPercentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-nca-primary">Recent Activity</h2>
              <div className="space-y-3">
                {framework.recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-4 p-3 bg-nca-light-gray rounded">
                    <div className="text-sm text-gray-500 w-28">{activity.date}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{activity.action}</div>
                      <div className="text-xs text-gray-500 mt-1">{activity.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'controls' && (
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-nca-primary">Controls</h2>
              <Link
                href={`/controls?framework=${framework.code}`}
                className="text-nca-primary hover:underline font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Internal ID</th>
                    <th>Original ID</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Severity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleControls.map((control) => (
                    <tr key={control.id}>
                      <td className="font-mono text-sm font-semibold">{control.id}</td>
                      <td className="font-mono text-sm">{control.originalId}</td>
                      <td>{control.title}</td>
                      <td>{getStatusBadge(control.status)}</td>
                      <td className="uppercase text-sm font-medium">{control.severity}</td>
                      <td>
                        <Link
                          href={`/controls/${control.id}`}
                          className="text-nca-primary hover:underline text-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'mappings' && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-nca-primary">Cross-Framework Mappings</h2>
            <p className="text-sm text-gray-600 mb-6">
              View how {framework.code} controls map to other compliance frameworks
            </p>
            <div className="space-y-4">
              {mappings.map((mapping, index) => (
                <div key={index} className="border border-nca-gray rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{mapping.targetFramework}</h3>
                      <p className="text-sm text-gray
