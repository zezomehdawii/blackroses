'use client'

interface ComplianceStatusProps {
  implemented: number
  partial: number
  notImplemented: number
  total: number
  showPercentages?: boolean
  showChart?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function ComplianceStatus({
  implemented,
  partial,
  notImplemented,
  total,
  showPercentages = true,
  showChart = true,
  size = 'md'
}: ComplianceStatusProps) {
  const implementedPercent = Math.round((implemented / total) * 100)
  const partialPercent = Math.round((partial / total) * 100)
  const notImplementedPercent = Math.round((notImplemented / total) * 100)
  const complianceScore = Math.round(((implemented + (partial * 0.5)) / total) * 100)

  const sizes = {
    sm: { text: 'text-sm', badge: 'text-xs', bar: 'h-2' },
    md: { text: 'text-base', badge: 'text-sm', bar: 'h-3' },
    lg: { text: 'text-lg', badge: 'text-base', bar: 'h-4' }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 50) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="flex justify-between items-center">
        <span className={`${sizes[size].text} font-medium text-gray-700`}>
          Overall Compliance Score
        </span>
        <span className={`${sizes[size].text} font-bold ${getScoreColor(complianceScore)}`}>
          {complianceScore}%
        </span>
      </div>

      {/* Progress Bar */}
      {showChart && (
        <div className="space-y-2">
          <div className={`w-full bg-gray-200 rounded-full ${sizes[size].bar} overflow-hidden flex`}>
            <div
              className="bg-status-implemented"
              style={{ width: `${implementedPercent}%` }}
              title={`Implemented: ${implementedPercent}%`}
            />
            <div
              className="bg-status-partial"
              style={{ width: `${partialPercent}%` }}
              title={`Partial: ${partialPercent}%`}
            />
            <div
              className="bg-status-not-implemented"
              style={{ width: `${notImplementedPercent}%` }}
              title={`Not Implemented: ${notImplementedPercent}%`}
            />
          </div>
        </div>
      )}

      {/* Status Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className={`${sizes[size].text} font-bold text-status-implemented`}>
            {implemented}
          </div>
          <div className={`${sizes[size].badge} text-gray-600`}>
            Implemented
            {showPercentages && ` (${implementedPercent}%)`}
          </div>
        </div>
        <div className="text-center">
          <div className={`${sizes[size].text} font-bold text-status-partial`}>
            {partial}
          </div>
          <div className={`${sizes[size].badge} text-gray-600`}>
            Partial
            {showPercentages && ` (${partialPercent}%)`}
          </div>
        </div>
        <div className="text-center">
          <div className={`${sizes[size].text} font-bold text-status-not-implemented`}>
            {notImplemented}
          </div>
          <div className={`${sizes[size].badge} text-gray-600`}>
            Not Implemented
            {showPercentages && ` (${notImplementedPercent}%)`}
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
        <span className={`${sizes[size].badge} text-gray-600`}>Total Controls</span>
        <span className={`${sizes[size].text} font-bold text-nca-dark`}>{total}</span>
      </div>
    </div>
  )
}
