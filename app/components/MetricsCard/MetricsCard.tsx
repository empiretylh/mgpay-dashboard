'use client';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  amount: string;
  trend?: number;
  icon?: React.ReactNode;
  bgGradient?: string;
}

export default function MetricsCard({ title, amount, trend = 0, icon, bgGradient = 'from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10' }: MetricsCardProps) {
  const isPositive = trend >= 0;

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{amount}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${bgGradient}`}>{icon}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend}%
        </div>
      </div>
    </div>
  );
}