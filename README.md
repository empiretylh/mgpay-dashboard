# MG Pay - Admin Dashboard

A modern payment gateway admin dashboard built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- 🔐 **JWT Authentication** - Secure login with automatic token refresh
- 💳 **Payment Provider Management** - Support for KBZ Pay, Wave Pay, and AYA Pay
- 📊 **Analytics Dashboard** - Real-time transaction monitoring and reporting
- 🔑 **API Key Management** - Secure API token generation and management
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌙 **Dark Mode** - Full dark mode support
- 🎨 **Modern UI** - Clean, professional interface with green branding

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Default Login

The dashboard will redirect to `/login`. Use your API credentials to authenticate.

## Project Structure

```
app/
├── (dashboard)/          # Protected dashboard routes
│   ├── overview/        # Main dashboard
│   ├── transaction/     # Transaction management
│   ├── service-apps/    # API integration management
│   ├── reports/         # Financial reports
│   ├── payment-methods/ # Provider configuration
│   ├── webhook-logs/    # API & callback logs
│   ├── api-keys/        # Security management
│   ├── users/           # User management
│   └── ...
├── components/          # Reusable UI components
├── lib/
│   ├── api.ts          # API client with JWT auth
│   └── data.ts         # TypeScript types & mock data
├── login/              # Authentication page
└── providers/          # Context providers
```

## API Integration

The dashboard integrates with the MG Pay API:

- **Base URL**: `http://pg.mmgbpay.com/api`
- **Authentication**: JWT tokens (Bearer)
- **Auto-refresh**: Automatic token renewal on expiry

### Key Endpoints

- `POST /admin/login/` - Authentication
- `GET /admin/dashboard/summary/` - Dashboard metrics
- `GET /admin/transactions/` - Transaction list
- `GET /admin/service-apps/` - Service apps management
- And more...

## Features Overview

### Dashboard
- Provider balance cards (KBZ Pay, Wave Pay, AYA Pay)
- Total exported balance
- Service app performance charts
- Recent transactions

### Transaction Management
- Search and filter transactions
- Filter by service app
- Pagination support
- Status tracking (success, pending, failed)

### Service Apps
- Create and manage integrated applications
- API token management (masked display)
- Callback URL configuration
- Active/inactive status toggle

### Reports
- Transaction volume analytics
- Service app performance metrics
- Provider breakdown

### Security
- JWT authentication with auto-refresh
- API key management
- User roles and permissions
- Activity logging

## Development

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=http://pg.mmgbpay.com/api
```

## Color Scheme

- **Primary**: Green-600 (#16a34a)
- **Secondary**: Emerald-600 (#059669)
- **Accent**: Teal-600

Provider-specific colors:
- **KBZ Pay**: Blue
- **Wave Pay**: Orange
- **AYA Pay**: Purple

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - MG Pay © 2024

## Support

For technical support or questions, refer to the Help & Documentation section in the dashboard.
