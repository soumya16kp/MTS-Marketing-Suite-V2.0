# MTS Marketing Suite V2.0

A comprehensive digital marketing platform built with Next.js that provides SEO analysis, performance monitoring, and client management tools for marketing agencies.

## Features

### 🔍 SEO Optimization
- Comprehensive website audits
- Keyword research tools
- On-page SEO analysis
- Technical SEO recommendations
- Link building tracking

### 📊 Performance Analytics
- Core Web Vitals monitoring
- PageSpeed analysis
- Performance metrics tracking
- Custom reporting tools
- Real-time analytics

### 🌐 Website Audits
- Technical SEO audits
- Accessibility testing
- Security analysis
- Mobile optimization checks
- Best practices evaluation

### 👥 Client Management
- Client dashboard
- Project tracking
- Team collaboration tools
- White-label reports
- Client onboarding system

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mts-marketing-suite
```

2. Install dependencies
```bash
pnpm install
```

3. Create environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/                   # Next.js app directory
│   ├── clients/          # Client management
│   ├── dashboard/        # Analytics dashboard
│   ├── reports/         # Reporting system
│   ├── seo-audit/       # SEO analysis tools
│   └── services/        # Service offerings
├── components/          # Reusable React components
├── hooks/              # Custom React hooks
├── lib/               # Utility functions
├── public/            # Static assets
└── styles/           # Global styles
```

## Key Components

- **Audit Issues List**: Comprehensive SEO and performance issue tracking
- **Analytics Chart**: Visual representation of performance metrics
- **Dashboard Metrics**: Real-time performance monitoring
- **Client Detail View**: Detailed client information and project tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support and inquiries, please contact [support@mtsmarketing.com](mailto:support@mtsmarketing.com)