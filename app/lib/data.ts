export interface Transaction {
  id: string;
  wallet: string;
  walletIcon: 'credit' | 'wallet' | 'dollar' | 'bank';
  date: string;
  status: 'success' | 'pending' | 'failed';
  amount: string;
  amountNumeric: number;
  category: string;
  description: string;
}

export interface MetricData {
  title: string;
  amount: string;
  amountNumeric: number;
  trend: number;
  trendLabel: string;
  icon: 'dollar' | 'trending' | 'zap';
  bgGradient: string;
}

export interface ChartDataPoint {
  month: string;
  amount: number;
}

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    wallet: 'Credit Card',
    walletIcon: 'credit',
    date: 'Mar 01, 2026',
    status: 'success',
    amount: '$2,400.00',
    amountNumeric: 2400,
    category: 'Shopping',
    description: 'Online shopping at Electronics Store',
  },
  {
    id: 'TXN002',
    wallet: 'Digital Wallet',
    walletIcon: 'wallet',
    date: 'Feb 28, 2026',
    status: 'success',
    amount: '$1,800.50',
    amountNumeric: 1800.5,
    category: 'Food & Dining',
    description: 'Restaurant payment',
  },
  {
    id: 'TXN003',
    wallet: 'Bank Transfer',
    walletIcon: 'bank',
    date: 'Feb 27, 2026',
    status: 'pending',
    amount: '$5,200.00',
    amountNumeric: 5200,
    category: 'Transfer',
    description: 'Transfer to savings account',
  },
  {
    id: 'TXN004',
    wallet: 'Credit Card',
    walletIcon: 'credit',
    date: 'Feb 25, 2026',
    status: 'success',
    amount: '$1,200.25',
    amountNumeric: 1200.25,
    category: 'Entertainment',
    description: 'Movie tickets and subscription',
  },
  {
    id: 'TXN005',
    wallet: 'Digital Wallet',
    walletIcon: 'wallet',
    date: 'Feb 24, 2026',
    status: 'success',
    amount: '$3,600.00',
    amountNumeric: 3600,
    category: 'Utilities',
    description: 'Electricity and water bill',
  },
  {
    id: 'TXN006',
    wallet: 'Bank Transfer',
    walletIcon: 'bank',
    date: 'Feb 23, 2026',
    status: 'success',
    amount: '$950.00',
    amountNumeric: 950,
    category: 'Healthcare',
    description: 'Medical consultation fees',
  },
  {
    id: 'TXN007',
    wallet: 'Credit Card',
    walletIcon: 'credit',
    date: 'Feb 22, 2026',
    status: 'success',
    amount: '$2,100.75',
    amountNumeric: 2100.75,
    category: 'Travel',
    description: 'Flight booking to Bangkok',
  },
  {
    id: 'TXN008',
    wallet: 'Digital Wallet',
    walletIcon: 'wallet',
    date: 'Feb 21, 2026',
    status: 'pending',
    amount: '$450.00',
    amountNumeric: 450,
    category: 'Groceries',
    description: 'Grocery store purchase',
  },
  {
    id: 'TXN009',
    wallet: 'Bank Transfer',
    walletIcon: 'bank',
    date: 'Feb 20, 2026',
    status: 'success',
    amount: '$3,250.00',
    amountNumeric: 3250,
    category: 'Investment',
    description: 'Stock market investment',
  },
  {
    id: 'TXN010',
    wallet: 'Credit Card',
    walletIcon: 'credit',
    date: 'Feb 19, 2026',
    status: 'failed',
    amount: '$680.00',
    amountNumeric: 680,
    category: 'Service',
    description: 'Internet service renewal',
  },
  {
    id: 'TXN011',
    wallet: 'Digital Wallet',
    walletIcon: 'wallet',
    date: 'Feb 18, 2026',
    status: 'success',
    amount: '$1,250.00',
    amountNumeric: 1250,
    category: 'Education',
    description: 'Online course subscription',
  },
  {
    id: 'TXN012',
    wallet: 'Bank Transfer',
    walletIcon: 'bank',
    date: 'Feb 17, 2026',
    status: 'success',
    amount: '$4,500.00',
    amountNumeric: 4500,
    category: 'Salary',
    description: 'Monthly salary deposit',
  },
];

// Dashboard metrics
export const dashboardMetrics: MetricData[] = [
  {
    title: 'My Balance',
    amount: '$24,582.50',
    amountNumeric: 24582.5,
    trend: 12.5,
    trendLabel: 'vs last month',
    icon: 'dollar',
    bgGradient: 'from-blue-50 to-indigo-50',
  },
  {
    title: 'Total Expense',
    amount: '$8,942.00',
    amountNumeric: 8942,
    trend: -5.2,
    trendLabel: 'vs last month',
    icon: 'trending',
    bgGradient: 'from-red-50 to-orange-50',
  },
  {
    title: 'Total Income',
    amount: '$15,420.75',
    amountNumeric: 15420.75,
    trend: 18.3,
    trendLabel: 'vs last month',
    icon: 'zap',
    bgGradient: 'from-green-50 to-emerald-50',
  },
];

// Chart data
export const chartData: ChartDataPoint[] = [
  { month: 'Jan', amount: 4000 },
  { month: 'Feb', amount: 3500 },
  { month: 'Mar', amount: 5200 },
  { month: 'Apr', amount: 4800 },
  { month: 'May', amount: 6100 },
  { month: 'Jun', amount: 5800 },
];

// Pagination helper
export const ITEMS_PER_PAGE = 5;

export const getTransactionPage = (
  pageNumber: number,
  transactions: Transaction[] = mockTransactions
) => {
  const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return transactions.slice(startIndex, endIndex);
};

