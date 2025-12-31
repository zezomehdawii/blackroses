'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePolicyPage() {
  const router = useRouter()
  const [useAI, setUseAI] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    version: 'v1.0',
    policyType: 'security',
    frameworks: [] as string[],
    description: '',
    scope: '',
    purpose: '',
    responsibilities: '',
    policyStatements: '',
    enforcement: '',
    reviewCycle: '12',
    owner: '',
    approver: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFrameworkToggle = (framework: string) => {
    setFormData(prev => ({
      ...prev,
      frameworks: prev.frameworks.includes(framework)
        ? prev.frameworks.filter(f => f !== framework)
        : [...prev.frameworks, framework]
    }))
  }

  const generateWithAI = async () => {
    if (!formData.policyType || formData.frameworks.length === 0) {
      alert('Please select policy type and at least one framework first.')
      return
    }

    setAiGenerating(true)
    
    // Simulate AI generation (would call Ollama API in real implementation)
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        purpose: `This policy establishes requirements for ${formData.policyType} in accordance with ${formData.frameworks.join(', ')} frameworks.`,
        scope: 'This policy applies to all employees, contractors, and third-party vendors with access to company systems and data.',
        responsibilities: '- Management: Approve and enforce policy\n- IT Security: Implement technical controls\n- Employees: Comply with all requirements',
        policyStatements: `1. All ${formData.policyType} activities must comply with applicable regulations\n2. Regular assessments must be conducted\n3. Violations will result in disciplinary action`,
        enforcement: 'Non-compliance will be handled according to the Employee Handbook and may result in termination.',
      }))
      setAiGenerating(false)
      alert('AI-generated policy template applied! Review and customize as needed.')
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Policy Data:', formData)
    alert(`Policy "${formData.name}" created successfully!`)
    router.push('/policies')
  }

  return (
    <div className="min-h-screen bg-nca-light">
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Create New Policy</h1>
          <p className="text-sm opacity-90">Define governance policies to enforce compliance controls</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Basic Information */}
          <section className="card mb-6">
            <h2 className="text-xl font-bold mb-6 text-n
