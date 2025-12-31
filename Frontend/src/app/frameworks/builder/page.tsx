'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FrameworkBuilderPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    frameworkCode: '',
    frameworkName: '',
    version: '',
    region: 'Global',
    description: '',
    effectiveDate: '',
    groupingStrategy: 'hierarchical'
  })

  const [controls, setControls] = useState<Array<{
    id: string
    originalCode: string
    title: string
    description: string
    severity: string
    category: string
  }>>([])

  const [currentControl, setCurrentControl] = useState({
    originalCode: '',
    title: '',
    description: '',
    severity: 'medium',
    category: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleControlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentControl(prev => ({ ...prev, [name]: value }))
  }

  const addControl = () => {
    if (!currentControl.originalCode || !currentControl.title) {
      alert('Please fill in control code and title')
      return
    }

    const newControl = {
      id: `temp-${Date.now()}`,
      ...currentControl
    }

    setControls(prev => [...prev, newControl])
    setCurrentControl({
      originalCode: '',
      title: '',
      description: '',
      severity: 'medium',
      category: ''
    })
  }

  const removeControl = (id: string) => {
    setControls(prev => prev.filter(c => c.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.frameworkCode || !formData.frameworkName) {
      alert('Please fill in required fields: Framework Code and Name')
      return
    }

    if (controls.length === 0) {
      alert('Please add at least one control')
      return
    }

    // TODO: Submit to API
    console.log('Framework Data:', formData)
    console.log('Controls:', controls)
    
    alert(`Framework "${formData.frameworkName}" created with ${controls.length} controls!`)
    router.push('/frameworks')
  }

  return (
    <div className="min-h-screen bg-nca-light">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Create Custom Framework</h1>
          <p className="text-sm opacity-90">Build your own compliance framework with custom controls</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          {/* Framework Basic Information */}
          <section className="mb-8">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 text-nca-primary">Framework Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Framework Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Framework Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="frameworkCode"
                    value={formData.frameworkCode}
                    onChange={handleInputChange}
                    placeholder="e.g., CUSTOM-001"
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Unique identifier for this framework</p>
                </div>

                {/* Framework Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Framework Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="frameworkName"
                    value={formData.frameworkName}
                    onChange={handleInputChange}
                    placeholder="e.g., Company Security Framework"
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                    required
                  />
                </div>

                {/* Version */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Version
                  </label>
                  <input
                    type="text"
                    name="version"
                    value={formData.version}
                    onChange={handleInputChange}
                    placeholder="e.g., v1.0"
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                  >
                    <option value="Global">Global</option>
                    <option value="USA">USA</option>
                    <option value="EU">EU</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                  </select>
                </div>

                {/* Effective Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Effective Date
                  </label>
                  <input
                    type="date"
                    name="effectiveDate"
                    value={formData.effectiveDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                  />
                </div>

                {/* Grouping Strategy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grouping Strategy
                  </label>
                  <select
                    name="groupingStrategy"
                    value={formData.groupingStrategy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                  >
                    <option value="hierarchical">Hierarchical (nested categories)</option>
                    <option value="flat">Flat (single level)</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe the purpose and scope of this framework..."
                  className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                />
              </div>
            </div>
          </section>

          {/* Add Controls Section */}
          <section className="mb-8">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 text-nca-primary">Add Controls</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Control Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Control Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="originalCode"
                    value={currentControl.originalCode}
                    onChange={handleControlChange}
                    placeholder="e.g., CSF-1.1"
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                  />
                </div>

                {/* Severity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity
                  </label>
                  <select
                    name="severity"
                    value={currentControl.severity}
                    onChange={handleControlChange}
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Control Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Control Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={currentControl.title}
                    onChange={handleControlChange}
                    placeholder="e.g., Implement Multi-Factor Authentication"
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={currentControl.category}
                    onChange={handleControlChange}
                    placeholder="e.g., Access Control"
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Control Description
                  </label>
                  <textarea
                    name="description"
                    value={currentControl.description}
                    onChange={handleControlChange}
                    rows={3}
                    placeholder="Describe the control requirements and implementation guidance..."
                    className="w-full px-4 py-2 border border-nca-gray rounded-md focus:outline-none focus:ring-2 focus:ring-nca-primary"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={addControl}
                className="button-secondary"
              >
                + Add Control
              </button>
            </div>
          </section>

          {/* Controls List */}
          {controls.length > 0 && (
            <section className="mb-8">
              <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-nca-primary">
                  Controls ({controls.length})
                </h2>
                
                <div className="space-y-4">
                  {controls.map((control, index) => (
                    <div key={control.id} className="border border-nca-gray rounded-lg p-4 bg-nca-light-gray">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-mono font-bold text-nca-primary">
                              {control.originalCode}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded font-medium ${
                              control.severity === 'critical' ? 'bg-red-100 text-red-700' :
                              control.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                              control.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {control.severity.toUpperCase()}
                            </span>
                            {control.category && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {control.category}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-lg mb-2">{control.title}</h3>
                          {control.description && (
                            <p className="text-sm text-gray-600">{control.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeControl(control.id)}
                          className="ml-4 text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Action Buttons */}
          <section>
            <div className="card">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {controls.length} control(s) added
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-nca-gray rounded-md hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="button-primary px-8"
                  >
                    Create Framework
                  </button>
                </div>
              </div>
            </div>
          </section>
