'use client';

import { walletCards } from '@/app/lib/data';
import { CreditCard } from 'lucide-react';

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors duration-300">
      
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Wallet</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {walletCards.map((card) => (
          <div 
            key={card.id} 
            className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
          >
            {/* Header section with Icon */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <CreditCard size={20} />
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.name}</p>
            <h2 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{card.balance}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}