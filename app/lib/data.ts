// MG Pay Transaction Types
export interface Transaction {
  id: number;
  service_app: number;
  service_app_name?: string;
  provider: 'KBZ Pay' | 'Wave Pay' | 'AYA Pay';
  amount: string;
  status: 'success' | 'pending' | 'failed';
  created_at: string;
  reference_id?: string;
  transaction_id?: string;
}

export interface ProviderBalance {
  provider: string;
  total_amount: string;
}

export interface ServiceAppStat {
  id: number;
  name: string;
  total_transactions: string | number;
}

export interface BalanceExport {
  id: number;
  service_app: number;
  service_app_name?: string;
  amount: string;
  description?: string;
  created_at?: string;
  export_date?: string;
}

export interface AllowedHost {
  id: number;
  service_app: number;
  service_app_name?: string;
  host_name: string;
  is_active: boolean;
  created_at?: string;
}

export interface ApiLog {
  id: number;
  provider?: string;
  method?: string;
  url?: string;
  request_data?: string;
  response_data?: string;
  status_code?: number;
  created_at: string;
}

export interface CallbackLog {
  id: number;
  service_app?: number;
  service_app_name?: string;
  provider?: string;
  payload?: string;
  status?: string;
  created_at: string;
}

export interface DashboardSummary {
  provider_balances: ProviderBalance[];
  total_exported_balance: string;
  service_app_stats: ServiceAppStat[];
}

export interface ServiceApp {
  id: number;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  contact_email: string | null;
  phone_number: string | null;
  api_token: string;
  callback_url: string;
  redirect_url: string | null;
  is_active: boolean;
  is_verified: boolean;
  allow_kbz_qr: boolean;
  allow_aya_qr: boolean;
  allow_aya_push: boolean;
  allow_wave_pay: boolean;
  created_at: string;
}

// Mock MG Pay transactions
export const mockTransactions: Transaction[] = [
  {
    id: 1,
    service_app: 1,
    service_app_name: 'E-Commerce Platform',
    provider: 'KBZ Pay',
    amount: '50000',
    status: 'success',
    created_at: '2024-03-01T10:30:00Z',
    reference_id: 'TXN001',
  },
  {
    id: 2,
    service_app: 2,
    service_app_name: 'Food Delivery App',
    provider: 'Wave Pay',
    amount: '25000',
    status: 'success',
    created_at: '2024-03-01T09:15:00Z',
    reference_id: 'TXN002',
  },
  {
    id: 3,
    service_app: 1,
    service_app_name: 'E-Commerce Platform',
    provider: 'AYA Pay',
    amount: '75000',
    status: 'pending',
    created_at: '2024-03-01T08:45:00Z',
    reference_id: 'TXN003',
  },
  {
    id: 4,
    service_app: 3,
    service_app_name: 'Ride Sharing',
    provider: 'KBZ Pay',
    amount: '15000',
    status: 'success',
    created_at: '2024-02-29T16:20:00Z',
    reference_id: 'TXN004',
  },
  {
    id: 5,
    service_app: 2,
    service_app_name: 'Food Delivery App',
    provider: 'Wave Pay',
    amount: '35000',
    status: 'failed',
    created_at: '2024-02-29T14:10:00Z',
    reference_id: 'TXN005',
  },
  {
    id: 6,
    service_app: 1,
    service_app_name: 'E-Commerce Platform',
    provider: 'KBZ Pay',
    amount: '120000',
    status: 'success',
    created_at: '2024-02-29T11:30:00Z',
    reference_id: 'TXN006',
  },
  {
    id: 7,
    service_app: 4,
    service_app_name: 'Ticketing System',
    provider: 'AYA Pay',
    amount: '45000',
    status: 'success',
    created_at: '2024-02-28T15:00:00Z',
    reference_id: 'TXN007',
  },
  {
    id: 8,
    service_app: 3,
    service_app_name: 'Ride Sharing',
    provider: 'Wave Pay',
    amount: '20000',
    status: 'success',
    created_at: '2024-02-28T13:45:00Z',
    reference_id: 'TXN008',
  },
];

// Mock dashboard summary
export const mockDashboardSummary: DashboardSummary = {
  provider_balances: [
    { provider: 'KBZ Pay', total_amount: '5250000' },
    { provider: 'Wave Pay', total_amount: '3180000' },
    { provider: 'AYA Pay', total_amount: '2890000' },
  ],
  total_exported_balance: '1500000',
  service_app_stats: [
    { id: 1, name: 'E-Commerce Platform', total_transactions: 1245 },
    { id: 2, name: 'Food Delivery App', total_transactions: 856 },
    { id: 3, name: 'Ride Sharing', total_transactions: 623 },
    { id: 4, name: 'Ticketing System', total_transactions: 412 },
  ],
};

// Mock service apps
export const mockServiceApps: ServiceApp[] = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'E-commerce test integration',
    logo_url: null,
    website_url: 'https://ecommerce.example.com',
    contact_email: 'dev@ecommerce.example.com',
    phone_number: null,
    api_token: 'mgpay_tok_xxxxxxxxxxxxxxxxxxxxxx1234',
    callback_url: 'https://ecommerce.example.com/webhook',
    redirect_url: null,
    is_active: true,
    is_verified: true,
    allow_kbz_qr: true,
    allow_aya_qr: true,
    allow_aya_push: false,
    allow_wave_pay: true,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'Food Delivery App',
    description: null,
    logo_url: null,
    website_url: null,
    contact_email: null,
    phone_number: null,
    api_token: 'mgpay_tok_xxxxxxxxxxxxxxxxxxxxxx5678',
    callback_url: 'https://fooddelivery.example.com/webhook',
    redirect_url: null,
    is_active: true,
    is_verified: false,
    allow_kbz_qr: true,
    allow_aya_qr: false,
    allow_aya_push: false,
    allow_wave_pay: false,
    created_at: '2024-01-20T14:30:00Z',
  },
  {
    id: 3,
    name: 'Ride Sharing',
    description: null,
    logo_url: null,
    website_url: null,
    contact_email: null,
    phone_number: null,
    api_token: 'mgpay_tok_xxxxxxxxxxxxxxxxxxxxxx9012',
    callback_url: 'https://rideshare.example.com/webhook',
    redirect_url: null,
    is_active: true,
    is_verified: true,
    allow_kbz_qr: true,
    allow_aya_qr: false,
    allow_aya_push: false,
    allow_wave_pay: true,
    created_at: '2024-02-01T09:15:00Z',
  },
  {
    id: 4,
    name: 'Ticketing System',
    description: null,
    logo_url: null,
    website_url: null,
    contact_email: null,
    phone_number: null,
    api_token: 'mgpay_tok_xxxxxxxxxxxxxxxxxxxxxx3456',
    callback_url: 'https://tickets.example.com/webhook',
    redirect_url: null,
    is_active: false,
    is_verified: false,
    allow_kbz_qr: true,
    allow_aya_qr: false,
    allow_aya_push: false,
    allow_wave_pay: false,
    created_at: '2024-02-10T16:45:00Z',
  },
];

// Pagination helper
export const ITEMS_PER_PAGE = 10;

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

// Format currency for Myanmar Kyat
export const formatCurrency = (amount: string | number): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num) + ' MMK';
};

// Format date
export const formatDate = (dateString?: string): string => {
  if (!dateString) return '—';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};