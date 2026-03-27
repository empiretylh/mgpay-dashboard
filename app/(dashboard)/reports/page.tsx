'use client';

import { useEffect, useState } from 'react';
import MetricsCard from '@/app/components/MetricsCard/MetricsCard';
import ChartWidget from '@/app/components/ChartWidget/ChartWidget';
import { TrendingUp, DollarSign } from 'lucide-react';
import { getDashboardSummary } from '@/app/lib/api';
import { mockDashboardSummary, formatCurrency } from '@/app/lib/data';

export default function ReportsPage() {
  const [summary, setSummary] = useState(mockDashboardSummary);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalBalance = summary.provider_balances.reduce((sum, p) => sum + parseFloat(p.total_amount), 0);
  const totalTransactions = summary.service_app_stats.reduce((sum, s) => sum + s.total_transactions, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Reports</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Analytics and performance metrics
          </p>
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricsCard
                title="Total Transaction Volume"
                amount={formatCurrency(totalBalance.toString())}
                trend={0}
                icon={<DollarSign size={32} className="text-green-600 dark:text-green-400" />}
                bgGradient="from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/20"
              />
              <MetricsCard
                title="Total Transactions"
                amount={totalTransactions.toLocaleString()}
                trend={0}
                icon={<TrendingUp size={32} className="text-blue-600 dark:text-blue-400" />}
                bgGradient="from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/20"
              />
            </div>

            <ChartWidget 
              title="Service App Performance" 
              height={400} 
              data={summary.service_app_stats} 
              type="bar"
            />

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Provider Breakdown</h2>
              <div className="space-y-4">
                {summary.provider_balances.map((provider) => (
                  <div key={provider.provider} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{provider.provider}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(provider.total_amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
