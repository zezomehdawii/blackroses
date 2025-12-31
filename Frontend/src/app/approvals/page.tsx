'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')

  const approvals = [
    {
      id: 1,
      controlId: 'BR-001',
      controlTitle: 'Establish Asset Inventory',
      framework: 'CIS',
      proposedStatus: 'implemented',
      currentLevel: 1,
      maxLevel: 2,
      severity: 'critical',
      requestedBy: 'admin@company.com',
      requestedDate: '2025-12-30 14:30:00',
      dueDate: '2026-01-02',
      isOverdue: false,
      status: 'pending',
      comments: 'All asset discovery tools deployed and reporting correctly.',
      evidenceCount: 5,
      approvalHistory: []
    },
    {
      id: 2,
      controlId: 'BR-005',
      controlTitle: 'Security of Processing (GDPR Art. 32)',
      framework: 'GDPR',
      proposedStatus: 'partial',
      currentLevel: 1,
      maxLevel: 3,
      severity: 'high',
      requestedBy: 'compliance@company.com',
      requestedDate: '2025-12-29 11:15:00',
      dueDate: '2026-01-05',
      isOverdue: false,
      status: 'pending',
      comments: 'Encryption implemented but access logging needs improvement.',
      evidenceCount: 3,
      approvalHistory: []
    },
    {
      id: 3,
      controlId: 'BR-009',
      controlTitle: 'Asset Management Program',
      framework: 'NCA',
      proposedStatus: 'not-implemented',
      currentLevel: 2,
      maxLevel: 2,
      severity: 'critical',
      requestedBy: 'it-security@company.com',
      requestedDate: '2025-12-28 09:00:00',
      dueDate: '2025-12-31',
      isOverdue: true,
      status: 'pending',
      comments: 'Requires management approval to mark as non-compliant.',
      evidenceCount: 0,
      approvalHistory: [
        { level: 1, approver: 'manager@company.com', decision: 'approved', date: '2025-12-29 16:20:00', comments: 'Escalating to CISO' }
      ]
    },
    {
      id: 4,
      controlId: 'BR-003',
      controlTitle: 'Account Management',
      framework: 'NIST',
      proposedStatus: 'implemented',
      currentLevel: 2,
      maxLevel: 2,
      severity: 'critical',
      requestedBy: 'iam-team@company.com',
      requestedDate: '2025-12-27 13:45:00',
      dueDate: '2025-12-30',
      isOverdue: false,
      status: 'approved',
      comments: 'Full IAM solution deployed with MFA enforced.',
      evidenceCount: 12,
      approvalHistory: [
        { level: 1, approver: 'manager@company.com', decision: 'approved', date: '2025-12-28 10:00:00', comments: 'Looks good' },
        { level: 2, approver: 'ciso@company.com', decision: 'approved', date: '2025-12-29 14:30:00', comments: 'Approved for implementation status' }
      ]
    },
    {
      id: 5,
      controlId: 'BR-007',
      controlTitle: 'Security Management Process',
      framework: 'HIPAA',
      proposedStatus: 'partial',
      currentLevel: 1,
      maxLevel: 2,
      severity: 'high',
      requestedBy: 'healthcare-it@company.com',
      requestedDate: '2025-12-26 15:20:00',
      dueDate: '2025-12-29',
      isOverdue: true,
      status: 'rejected',
      comments: 'Policies documented but not yet fully implemented.',
      evidenceCount: 2,
      approvalHistory: [
        { level: 1, approver: 'manager@company.com', decision: 'rejected', date: '2025-12-27 11:00:00', comments: 'Need more evidence of actual implementation' }
      ]
    }
  ]

  const filteredApprovals = approvals.filter(a => a.status === activeTab)

  const stats = {
    pending: approvals.filter(a => a.status === 'pending').length,
    approved: approvals.filter(a => a.status === 'approved').length,
    rejected: approvals.filter(a => a.status === 'rejected').length,
    overdue: approvals.filter(a => a.isOverdue && a.status === 'pending').length
  }

  const handleApproval = (id: number, decision: 'approved' | 'rejected', comments: string) => {
    console.log(`Approval ${id}: ${decision}`, comments)
    alert(`Request ${decision}!`)
    // In real app: call API to update approval status
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'pending': 'badge-pending',
      'approved': 'badge-implemented',
      'rejected': 'badge-not-implemented'
    }
    return <span className={badges[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  }

  const getProposedStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'implemented': 'badge-implemented',
      'partial': 'badge-partial',
      'not-implemented': 'badge-not-implemented'
    }
    return <span className={badges[status]}>{status.replace('-', ' ')}</span>
  }

  return (
    <div className="min-h-screen bg-nca-light">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Approval Workflow</h1>
          <p className="text-sm opacity-90">Multi-level approval queue for compliance status changes</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card bg-orange-50">
              <div className="text-sm text-gray-600 mb-1">Pending Approval</div>
              <div className="text-3xl font-bold text-status-partial">{stats.pending}</div>
            </div>
            <div className="card bg-green-50">
              <div className="text-sm text-gray-600 mb-1">Approved</div>
              <div className="text-3xl font-bold text-status-implemented">{stats.approved}</div>
            </div>
            <div className="card bg-red-50">
              <div className="text-sm text-gray-600 mb-1">Rejected</div>
              <div className="text-3xl font-bold text-status-not-implemented">{stats.rejected}</div>
            </div>
            <div className="card bg-red-100">
              <div className="text-sm text-gray-600 mb-1">Overdue</div>
              <div className="text-3xl font-bold text-red-700">{stats.overdue}</div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-6">
          <div className="card">
            <div className="flex gap-6 border-b border-nca-gray">
              {(['pending', 'approved', 'rejected'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-medium transition ${
                    activeTab === tab
                      ? 'border-b-2 border-nca-primary text-nca-primary'
                      : 'text-gray-600 hover:text-nca-primary'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({approvals.filter(a => a.status === tab).length})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Approvals List */}
        <section className="space-y-4">
          {filteredApprovals.map(approval => (
            <div key={approval.id} className={`card ${approval.isOverdue ? 'border-l-4 border-red-500' : ''} hover:shadow-lg transition-shadow`}>
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-nca-dark">{approval.controlTitle}</h3>
                    <span className="bg-nca-light-gray px-2 py-1 rounded text-xs font-medium">
                      {approval.framework}
                    </span>
                    {approval.isOverdue && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                        OVERDUE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-nca-primary font-semibold">{approval.controlId}</span>
                    <span className="text-gray-400">→</span>
                    <span>Proposed Status:</span>
                    {getProposedStatusBadge(approval.proposedStatus)}
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(approval.status)}
                  <div className="text-xs text-gray-500 mt-1">
                    Level {approval.currentLevel} of {approval.maxLevel}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Severity:</span>
                  <span className={`ml-2 font-bold uppercase ${
                    approval.severity === 'critical' ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {approval.severity}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Requested By:</span>
                  <span className="ml-2 font-medium">{approval.requestedBy}</span>
                </div>
                <div>
                  <span className="text-gray-500">Due Date:</span>
                  <span className={`ml-2 font-medium ${approval.isOverdue ? 'text-red-600' : ''}`}>
                    {approval.dueDate}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Evidence:</span>
                  <span className="ml-2 font-medium">{approval.evidenceCount} files</span>
                </div>
              </div>

              {/* Comments */}
              <div className="bg-nca-light-gray rounded p-3 mb-4">
                <div className="text-xs text-gray-600 mb-1">Comments:</div>
                <div className="text-sm text-gray-800">{approval.comments}</div>
              </div>

              {/* Approval History */}
              {approval.approvalHistory.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Approval History:</div>
                  <div className="space-y-2">
                    {approval.approvalHistory.map((history, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm bg-white rounded p-2">
                        <div className="font-semibold text-gray-600">L{history.level}:</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{history.approver}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              history.decision === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {history.decision}
                            </span>
                            <span className="text-xs text-gray-500">{history.date}</span>
                          </div>
                          {history.comments && (
                            <div className="text-xs text-gray-600 mt-1">{history.comments}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-nca-gray">
                <Link
                  href={`/controls/${approval.controlId}`}
                  className="text-nca-primary hover:underline text-sm font-medium"
                >
                  View Control Details →
                </Link>
                
                {approval.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const comments = prompt('Approval comments (optional):')
                        if (comments !== null) handleApproval(approval.id, 'approved', comments)
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => {
                        const comments = prompt('Rejection reason (required):')
                        if (comments) handleApproval(approval.id, 'rejected', comments)
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition"
                    >
                      ✗ Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredApprovals.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">No {activeTab} approvals at this time.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
