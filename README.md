# Solar Bazar - Public Website

A Next.js-based public website for Solar Bazar, a B2B marketplace platform for the solar power plant industry in Iran. This website displays vendors, consultants, and branch companies in an attractive, card-based layout.

## 🌟 Features

- **Modern Stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Beautiful UI**: Shadcn/ui components with custom Solar Bazar theme
- **RTL Support**: Full Persian language support with RTL layout
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: React Query for data fetching with caching
- **SEO Optimized**: Meta tags and semantic HTML
- **Accessible**: WCAG 2.1 compliance considerations

### Core Features

- 🏠 **Home Page** - Featured vendors and consultants with statistics
- 🏢 **Vendors Listing** - Complete list with filtering and search
- 👔 **Consultants Listing** - Directory of verified consultants
- 🏭 **Branch Companies** - List of approved branch companies
- 🔍 **Advanced Filters** - Filter by status, search by name, featured only
- 📄 **Detail Pages** - Comprehensive company information
- 📱 **Mobile Menu** - Responsive navigation for mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Backend API running (default: `http://localhost:8000/api/v1`)

### Installation

1. **Navigate to the project directory**
```bash
cd "/home/saeed/projects/Synergy Fund/f&b v2 online/solar-bazar/public-website"
```

2. **Install dependencies**
```bash
# Run the installation script
./INSTALL_COMMANDS.sh

# OR install manually
npm install @tanstack/react-query @tanstack/react-query-devtools zustand react-hook-form zod @hookform/resolvers lucide-react next-intl axios clsx tailwind-merge

# Initialize Shadcn/ui
npx shadcn@latest init

# Add UI components
npx shadcn@latest add button card input badge label checkbox separator alert
```

3. **Configure environment variables**

Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
public-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── vendors/                 # Vendors section
│   ├── consultants/             # Consultants section
│   ├── branch-companies/        # Branch companies section
│   ├── about/                   # About page
│   └── not-found.tsx           # 404 page
│
├── components/
│   ├── layout/                  # Header, Footer, Navigation
│   ├── company/                 # Company-specific components
│   ├── shared/                  # Reusable components
│   ├── providers/               # React Query provider
│   └── ui/                      # Shadcn/ui components
│
├── lib/
│   ├── api/                     # API client & React Query hooks
│   ├── utils/                   # Utility functions
│   └── constants/               # App constants
│
├── types/                       # TypeScript definitions
├── messages/                    # i18n translations
└── public/                      # Static assets
```

## 🎨 Design System

### Colors

- **Primary** (Blue): Professional solar industry
- **Secondary** (Green): Solar/renewable energy theme
- **Accent** (Yellow/Gold): Energy theme
- **Neutral**: Clean, modern grays

### Typography

- Persian: Vazirmatn (via system fonts)
- English: Inter
- RTL layout by default

### Components

All components follow the Shadcn/ui design system with Solar Bazar customizations.

## 📊 API Integration

The website connects to the Django backend API for all data:

### Endpoints Used

- `GET /api/v1/vendors/` - List vendors
- `GET /api/v1/vendors/slug/{slug}/` - Vendor details
- `GET /api/v1/consultants/` - List consultants
- `GET /api/v1/consultants/slug/{slug}/` - Consultant details
- `GET /api/v1/branch-companies/` - List branch companies
- `GET /api/v1/branch-companies/slug/{slug}/` - Branch company details
- `GET /api/v1/stats/` - Platform statistics

### Query Parameters

- `page` - Pagination
- `search` - Search by name
- `status` - Filter by status (active/inactive/expired)
- `is_featured` - Show only featured companies

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier formatting (via Tailwind)
- Component-based architecture

## 🔧 Configuration

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Tailwind Configuration

Custom colors are defined in `app/globals.css` using Tailwind v4 syntax.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📝 Documentation

- [Installation Guide](./INSTALLATION.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Implementation Status](./IMPLEMENTATION_STATUS.md)
- [Quick Start Guide](./QUICK_START.md)

## 🐛 Troubleshooting

### Dependencies Won't Install

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues

1. Check backend is running: `http://localhost:8000`
2. Verify `.env.local` has correct API URL
3. Check CORS settings in Django backend

### Build Errors

```bash
# Clean Next.js cache
rm -rf .next

# Rebuild
npm run build
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
vercel deploy
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`: Your production API URL

## 📄 License

Proprietary - Solar Bazar

## 👥 Team

Developed for Solar Bazar - Solar Industry Directory Platform

## 📞 Support

For issues or questions:
- Email: info@solarbazar.ir
- Phone: 021-12345678

---

**Status**: ✅ Ready for development (requires dependency installation)

**Version**: 1.0.0

**Last Updated**: 2024
