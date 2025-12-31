'use client'

import { use, useState } from 'react'
import Link from 'next/link'

export default function ControlDetailPage({ params }: { params: Promise<{ controlId: string }> }) {
  const { controlId } = use(params)
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'mappings' | 'history'>('overview')

  const control = {
    id: controlId,
    framework: 'CIS',
    originalId: 'CIS 1.1',
    title: 'Establish and Maintain Detailed Enterprise Asset Inventory',
    description: 'Actively manage (inventory, track, and correct) all enterprise assets connected to the infrastructure physically, virtually, remotely, and those within cloud environments, to accurately know the totality of assets that need to be monitored and protected.',
    status: 'implemented',
    severity: 'critical',
    category: 'Asset Management',
    implementationGuidance: 'Deploy automated asset inventory tools. Ensure all assets report to central CMDB. Perform quarterly manual verification.',
    lastScan: '2025-12-30 08:45:00',
    nextScan: '2026-01-06 08:45:00',
    policyLinked: true,
    policyName: 'Asset Management Policy v2.1',
    requiresUserInput: true,
    userInputValue: '1,247 devices',
    complianceScore: 98
  }

  const evidence = [
    { id: 1, type: 'automated', filename: 'asset_scan_2025-12-30.json', uploadedBy: 'System', uploadedDate: '2025-12-30', size: '2.4 MB', status: 'verified' },
    { id: 2, type: 'manual', filename: 'asset_inventory_report.pdf', uploadedBy: 'admin@company.com', uploadedDate: '2025-12-28', size: '1.8 MB', status: 'approved' },
    { id: 3, type: 'manual', filename: 'cmdb_screenshot.png', uploadedBy: 'it@company.com', uploadedDate: '2025-12-25', size: '856 KB', status: 'approved' }
  ]

  const mappings = [
    { framework: 'NIST 800-53', controlId: 'CM-8', confidence: 95, type: 'equivalent' },
    { framework: 'ISO 27001', controlId: 'A.8.1.1', confidence: 90, type: 'equivalent' },
    { framework: 'PCI-DSS', controlId: 'Req 2.4', confidence: 85, type: 'related' }
  ]

  const history = [
    { date: '2025-12-30', action: 'Status changed to Implemented', user: 'admin@company.com', details: 'All criteria met after latest scan' },
    { date: '2025-12-28', action: 'Evidence uploaded', user: 'admin@company.com', details: 'Asset inventory report PDF' },
    { date: '2025-12-25', action: 'Approved by CISO', user: 'ciso@company.com', details: 'Control implementation approved' }
  ]

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'implemented': 'badge-implemented',
      'partial': 'badge-partial',
      'not-implemented': 'badge-not-implemented'
    }
    return <span className={badges[status] || 'badge-pending'}>{status.replace('-', ' ')}</span>
  }

  return (
    <div className="min-h-screen bg-nca-light">
      <header className="header">
        <div className="container mx-auto">
          <Link href="/controls" className="text-white hover:underline text-sm mb-2 block">← Back to Controls</Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{control.id}</h1>
            <span className="bg-nca-light-gray text-gray-700 px-3 py-1 rounded text-sm">{control.framework}</span>
            {getStatusBadge(control.status)}
          </div>
          <p className="text-sm opacity-90">{control.originalId} • {control.category}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Compliance Score</div>
              <div className="text-3xl font-bold text-status-implemented">{control.complianceScore}%</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Severity</div>
              <div className="text-2xl font-bold text-red-600 uppercase">{control.severity}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Evidence Files</div>
              <div className="text-3xl font-bold text-nca-primary">{evidence.length}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Policy Linked</div>
              <div className="text-2xl">{control.policyLinked ? '✓' : '✗'}</div>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="card">
            <div className="flex gap-6 border-b">
              {['overview', 'evidence', 'mappings', 'history'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab as any)} className={`pb-4 font-medium ${activeTab === tab ? 'border-b-2 border-nca-primary text-nca-primary' : 'text-gray-600'}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-nca-primary">Control Details</h2>
              <div className="space-y-4">
                <div><div className="text-sm font-medium text-gray-600">Title</div><div className="mt-1 font-medium">{control.title}</div></div>
                <div><div className="text-sm font-medium text-gray-600">Description</div><div className="mt-1 text-gray-700">{control.description}</div></div>
                <div><div className="text-sm font-medium text-gray-600">Implementation Guidance</div><div className="mt-1 text-gray-700">{control.implementationGuidance}</div></div>
                {control.policyLinked && (<div><div className="text-sm font-medium text-gray-600">Linked Policy</div><div className="mt-1"><Link href="/policies/1" className="text-nca-primary hover:underline">{control.policyName}</Link></div></div>)}
              </div>
            </div>
            {control.requiresUserInput && (
              <div className="card bg-blue-50"><h3 className="font-bold mb-2">Environment Data</h3><p className="text-sm text-gray-700">Current Value: <span className="font-semibold">{control.userInputValue}</span></p></div>
            )}
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-nca-primary">Evidence Files ({evidence.length})</h2>
              <Link href={`/evidence/upload?controlId=${controlId}`} className="button-primary">+ Upload Evidence</Link>
            </div>
            <table className="table">
              <thead><tr><th>Type</th><th>Filename</th><th>Uploaded By</th><th>Date</th><th>Size</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {evidence.map(e => (
                  <tr key={e.id}>
                    <td><span className={`text-xs px-2 py-1 rounded ${e.type === 'automated' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{e.type}</span></td>
                    <td className="font-mono text-sm">{e.filename}</td>
                    <td>{e.uploadedBy}</td>
                    <td className="text-sm text-gray-600">{e.uploadedDate}</td>
                    <td className="text-sm">{e.size}</td>
                    <td><span className="badge-implemented">{e.status}</span></td>
                    <td><button className="text-nca-primary hover:underline text-sm
