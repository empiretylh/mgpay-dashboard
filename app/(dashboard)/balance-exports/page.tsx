'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { getBalanceExports, createBalanceExport, updateBalanceExport, deleteBalanceExport, getServiceApps } from '@/app/lib/api';
import { formatCurrency, formatDate, type BalanceExport, type ServiceApp } from '@/app/lib/data';

export default function BalanceExportsPage() {
  const [exports, setExports] = useState<BalanceExport[]>([]);
  const [serviceApps, setServiceApps] = useState<ServiceApp[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingExport, setEditingExport] = useState<BalanceExport | null>(null);
  const [formServiceApp, setFormServiceApp] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete confirm state
  const [deletingExport, setDeletingExport] = useState<BalanceExport | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exportsData, appsData] = await Promise.all([
          getBalanceExports(),
          getServiceApps(),
        ]);
        setExports(exportsData.results || exportsData);
        setServiceApps(appsData.results || appsData);
      } catch (error) {
        console.error('Failed to fetch balance exports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingExport(null);
    setFormServiceApp('');
    setFormAmount('');
    setFormDescription('');
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (exp: BalanceExport) => {
    setEditingExport(exp);
    setFormServiceApp(exp.service_app.toString());
    setFormAmount(exp.amount.toString());
    setFormDescription(exp.description || '');
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingExport(null);
    setFormServiceApp('');
    setFormAmount('');
    setFormDescription('');
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      if (editingExport) {
        const updated = await updateBalanceExport(editingExport.id, {
          amount: formAmount,
          description: formDescription,
        });
        setExports(prev => prev.map(exp => (exp.id === editingExport.id ? { ...exp, ...updated } : exp)));
      } else {
        const created = await createBalanceExport({
          service_app: parseInt(formServiceApp),
          amount: formAmount,
          description: formDescription,
        });
        setExports(prev => [created, ...prev]);
      }
      closeModal();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingExport) return;
    try {
      await deleteBalanceExport(deletingExport.id);
      setExports(prev => prev.filter(exp => exp.id !== deletingExport.id));
    } catch (err) {
      console.error('Failed to delete balance export:', err);
    } finally {
      setDeletingExport(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Balance Exports</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Track and manage balance drawouts for service apps
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            New Export
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : exports.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              No balance exports found. Create one to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">ID</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Service App</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Description</th>
                    <th className="text-right py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Amount</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Date</th>
                    <th className="text-right py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exports.map((exp) => (
                    <tr key={exp.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">#{exp.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                        {exp.service_app_name || `App #${exp.service_app}`}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 max-w-[200px] truncate">
                        {exp.description || '—'}
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white text-right">
                        {formatCurrency(exp.amount)}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(exp.export_date || exp.created_at)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(exp)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            <Edit size={16} className="text-gray-600 dark:text-gray-400" />
                          </button>
                          <button
                            onClick={() => setDeletingExport(exp)}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingExport ? 'Edit Balance Export' : 'New Balance Export'}
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
                  Service App
                </label>
                <select
                  value={formServiceApp}
                  onChange={e => setFormServiceApp(e.target.value)}
                  required
                  disabled={!!editingExport} // Once created, cannot change service app for that export
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 focus:bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <option value="">Select a service app</option>
                  {serviceApps.map(app => (
                    <option key={app.id} value={app.id}>{app.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount (MMK)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formAmount}
                  onChange={e => setFormAmount(e.target.value)}
                  required
                  placeholder="e.g. 5000.00"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  required
                  placeholder="e.g. export description"
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
                  {formLoading ? 'Saving...' : editingExport ? 'Save Changes' : 'Create Export'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingExport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Export</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this balance export for #{deletingExport.service_app}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingExport(null)}
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
