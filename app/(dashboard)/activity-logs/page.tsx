'use client';

export default function ActivityLogsPage() {
  const logs = [
    { timestamp: '2024-03-01 10:30:45', user: 'admin@mgpay.com', action: 'Login', details: 'Successful login', ip: '192.168.1.1' },
    { timestamp: '2024-03-01 09:15:22', user: 'john@mgpay.com', action: 'Created Service App', details: 'New app: E-Commerce Platform', ip: '192.168.1.2' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track admin actions and system events
          </p>
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Timestamp</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">User</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Action</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Details</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{log.timestamp}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">{log.user}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">{log.action}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{log.details}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
