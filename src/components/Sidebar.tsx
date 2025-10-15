import React, { useEffect, useState } from 'react';
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
  CreditCard,
  MessageCircle,
  ShieldCheck,
  User
} from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import { NavigationItem } from '../types';
import { getUserDetails } from '../services/userService';
import { showToast } from '../utils/toast';
import { getSupportTicket } from '../services/SupportTicketService';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}



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
  CreditCard,
  MessageCircle,
  ShieldCheck,
  User
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const [users, setUsers] = useState<any>();
  const [tickets, setTickets] = useState<any>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {

    document.body.style.backgroundColor = theme === 'dark' ? '#111827' : '';
    document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000';
  }, [theme]);
  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
    {
      id: 'managePayment',
      label: 'Manage Payment',
      icon: 'CreditCard',
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
        { id: 'ActiveUsers', label: 'Active Users', icon: 'Users', path: '/ActiveUsers', badge: users?.active_users || 0 },
        { id: 'AllUser', label: 'All Users', icon: 'Users', path: '/AllUsers' },
        { id: 'banned', label: 'banned Users', icon: 'Users', path: '/banned', badge: users?.banned_users || 0 },
        { id: 'EmailUnverified', label: 'Email Unverified', icon: 'Users', path: '/email-unverified', badge: users?.email_unverified || 0 },
        { id: 'MobileUnverified', label: 'Mobile Unverified', icon: 'Users', path: '/mobile-unverified', badge: users?.mobile_unverified || 0 },
        { id: 'kycUnverified', label: 'Kyc Unverified', icon: 'Users', path: '/kyc-unverified', badge: users?.kyc_unverified || 0 },
        { id: 'KYCPending', label: 'KYC Pending', icon: 'Users', path: '/kyc-pending', badge: users?.kyc_pending || 0 },

      ],
    },

    {
      id: 'Support Ticket',
      label: 'Support Ticket',
      icon: 'Ticket',
      children: [
        { id: 'PendingTickets', label: 'Pending Tickets', icon: 'Users', path: '/pending-tickets', badge: tickets?.total_pending_tickets || 0 },
        { id: 'ClosedTickets', label: 'Closed Tickets', icon: 'Users', path: '/closed-tickets', badge: tickets?.total_closed_tickets || 0 },
        { id: 'AnsweredTickets', label: 'Answered Tickets', icon: 'Users', path: '/answered-tickets' },
        { id: 'SupportTickets', label: 'Support Tickets', icon: 'Users', path: '/support-tickets', badge: tickets?.total_tickets || 0 },

      ],
    },
    { id: 'assetsDetail', label: 'assetDetail', icon: 'Wallet', path: '/assets-details' },
    { id: 'admin', label: 'admin', icon: 'User', path: '/admin' },
    { id: 'Advertisements', label: 'Advertisements', icon: 'LayoutDashboard', path: '/advertisements' },
    {
      id: 'admin Verification',
      label: 'Admin Verification',
      icon: 'ShieldCheck',
      children: [
        { id: 'addresverificaiondetails', label: 'Address Verification Details', icon: 'Circle', path: '/address-verification-details' },
        { id: 'idverificaiondetails', label: 'Id Verification Details', icon: 'Circle', path: '/id-verification-details' },
      ],
    },

    { id: 'walletsDetails', label: 'Wallets Details', icon: 'Wallet', path: '/wallet-details' },

    // { id: 'users', label: 'Users', icon: 'Users', path: '/users' },
    { id: 'tradeHistory', label: 'Trade History', icon: 'Users', path: '/trade-history' },
    { id: 'feedback', label: 'feed Back', icon: 'MessageCircle', path: '/feedback' },

    { id: 'transactions', label: 'Transactions', icon: 'ArrowRightLeft', path: '/transactions-details' },
    { id: 'wallets', label: 'Wallets', icon: 'Wallet', path: '/wallet' },
    { id: 'disputes', label: 'Disputes', icon: 'MessageSquare', path: '/disputes' },
    {
      id: 'settings',
      label: 'settings',
      icon: 'Settings',
      children: [
        { id: 'settings', label: 'Settings', icon: 'Settings', path: '/setting' },
        { id: 'systemsetting', label: 'System Setting', icon: 'Circle', path: '/system-setting' },
      ],
    },




  ];

  const fetchData = async (query: string = "", page: number = 1) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const finalQuery = `page=${page}${query ? `&search=${query}` : ""
        }`;

      const data = await getUserDetails(token, finalQuery);

      const users = data?.analytics;
      setUsers(users);
    } catch (err: any) {
      showToast("error", err.message);
    }
  };


  const fetchDataTicket = async (query: string = "", page: number = 1) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const data = await getSupportTicket(token);

      setTickets(data?.analytics || []);

    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataTicket();
  }, []);

  console.log("tickets", tickets);


  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };



  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-screen `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 ">
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
      <nav className="flex-1 p-4 dark:bg-gray-800 ">
        <ul>
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = location.pathname === item.path;
            const isExpanded = expanded === item.id;

            return (
              <li key={item.id}>
                <button  
                  onClick={() => item.children ? toggleExpand(item.id) : handleNavigation(item.path!)}
                  className={`w-full flex items-center  ${isCollapsed ? 'justify-center px-' : 'justify-start px-3'}  py-2.5 rounded-lg text-left transition-colors ${isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-500'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 '
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
                  <ul className="ml-6 mt-1 space-y-1 dark:bg-gray-800 ">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <button
                          onClick={() => handleNavigation(child.path!)}
                          className={` w-full flex items-center px-3 py-2 rounded-lg text-left text-sm transition-colors ${location.pathname === child.path
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-500'
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                          <span className="ml-1">{child.label}</span>
                          {child?.badge !== undefined && child?.badge !== null && (
                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {child.badge}
                            </span>
                          )}
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
<div
  className={`${ 
    isCollapsed ? 'p-2' : 'p-4 '
  } border-t border-gray-200 dark:border-gray-700 dark:bg-gray-800`}
>
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