'use client';

import { useEffect, useState } from 'react';
import { getApiLogs, getCallbacks } from '@/app/lib/api';
import { formatDate, type ApiLog, type CallbackLog } from '@/app/lib/data';

export default function WebhookLogsPage() {
  const [activeTab, setActiveTab] = useState<'api' | 'callback'>('api');
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);
  const [callbackLogs, setCallbackLogs] = useState<CallbackLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [apiData, callbackData] = await Promise.all([
          getApiLogs(),
          getCallbacks(),
        ]);
        setApiLogs(apiData.results || apiData);
        setCallbackLogs(callbackData.results || callbackData);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Webhook Logs</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            View API request/response logs and incoming callback logs
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
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : activeTab === 'api' ? (
              apiLogs.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No API logs available
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">ID</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Provider</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Method</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">URL</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiLogs.map((log) => (
                        <tr key={log.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">#{log.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{log.provider || '—'}</td>
                          <td className="py-3 px-4 text-sm font-mono text-gray-700 dark:text-gray-300">{log.method || '—'}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{log.url || '—'}</td>
                          <td className="py-3 px-4 text-center">
                            {log.status_code ? (
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                log.status_code >= 200 && log.status_code < 300
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                              }`}>
                                {log.status_code}
                              </span>
                            ) : '—'}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{formatDate(log.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              callbackLogs.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No callback logs available
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">ID</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Service App</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Provider</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {callbackLogs.map((log) => (
                        <tr key={log.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">#{log.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{log.service_app_name || `App #${log.service_app}` || '—'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{log.provider || '—'}</td>
                          <td className="py-3 px-4 text-center">
                            {log.status ? (
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                log.status === 'success'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : log.status === 'pending'
                                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                              }`}>
                                {log.status}
                              </span>
                            ) : '—'}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{formatDate(log.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
