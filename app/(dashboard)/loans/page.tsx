'use client';
import { mockLoans } from '@/app/lib/data';

export default function LoansPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Loans Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockLoans.map((loan) => {
          const progress = ((loan.totalAmount - loan.remainingBalance) / loan.totalAmount) * 100;
          
          return (
            <div key={loan.id} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{loan.type} Loan</h3>
                  <p className="text-sm text-gray-500">Rate: {loan.interestRate}% APR</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  loan.status === 'Active' ? 'bg-green-100 text-green-700' : 
                  loan.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {loan.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Remaining</span>
                  <span className="font-bold">${loan.remainingBalance.toLocaleString()}</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-xs text-gray-400">Next Payment: {loan.nextPaymentDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}