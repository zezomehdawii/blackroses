'use client'

import { useState } from 'react'

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const notifications = [
    { id: 1, type: 'approval', message: 'New approval request for BR-001', time: '5 min ago', unread: true },
    { id: 2, type: 'alert', message: 'Control CIS 1.1 status changed to Implemented', time: '1 hour ago', unread: true },
    { id: 3, type: 'evidence', message: 'Evidence uploaded for NIST AC-2', time: '2 hours ago', unread: false }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-white border-b border-nca-gray px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search controls, frameworks, policies..."
            className="w-full px-4 py-2 border border-nca-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-nca-primary"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-nca-light-gray rounded-lg transition"
            >
              <span className="text-2xl">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-nca-gray z-50">
                <div className="p-4 border-b border-nca-gray">
                  <h3 className="font-bold text-nca-dark">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-nca-gray hover:bg-nca-light-gray cursor-pointer ${
                        notif.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <p className="text-sm font-medium text-nca-dark">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-nca-gray">
                  <button className="text-sm text-nca-primary hover:underline font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 hover:bg-nca-light-gray rounded-lg transition"
            >
              <div className="w-8 h-8 bg-nca-primary text-white rounded-full flex items-center justify-center font-bold">
                A
              </div>
              <span className="font-medium text-nca-dark">Admin</span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-nca-gray z-50">
                <div className="p-3 border-b border-nca-gray">
                  <p className="font-medium text-nca-dark">Admin User</p>
                  <p className="text-xs text-gray-500">admin@company.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-nca-light-gray">
                    Profile Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-nca-light-gray">
                    Preferences
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
