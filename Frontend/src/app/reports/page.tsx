'use client'

import { useState } from 'react'

export default function ReportsPage() {
  const [reportType, setReportType] = useState('compliance')
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(['CIS', 'NIST'])
  const [dateRange, setDateRange] = useState({ from: '2025-10-01', to: '2025-12-31' })
  const [format, setFormat] = useState('pdf')
  const [isGenerating, setIsGenerating] = useState(false)

  const reportTemplates = [
    {
      id: 'compliance-summary',
      name: 'Compliance Summary Report',
      category: 'compliance',
      description: 'Executive overview of compliance status across all frameworks',
      icon: '📊',
      estimatedTime: '2-3 min'
    },
    {
      id: 'framework-detailed',
      name: 'Framework Detailed Report',
      category: 'compliance',
      description: 'In-depth analysis of controls, evidence, and gaps per framework',
      icon: '📋',
      estimatedTime: '5-7 min'
    },
    {
      id: 'gap-analysis',
      name: 'Gap Analysis Report',
      category: 'compliance',
      description: 'Identify missing controls and evidence across frameworks',
      icon: '🔍',
      estimatedTime: '3-4 min'
    },
    {
      id: 'risk-register',
      name: 'Risk Register Report',
      category: 'risk',
      description: 'Complete risk inventory with mitigation plans',
      icon: '⚠️',
      estimatedTime: '4-5 min'
    },
    {
      id: 'evidence-audit',
      name: 'Evidence Audit Trail',
      category: 'audit',
      description: 'Complete evidence collection history with SHA256 hashes',
      icon: '📁',
      estimatedTime: '6-8 min'
    },
    {
      id: 'approval-history',
      name: 'Approval Workflow History',
      category: 'audit',
      description: 'Multi-level approval decisions and audit trail',
      icon: '✅',
      estimatedTime: '3-4 min'
    },
    {
      id: 'policy-coverage',
      name: 'Policy Coverage Report',
      category: 'governance',
      description: 'Policy-to-control linkage analysis',
      icon: '📜',
      estimatedTime: '2-3 min'
    },
    {
      id: 'executive-dashboard',
      name: 'Executive Dashboard',
      category: 'executive',
      description: 'High-level metrics and trends for leadership',
      icon: '📈',
      estimatedTime: '1-2 min'
    },
    {
      id: 'control-effectiveness',
      name: 'Control Effectiveness Report',
      category: 'compliance',
      description: 'Measure control implementation effectiveness over time',
      icon: '📉',
      estimatedTime: '5-6 min'
    },
    {
      id: 'vendor-compliance',
      name: 'Vendor Compliance Report',
      category: 'risk',
      description: 'Third-party vendor compliance status',
      icon: '🤝',
      estimatedTime: '4-5 min'
    }
  ]

  const recentReports = [
    { id: 1, name: 'Q4 2025 Compliance Summary', type: 'compliance-summary', generatedBy: 'admin@company.com', generatedDate: '2025-12-30 15:30', format: 'PDF', size: '2.4 MB', status: 'completed' },
    { id: 2, name: 'CIS Controls Gap Analysis', type: 'gap-analysis', generatedBy: 'compliance@company.com', generatedDate: '2025-12-28 11:20', format: 'Excel', size: '1.8 MB', status: 'completed' },
    { id: 3, name: 'Risk Register December', type: 'risk-register', generatedBy: 'ciso@company.com', generatedDate: '2025-12-27 09:45', format: 'PDF', size: '3.1 MB', status: 'completed' },
    { id: 4, name: 'Evidence Audit Trail Q4', type: 'evidence-audit', generatedBy: 'auditor@company.com', generatedDate: '2025-12-26 14:00', format: 'PDF', size: '5.2 MB', status: 'completed' }
  ]

  const frameworks = [
    { code: 'CIS', name: 'CIS Controls' },
    { code: 'NIST', name: 'NIST 800-53' },
    { code: 'ISO27001', name: 'ISO 27001' },
    { code: 'GDPR', name: 'GDPR' },
    { code: 'PCI-DSS', name: 'PCI-DSS' },
    { code: 'HIPAA', name: 'HIPAA' },
    { code: 'SOC2', name: 'SOC 2' },
    { code: 'NCA', name: 'NCA ECC' }
  ]

  const handleFrameworkToggle = (code: string) => {
    setSelectedFrameworks(prev =>
      prev.includes(code) ? prev.filter(f => f !== code) : [...prev, code]
    )
  }

  const handleGenerateReport = (templateId: string) => {
    setIsGenerating(true)
    console.log('Generating report:', { templateId, selectedFrameworks, dateRange, format })
    setTimeout(() => {
      setIsGenerating(false)
      alert('Report generated successfully!')
    }, 2000)
  }

  const filteredTemplates = reportType === 'all' 
    ? reportTemplates 
    : reportTemplates.filter(t => t.category === reportType)

  return (
    <div className="min-h-screen bg-nca-light">
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Reports & Export</h1>
          <p className="text-sm opacity-90">Generate compliance reports and export data</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Report Configuration */}
        <section className="mb-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-6 text-nca-primary">Report Configuration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                    className="px-4 py-2 border rounded-md"
                  />
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                    className="px-4 py-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Export Format */}
              <div>
                <label className="block text-sm font-medium mb-2">Export Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV (Data Only)</option>
                  <option value="json">JSON (Machine Readable)</option>
                </select>
              </div>

              {/* Frameworks Selection */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Include Frameworks</label>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map(fw => (
                    <button
                      key={fw.code}
                      onClick={() => handleFrameworkToggle(fw.code)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                        selectedFrameworks.includes(fw.code)
                          ? 'bg-nca-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {fw.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Categories */}
        <section className="mb-6">
          <div className="card">
            <div className="flex gap-4 overflow-x-auto">
              {['all', 'compliance', 'risk', 'audit', 'governance', 'executive'].map(category => (
                <button
                  key={category}
                  onClick={() => setReportType(category)}
                  className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
                    reportType === category
                      ? 'bg-nca-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Report Templates */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-nca-primary">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <div key={template.id} className="card hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{template.icon}</div>
                <h3 className="text-lg font-bold text-nca-dark mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-gray-500">Est. time: {template.estimatedTime}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <button
                  onClick={() => handleGenerateReport(template.id)}
                  disabled={isGenerating}
                  className="button-primary w-full"
                >
                  {isGenerating ? 'Generating...' : 'Generate Report'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Reports */}
        <section>
          <div className="card">
            <h2 className="text-xl font-bold mb-6 text-nca-primary">Recent Reports</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Type</th>
                    <th>Generated By</th>
                    <th>Date</th>
                    <th>Format</th>
                    <th>Size</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map(report => (
                    <tr key={report.id}>
                      <td className="font-medium">{report.name}</td>
                      <td className="text-sm">{report.type}</td>
                      <td className="text-sm">{report.generatedBy}</td>
                      <td className="text-sm text-gray-600">{report.generatedDate}</td>
                      <td><span className="bg-nca-light-gray px-2 py-1 rounded text-xs">{report.format}</span></td>
                      <td className="text-sm">{report.size}</td>
                      <td><span className="badge-implemented">{report.status}</span></td>
                      <td>
                        <div className="flex gap-2">
                          <button className="text-nca-primary hover:underline text-sm">Download</button>
                          <button className="text-gray-600 hover:underline text-sm">Share</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
