'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', href: '/' },
    { icon: '🏗️', label: 'Architecture', href: '/architecture' },
    { icon: '✓', label: 'Compliance', href: '/compliance' },
    { icon: '📋', label: 'Frameworks', href: '/frameworks' },
    { icon: '🎯', label: 'Controls', href: '/controls' },
    { icon: '📜', label: 'Policies', href: '/policies' },
    { icon: '✅', label: 'Approvals', href: '/approvals' },
    { icon: '📁', label: 'Evidence', href: '/evidence' },
    { icon: '⚠️', label: 'Risk', href: '/risk' },
    { icon: '📊', label: 'Reports', href: '/reports' },
    { icon: '⚙️', label: 'Admin', href: '/admin' }
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside className="sidebar w-64 min-h-screen">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="text-3xl">🌹</span>
          <span className="text-xl font-bold text-nca-dark">BlackRoses</span>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.href)
                  ? 'bg-nca-primary text-white font-semibold'
                  : 'text-gray-700 hover:bg-nca-light-gray'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
