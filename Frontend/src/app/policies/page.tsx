'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PoliciesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const policies = [
    {
      id: 1,
      name: 'Asset Management Policy',
      version: 'v2.1',
      status: 'approved',
      approvedBy: 'CISO',
      approvedDate: '2025-11-15',
      linkedControls: 45,
      frameworks: ['CIS', 'NIST', 'ISO27001'],
      description: 'Comprehensive policy for managing enterprise assets including hardware, software, and data.',
      reviewDate: '2026-11-15',
      owner: 'IT Security Team'
    },
    {
      id: 2,
      name: 'Access Control Policy',
      version: 'v3.0',
      status: 'approved',
      approvedBy: 'CISO',
      approvedDate: '2025-10-20',
      linkedControls: 67,
      frameworks: ['CIS', 'NIST', 'SOC2', 'HIPAA'],
      description: 'Defines requirements for managing user access, authentication, and authorization.',
      reviewDate: '2026-10-20',
      owner: 'Identity & Access Management Team'
    },
    {
      id: 3,
      name: 'Data Protection Policy',
      version: 'v1.5',
      status: 'pending',
      approvedBy: null,
      approvedDate: null,
      linkedControls: 38,
      frameworks: ['GDPR', 'ISO27001', 'HIPAA'],
      description: 'Policy governing the collection, storage, processing, and disposal of sensitive data.',
      reviewDate: '2026-12-01',
      owner: 'Data Privacy Officer'
    },
    {
      id: 4,
      name: 'Incident Response Policy',
      version: 'v2.0',
      status: 'approved',
      approvedBy: 'CISO',
      approvedDate: '2025-09-10',
      linkedControls: 28,
      frameworks: ['NIST', 'ISO27001', 'SOC2'],
      description: 'Procedures for detecting, responding to, and recovering from security incidents.',
      reviewDate: '2026-09-10',
      owner: 'Security Operations Center'
    },
    {
      id: 5,
      name: 'Network Security Policy',
      version: 'v2.3',
      status: 'approved',
      approvedBy: 'CISO',
      approvedDate: '2025-12-01',
      linkedControls: 52,
      frameworks: ['PCI-DSS', 'CIS', 'NIST'],
      description: 'Standards for securing network infrastructure, firewalls, and network segmentation.',
      reviewDate: '2026-12-01',
      owner: 'Network Security Team'
    },
    {
      id: 6,
      name: 'Vendor Management Policy',
      version: 'v1.0',
      status: 'draft',
      approvedBy: null,
      approvedDate: null,
      linkedControls: 0,
      frameworks: ['SOC2', 'ISO27001'],
      description: 'Guidelines for assessing, onboarding, and managing third-party vendors.',
      reviewDate: '2026-01-15',
      owner: 'Procurement Team'
    }
  ]

  const filteredPolicies = policies.filter(policy => {
    const matchSearch = policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       policy.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = selectedStatus === 'all' || policy.status === selectedStatus
    return matchSearch && matchStatus
  })

  const stats = {
    total: policies.length,
    approved: policies.filter(p => p.status === 'approved').length,
    pending: policies.filter(p => p.status === 'pending').length,
    draft: policies.filter(p => p.status === 'draft').length,
    linkedControls: policies.reduce((sum, p) => sum + p.linkedControls, 0)
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'approved': 'badge-implemented',
      'pending': 'badge-partial',
      'draft': 'bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold'
    }
    return <span className={badges[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  }

  return (
    <div className="min-h-screen bg-nca-light">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Policy Management</h1>
          <p className="text-sm opacity-90">Manage governance policies linked to compliance controls</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Policies</div>
              <div className="text-3xl font-bold text-nca-dark">{stats.total}</div>
            </div>
            <div className="card bg-green-50">
              <div className="text-sm text-gray-600 mb-1">Approved</div>
              <div className="text-3xl font-bold text-status-implemented">{stats.approved}</div>
            </div>
            <div className="card bg-orange-50">
              <div className="text-sm text-gray-600 mb-1">Pending</div>
              <div className="text-3xl font-bold text-status-partial">{stats.pending}</div>
            </div>
            <div className="card bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">Drafts</div>
              <div className="text-3xl font-bold text-gray-700">{stats.draft}</div>
            </div>
            <div className="card bg-nca-primary text-white">
              <div className="text-sm opacity-90 mb-1">Linked Controls</div>
              <div className="text-3xl font-bold">{stats.linkedControls}</div>
            </div>
          </div>
        </section>

        {/* Search and Actions */}
        <section className="mb-6">
          <div className="card">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search policies by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
              </select>
              <Link href="/policies/create" className="button-primary whitespace-nowrap">
                + Create Policy
              </Link>
            </div>
          </div>
        </section>

        {/* Policies Grid */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPolicies.map(policy => (
              <div key={policy.id} className="card hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-nca-dark">{policy.name}</h3>
                      <span className="text-xs bg-nca-light-gray px-2 py-1 rounded">{policy.version}</span>
                      {getStatusBadge(policy.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Owner:</span>
                    <span className="ml-2 font-medium">{policy.owner}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Review Date:</span>
                    <span className="ml-2 font-medium">{policy.reviewDate}</span>
                  </div>
                  {policy.approvedDate && (
                    <>
                      <div>
                        <span className="text-gray-500">Approved By:</span>
                        <span className="ml-2 font-medium">{policy.approvedBy}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Approved Date:</span>
                        <span className="ml-2 font-medium">{policy.approvedDate}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Frameworks */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Applicable Frameworks:</div>
                  <div className="flex flex-wrap gap-2">
                    {policy.frameworks.map(fw => (
                      <span key={fw} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Linked Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-nca-gray">
                  <div className="text-sm">
                    <span className="text-gray-500">Linked Controls:</span>
                    <span className="ml-2 font-bold text-nca-primary">{policy.linkedControls}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/policies/${policy.id}`}
                      className="text-nca-primary hover:underline text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link
                      href={`/policies/${policy.id}/edit`}
                      className="text-gray-600 hover:text-nca-primary text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPolicies.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">No policies found matching your criteria.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
