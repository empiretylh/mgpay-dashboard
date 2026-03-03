'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  LayoutDashboard,
  Wallet,
  Send,
  Receipt,
  Zap,
  BarChart3,
  TrendingUp,
  PieChart,
  FileText,
  MessageSquare,
  HelpCircle,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/overview' },
    { icon: Wallet, label: 'Wallet', href: '/wallet' },
    { icon: Send, label: 'Transaction', href: '/transaction' },
    { icon: Receipt, label: 'Loans', href: '/loans' },
    { icon: Zap, label: 'Investment', href: '/investment' },
    { icon: BarChart3, label: 'Statistic', href: '/statistic' },
    { icon: TrendingUp, label: 'Budgeting', href: '/budgeting' },
    { icon: PieChart, label: 'Report', href: '/report' },
    { icon: MessageSquare, label: 'Message', href: '/message' },
  ];

  const helpItems = [
    { icon: HelpCircle, label: 'Help & Support', href: '/help' },
    { icon: Settings, label: 'Settings', href: '/settings' },
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  console.log(theme,"theme")

  return (
    <>
      {/* Mobile menu button */}
      <div className="hidden md:hidden fixed top-6 left-6 z-50">
        <button
          onClick={() => onClose?.()}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">DF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">DeliFin</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Finance</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive(item.href) && (
                <div className="ml-auto w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Help & Settings Section */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
          {helpItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleThemeToggle}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium text-sm">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
