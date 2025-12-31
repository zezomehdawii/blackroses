'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ApprovalRequest {
  id: number
  controlId: string
  controlTitle: string
  framework: string
  proposedStatus: 'implemented' | 'partial' | 'not-implemented'
  currentLevel: number
  maxLevel: number
  severity: 'critical' | 'high' | 'medium' | 'low'
  requestedBy: string
  requestedDate: string
  dueDate: string
  isOverdue: boolean
  comments: string
  evidenceCount: number
}

interface ApprovalPanelProps {
  approval: ApprovalRequest
  onApprove?: (id: number, comments: string) => void
  onReject?: (id: number, comments: string) => void
  showActions?: boolean
  compact?: boolean
}

export default function ApprovalPanel({
  approval,
  onApprove,
  onReject,
  showActions = true,
  compact = false
}: ApprovalPanelProps) {
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve')
  const [comments, setComments] = useState('')

  const getProposedStatusBadge = (status: ApprovalRequest['proposedStatus']) => {
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

  const getSeverityColor = (severity: ApprovalRequest['severity']) => {
    const colors = {
      'critical': 'text-red-600 font-bold',
      'high': 'text-orange-600 font-semibold',
      'medium': 'text-yellow-600',
      'low': 'text-gray-600'
    }
    return colors[severity]
  }

  const handleAction = (type: 'approve' | 'reject') => {
    setActionType(type)
    setShowCommentModal(true)
  }

  const handleConfirmAction = () => {
    if (actionType === 'approve' && onApprove) {
      onApprove(approval.id, comments)
    } else if (actionType === 'reject' && onReject) {
      onReject(approval.id, comments)
    }
    setShowCommentModal(false)
    setComments('')
  }

  if (compact) {
    return (
      <div className={`border rounded-lg p-4 ${approval.isOverdue ? 'border-red-500 bg-red-50' : 'border-nca-gray bg-white'}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Link href={`/controls/${approval.controlId}`} className="font-mono text-sm font-semibold text-nca-primary hover:underline">
                {approval.controlId}
              </Link>
              <span className="text-xs bg-nca-light-gray px-2 py-1 rounded">{approval.framework}</span>
              {approval.isOverdue && (
                <span className="text-xs bg-red-600 text-white px-2 py-1 rounded font-bold">OVERDUE</span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-800 mb-1">{approval.controlTitle}</p>
            <div className="text-xs text-gray-600">
              Proposed: {getProposedStatusBadge(approval.proposedStatus)} • Level {approval.currentLevel}/{approval.maxLevel}
            </div>
          </div>
          {showActions && (
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleAction('approve')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm font-medium"
              >
                ✓
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm font-medium"
              >
                ✗
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`card ${approval.isOverdue ? 'border-l-4 border-red-500' : ''} hover:shadow-lg transition-shadow`}>
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
              <Link href={`/controls/${approval.controlId}`} className="font-mono text-nca-primary font-semibold hover:underline">
                {approval.controlId}
              </Link>
              <span className="text-gray-400">→</span>
              <span>Proposed Status:</span>
              {getProposedStatusBadge(approval.proposedStatus)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Level {approval.currentLevel} of {approval.maxLevel}
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-nca-primary h-2 rounded-full"
                style={{ width: `${(approval.currentLevel / approval.maxLevel) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Severity:</span>
            <span className={`ml-2 uppercase ${getSeverityColor(approval.severity)}`}>
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
          <div className="text-xs text-gray-600 mb-1">Request Comments:</div>
          <div className="text-sm text-gray-800">{approval.comments}</div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-nca-gray">
          <Link
            href={`/controls/${approval.controlId}`}
            className="text-nca-primary hover:underline text-sm font-medium"
          >
            View Control Details →
          </Link>
          
          {showActions && (
            <div className="flex gap-3">
              <button
                onClick={() => handleAction('approve')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition"
              >
                ✗ Reject
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-nca-gray">
              <h3 className="text-xl font-bold text-nca-dark">
                {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
              </h3>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium mb-2">
                Comments {actionType === 'reject' && <span className="text-red-600">*</span>}
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder={actionType === 'approve' ? 'Optional approval comments...' : 'Please provide reason for rejection...'}
                rows={4}
                className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
              />
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-nca-gray bg-nca-light-gray">
              <button
                onClick={() => {
                  setShowCommentModal(false)
                  setComments('')
                }}
                className="px-6 py-2 border border-nca-gray rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={actionType === 'reject' && !comments.trim()}
                className={`px-8 py-2 rounded font-medium transition ${
                  actionType === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
                }`}
              >
                Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
