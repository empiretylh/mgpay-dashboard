'use client';

import { useState } from 'react';

export default function WebhookLogsPage() {
  const [activeTab, setActiveTab] = useState<'api' | 'callback'>('api');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Webhook Logs</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            View API and callback logs
          </p>
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-4">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('api')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'api'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                API Logs
              </button>
              <button
                onClick={() => setActiveTab('callback')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'callback'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Callback Logs
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No {activeTab === 'api' ? 'API' : 'callback'} logs available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
