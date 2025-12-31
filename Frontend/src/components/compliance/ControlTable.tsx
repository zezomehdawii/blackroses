'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Control {
  id: string
  framework: string
  originalId: string
  title: string
  status: 'implemented' | 'partial' | 'not-implemented'
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: string
  evidenceCount: number
  lastScan: string
  policyLinked: boolean
}

interface ControlTableProps {
  controls: Control[]
  onControlClick?: (controlId: string) => void
  showFramework?: boolean
  showEvidence?: boolean
  showPolicy?: boolean
}

export default function ControlTable({ 
  controls, 
  onControlClick,
  showFramework = true,
  showEvidence = true,
  showPolicy = true
}: ControlTableProps) {
  const [sortField, setSortField] = useState<keyof Control>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedControls, setSelectedControls] = useState<string[]>([])

  const handleSort = (field: keyof Control) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedControls = [...controls].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  const handleSelectControl = (controlId: string) => {
    setSelectedControls(prev => 
      prev.includes(controlId) 
        ? prev.filter(id => id !== controlId)
        : [...prev, controlId]
    )
  }

  const handleSelectAll = () => {
    if (selectedControls.length === controls.length) {
      setSelectedControls([])
    } else {
      setSelectedControls(controls.map(c => c.id))
    }
  }

  const getStatusBadge = (status: Control['status']) => {
    const badges = {
      'implemented': 'badge-implemented',
      'partial': 'badge-partial',
      'not-implemented': 'badge-not-implemented'
    }
    const labels = {
      'implemented': 'Implemented',
      'partial': 'Partial',
      'not-implemented': 'Not Implemented'
    }
    return <span className={badges[status]}>{labels[status]}</span>
  }

  const getSeverityColor = (severity: Control['severity']) => {
    const colors = {
      'critical': 'text-red-600 font-bold',
      'high': 'text-orange-600 font-semibold',
      'medium': 'text-yellow-600',
      'low': 'text-gray-600'
    }
    return colors[severity]
  }

  return (
    <div className="overflow-x-auto">
      {/* Bulk Actions */}
      {selectedControls.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
          <span className="text-sm font-medium text-blue-700">
            {selectedControls.length} control(s) selected
          </span>
          <div className="flex gap-2">
            <button className="text-sm px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
              Bulk Export
            </button>
            <button className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">
              Assign Policy
            </button>
            <button 
              onClick={() => setSelectedControls([])}
              className="text-sm px-4 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-12">
              <input
                type="checkbox"
                checked={selectedControls.length === controls.length}
                onChange={handleSelectAll}
                className="w-4 h-4"
              />
            </th>
            <th 
              className="cursor-pointer hover:bg-nca-light-gray"
              onClick={() => handleSort('id')}
            >
              Internal ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            {showFramework && (
              <th 
                className="cursor-pointer hover:bg-nca-light-gray"
                onClick={() => handleSort('framework')}
              >
                Framework {sortField === 'framework' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            <th>Original ID</th>
            <th 
              className="cursor-pointer hover:bg-nca-light-gray"
              onClick={() => handleSort('title')}
            >
              Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th>Category</th>
            <th 
              className="cursor-pointer hover:bg-nca-light-gray"
              onClick={() => handleSort('status')}
            >
              Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="cursor-pointer hover:bg-nca-light-gray"
              onClick={() => handleSort('severity')}
            >
              Severity {sortField === 'severity' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            {showPolicy && <th className="text-center">Policy</th>}
            {showEvidence && <th className="text-center">Evidence</th>}
            <th>Last Scan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedControls.map(control => (
            <tr 
              key={control.id}
              className={`hover:bg-nca-light-gray ${selectedControls.includes(control.id) ? 'bg-blue-50' : ''}`}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedControls.includes(control.id)}
                  onChange={() => handleSelectControl(control.id)}
                  className="w-4 h-4"
                />
              </td>
              <td className="font-mono text-sm font-semibold text-nca-primary">
                {control.id}
              </td>
              {showFramework && (
                <td>
                  <span className="bg-nca-light-gray px-2 py-1 rounded text-xs font-medium">
                    {control.framework}
                  </span>
                </td>
              )}
              <td className="font-mono text-sm">{control.originalId}</td>
              <td className="max-w-xs truncate font-medium">{control.title}</td>
              <td className="text-sm">{control.category}</td>
              <td>{getStatusBadge(control.status)}</td>
              <td className={`${getSeverityColor(control.severity)} uppercase text-xs font-bold`}>
                {control.severity}
              </td>
              {showPolicy && (
                <td className="text-center">
                  {control.policyLinked ? (
                    <span className="text-green-600 text-xl" title="Policy Linked">✓</span>
                  ) : (
                    <span className="text-red-600 text-xl" title="No Policy">✗</span>
                  )}
                </td>
              )}
              {showEvidence && (
                <td className="text-center">
                  <span className={`font-semibold ${control.evidenceCount > 0 ? 'text-nca-primary' : 'text-gray-400'}`}>
                    {control.evidenceCount}
                  </span>
                </td>
              )}
              <td className="text-sm text-gray-600">{control.lastScan}</td>
              <td>
                <Link
                  href={`/controls/${control.id}`}
                  className="text-nca-primary hover:underline text-sm font-medium"
                  onClick={onControlClick ? (e) => { e.preventDefault(); onControlClick(control.id); } : undefined}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {controls.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No controls found.
        </div>
      )}
    </div>
  )
}
