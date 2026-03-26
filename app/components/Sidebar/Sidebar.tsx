'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  LayoutDashboard,
  Receipt,
  AppWindow,
  BarChart3,
  CreditCard,
  Monitor,
  Webhook,
  Key,
  Users,
  Bell,
  Activity,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  LogOut,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { logout } from '@/app/lib/api';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const mainItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/overview' },
    { icon: Receipt, label: 'Transactions', href: '/transaction' },
    { icon: AppWindow, label: 'Service Apps', href: '/service-apps' },
    { icon: BarChart3, label: 'Financial Reports', href: '/reports' },
    { icon: CreditCard, label: 'Payment Methods', href: '/payment-methods' },
    { icon: Monitor, label: 'H5 Payment Page', href: '/h5-payment' },
    { icon: Webhook, label: 'Webhook Logs', href: '/webhook-logs' },
    { icon: Key, label: 'API Keys', href: '/api-keys' },
  ];

  const bottomItems = [
    { icon: Users, label: 'Users & Permissions', href: '/users' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: Activity, label: 'Activity Logs', href: '/activity-logs' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help & Docs', href: '/help' },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose?.();
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => onClose?.()}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col shadow-sm transition-all z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('/overview')}>
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">MG</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">MG PAY</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {mainItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all text-sm ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
              {isActive(item.href) && (
                <div className="ml-auto w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
          {bottomItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all text-sm ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Theme Toggle & Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
          <button
            onClick={handleThemeToggle}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span className="font-medium">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
