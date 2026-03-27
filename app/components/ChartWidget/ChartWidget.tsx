'use client';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

export default function ChartWidget({ title, data, height, type = 'line' }: any) {
  const { theme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} vertical={false} />
            <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} fontSize={12} />
            <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', 
                borderRadius: '12px', 
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Bar dataKey="total_transactions" fill="#16a34a" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} vertical={false} />
            <XAxis dataKey="month" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} fontSize={12} />
            <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', 
                borderRadius: '12px', 
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Line type="monotone" dataKey="amount" stroke="#16a34a" strokeWidth={3} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}