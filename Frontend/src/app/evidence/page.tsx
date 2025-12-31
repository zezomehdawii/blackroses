'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function EvidencePage() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedFramework, setSelectedFramework] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const evidenceFiles = [
    { id: 1, type: 'automated', controlId: 'BR-001', controlTitle: 'Asset Inventory', framework: 'CIS', filename: 'asset_scan_2025-12-30.json', uploadedBy: 'System', uploadedDate: '2025-12-30 08:45:00', size: '2.4 MB', hash: 'sha256:a3f5d8...', status: 'verified', compliancePeriod: 'Q4 2025' },
    { id: 2, type: 'manual', controlId: 'BR-001', controlTitle: 'Asset Inventory', framework: 'CIS', filename: 'cmdb_inventory_report.pdf', uploadedBy: 'admin@company.com', uploadedDate: '2025-12-28 14:20:00', size: '1.8 MB', hash: 'sha256:b7e2c1...', status: 'approved', compliancePeriod: 'Q4 2025' },
    { id: 3, type: 'manual', controlId: 'BR-003', controlTitle: 'Account Management', framework: 'NIST', filename: 'iam_policy_document.docx', uploadedBy: 'iam-team@company.com', uploadedDate: '2025-12-27 10:15:00', size: '456 KB', hash: 'sha256:c9d4e3...', status: 'approved', compliancePeriod: 'Q4 2025' },
    { id: 4, type: 'automated', controlId: 'BR-006', controlTitle: 'Network Security', framework: 'PCI-DSS', filename: 'firewall_config_scan.json', uploadedBy: 'System', uploadedDate: '2025-12-30 09:00:00', size: '3.2 MB', hash: 'sha256:d1f6a5...', status: 'verified', compliancePeriod: 'Q4 2025' },
    { id: 5, type: 'manual', controlId: 'BR-005', controlTitle: 'Security of Processing', framework: 'GDPR', filename: 'encryption_audit_report.pdf', uploadedBy: 'compliance@company.com', uploadedDate: '2025-12-26 16:30:00', size: '2.1 MB', hash: 'sha256:e8a7b2...', status: 'pending', compliancePeriod: 'Q4 2025' },
    { id: 6, type: 'manual', controlId: 'BR-007', controlTitle: 'Security Management', framework: 'HIPAA', filename: 'security_training_records.xlsx', uploadedBy: 'hr@company.com', uploadedDate: '2025-12-25 11:45:00', size: '890 KB', hash: 'sha256:f3b9c4...', status: 'approved', compliancePeriod: 'Q4 2025' },
    { id: 7, type: 'automated', controlId: 'BR-008', controlTitle: 'Access Controls', framework: 'SOC2', filename: 'access_log_analysis.json', uploadedBy: 'System', uploadedDate: '2025-12-30 07:30:00', size: '4.5 MB', hash: 'sha256:a1c5d7...', status: 'verified', compliancePeriod: 'Q4 2025' },
    { id: 8, type: 'manual', controlId: 'BR-009', controlTitle: 'Asset Management Program', framework: 'NCA', filename: 'asset_register_screenshot.png', uploadedBy: 'it-security@company.com', uploadedDate: '2025-12-24 13:00:00', size: '1.2 MB', hash: 'sha256:b8d3e2...', status: 'rejected', compliancePeriod: 'Q4 2025' }
  ]

  const filteredEvidence = evidenceFiles.filter(file => {
    const matchType = selectedType === 'all' || file.type === selectedType
    const matchFramework = selectedFramework === 'all' || file.framework === selectedFramework
    const matchSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       file.controlTitle.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchFramework && matchSearch
  })

  const stats = {
    total: evidenceFiles.length,
    automated: evidenceFiles.filter(f => f.type === 'automated').length,
    manual: evidenceFiles.filter(f => f.type === 'manual').length,
    approved: evidenceFiles.filter(f => f.status === 'approved' || f.status === 'verified').length,
    totalSize: '16.5 MB'
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'verified': 'badge-implemented',
      'approved': 'badge-implemented',
      'pending': 'badge-partial',
      'rejected': 'badge-not-implemented'
    }
    return <span className={badges[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  }

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    const icons: Record<string, string> = {
      'pdf': '📄',
      'json': '{ }',
      'docx': '📝',
      'xlsx': '📊',
      'png': '🖼️',
      'jpg': '🖼️'
    }
    return icons[ext || ''] || '📎'
  }

  return (
    <div className="min-h-screen bg-nca-light">
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Evidence Management</h1>
          <p className="text-sm opacity-90">Dual evidence system: Automated scans + Manual uploads</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Files</div>
              <div className="text-3xl font-bold text-nca-dark">{stats.total}</div>
            </div>
            <div className="card bg-purple-50">
              <div className="text-sm text-gray-600 mb-1">Automated</div>
              <div className="text-3xl font-bold text-purple-600">{stats.automated}</div>
            </div>
            <div className="card bg-blue-50">
              <div className="text-sm text-gray-600 mb-1">Manual</div>
              <div className="text-3xl font-bold text-blue-600">{stats.manual}</div>
            </div>
            <div className="card bg-green-50">
              <div className="text-sm text-gray-600 mb-1">Approved</div>
              <div className="text-3xl font-bold text-status-implemented">{stats.approved}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Size</div>
              <div className="text-2xl font-bold text-nca-primary">{stats.totalSize}</div>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <input
                  type="text"
                  placeholder="Search by filename or control..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-4 py-2 border rounded-md">
                  <option value="all">All Types</option>
                  <option value="automated">Automated</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <select value={selectedFramework} onChange={(e) => setSelectedFramework(e.target.value)} className="w-full px-4 py-2 border rounded-md">
                  <option value="all">All Frameworks</option>
                  <option value="CIS">CIS</option>
                  <option value="NIST">NIST</option>
                  <option value="GDPR">GDPR</option>
                  <option value="PCI-DSS">PCI-DSS</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <Link href="/evidence/upload" className="button-primary w-full text-center">+ Upload Evidence</Link>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>File</th>
                  <th>Control</th>
                  <th>Framework</th>
                  <th>Uploaded By</th>
                  <th>Date</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvidence.map(file => (
                  <tr key={file.id}>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        file.type === 'automated' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {file.type}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getFileIcon(file.filename)}</span>
                        <span className="font-mono text-sm">{file.filename}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div className="font-mono font-semibold text-nca-primary">{file.controlId}</div>
                        <div className="text-xs text-gray-500">{file.controlTitle}</div>
                      </div>
                    </td>
                    <td><span className="bg-nca-light-gray px-2 py-1 rounded text-xs">{file.framework}</span></td>
                    <td className="text-sm">{file.uploadedBy}</td>
                    <td className="text-sm text-gray-600">{file.uploadedDate}</td>
                    <td className="text-sm">{file.size}</td>
                    <td>{getStatusBadge(file.status)}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="text-nca-primary hover:underline text-sm">View</button>
                        <button className="text-gray-600 hover:underline text-sm">Download</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
