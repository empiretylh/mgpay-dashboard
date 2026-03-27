'use client';

import { useEffect, useState } from 'react';
import MetricsCard from '@/app/components/MetricsCard/MetricsCard';
import ChartWidget from '@/app/components/ChartWidget/ChartWidget';
import TransactionTable from '@/app/components/TransactionTable/TransactionTable';
import { Wallet, TrendingUp } from 'lucide-react';
import { getDashboardSummary, getTransactions } from '@/app/lib/api';
import { mockDashboardSummary, mockTransactions, formatCurrency, type Transaction } from '@/app/lib/data';

export default function OverviewPage() {
  const [summary, setSummary] = useState(mockDashboardSummary);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryData, transactionsData] = await Promise.all([
          getDashboardSummary(),
          getTransactions(),
        ]);
        setSummary(summaryData);
        setTransactions(transactionsData.results || transactionsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const findProviderBalance = (names: string[]) =>
    summary.provider_balances.find(p =>
      names.some(n => p.provider?.toLowerCase() === n.toLowerCase())
    )?.total_amount || '0';

  const kbzBalance = findProviderBalance(['kbzpay', 'KBZ Pay']);
  const waveBalance = findProviderBalance(['wavepay', 'Wave Pay']);
  const ayaBalance = findProviderBalance(['ayapay', 'AYA Pay']);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Top Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Payment gateway statistics and analytics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Provider Balances */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard
                title="KBZ Pay Balance"
                amount={formatCurrency(kbzBalance)}
                trend={0}
                icon={<Wallet size={32} className="text-blue-600 dark:text-blue-400" />}
                bgGradient="from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/20"
              />
              <MetricsCard
                title="Wave Pay Balance"
                amount={formatCurrency(waveBalance)}
                trend={0}
                icon={<Wallet size={32} className="text-orange-600 dark:text-orange-400" />}
                bgGradient="from-orange-50 to-orange-100 dark:from-orange-900/10 dark:to-orange-900/20"
              />
              <MetricsCard
                title="AYA Pay Balance"
                amount={formatCurrency(ayaBalance)}
                trend={0}
                icon={<Wallet size={32} className="text-purple-600 dark:text-purple-400" />}
                bgGradient="from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-900/20"
              />
              <MetricsCard
                title="Total Exported Balance"
                amount={formatCurrency(summary.total_exported_balance)}
                trend={0}
                icon={<TrendingUp size={32} className="text-green-600 dark:text-green-400" />}
                bgGradient="from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/20"
              />
            </div>

            {/* Service App Stats Chart */}
            <ChartWidget 
              title="Service App Performance" 
              height={350} 
              data={summary.service_app_stats} 
              type="bar"
            />

            {/* Recent Transactions */}
            <TransactionTable 
              title="Recent Transactions" 
              transactions={transactions.slice(0, 10)} 
            />
          </>
        )}
      </div>
    </div>
  );
}