'use client';
import { mockInvestments } from '@/app/lib/data';

export default function InvestmentPage() {
  const totalValue = mockInvestments.reduce((acc, curr) => acc + curr.currentValue, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors duration-300">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Portfolio</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Total Portfolio Value: <span className="text-2xl font-bold text-gray-900 dark:text-white">${totalValue.toLocaleString()}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Asset List */}
        <div className="lg:col-span-2 space-y-4">
          {mockInvestments.map((asset) => (
            <div 
              key={asset.id} 
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center font-bold text-xs">
                  {asset.ticker}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{asset.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{asset.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">${asset.currentValue.toLocaleString()}</p>
                <p className={`text-xs font-semibold ${asset.totalReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {asset.totalReturn >= 0 ? '+' : ''}{asset.totalReturn}%
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Allocation Widget */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6">Allocation</h3>
            <div className="w-48 h-48 bg-gray-50 dark:bg-gray-800 rounded-full border-4 border-blue-50 dark:border-blue-900/30 flex items-center justify-center">
                <span className="text-sm text-gray-400 dark:text-gray-500">Chart Placeholder</span>
            </div>
        </div>
      </div>
    </div>
  );
}