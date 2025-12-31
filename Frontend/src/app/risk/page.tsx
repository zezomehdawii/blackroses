'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RiskManagementPage() {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4 | 5>(1)

  const riskCycleStages = [
    { id: 1, name: 'Identify Risks', icon: '🔍', description: 'Discover and document potential risks' },
    { id: 2, name: 'Assess Impact', icon: '📊', description: 'Evaluate likelihood and impact' },
    { id: 3, name: 'Mitigate Controls', icon: '🛡️', description: 'Implement controls to reduce risk' },
    { id: 4, name: 'Monitor Compliance', icon: '📈', description: 'Track control effectiveness' },
    { id: 5, name: 'Review & Improve', icon: '🔄', description: 'Continuous improvement cycle' }
  ]

  const risks = [
    { id: 1, title: 'Unauthorized Data Access', category: 'Data Security', likelihood: 'high', impact: 'critical', score: 9, status: 'open', owner: 'CISO', linkedControls: ['BR-003', 'BR-008'], treatmentPlan: 'Implement MFA and RBAC', dueDate: '2026-02-15' },
    { id: 2, title: 'Unpatched Systems', category: 'Vulnerability Management', likelihood: 'medium', impact: 'high', score: 6, status: 'mitigating', owner: 'IT Security', linkedControls: ['BR-010'], treatmentPlan: 'Deploy automated patch management', dueDate: '2026-01-30' },
    { id: 3, title: 'Third-Party Data Breach', category: 'Vendor Risk', likelihood: 'medium', impact: 'high', score: 6, status: 'open', owner: 'Compliance', linkedControls: [], treatmentPlan: 'Vendor assessment program', dueDate: '2026-03-01' },
    { id: 4, title: 'Insider Threat', category: 'Personnel Security', likelihood: 'low', impact: 'critical', score: 4, status: 'mitigating', owner: 'HR', linkedControls: ['BR-003', 'BR-007'], treatmentPlan: 'Enhanced monitoring and training', dueDate: '2026-02-01' },
    { id: 5, title: 'Ransomware Attack', category: 'Cyber Threats', likelihood: 'high', impact: 'critical', score: 9, status: 'open', owner: 'SOC', linkedControls: ['BR-006'], treatmentPlan: 'Backup strategy and EDR deployment', dueDate: '2026-01-20' }
  ]

  const stats = {
    total: risks.length,
    critical: risks.filter(r => r.score >= 8).length,
    high: risks.filter(r => r.score >= 6 &&
