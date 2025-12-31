'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ControlsPage() {
  const searchParams = useSearchParams()
  const frameworkFilter = searchParams.get('framework') || 'all'
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFramework, setSelectedFramework] = useState(frameworkFilter)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedSeverity, setSelectedSeverity] = useState('all')

  const controls = [
    { id: 'BR-001', framework: 'CIS', originalId: 'CIS 1.1', title: 'Establish and Maintain Detailed Enterprise Asset Inventory', description: 'Maintain an accurate and up-to-date inventory of all enterprise assets.', status: 'implemented', severity: 'critical', category: 'Asset Management', evidenceCount: 12, lastScan: '2025-12-30', policyLinked: true },
    { id: 'BR-002', framework: 'CIS', originalId: 'CIS 1.2', title: 'Address Unauthorized Assets', description: 'Ensure that only authorized assets are given access to the network.', status: 'partial', severity: 'high', category: 'Asset Management', evidenceCount: 5, lastScan: '2025-12-30', policyLinked: true },
    { id: 'BR-003', framework: 'NIST', originalId: 'AC-2', title: 'Account Management', description: 'Manage information system accounts including establishing, activating, modifying.', status: 'implemented', severity: 'critical', category: 'Access Control', evidenceCount: 18, lastScan: '2025-12-29', policyLinked: true },
    { id: 'BR-004', framework: 'ISO27001', originalId: 'A.9.1', title: 'Access Control Policy', description: 'A policy shall be established, documented and reviewed.', status: 'not-implemented', severity: 'medium', category: 'Access Control', evidenceCount: 0, lastScan: '2025-12-28', policyLinked: false },
    { id: 'BR-005', framework: 'GDPR', originalId: 'Art. 32', title: 'Security of Processing', description: 'Implement appropriate technical and organizational measures.', status: 'partial', severity: 'high', category: 'Data Protection', evidenceCount: 8, lastScan: '2025-12-30', policyLinked: true },
    { id: 'BR-006', framework: 'PCI-DSS', originalId: 'Req 1', title: 'Install and Maintain Network Security Controls', description: 'Network security controls protect cardholder data.', status: 'implemented', severity: 'critical', category: 'Network Security', evidenceCount: 22, lastScan: '2025-12-30', policyLinked: true },
    { id: 'BR-007', framework: 'HIPAA', originalId: '164.308(a)(1)', title: 'Security Management Process', description: 'Implement policies to prevent, detect, contain unauthorized access.', status: 'partial', severity: 'high', category: 'Security Management', evidenceCount: 10, lastScan: '2025-12-29', policyLinked: false },
    { id: 'BR-008', framework: 'SOC2', originalId: 'CC6.1', title: 'Logical and Physical Access Controls', description: 'System logical and physical access controls restrict access.', status: 'implemented', severity: 'high', category: 'Access Control', evidenceCount: 15, lastScan: '2025-12-30', policyLinked: true },
    { id: 'BR-009', framework: 'NCA', originalId: 'NCA-CC-1.1', title: 'Asset Management Program', description: 'Establish an asset management program.', status: 'not-implemented', severity: 'critical', category: 'Asset Management', evidenceCount: 0, lastScan: '2025-12-27', policyLinked: false },
    { id: 'BR-010', framework: 'CIS', originalId: 'CIS 2.1', title: 'Establish and Maintain Software Inventory', description: 'Maintain an inventory of authorized software.', status: 'implemented', severity: 'high', category: 'Asset Management', evidenceCount: 14, lastScan: '2025-12-30', policyLinked: true },
    { id: 'BR-011', framework: 'NIST', originalId: 'AC-3', title: 'Access Enforcement', description: 'Enforce approved authorizations for logical access.', status: 'implemented', severity: 'critical', category: 'Access Control', evidenceCount: 20, lastScan: '2025-12-30', policyLinked: true },
    { id: 'BR-012', framework: 'ISO27001', originalId: 'A.9.2', title: 'User Access Management', description: 'Ensure authorized user access and prevent unauthorized access.', status: 'partial', severity: 'high', category: 'Access Control', evidenceCount: 7, lastScan: '2025-12-29', policyLinked: true },
  ]

  const filteredControls = controls.filter(control => {
    const matchSearch = control.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       control.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       control.originalId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchFramework = selectedFramework === 'all' || control.framework === selectedFramework
    const matchStatus = selectedStatus === 'all' || control.status === selectedStatus
    const matchSeverity = selectedSeverity === 'all' || control.severity === selectedSeverity
    return matchSearch && matchFramework && matchStatus && matchSeverity
  })

  const stats = {
    total: controls.length,
    implemented: controls.filter(c => c.status === 'implemented').length,
    partial: controls.filter(c => c.status === 'partial').length,
    notImplemented: controls.filter(c => c.status === 'not-implemented').length,
    critical: controls.filter(c => c.severity === 'critical').length,
  }

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 font-bold'
      case 'high':
        return 'text-orange-600 font-semibold'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-nca-light">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Controls Management</h1>
          <p className="text-sm opacity-90">Manage and monitor all compliance controls across frameworks</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Controls</div>
              <div className="text-3xl font-bold text-nca-dark">{stats.total}</div>
            </div>
            <div className="card bg-green-50">
              <div className="text-sm text-gray-600 mb-1">Implemented</div>
              <div className="text-3xl font-bold text-status-implemented">{stats.implemented}</div>
            </div>
            <div className="card bg-orange-50">
              <div className="text-sm text-gray-600 mb-1">Partial</div>
              <div className="text-3xl font-bold text-status-partial">{stats.partial}</div>
            </div>
            <div className="card bg-red-50">
              <div className="text-sm text-gray-600 mb-1">Not Implemented</div>
              <div className="text-3xl font-bold text-status-not-implemented">{stats.notImplemented}</div>
            </div>
            <div className="card bg-red-100">
              <div className="text-sm text-gray-600 mb-1">Critical Severity</div>
              <div className="text-3xl font-bold text-red-700">{stats.critical}</div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-6">
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search */}
              <div className="md:col-span-4">
                <input
                  type="text"
                  placeholder="Search by ID, title, or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                />
              </div>

              {/* Framework Filter */}
              <div className="md:col-span-2">
                <select
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                >
                  <option value="all">All Frameworks</option>
                  <option value="CIS">CIS</option>
                  <option value="NIST">NIST</option>
                  <option value="ISO27001">ISO 27001</option>
                  <option value="GDPR">GDPR</option>
                  <option value="PCI-DSS">PCI-DSS</option>
                  <option value="HIPAA">HIPAA</option>
                  <option value="SOC2">SOC 2</option>
                  <option value="NCA">NCA</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="md:col-span-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                >
                  <option value="all">All Status</option>
                  <option value="implemented">Implemented</option>
                  <option value="partial">Partial</option>
                  <option value="not-implemented">Not Implemented</option>
                </select>
              </div>

              {/* Severity Filter */}
              <div className="md:col-span-2">
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                >
                  <option value="all">All Severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Add Control Button */}
              <div className="md:col-span-2">
                <Link
                  href="/controls/builder"
                  className="button-primary w-full text-center whitespace-nowrap"
                >
                  + Add Control
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Controls Table */}
        <section>
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-nca-primary">
                Controls ({filteredControls.length})
              </h2>
              <button className="text-nca-primary hover:underline font-medium text-sm">
                Export to CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Internal ID</th>
                    <th>Framework</th>
                    <th>Original ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Severity</th>
                    <th>Policy</th>
                    <th>Evidence</th>
                    <th>Last Scan</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredControls.map((control) => (
                    <tr key={control.id} className="hover:bg-nca-light-gray">
                      <td className="font-mono text-sm font-semibold text-nca-primary">
                        {control.id}
                      </td>
                      <td>
                        <span className="bg-nca-light-gray px-2 py-1 rounded text-xs font-medium">
                          {control.framework}
                        </span>
                      </td>
                      <td className="font-mono text-sm">{control.originalId}</td>
                      <td className="max-w-xs">
                        <div className="truncate font-medium">{control.title}</div>
                        <div className="text-xs text-gray-500 truncate">{control.description}</div>
                      </td>
                      <td className="text-sm">{control.category}</td>
                      <td>{getStatusBadge(control.status)}</td>
                      <td className={`${getSeverityColor(control.severity)} uppercase text-xs font-bold`}>
                        {control.severity}
                      </td>
                      <td className="text-center">
                        {control.policyLinked ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-red-600 text-xl">✗</span>
                        )}
                      </td>
                      <td className="text-center">
                        <span className={`${control.evidenceCount > 0 ? 'text-nca-primary' : 'text-
