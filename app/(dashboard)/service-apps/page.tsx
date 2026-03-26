'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Copy, CheckCircle2 } from 'lucide-react';
import { getServiceApps } from '@/app/lib/api';
import { mockServiceApps, type ServiceApp } from '@/app/lib/data';

export default function ServiceAppsPage() {
  const [apps, setApps] = useState<ServiceApp[]>(mockServiceApps);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await getServiceApps();
        setApps(data.results || data);
      } catch (error) {
        console.error('Failed to fetch service apps:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const maskToken = (token: string) => {
    if (token.length <= 8) return token;
    return token.substring(0, 8) + '...' + token.substring(token.length - 4);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Apps</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage integrated applications and API keys
            </p>
          </div>
          <button className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
            <Plus size={20} />
            Create New
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6">
            {apps.map((app) => (
              <div key={app.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{app.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        app.is_active
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {app.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ID: #{app.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <Edit size={18} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">API Token</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded text-sm font-mono text-gray-700 dark:text-gray-300">
                        {maskToken(app.api_token)}
                      </code>
                      <button
                        onClick={() => copyToClipboard(app.api_token, app.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {copiedId === app.id ? (
                          <CheckCircle2 size={18} className="text-green-600" />
                        ) : (
                          <Copy size={18} className="text-gray-600 dark:text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Callback URL</p>
                    <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded text-sm text-gray-700 dark:text-gray-300 truncate">
                      {app.callback_url}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Created: {new Date(app.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
