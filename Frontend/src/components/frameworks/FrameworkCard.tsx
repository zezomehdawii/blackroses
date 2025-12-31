'use client'

import Link from 'next/link'

interface FrameworkCardProps {
  code: string
  name: string
  version: string
  region: string
  controlCount: number
  implemented: number
  partial: number
  notImplemented: number
  description?: string
  lastUpdated?: string
  status?: 'active' | 'inactive'
  onClick?: () => void
}

export default function FrameworkCard({
  code,
  name,
  version,
  region,
  controlCount,
  implemented,
  partial,
  notImplemented,
  description,
  lastUpdated,
  status = 'active',
  onClick
}: FrameworkCardProps) {
  const compliancePercentage = Math.round((implemented / controlCount) * 100)
  
  const getComplianceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-status-implemented'
    if (percentage >= 50) return 'text-status-partial'
    return 'text-status-not-implemented'
  }

  const getComplianceBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-status-implemented'
    if (percentage >= 50) return 'bg-status-partial'
    return 'bg-status-not-implemented'
  }

  return (
    <div 
      className={`card hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-nca-dark">{code}</h3>
            <span className="text-xs bg-nca-light-gray px-2 py-1 rounded">
              {version}
            </span>
            {status === 'active' ? (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                Active
              </span>
            ) : (
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded font-medium">
                Inactive
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">{name}</p>
          {description && (
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          )}
        </div>
      </div>

      {/* Region and Last Updated */}
      <div className="flex gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-500">Region:</span>
          <span className="ml-2 font-medium">{region}</span>
        </div>
        {lastUpdated && (
          <div>
            <span className="text-gray-500">Updated:</span>
            <span className="ml-2 font-medium">{lastUpdated}</span>
          </div>
        )}
      </div>

      {/* Compliance Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Compliance Status</span>
          <span className={`text-lg font-bold ${getComplianceColor(compliancePercentage)}`}>
            {compliancePercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getComplianceBarColor(compliancePercentage)} h-2 rounded-full transition-all`}
            style={{ width: `${compliancePercentage}%` }}
          />
        </div>
      </div>

      {/* Control Breakdown */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Total</div>
          <div className="text-lg font-bold text-nca-dark">{controlCount}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Implemented</div>
          <div className="text-lg font-bold text-status-implemented">{implemented}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Partial</div>
          <div className="text-lg font-bold text-status-partial">{partial}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Missing</div>
          <div className="text-lg font-bold text-status-not-implemented">{notImplemented}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href={`/frameworks/${code}`}
          className="flex-1 text-center button-primary"
          onClick={(e) => onClick && e.stopPropagation()}
        >
          View Details
        </Link>
        <Link
          href={`/controls?framework=${code}`}
          className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium transition"
          onClick={(e) => onClick && e.stopPropagation()}
        >
          View Controls
        </Link>
      </div>
    </div>
  )
}
