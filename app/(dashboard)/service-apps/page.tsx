'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Copy, CheckCircle2, X } from 'lucide-react';
import { getServiceApps, createServiceApp, updateServiceApp, deleteServiceApp } from '@/app/lib/api';
import { mockServiceApps, type ServiceApp } from '@/app/lib/data';

export default function ServiceAppsPage() {
  const [apps, setApps] = useState<ServiceApp[]>(mockServiceApps);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingApp, setEditingApp] = useState<ServiceApp | null>(null);
  const [formName, setFormName] = useState('');
  const [formCallbackUrl, setFormCallbackUrl] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete confirm state
  const [deletingApp, setDeletingApp] = useState<ServiceApp | null>(null);

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

  const openCreateModal = () => {
    setEditingApp(null);
    setFormName('');
    setFormCallbackUrl('');
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (app: ServiceApp) => {
    setEditingApp(app);
    setFormName(app.name);
    setFormCallbackUrl(app.callback_url);
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingApp(null);
    setFormName('');
    setFormCallbackUrl('');
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      if (editingApp) {
        const updated = await updateServiceApp(editingApp.id, {
          name: formName,
          callback_url: formCallbackUrl,
        });
        setApps(prev => prev.map(a => (a.id === editingApp.id ? { ...a, ...updated } : a)));
      } else {
        const created = await createServiceApp({ name: formName, callback_url: formCallbackUrl });
        setApps(prev => [...prev, created]);
      }
      closeModal();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingApp) return;
    try {
      await deleteServiceApp(deletingApp.id);
      setApps(prev => prev.filter(a => a.id !== deletingApp.id));
    } catch (err) {
      console.error('Failed to delete service app:', err);
    } finally {
      setDeletingApp(null);
    }
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
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
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
                    <button
                      onClick={() => openEditModal(app)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Edit size={18} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => setDeletingApp(app)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
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
            {apps.length === 0 && (
              <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                No service apps found. Create one to get started.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingApp ? 'Edit Service App' : 'Create Service App'}
              </h2>
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
                  Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  required
                  placeholder="e.g. YoursMusic"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Callback URL
                </label>
                <input
                  type="url"
                  value={formCallbackUrl}
                  onChange={e => setFormCallbackUrl(e.target.value)}
                  required
                  placeholder="https://api.example.com/callback"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
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
                  {formLoading ? 'Saving...' : editingApp ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Service App</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete <strong>{deletingApp.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingApp(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
