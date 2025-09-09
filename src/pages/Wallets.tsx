import React, { useState } from 'react';
import { Search, Filter, Download, Wallet as WalletIcon, Lock, TrendingUp, TrendingDown, Eye, MoreHorizontal } from 'lucide-react';
import { Table } from '../components/Table';
import { Wallet } from '../types';

const mockWallets: Wallet[] = [
  {
    id: 'W001',
    userId: '1',
    userName: 'John Doe',
    currency: 'USD',
    balance: 5420.75,
    lockedBalance: 1250.00,
    totalDeposits: 15000.00,
    totalWithdrawals: 8329.25,
    lastActivity: '2024-08-28T10:30:00Z'
  },
  {
    id: 'W002',
    userId: '2',
    userName: 'Jane Smith',
    currency: 'USD',
    balance: 2150.50,
    lockedBalance: 850.00,
    totalDeposits: 8500.00,
    totalWithdrawals: 5499.50,
    lastActivity: '2024-08-28T09:15:00Z'
  },
  {
    id: 'W003',
    userId: '3',
    userName: 'Mike Johnson',
    currency: 'USD',
    balance: 12750.25,
    lockedBalance: 0,
    totalDeposits: 25000.00,
    totalWithdrawals: 12249.75,
    lastActivity: '2024-08-28T08:45:00Z'
  },
  {
    id: 'W004',
    userId: '4',
    userName: 'Sarah Wilson',
    currency: 'USD',
    balance: 750.00,
    lockedBalance: 0,
    totalDeposits: 2000.00,
    totalWithdrawals: 1250.00,
    lastActivity: '2024-08-27T16:20:00Z'
  },
  {
    id: 'W005',
    userId: '5',
    userName: 'Alex Brown',
    currency: 'USD',
    balance: 18920.80,
    lockedBalance: 3200.00,
    totalDeposits: 45000.00,
    totalWithdrawals: 22879.20,
    lastActivity: '2024-08-28T07:10:00Z'
  },
];

export const Wallets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredWallets = mockWallets.filter(wallet => {
    const matchesSearch = wallet.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallet.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCurrency = currencyFilter === 'all' || wallet.currency === currencyFilter;
    
    return matchesSearch && matchesCurrency;
  });

  const handleWalletAction = (walletId: string, action: string) => {
    console.log(`Action: ${action} for wallet: ${walletId}`);
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const columns = [
    {
      key: 'id',
      label: 'Wallet ID',
      sortable: true,
      render: (value: string) => (
        <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
          {value}
        </span>
      ),
    },
    {
      key: 'userName',
      label: 'User',
      sortable: true,
      render: (value: string, row: Wallet) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
            <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.currency} Wallet</p>
          </div>
        </div>
      ),
    },
    {
      key: 'balance',
      label: 'Available Balance',
      sortable: true,
      render: (value: number, row: Wallet) => (
        <div className="text-right">
          <p className="font-bold text-lg text-green-600 dark:text-green-400">
            {formatCurrency(value, row.currency)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Available
          </p>
        </div>
      ),
    },
    {
      key: 'lockedBalance',
      label: 'Locked Balance',
      sortable: true,
      render: (value: number, row: Wallet) => (
        <div className="text-right">
          <p className="font-medium text-amber-600 dark:text-amber-400">
            {formatCurrency(value, row.currency)}
          </p>
          {value > 0 && (
            <div className="flex items-center justify-end mt-1">
              <Lock size={12} className="text-amber-500 mr-1" />
              <span className="text-xs text-amber-500">Locked</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'totalDeposits',
      label: 'Total Deposits',
      sortable: true,
      render: (value: number, row: Wallet) => (
        <div className="text-right">
          <div className="flex items-center justify-end">
            <TrendingUp size={14} className="text-green-500 mr-1" />
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(value, row.currency)}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'totalWithdrawals',
      label: 'Total Withdrawals',
      sortable: true,
      render: (value: number, row: Wallet) => (
        <div className="text-right">
          <div className="flex items-center justify-end">
            <TrendingDown size={14} className="text-red-500 mr-1" />
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(value, row.currency)}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'lastActivity',
      label: 'Last Activity',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm">
          <p className="text-gray-900 dark:text-white">
            {new Date(value).toLocaleDateString()}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: Wallet) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleWalletAction(row.id, 'view')}
            className="p-1 text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleWalletAction(row.id, 'freeze')}
            className="p-1 text-gray-400 hover:text-amber-500 dark:hover:text-amber-400"
            title="Freeze Wallet"
          >
            <Lock size={16} />
          </button>
          <button
            onClick={() => handleWalletAction(row.id, 'more')}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="More Actions"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      ),
    },
  ];

  const totalBalance = filteredWallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const totalLocked = filteredWallets.reduce((sum, wallet) => sum + wallet.lockedBalance, 0);
  const totalDeposits = filteredWallets.reduce((sum, wallet) => sum + wallet.totalDeposits, 0);
  const totalWithdrawals = filteredWallets.reduce((sum, wallet) => sum + wallet.totalWithdrawals, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wallet Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor user wallets, balances, and transaction history
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Balance</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(totalBalance)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <WalletIcon className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Locked Funds</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {formatCurrency(totalLocked)}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
              <Lock className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Deposits</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(totalDeposits)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Withdrawals</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(totalWithdrawals)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="text-red-600 dark:text-red-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by user name or wallet ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Currency Filter */}
          <div className="relative">
            <select
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Currencies</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Wallets Table */}
      <Table
        columns={columns}
        data={filteredWallets}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredWallets.length / 10)}
        onPageChange={setCurrentPage}
      />

      {/* Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredWallets.length} of {mockWallets.length} wallets
      </div>
    </div>
  );
};