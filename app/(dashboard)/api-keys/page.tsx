'use client';

import { useEffect, useState } from 'react';
import { Key, Copy, RefreshCw } from 'lucide-react';
import { getServiceApps } from '@/app/lib/api';
import { mockServiceApps, type ServiceApp } from '@/app/lib/data';

export default function ApiKeysPage() {
  const [apps, setApps] = useState<ServiceApp[]>(mockServiceApps);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await getServiceApps();
        setApps(data.results || data);
      } catch (error) {
        console.error('Failed to fetch service apps:', error);
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Keys & Security</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage API tokens and security settings
          </p>
        </div>
      </div>

      <div className="p-8 max-w-[1200px] mx-auto space-y-6">
        {apps.map((app) => (
          <div key={app.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key size={20} className="text-green-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{app.name}</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">API Token</p>
                <div className="flex gap-2">
                  <code className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300">
                    {app.api_token}
                  </code>
                  <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Copy size={18} />
                  </button>
                  <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
