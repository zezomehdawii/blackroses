'use client'

import { useState } from 'react'

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedOrg, setSelectedOrg] = useState('all')
  const [showModal, setShowModal] = useState(false)

  const [newUser, setNewUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'viewer',
    organization: 'org1',
    isActive: true
  })

  const users = [
    { id: 1, email: 'admin@company.com', firstName: 'John', lastName: 'Doe', role: 'admin', organization: 'Main Organization', isActive: true, lastLogin: '2025-12-30 14:30', createdAt: '2024-01-15' },
    { id: 2, email: 'ciso@company.com', firstName: 'Jane', lastName: 'Smith', role: 'ciso', organization: 'Main Organization', isActive: true, lastLogin: '2025-12-30 09:15', createdAt: '2024-01-20' },
    { id: 3, email: 'compliance@company.com', firstName: 'Michael', lastName: 'Johnson', role: 'compliance-manager', organization: 'Main Organization', isActive: true, lastLogin: '2025-12-29 16:45', createdAt: '2024-02-10' },
    { id: 4, email: 'auditor@company.com', firstName: 'Sarah', lastName: 'Williams', role: 'auditor', organization: 'Main Organization', isActive: true, lastLogin: '2025-12-28 11:20', createdAt: '2024-03-05' },
    { id: 5, email: 'iam-team@company.com', firstName: 'David', lastName: 'Brown', role: 'compliance-manager', organization: 'Main Organization', isActive: true, lastLogin: '2025-12-30 13:00', createdAt: '2024-04-12' },
    { id: 6, email: 'it-security@company.com', firstName: 'Emily', lastName: 'Davis', role: 'compliance-manager', organization: 'IT Department', isActive: true, lastLogin: '2025-12-30 10:30', createdAt: '2024-05-20' },
    { id: 7, email: 'viewer@company.com', firstName: 'Robert', lastName: 'Miller', role: 'viewer', organization: 'Main Organization', isActive: true, lastLogin: '2025-12-27 15:10', createdAt: '2024-06-01' },
    { id: 8, email: 'old-user@company.com', firstName: 'Lisa', lastName: 'Garcia', role: 'viewer', organization: 'Main Organization', isActive: false, lastLogin: '2025-10-15 09:30', createdAt: '2024-01-10' }
  ]

  const roles = [
    { value: 'admin', label: 'Admin', description: 'Full system access', color: 'bg-red-100 text-red-700' },
    { value: 'ciso', label: 'CISO', description: 'Security oversight', color: 'bg-purple-100 text-purple-700' },
    { value: 'compliance-manager', label: 'Compliance Manager', description: 'Manage compliance', color: 'bg-blue-100 text-blue-700' },
    { value: 'auditor', label: 'Auditor', description: 'Read-only audit access', color: 'bg-green-100 text-green-700' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access', color: 'bg-gray-100 text-gray-700' }
  ]

  const organizations = [
    { id: 'org1', name: 'Main Organization' },
    { id: 'org2', name: 'IT Department' },
    { id: 'org3', name: 'Compliance Team' }
  ]

  const filteredUsers = users.filter(user => {
    const matchSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRole = selectedRole === 'all' || user.role === selectedRole
    const matchOrg = selectedOrg === 'all' || user.organization === selectedOrg
    return matchSearch && matchRole && matchOrg
  })

  const stats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
    admins: users.filter(u => u.role === 'admin').length
  }

  const getRoleBadge = (role: string) => {
    const roleData = roles.find(r => r.value === role)
    if (!roleData) return <span className="text-xs px-2 py-1 rounded bg-gray-100">{role}</span>
    return <span className={`text-xs px-2 py-1 rounded font-medium ${roleData.color}`}>{roleData.label}</span>
  }

  const handleAddUser = () => {
    console.log('New User:', newUser)
    alert(`User ${newUser.email} created successfully!`)
    setShowModal(false)
    setNewUser({ email: '', firstName: '', lastName: '', role: 'viewer', organization: 'org1', isActive: true })
  }

  const handleToggleStatus = (userId: number) => {
    console.log('Toggle user status:', userId)
    alert('User status updated!')
  }

  const handleDeleteUser = (userId: number, email: string) => {
    if (confirm(`Are you sure you want to delete ${email}?`)) {
      console.log('Delete user:', userId)
      alert('User deleted!')
    }
  }

  return (
    <div className="min-h-screen bg-nca-light">
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-sm opacity-90">RBAC-based access control and user administration</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Users</div>
              <div className="text-3xl font-bold text-nca-dark">{stats.total}</div>
            </div>
            <div className="card bg-green-50">
              <div className="text-sm text-gray-600 mb-1">Active</div>
              <div className="text-3xl font-bold text-status-implemented">{stats.active}</div>
            </div>
            <div className="card bg-red-50">
              <div className="text-sm text-gray-600 mb-1">Inactive</div>
              <div className="text-3xl font-bold text-status-not-implemented">{stats.inactive}</div>
            </div>
            <div className="card bg-purple-50">
              <div className="text-sm text-gray-600 mb-1">Admins</div>
              <div className="text-3xl font-bold text-purple-600">{stats.admins}</div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-6">
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="md:col-span-3">
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full px-4 py-2 border rounded-md">
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <select value={selectedOrg} onChange={(e) => setSelectedOrg(e.target.value)} className="w-full px-4 py-2 border rounded-md">
                  <option value="all">All Orgs</option>
                  {organizations.map(org => (
                    <option key={org.id} value={org.name}>{org.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => setShowModal(true)} className="button-primary w-full">+ Add User</button>
              </div>
            </div>
          </div>
        </section>

        {/* Users Table */}
        <section>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Organization</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="font-medium">{user.firstName} {user.lastName}</td>
                      <td className="font-mono text-sm">{user.email}</td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td className="text-sm">{user.organization}</td>
                      <td>
                        {user.isActive ? (
                          <span className="badge-implemented">Active</span>
                        ) : (
                          <span className="badge-not-implemented">Inactive</span>
                        )}
                      </td>
                      <td className="text-sm text-gray-600">{user.lastLogin}</td>
                      <td className="text-sm text-gray-500">{user.createdAt}</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="text-nca-primary hover:underline text-sm">Edit</button>
                          <button onClick={() => handleToggleStatus(user.id)} className="text-gray-600 hover:underline text-sm">
                            {user.isActive ? 'Disable' : 'Enable'}
                          </button>
                          <button onClick={() => handleDeleteUser(user.id, user.email)} className="text-red-600 hover:underline text-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Add User Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-nca-primary">Add New User</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>{role.label} - {role.description}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Organization</label>
                  <select
                    value={newUser.organization}
                    onChange={(e) => setNewUser({...newUser, organization: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    {organizations.map(org => (
                      <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newUser.isActive}
                      onChange={(e) => setNewUser({...newUser, isActive: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button onClick={() => setShowModal(false)} className="px-6 py-2 border rounded-md">Cancel</button>
                <button onClick={handleAddUser} className="button-primary px-8">Create User</button>
              </div>
            </div>
          </div>
        )}
      </main>
