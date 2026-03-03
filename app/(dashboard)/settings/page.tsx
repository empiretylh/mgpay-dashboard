'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-bold mb-4">Profile Information</h2>
          <div className="grid gap-4">
            <input type="text" defaultValue="DeliFin User" className="p-3 border rounded-lg w-full" />
            <input type="email" defaultValue="user@delifin.com" className="p-3 border rounded-lg w-full" />
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-bold mb-4">Preferences</h2>
          
          <div className="flex justify-between items-center py-2">
            <span>Display Currency</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="USD">USD ($)</option>
              <option value="MMK">MMK (Ks)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          <div className="flex justify-between items-center py-2">
            <span>Push Notifications</span>
            <input type="checkbox" className="w-6 h-6 rounded" defaultChecked />
          </div>
        </section>

        {/* Save Button */}
        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}