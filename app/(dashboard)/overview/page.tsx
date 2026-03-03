'use client';

import MetricsCard from '@/app/components/MetricsCard/MetricsCard';
import ChartWidget from '@/app/components/ChartWidget/ChartWidget';
import TransactionTable from '@/app/components/TransactionTable/TransactionTable';
import PromoCards from '@/app/components/PromoCards/PromoCards';
import { DollarSign, TrendingUp, Zap } from 'lucide-react';
import { dashboardMetrics, mockTransactions, chartData } from '@/app/lib/data';

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Top Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back! 👋</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Here's your financial overview for today
              </p>
            </div>
            <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium transition-all hover:shadow-lg">
              + Add Money
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-8 space-y-8 max-w-[1600px]  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsCard
            title={dashboardMetrics[0].title}
            amount={dashboardMetrics[0].amount}
            trend={dashboardMetrics[0].trend}
            icon={<DollarSign size={32} className="text-blue-600 dark:text-blue-400" />}
            bgGradient={dashboardMetrics[0].bgGradient}
          />
          <MetricsCard
            title={dashboardMetrics[1].title}
            amount={dashboardMetrics[1].amount}
            trend={dashboardMetrics[1].trend}
            icon={<TrendingUp size={32} className="text-red-600 dark:text-red-400" />}
            bgGradient={dashboardMetrics[1].bgGradient}
          />
          <MetricsCard
            title={dashboardMetrics[2].title}
            amount={dashboardMetrics[2].amount}
            trend={dashboardMetrics[2].trend}
            icon={<Zap size={32} className="text-green-600 dark:text-green-400" />}
            bgGradient={dashboardMetrics[2].bgGradient}
          />
        </div>

        <ChartWidget title="Transaction Overview" height={350} data={chartData} />

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Opportunities</h2>
          <PromoCards />
        </div>

        <TransactionTable title="Recent Transactions" transactions={mockTransactions} />
      </div>
    </div>
  );
}