'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FrameworksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')

  const frameworks = [
    {
      code: 'CIS',
      name: 'Center for Internet Security Controls',
      version: 'v8',
      region: 'Global',
      controlCount: 270,
      implemented: 185,
      partial: 52,
      notImplemented: 33,
      description: 'Prioritized set of actions to protect organizations and data from known cyber attack vectors.',
      lastUpdated: '2024-11-15',
      status: 'active'
    },
    {
      code: 'NIST',
      name: 'NIST Cybersecurity Framework 800-53',
      version: 'Rev 5',
      region: 'USA',
      controlCount: 300,
      implemented: 198,
      partial: 67,
      notImplemented: 35,
      description: 'Security and privacy controls for information systems and organizations.',
      lastUpdated: '2024-09-20',
      status: 'active'
    },
    {
      code: 'ISO27001',
      name: 'ISO/IEC 27001',
      version: '2022',
      region: 'Global',
      controlCount: 114,
      implemented: 89,
      partial: 18,
      notImplemented: 7,
      description: 'International standard for information security management systems (ISMS).',
      lastUpdated: '2024-10-05',
      status: 'active'
    },
    {
      code: 'GDPR',
      name: 'General Data Protection Regulation',
      version: '2018',
      region: 'EU',
      controlCount: 99,
      implemented: 76,
      partial: 15,
      notImplemented: 8,
      description: 'EU regulation on data protection and privacy in the European Union.',
      lastUpdated: '2024-12-01',
      status: 'active'
    },
    {
      code: 'PCI-DSS',
      name: 'Payment Card Industry Data Security Standard',
      version: 'v4.0',
      region: 'Global',
      controlCount: 300,
      implemented: 212,
      partial: 58,
      notImplemented: 30,
      description: 'Security standards for organizations that handle credit cards.',
      lastUpdated: '2024-11-20',
      status: 'active'
    },
    {
      code: 'HIPAA',
      name: 'Health Insurance Portability and Accountability Act',
      version: '2023',
      region: 'USA',
      controlCount: 100,
      implemented: 72,
      partial: 19,
      notImplemented: 9,
      description: 'US legislation that provides data privacy and security provisions for safeguarding medical information.',
      lastUpdated: '2024-08-15',
      status: 'active'
    },
    {
      code: 'SOC2',
      name: 'Service Organization Control 2',
      version: 'Type II',
      region: 'Global',
      controlCount: 150,
      implemented: 108,
      partial: 28,
      notImplemented: 14,
      description: 'Audit procedure that ensures service providers securely manage data.',
      lastUpdated: '2024-10-30',
      status: 'active'
    },
    {
      code: 'NCA',
      name: 'National Cybersecurity Authority - ECC',
      version: '2023',
      region: 'Saudi Arabia',
      controlCount: 185,
      implemented: 98,
      partial: 54,
      notImplemented: 33,
      description: 'Essential Cybersecurity Controls by Saudi Arabia NCA.',
      lastUpdated: '2024-12-10',
      status: 'active'
    },
    {
      code: 'FISMA',
      name: 'Federal Information Security Management Act',
      version: '2022',
      region: 'USA',
      controlCount: 125,
      implemented: 0,
      partial: 0,
      notImplemented: 125,
      description: 'US legislation that defines framework to protect government information.',
      lastUpdated: '2024-07-20',
      status: 'inactive'
    },
    {
      code: 'COBIT',
      name: 'Control Objectives for Information Technologies',
      version: '2019',
      region: 'Global',
      controlCount: 140,
      implemented: 0,
      partial: 0,
      notImplemented: 140,
      description: 'Framework for the governance and management of enterprise IT.',
      lastUpdated: '2024-06-15',
      status: 'inactive'
    },
  ]

  const filteredFrameworks = frameworks.filter(framework => {
    const matchSearch = framework.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       framework.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRegion = selectedRegion === 'all' || framework.region === selectedRegion
    return matchSearch && matchRegion
  })

  const totalStats = {
    total: frameworks.length,
    active: frameworks.filter(f => f.status === 'active').length,
    totalControls: frameworks.reduce((sum, f) => sum + f.controlCount, 0),
    avgCompliance: Math.round(
      frameworks.reduce((sum, f) => sum + ((f.implemented / f.controlCount) * 100), 0) / frameworks.length
    )
  }

  const getCompliancePercentage = (framework: typeof frameworks[0]) => {
    return Math.round((framework.implemented / framework.controlCount) * 100)
  }

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-status-implemented'
    if (percentage >= 50) return 'text-status-partial'
    return 'text-status-not-implemented'
  }

  return (
    <div className="min-h-screen bg-nca-light">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Compliance Frameworks</h1>
          <p className="text-sm opacity-90">Manage and monitor compliance across 50+ regulatory frameworks</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Summary Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Frameworks</div>
              <div className="text-3xl font-bold text-nca-dark">{totalStats.total}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Active Frameworks</div>
              <div className="text-3xl font-bold text-nca-primary">{totalStats.active}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Controls</div>
              <div className="text-3xl font-bold text-nca-dark">{totalStats.totalControls}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Avg Compliance</div>
              <div className="text-3xl font-bold text-status-implemented">{totalStats.avgCompliance}%</div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-6">
          <div className="card">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search frameworks by name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                />
              </div>

              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
              >
                <option value="all">All Regions</option>
                <option value="Global">Global</option>
                <option value="USA">USA</option>
                <option value="EU">EU</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
              </select>

              {/* Custom Framework Button */}
              <Link
                href="/frameworks/builder"
                className="button-primary whitespace-nowrap"
              >
                + Create Custom Framework
              </Link>
            </div>
          </div>
        </section>

        {/* Frameworks Grid */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredFrameworks.map((framework) => {
              const compliancePercentage = getCompliancePercentage(framework)
              return (
                <div key={framework.code} className="card hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-nca-dark">{framework.code}</h3>
                        <span className="text-xs bg-nca-light-gray px-2 py-1 rounded">
                          {framework.version}
                        </span>
                        {framework.status === 'active' ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded font-medium">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">{framework.name}</p>
                      <p className="text-xs text-gray-500">{framework.description}</p>
                    </div>
                  </div>

                  {/* Region and Last Updated */}
                  <div className="flex gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Region:</span>
                      <span className="ml-2 font-medium">{framework.region}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Updated:</span>
                      <span className="ml-2 font-medium">{framework.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Compliance Stats */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Compliance Status</span>
                      <span className={`text-lg font-bold ${getComplianceColor(compliancePercentage)}`}>
                        {compliancePercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-status-implemented h-2 rounded-full"
                        style={{ width: `${compliancePercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Control Breakdown */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Total</div>
                      <div className="text-lg font-bold text-nca-dark">{framework.controlCount}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Implemented</div>
                      <div className="text-lg font-bold text-status-implemented">{framework.implemented}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Partial</div>
                      <div className="text-lg font-bold text-status-partial">{framework.partial}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Missing</div>
                      <div className="text-lg font-bold text-status-not-implemented">{framework.notImplemented}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/frameworks/${framework.code}`}
                      className="flex-1 text-center button-primary"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/controls?framework=${framework.code}`}
                      className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium transition"
                    >
                      View Controls
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredFrameworks.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">No frameworks found matching your search criteria.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
