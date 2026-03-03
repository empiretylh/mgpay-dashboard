'use client';
import { Users, Gift, Zap } from 'lucide-react';

export default function PromoCards() {
  const cards = [
    { title: 'Invite Friends', desc: 'Earn rewards', icon: <Users size={24} />, color: 'bg-blue-500' },
    { title: 'Referral Code', desc: 'Get commissions', icon: <Gift size={24} />, color: 'bg-purple-500' },
    { title: 'Special Offer', desc: 'Exclusive deals', icon: <Zap size={24} />, color: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className={`${c.color} text-white w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>{c.icon}</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{c.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{c.desc}</p>
          <button className="w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:opacity-80 transition-all">Action</button>
        </div>
      ))}
    </div>
  );
}