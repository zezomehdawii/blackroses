'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CompliancePage() {
  const [selectedFramework, setSelectedFramework] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const frameworks = [
    { code: 'CIS', name: 'CIS Controls', version: 'v8', controlCount: 270 },
    { code: 'NIST', name: 'NIST 800-53', version: 'Rev 5', controlCount: 300 },
    { code: 'ISO27001', name: 'ISO 27001', version: '2022', controlCount: 114 },
    { code: 'GDPR', name: 'GDPR', version: '2018', controlCount: 99 },
    { code: 'PCI-DSS', name: 'PCI-DSS', version: 'v4.0', controlCount: 300 },
    { code: 'HIPAA', name: 'HIPAA', version: '2023', controlCount: 100 },
    { code: 'SOC2', name: 'SOC 2', version: 'Type II', controlCount: 150 },
    { code: 'NCA', name: 'NCA ECC', version: '2023', controlCount: 185 },
  ]

  const controls = [
    { id: 'BR-001', framework: 'CIS', originalId: 'CIS 1.1', title: 'Establish and Maintain Inventory', status: 'implemented', severity: 'critical', lastScan: '2025-12-30' },
    { id: 'BR-002', framework: 'CIS', originalId: 'CIS 1.2', title: 'Address Unauthorized Assets', status: 'partial', severity: 'high', lastScan: '2025-12-30' },
    { id: 'BR-003', framework: 'NIST', originalId: 'AC-2', title: 'Account Management', status: 'implemented', severity: 'critical', lastScan: '2025-12-29' },
    { id: 'BR-004', framework: 'ISO27001', originalId: 'A.9.1', title: 'Access Control Policy', status: 'not-implemented', severity: 'medium', lastScan: '2025-12-28' },
    { id: 'BR-005', framework: 'GDPR', originalId: 'Art. 32', title: 'Security of Processing', status: 'partial', severity: 'high', lastScan: '2025-12-30' },
    { id: 'BR-006', framework: 'PCI-DSS', originalId: 'Req 1', title: 'Install and Maintain Firewall', status: 'implemented', severity: 'critical', lastScan: '2025-12-30' },
    { id: 'BR-007', framework: 'HIPAA', originalId: '164.308(a)(1)', title: 'Security Management Process', status: 'partial', severity: 'high', lastScan: '2025-12-29' },
    { id: 'BR-008', framework: 'SOC2', originalId: 'CC6.1', title: 'Logical Access Controls', status: 'implemented', severity: 'high', lastScan: '2025-12-30' },
    { id: 'BR-009', framework: 'NCA', originalId: 'NCA-CC-1.1', title: 'Asset Management', status: 'not-implemented', severity: 'critical', lastScan: '2025-12-27' },
    { id: 'BR-010', framework: 'CIS', originalId: 'CIS 2.1', title: 'Establish Software Inventory', status: 'implemented', severity: 'high', lastScan: '2025-12-30' },
  ]

  const metrics = {
    totalControls: 1547,
    implemented: 892,
    partial: 423,
    notImplemented: 232,
    complianceScore: 58,
  }

  const filteredControls = controls.filter(control => {
    const matchFramework = selectedFramework === 'all' || control.framework === selectedFramework
    const matchStatus = selectedStatus === 'all' || control.status === selectedStatus
    return matchFramework && matchStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'implemented':
        return <span className="badge-implemented">Implemented</span>
      case 'partial':
        return <span className="badge-partial">Partially Implemented</span>
      case 'not-implemented':
        return <span className="badge-not-implemented">Not Implemented</span>
      default:
        return <span className="badge-pending">Unknown</span>
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 font-bold'
      case 'high':
        return 'text-orange-600 font-semibold'
      case 'medium':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-nca-light">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Compliance Dashboard</h1>
          <p className="text-sm opacity-90">Real-time compliance monitoring across all frameworks</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Metrics Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="card bg-white">
              <div className="text-sm text-gray-600 mb-1">Total Controls</div>
              <div className="text-3xl font-bold text-nca-dark">{metrics.totalControls}</div>
            </div>
            <div className="card bg-green-50">
              <div className="text-sm text-gray-600 mb-1">Implemented</div>
              <div className="text-3xl font-bold text-status-implemented">{metrics.implemented}</div>
              <div className="text-xs text-gray-500 mt-1">{Math.round((metrics.implemented / metrics.totalControls) * 100)}%</div>
            </div>
            <div className="card bg-orange-50">
              <div className="text-sm text-gray-600 mb-1">Partial</div>
              <div className="text-3xl font-bold text-status-partial">{metrics.partial}</div>
              <div className="text-xs text-gray-500 mt-1">{Math.round((metrics.partial / metrics.totalControls) * 100)}%</div>
            </div>
            <div className="card bg-red-50">
              <div className="text-sm text-gray-600 mb-1">Not Implemented</div>
              <div className="text-3xl font-bold text-status-not-implemented">{metrics.notImplemented}</div>
              <div className="text-xs text-gray-500 mt-1">{Math.round((metrics.notImplemented / metrics.totalControls) * 100)}%</div>
            </div>
            <div className="card bg-nca-primary text-white">
              <div className="text-sm opacity-90 mb-1">Compliance Score</div>
              <div className="text-3xl font-bold">{metrics.complianceScore}%</div>
              <div className="text-xs opacity-75 mt-1">↑ 3% from last week</div>
            </div>
          </div>
        </section>

        {/* Frameworks Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-nca-primary">Active Frameworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {frameworks.map((framework) => (
              <Link 
                key={framework.code} 
                href={`/frameworks/${framework.code}`}
                className="card hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-nca-dark">{framework.code}</h3>
                  <span className="text-xs bg-nca-light-gray px-2 py-1 rounded">{framework.version}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{framework.name}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{framework.controlCount} controls</span>
                  <span className="text-nca-primary font-semibold">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Controls Table */}
        <section>
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-nca-primary">Controls Status</h2>
              <div className="flex gap-4">
                {/* Framework Filter */}
                <select 
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  className="px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                >
                  <option value="all">All Frameworks</option>
                  {frameworks.map(f => (
                    <option key={f.code} value={f.code}>{f.code}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                >
                  <option value="all">All Status</option>
                  <option value="implemented">Implemented</option>
                  <option value="partial">Partial</option>
                  <option value="not-implemented">Not Implemented</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Internal ID</th>
                    <th>Framework</th>
                    <th>Original ID</th>
                    <th>Control Title</th>
                    <th>Status</th>
                    <th>Severity</th>
                    <th>Last Scan</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredControls.map((control) => (
                    <tr key={control.id}>
                      <td className="font-mono text-sm font-semibold">{control.id}</td>
                      <td>
                        <span className="bg-nca-light-gray px-2 py-1 rounded text-xs font-medium">
                          {control.framework}
                        </span>
                      </td>
                      <td className="font-mono text-sm">{control.originalId}</td>
                      <td className="max-w-xs truncate">{control.title}</td>
                      <td>{getStatusBadge(control.status)}</td>
                      <td className={getSeverityColor(control.severity)}>
                        {control.severity.toUpperCase()}
                      </td>
                      <td className="text-sm text-gray-500">{control.lastScan}</td>
                      <td>
                        <Link 
                          href={`/controls/${control.id}`}
                          className="text-nca-primary hover:underline text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredControls.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No controls found matching the selected filters.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
