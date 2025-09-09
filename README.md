# P2P Admin Dashboard

A modern, responsive admin dashboard template for P2P trading platforms built with React, TypeScript, and Tailwind CSS.

## Features

### 🎨 Modern UI/UX
- Clean, minimal design with soft shadows and rounded corners
- Dark/Light mode support with smooth transitions
- Responsive design optimized for desktop, tablet, and mobile
- Professional color scheme with primary blue and gray tones

### 📊 Dashboard Overview
- Statistics cards showing key metrics (users, trades, revenue, disputes)
- Interactive charts using Recharts library
- Recent activity feed
- Real-time data visualization

### 👥 User Management
- Comprehensive user table with search and filtering
- User status management (active, blocked, pending)
- KYC status tracking and management
- Bulk actions and individual user controls

### 💰 Transaction Management
- Transaction history with detailed information
- Status badges (completed, pending, failed, cancelled)
- Transaction type indicators (buy, sell, deposit, withdrawal)
- Advanced filtering and search capabilities

### 💳 Wallet Management
- Real-time wallet balances and locked funds
- Deposit and withdrawal tracking
- Multi-currency support
- Wallet freeze and control functions

### 🛡️ Dispute Center
- Ticket-based dispute resolution system
- Priority levels (high, medium, low)
- Status tracking (pending, investigating, resolved, escalated)
- Category-based organization

### ⚙️ Settings Management
- KYC and verification settings
- Fee management and configuration
- Security settings and controls
- Platform-wide configuration options

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS 4.x
- **Routing:** React Router DOM 6
- **Charts:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Create React App

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd p2p-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Navbar.tsx      # Top navigation bar
│   ├── StatCard.tsx    # Statistics card component
│   └── Table.tsx       # Reusable table component
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Dark/light mode context
├── pages/              # Main page components
│   ├── Dashboard.tsx   # Dashboard overview
│   ├── Users.tsx       # User management
│   ├── Transactions.tsx # Transaction history
│   ├── Wallets.tsx     # Wallet management
│   ├── Disputes.tsx    # Dispute center
│   └── Settings.tsx    # Settings page
├── types/              # TypeScript type definitions
│   └── index.ts        # Common types and interfaces
└── App.tsx            # Main app component
```

## Key Components

### Layout Components
- **Layout**: Main wrapper with responsive sidebar and mobile navigation
- **Sidebar**: Collapsible navigation with theme toggle
- **Navbar**: Top bar with search and notifications

### Data Components
- **Table**: Reusable table with sorting, pagination, and filtering
- **StatCard**: Statistics display cards with icons and change indicators

### Page Components
Each page is fully featured with:
- Search and filtering capabilities
- Real-time data updates
- Mobile-responsive design
- Action buttons and modals

## Customization

### Theme Colors
Update the color palette in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      }
    }
  }
}
```

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route to `App.tsx`
3. Update the sidebar navigation in `components/Sidebar.tsx`

## Features Implemented

✅ Responsive sidebar navigation with collapse functionality  
✅ Dark/light mode toggle with persistent storage  
✅ Statistics cards with real-time data  
✅ Interactive charts and data visualization  
✅ Comprehensive table components with pagination  
✅ Search and filtering across all data tables  
✅ User management with status controls  
✅ Transaction history with detailed information  
✅ Wallet management with balance tracking  
✅ Dispute resolution system  
✅ Settings panel with form controls  
✅ Mobile-first responsive design  
✅ TypeScript for type safety  
✅ Modern UI with Tailwind CSS  

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
