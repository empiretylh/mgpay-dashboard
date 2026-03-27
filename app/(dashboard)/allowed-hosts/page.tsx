'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { getAllowedHosts, createAllowedHost, updateAllowedHost, deleteAllowedHost, getServiceApps } from '@/app/lib/api';
import { type AllowedHost, type ServiceApp } from '@/app/lib/data';

export default function AllowedHostsPage() {
  const [hosts, setHosts] = useState<AllowedHost[]>([]);
  const [serviceApps, setServiceApps] = useState<ServiceApp[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formServiceApp, setFormServiceApp] = useState('');
  const [formHostName, setFormHostName] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete confirm state
  const [deletingHost, setDeletingHost] = useState<AllowedHost | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hostsData, appsData] = await Promise.all([
          getAllowedHosts(),
          getServiceApps(),
        ]);
        setHosts(hostsData.results || hostsData);
        setServiceApps(appsData.results || appsData);
      } catch (error) {
        console.error('Failed to fetch allowed hosts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openModal = () => {
    setFormServiceApp('');
    setFormHostName('');
    setFormIsActive(true);
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormServiceApp('');
    setFormHostName('');
    setFormIsActive(true);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      const created = await createAllowedHost({
        service_app: parseInt(formServiceApp),
        host_name: formHostName,
        is_active: formIsActive,
      });
      setHosts(prev => [created, ...prev]);
      closeModal();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleActive = async (host: AllowedHost) => {
    try {
      const updated = await updateAllowedHost(host.id, { is_active: !host.is_active });
      setHosts(prev => prev.map(h => (h.id === host.id ? { ...h, ...updated } : h)));
    } catch (err) {
      console.error('Failed to update allowed host:', err);
    }
  };

  const handleDelete = async () => {
    if (!deletingHost) return;
    try {
      await deleteAllowedHost(deletingHost.id);
      setHosts(prev => prev.filter(h => h.id !== deletingHost.id));
    } catch (err) {
      console.error('Failed to delete allowed host:', err);
    } finally {
      setDeletingHost(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Allowed Hosts</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage dynamic CORS origins for service apps
            </p>
          </div>
          <button
            onClick={openModal}
            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Add Host
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : hosts.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              No allowed hosts found. Add one to enable CORS for a service app.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">ID</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Service App</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Host Name</th>
                    <th className="text-center py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
                    <th className="text-right py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hosts.map((host) => (
                    <tr key={host.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">#{host.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                        {host.service_app_name || `App #${host.service_app}`}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300 font-mono">{host.host_name}</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleToggleActive(host)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                            host.is_active
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {host.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setDeletingHost(host)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Allowed Host</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                  {formError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service App
                </label>
                <select
                  value={formServiceApp}
                  onChange={e => setFormServiceApp(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a service app</option>
                  {serviceApps.map(app => (
                    <option key={app.id} value={app.id}>{app.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Host Name (URL)
                </label>
                <input
                  type="url"
                  value={formHostName}
                  onChange={e => setFormHostName(e.target.value)}
                  required
                  placeholder="https://yoursmusic.com"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={formIsActive}
                  onChange={e => setFormIsActive(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Active
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {formLoading ? 'Adding...' : 'Add Host'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingHost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Remove Allowed Host</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to remove <strong className="font-mono">{deletingHost.host_name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingHost(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
