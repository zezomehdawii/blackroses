'use client'

import { useState } from 'react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    auditRetention: '24',
    complianceLogRetention: '84',
    enableOllama: true,
    ollamaModel: 'llama3',
    kafkaRetention: '24',
    autoFrameworkSync: true,
    frameworkSyncInterval: '24',
    emailNotifications: true,
    webhookUrl: 'https://api.company.com/webhooks/blackroses',
    minioEndpoint: 'minio:9000',
    elasticsearchUrl: 'http://elasticsearch:9200'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = () => {
    console.log('Settings:', settings)
    alert('Settings saved successfully!')
  }

  return (
    <div className="min-h-screen bg-nca-light">
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-sm opacity-90">Configure retention, integrations, and system behavior</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Audit & Retention */}
        <section className="card mb-6">
          <h2 className="text-xl font-bold mb-6 text-nca-primary">Audit & Retention</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Audit Trail Retention (months)</label>
              <input type="number" name="auditRetention" value={settings.auditRetention} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" min="12" max="84" />
              <p className="text-xs text-gray-500 mt-1">Default: 24 months. Range: 12-84 months</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compliance Log Retention (months)</label>
              <input type="number" name="complianceLogRetention" value={settings.complianceLogRetention} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" min="12" max="120" />
              <p className="text-xs text-gray-500 mt-1">Immutable Kafka logs retention period</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kafka Event Retention (months)</label>
              <input type="number" name="kafkaRetention" value={settings.kafkaRetention} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" min="1" max="120" />
              <p className="text-xs text-gray-500 mt-1">Event sourcing retention for audit trail</p>
            </div>
          </div>
        </section>

        {/* AI Integration */}
        <section className="card mb-6">
          <h2 className="text-xl font-bold mb-6 text-nca-primary">AI Integration (Ollama)</h2>
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="enableOllama" checked={settings.enableOllama} onChange={handleChange} className="w-4 h-4" />
                <span className="text-sm font-medium">Enable Ollama AI for document enhancement</span>
              </label>
            </div>
            {settings.enableOllama && (
              <div>
                <label className="block text-sm font-medium mb-2">Ollama Model</label>
                <select name="ollamaModel" value={settings.ollamaModel} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
                  <option value="llama3">Llama 3</option>
                  <option value="mistral">Mistral</option>
                  <option value="codellama">CodeLlama</option>
                </select>
              </div>
            )}
          </div>
        </section>

        {/* Framework Sync */}
        <section className="card mb-6">
          <h2 className="text-xl font-bold mb-6 text-nca-primary">Framework Auto-Sync</h2>
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="autoFrameworkSync" checked={settings.autoFrameworkSync} onChange={handleChange} className="w-4 h-4" />
                <span className="text-sm font-medium">Automatically sync framework updates from regulatory bodies</span>
              </label>
            </div>
            {settings.autoFrameworkSync && (
              <div>
                <label className="block text-sm font-medium mb-2">Sync Interval (hours)</label>
                <select name="frameworkSyncInterval" value={settings.frameworkSyncInterval} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
                  <option value="6">Every 6 hours</option>
                  <option value="12">Every 12 hours</option>
                  <option value="24">Daily</option>
                  <option value="168">Weekly</option>
                </select>
              </div>
            )}
          </div>
        </section>

        {/* Notifications */}
        <section className="card mb-6">
          <h2 className="text-xl font-bold mb-6 text-nca-primary">Notifications</h2>
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleChange} className="w-4 h-4" />
                <span className="text-sm font-medium">Enable email notifications (ElastAlert)</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Webhook URL</label>
              <input type="text" name="webhookUrl" value={settings.webhookUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded-md font-mono text-sm" placeholder="https://api.company.com/webhook" />
              <p className="text-xs text-gray-500 mt-1">WebSocket notifications endpoint</p>
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="card mb-6">
          <h2 className="text-xl font-bold mb-6 text-nca-primary">Infrastructure Endpoints</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">MinIO Endpoint</label>
              <input type="text" name="minioEndpoint" value={settings.minioEndpoint} onChange={handleChange} className="w-full px-4 py-2 border rounded-md font-mono text-sm" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Elasticsearch URL</label>
              <input type="text" name="elasticsearchUrl" value={settings.elasticsearchUrl} onChange={handleChange} className="w-full px-4 py-2
