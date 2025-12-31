'use client'

import Link from 'next/link'

export default function AdminDashboardPage() {
  const systemStats = {
    totalUsers: 47,
    activeUsers: 42,
    totalOrganizations: 3,
    totalFrameworks: 8,
    totalControls: 1547,
    totalPolicies: 23,
    storageUsed: '145.7 GB',
    storageLimit: '500 GB'
  }

  const recentActivity = [
    { date: '2025-12-30 14:35', user: 'admin@company.com', action: 'Created custom framework "Internal Security"', type: 'framework' },
    { date: '2025-12-30 12:20', user: 'compliance@company.com', action: 'Updated audit retention to 36 months', type: 'settings' },
    { date: '2025-12-29 16:45', user: 'admin@company.com', action: 'Added new user: auditor@company.com', type: 'user' },
    { date: '2025-12-29 11:30', user: 'it-security@company.com', action: 'Enabled Ollama AI integration', type: 'settings' },
    { date: '2025-12-28 09:15', user: 'admin@company.com', action: 'Modified RBAC permissions for Compliance Manager role', type: 'rbac' }
  ]

  const quickActions = [
    { title: 'User Management', description: 'Add, edit, or remove users', icon: '👥', link: '/admin/users', color: 'bg-blue-50' },
    { title: 'System Settings', description: 'Configure retention, integrations', icon: '⚙️', link: '/admin/settings', color: 'bg-purple-50' },
    { title: 'Custom Frameworks', description: 'Create organization frameworks', icon: '📋', link: '/frameworks/builder', color: 'bg-green-50' },
    { title: 'RBAC Configuration', description: 'Manage roles and permissions', icon: '🔐', link: '/admin/rbac', color: 'bg-orange-50' },
    { title: 'Integration Hub', description: 'API keys and webhooks', icon: '🔌', link: '/admin/integrations', color: 'bg-pink-50' },
    { title: 'Audit Logs', description: 'View system audit trail', icon: '📜', link: '/admin/audit', color: 'bg-yellow-50' }
  ]

  return (
    <div className="min-h-screen bg-nca-light">
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm opacity-90">System administration and configuration</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* System Stats */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-nca-primary">System Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Users</div>
              <div className="text-3xl font-bold text-nca-dark">{systemStats.totalUsers}</div>
              <div className="text-xs text-gray-500 mt-1">{systemStats.activeUsers} active</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Organizations</div>
              <div className="text-3xl font-bold text-nca-primary">{systemStats.totalOrganizations}</div>
              <div className="text-xs text-gray-500 mt-1">Multi-tenant</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Frameworks</div>
              <div className="text-3xl font-bold text-nca-dark">{systemStats.totalFrameworks}</div>
              <div className="text-xs text-gray-500 mt-1">{systemStats.totalControls} controls</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Policies</div>
              <div className="text-3xl font-bold text-nca-dark">{systemStats.totalPolicies}</div>
              <div className="text-xs text-gray-500 mt-1">Governance</div>
            </div>
          </div>
        </section>

        {/* Storage Usage */}
        <section className="mb-8">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-nca-primary">Storage Usage</h2>
              <span className="text-sm text-gray-600">{systemStats.storageUsed} / {systemStats.storageLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-nca-primary h-4 rounded-full" style={{ width: '29%' }} />
            </div>
            <div className="text-xs text-gray-500 mt-2">Evidence files and audit logs</div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-nca-primary">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.link} className={`card ${action.color} hover:shadow-lg transition-shadow cursor-pointer`}>
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="text-lg font-bold text-nca-dark mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-nca-primary">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-4 p-3 bg-nca-light-gray rounded">
                  <div className="text-sm text-gray-500 w-36">{activity.date}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-gray-500 mt-1">{activity.user}</div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded h-fit">
                    {activity.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
