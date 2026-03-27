'use client';

import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { getTransactions, getServiceApps } from '@/app/lib/api';
import { mockTransactions, mockServiceApps, formatCurrency, formatDate, type Transaction, type ServiceApp } from '@/app/lib/data';

const getStatusBadge = (status: 'success' | 'pending' | 'failed') => {
  switch (status) {
    case 'success':
      return (
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
          Success
        </span>
      );
    case 'pending':
      return (
        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-semibold">
          Pending
        </span>
      );
    case 'failed':
      return (
        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold">
          Failed
        </span>
      );
  }
};

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [serviceApps, setServiceApps] = useState<ServiceApp[]>(mockServiceApps);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [txData, appsData] = await Promise.all([
          getTransactions(selectedApp || undefined),
          getServiceApps(),
        ]);
        setTransactions(txData.results || txData);
        setServiceApps(appsData.results || appsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedApp]);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = searchTerm === '' || 
      tx.id.toString().includes(searchTerm) ||
      (tx.reference_id && tx.reference_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.transaction_id && tx.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.provider && tx.provider.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const displayedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            View and manage all payment transactions
          </p>
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by ID, reference, or provider..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  value={selectedApp || ''}
                  onChange={(e) => { setSelectedApp(e.target.value ? parseInt(e.target.value) : null); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                >
                  <option value="">All Service Apps</option>
                  {serviceApps.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">ID</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Service App</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Provider</th>
                      <th className="text-right py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Amount</th>
                      <th className="text-center py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white break-all">#{tx.transaction_id || tx.reference_id || tx.id}</td>
                        <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">{tx.service_app_name || `App #${tx.service_app}`}</td>
                        <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">{tx.provider}</td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white text-right">{formatCurrency(tx.amount)}</td>
                        <td className="py-4 px-6 text-center">{getStatusBadge(tx.status)}</td>
                        <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{formatDate(tx.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
