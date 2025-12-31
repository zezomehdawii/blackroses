import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4">BlackRoses</h1>
        <p className="text-xl text-gray-400 mb-8">
          Enterprise GRC Platform
        </p>
        <p className="text-md text-gray-500 mb-12 max-w-2xl mx-auto">
          Governance, Risk & Compliance Automation with Multi-Framework Support
          <br />
          CIS, NIST, ISO 27001, GDPR, PCI-DSS, HIPAA, NCA Saudi, SOC 2
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/compliance"
            className="bg-nca-primary hover:bg-green-700 px-8 py-3 rounded-lg text-lg font-semibold transition"
          >
            Get Started
          </Link>
          <Link
            href="/architecture"
            className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-lg text-lg font-semibold transition"
          >
            View Architecture
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-3xl font-bold text-nca-primary">50+</div>
            <div className="text-sm text-gray-400">Frameworks</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-3xl font-bold text-nca-primary">10K+</div>
            <div className="text-sm text-gray-400">Controls</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-3xl font-bold text-nca-primary">Real-time</div>
            <div className="text-sm text-gray-400">Monitoring</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-3xl font-bold text-nca-primary">24/7</div>
            <div className="text-sm text-gray-400">Compliance</div>
          </div>
        </div>
      </div>
    </div>
  )
}
