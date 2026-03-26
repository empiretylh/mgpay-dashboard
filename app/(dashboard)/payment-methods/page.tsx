'use client';

import { Wallet } from 'lucide-react';

export default function PaymentMethodsPage() {
  const methods = [
    { name: 'KBZ Pay', balance: '5,250,000', status: 'Active', color: 'blue', icon: '💳' },
    { name: 'Wave Pay', balance: '3,180,000', status: 'Active', color: 'orange', icon: '📱' },
    { name: 'AYA Pay', balance: '2,890,000', status: 'Active', color: 'purple', icon: '💰' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600',
      orange: 'from-orange-500 to-orange-600',
      purple: 'from-purple-500 to-purple-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Configure payment providers and view balances
          </p>
        </div>
      </div>

      <div className="p-8 max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {methods.map((method) => (
            <div key={method.name} className={`relative overflow-hidden bg-gradient-to-br ${getColorClasses(method.color)} rounded-2xl p-6 text-white shadow-lg`}>
              <div className="absolute top-0 right-0 text-6xl opacity-20">{method.icon}</div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Wallet size={24} />
                  <h3 className="text-xl font-bold">{method.name}</h3>
                </div>
                <div className="mb-2">
                  <p className="text-sm opacity-80">Balance</p>
                  <p className="text-2xl font-bold">{method.balance} MMK</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{method.status}</span>
                  <button className="text-xs bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
