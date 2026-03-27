'use client';

import { Plus } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { name: 'Admin User', email: 'admin@mgpay.com', role: 'Super Admin', status: 'Active' },
    { name: 'John Doe', email: 'john@mgpay.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@mgpay.com', role: 'Viewer', status: 'Active' },
  ];

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      'Super Admin': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      'Admin': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      'Viewer': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
    };
    return colors[role] || colors.Viewer;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users & Permissions</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage admin users and their access levels
            </p>
          </div>
          <button className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
            <Plus size={20} />
            Add User
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1200px] mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Name</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Email</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Role</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
