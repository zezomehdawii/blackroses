'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ControlBuilderPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    frameworkId: '',
    originalCode: '',
    title: '',
    description: '',
    severity: 'medium',
    category: '',
    implementationGuidance: '',
    requiresUserInput: false,
    userInputDescription: '',
    tags: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Control Data:', formData)
    alert(`Control "${formData.title}" created successfully!`)
    router.push('/controls')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-nca-light">
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Create Custom Control</h1>
          <p className="text-sm opacity-90">Add a new control to your compliance framework</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="card max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Framework</label>
                <select name="frameworkId" value={formData.frameworkId} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required>
                  <option value="">Select Framework</option>
                  <option value="CIS">CIS Controls</option>
                  <option value="NIST">NIST 800-53</option>
                  <option value="ISO27001">ISO 27001</option>
                  <option value="CUSTOM">Custom Framework</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Control Code *</label>
                <input type="text" name="originalCode" value={formData.originalCode} onChange={handleChange} placeholder="e.g., CTRL-001" className="w-full px-4 py-2 border rounded-md" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Severity *</label>
                <select name="severity" value={formData.severity} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Control Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Implement Multi-Factor Authentication" className="w-full px-4 py-2 border rounded-md" required />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Detailed description of the control..." className="w-full px-4 py-2 border rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., Access Control" className="w-full px-4 py-2 border rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., authentication, MFA" className="w-full px-4 py-2 border rounded-md" />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="requiresUserInput" checked={formData.requiresUserInput} onChange={handleChange} className="w-4 h-4" />
                  <span className="text-sm font-medium">Requires Environment Data Input</span>
                </label>
              </div>

              {formData.requiresUserInput && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Input Description</label>
                  <textarea name="userInputDescription" value={formData.userInputDescription} onChange={handleChange} rows={2} placeholder="e.g., Total number of devices in environment" className="w-full px-4 py-2 border rounded-md" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button type="button" onClick={() => router.back()} className="px-6 py-2 border rounded-md">Cancel</button>
              <button type="submit" className="button-primary px-8">Create Control</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
