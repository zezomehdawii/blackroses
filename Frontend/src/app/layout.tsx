import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BlackRoses - Enterprise GRC Platform',
  description: 'Governance, Risk & Compliance Automation with Multi-Framework Support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-nca-light text-nca-dark antialiased">
        {children}
      </body>
    </html>
  )
}
