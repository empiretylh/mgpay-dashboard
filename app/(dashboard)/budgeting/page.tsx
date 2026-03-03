'use client';
import { mockBudgets } from '@/app/lib/data';

export default function BudgetingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Monthly Budget</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium">
          + Set New Budget
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockBudgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOverBudget = budget.spent > budget.limit;

          return (
            <div key={budget.id} className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{budget.icon}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white">{budget.category}</h3>
                </div>
                <span className={`text-sm font-medium ${isOverBudget ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  ${budget.spent} / ${budget.limit}
                </span>
              </div>

              {/* Progress Bar - Dark mode track color added */}
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : 'bg-blue-600'}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              
              {isOverBudget && (
                <p className="text-xs text-red-500 mt-2 font-medium">⚠️ Budget exceeded!</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}