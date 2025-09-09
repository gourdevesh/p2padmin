import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ArrowRightLeft,
  Wallet,
  MessageSquare,
  Settings,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Circle,
  List,
  Ticket,
  CreditCard
} from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import { NavigationItem } from '../types';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
  {
    id: 'managePayment',
    label: 'Manage Payment',
    icon: 'CreditCard', // ya koi relevant icon
    children: [
      { id: 'getPaymentDetails', label: 'Payment Details', icon: 'Circle', path: '/get-payment-details' },
      { id: 'getUpiDetails', label: 'UPI Details', icon: 'Circle', path: '/upi-details' },
    ],
  },

  {
    id: 'Manage Users',
    label: 'Manage Users',
    icon: 'Users',
    children: [
      { id: 'ActiveUsers', label: 'Active Users', icon: 'Users', path: '/ActiveUsers' },
      { id: 'AllUser', label: 'All Users', icon: 'Users', path: '/AllUsers' },
      { id: 'banned', label: 'banned Users', icon: 'Users', path: '/banned' },
      { id: 'EmailUnverified', label: 'Email Unverified', icon: 'Users', path: '/email-unverified' },
      { id: 'MobileUnverified', label: 'Mobile Unverified', icon: 'Users', path: '/mobile-unverified' },
      { id: 'kycUnverified', label: 'Kyc Unverified', icon: 'Users', path: '/kyc-unverified' },
      { id: 'KYCPending', label: 'KYC Pending', icon: 'Users', path: '/kyc-pending' },

    ],
  },

  {
    id: 'Support Ticket',
    label: 'Support Ticket',
    icon: 'Ticket',
    children: [
      { id: 'PendingTickets', label: 'Pending Tickets', icon: 'Users', path: '/pending-tickets' },
      { id: 'ClosedTickets', label: 'Closed Tickets', icon: 'Users', path: '/closed-tickets' },
      { id: 'AnsweredTickets', label: 'Answered Tickets', icon: 'Users', path: '/answered-tickets' },
      { id: 'SupportTickets', label: 'Support Tickets', icon: 'Users', path: '/support-tickets' },

    ],
  },
  { id: 'assetsDetail', label: 'assetDetail', icon: 'Wallet', path: '/assets-details' },
  { id: 'admin', label: 'admin', icon: 'ArrowRightLeft', path: '/admin' },
  { id: 'Advertisements', label: 'Advertisements', icon: 'LayoutDashboard', path: '/advertisements' },



  // { id: 'users', label: 'Users', icon: 'Users', path: '/users' },
    { id: 'tradeHistory', label: 'Trade History', icon: 'Users', path: '/trade-history' },


  { id: 'transactions', label: 'Transactions', icon: 'ArrowRightLeft', path: '/transactions-details' },
  // { id: 'wallets', label: 'Wallets', icon: 'Wallet', path: '/wallets' },
  // { id: 'disputes', label: 'Disputes', icon: 'MessageSquare', path: '/disputes', badge: 3 },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/setting' },



];


export const iconMap = {
  LayoutDashboard,
  Users,
  ArrowRightLeft,
  Wallet,
  MessageSquare,
  Settings,
  Circle,
  List,
  Ticket,
  CreditCard

};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };


  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-screen`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              P2P Admin
            </h1>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul>
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = location.pathname === item.path;
            const isExpanded = expanded === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => item.children ? toggleExpand(item.id) : handleNavigation(item.path!)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-colors ${isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-500'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  <Icon size={20} />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.children && (
                        <span className="ml-auto">{isExpanded ? '▾' : '▸'}</span>
                      )}
                    </>
                  )}
                </button>

                {/* Children list */}
                {item.children && isExpanded && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <button
                          onClick={() => handleNavigation(child.path!)}
                          className={`w-full flex items-center px-3 py-2 rounded-lg text-left text-sm transition-colors ${location.pathname === child.path
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-500'
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                          <span className="ml-1">{child.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

      </nav>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          {!isCollapsed && (
            <span className="ml-3 font-medium">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};