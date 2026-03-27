'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [telegramAlerts, setTelegramAlerts] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications & Alerts</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Configure notification preferences
          </p>
        </div>
      </div>

      <div className="p-8 max-w-[800px] mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Notification Settings</h2>
          <div className="space-y-4">
            {[
              { label: 'Email Alerts', state: emailAlerts, setState: setEmailAlerts },
              { label: 'Telegram Alerts', state: telegramAlerts, setState: setTelegramAlerts },
              { label: 'In-App Notifications', state: inAppNotifications, setState: setInAppNotifications },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                <button
                  onClick={() => item.setState(!item.state)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    item.state ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    item.state ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell size={20} className="text-green-600" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Notifications</h2>
          </div>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No notifications yet
          </div>
        </div>
      </div>
    </div>
  );
}