export const getTotalPages = (transactions: Transaction[] = mockTransactions) => {
  return Math.ceil(transactions.length / ITEMS_PER_PAGE);
};

// Filter helper
export const filterTransactions = (
  transactions: Transaction[],
  searchTerm: string
): Transaction[] => {
  if (!searchTerm.trim()) return transactions;

  const term = searchTerm.toLowerCase();
  return transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(term) ||
      transaction.wallet.toLowerCase().includes(term) ||
      transaction.category.toLowerCase().includes(term) ||
      transaction.description.toLowerCase().includes(term)
  );
};
export interface WalletCard {
  id: string;
  name: string;
  type: 'savings' | 'investment' | 'digital' | 'crypto';
  balance: string;
  balanceNumeric: number;
  accountNumber: string; // ဥပမာ - **** 4589
  bgGradient: string;    // Tailwind gradient class
}

export const walletCards: WalletCard[] = [
  {
    id: 'W001',
    name: 'Primary Savings',
    type: 'savings',
    balance: '$24,582.50',
    balanceNumeric: 24582.5,
    accountNumber: '**** 8829',
    bgGradient: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'W002',
    name: 'Stock Portfolio',
    type: 'investment',
    balance: '$12,420.00',
    balanceNumeric: 12420,
    accountNumber: '**** 1120',
    bgGradient: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'W003',
    name: 'Digital Wallet',
    type: 'digital',
    balance: '$1,840.25',
    balanceNumeric: 1840.25,
    accountNumber: '**** 9901',
    bgGradient: 'from-purple-600 to-pink-600',
  },
  {
    id: 'W004',
    name: 'Crypto Assets',
    type: 'crypto',
    balance: '$4,200.00',
    balanceNumeric: 4200,
    accountNumber: '**** 3345',
    bgGradient: 'from-orange-500 to-amber-600',
  },
];

export interface Loan {
  id: string;
  type: 'Personal' | 'Home' | 'Auto' | 'Business';
  totalAmount: number;
  remainingBalance: number;
  interestRate: number; // percentage
  nextPaymentDate: string;
  status: 'Active' | 'Overdue' | 'Completed';
}

export const mockLoans: Loan[] = [
  {
    id: 'LN-001',
    type: 'Home',
    totalAmount: 150000,
    remainingBalance: 125000,
    interestRate: 3.5,
    nextPaymentDate: 'Mar 15, 2026',
    status: 'Active',
  },
  {
    id: 'LN-002',
    type: 'Auto',
    totalAmount: 30000,
    remainingBalance: 5000,
    interestRate: 5.2,
    nextPaymentDate: 'Mar 10, 2026',
    status: 'Active',
  },
  {
    id: 'LN-003',
    type: 'Personal',
    totalAmount: 10000,
    remainingBalance: 10200, // Show overdue case
    interestRate: 12.0,
    nextPaymentDate: 'Feb 25, 2026',
    status: 'Overdue',
  },
];

export interface InvestmentAsset {
  id: string;
  name: string;
  ticker: string;
  type: 'Stock' | 'Crypto' | 'Bond' | 'ETF';
  currentValue: number;
  totalReturn: number; // percentage
  allocation: number; // percentage of portfolio
}

export const mockInvestments: InvestmentAsset[] = [
  { id: 'I001', name: 'Apple Inc.', ticker: 'AAPL', type: 'Stock', currentValue: 12450.50, totalReturn: 12.5, allocation: 40 },
  { id: 'I002', name: 'Bitcoin', ticker: 'BTC', type: 'Crypto', currentValue: 8200.00, totalReturn: -2.4, allocation: 25 },
  { id: 'I003', name: 'Vanguard ETF', ticker: 'VTI', type: 'ETF', currentValue: 5600.75, totalReturn: 5.1, allocation: 20 },
  { id: 'I004', name: 'US Treasury', ticker: 'UST', type: 'Bond', currentValue: 3200.00, totalReturn: 1.2, allocation: 15 },
];

export const categoryData = [
  { name: 'Shopping', value: 400, color: '#3b82f6' }, // Blue
  { name: 'Food', value: 300, color: '#f43f5e' },    // Red
  { name: 'Transport', value: 300, color: '#10b981' },// Green
  { name: 'Utilities', value: 200, color: '#f59e0b' },// Amber
];

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  icon: string; // Emoji သို့မဟုတ် Lucide Icon name
}

export const mockBudgets: Budget[] = [
  { id: 'B001', category: 'Food & Dining', limit: 1000, spent: 750, icon: '🍔' },
  { id: 'B002', category: 'Shopping', limit: 800, spent: 850, icon: '🛍️' },
  { id: 'B003', category: 'Transport', limit: 500, spent: 200, icon: '🚗' },
  { id: 'B004', category: 'Entertainment', limit: 300, spent: 120, icon: '🎬' },
];

export const faqs = [
  {
    question: "How do I add money to my wallet?",
    answer: "Go to 'My Wallet' page, click the 'Add Money' button, select your bank method, and follow the prompts."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use industry-standard encryption to ensure your financial data is fully protected 24/7."
  },
  {
    question: "Can I change my account currency?",
    answer: "Currently, we only support USD, but we are working on multi-currency support in upcoming updates."
  }
];

export const supportChannels = [
  { title: "Email Support", desc: "Response within 24 hours", icon: "📧" },
  { title: "Live Chat", desc: "Available 9am - 5pm", icon: "💬" },
  { title: "FAQ Center", desc: "Browse help articles", icon: "📚" }
];

export const userProfile = {
  name: "DeliFin User",
  email: "user@delifin.com",
  currency: "USD",
  theme: "Light",
  notifications: true,
};