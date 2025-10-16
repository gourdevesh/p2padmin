import React, { useState } from 'react';
import { Search, Filter, Download, RefreshCw, ArrowUpRight, ArrowDownLeft, Eye, MoreHorizontal } from 'lucide-react';
import { Table } from '../components/Table';
import { Transaction } from '../types';
import { text } from 'stream/consumers';

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    userId: '1',
    userName: 'John Doe',
    amount: 1250.00,
    currency: 'USD',
    type: 'buy',
    status: 'completed',
    date: '2024-08-28T10:30:00Z',
    fees: 12.50
  },
  {
    id: 'TXN002',
    userId: '2',
    userName: 'Jane Smith',
    amount: 850.00,
    currency: 'USD',
    type: 'sell',
    status: 'pending',
    date: '2024-08-28T09:15:00Z',
    fees: 8.50
  },
  {
    id: 'TXN003',
    userId: '3',
    userName: 'Mike Johnson',
    amount: 2100.00,
    currency: 'USD',
    type: 'deposit',
    status: 'completed',
    date: '2024-08-28T08:45:00Z',
    fees: 0
  },
  {
    id: 'TXN004',
    userId: '4',
    userName: 'Sarah Wilson',
    amount: 500.00,
    currency: 'USD',
    type: 'withdrawal',
    status: 'failed',
    date: '2024-08-28T07:20:00Z',
    fees: 5.00
  },
  {
    id: 'TXN005',
    userId: '5',
    userName: 'Alex Brown',
    amount: 3200.00,
    currency: 'USD',
    type: 'buy',
    status: 'completed',
    date: '2024-08-27T16:30:00Z',
    fees: 32.00
  },
  {
    id: 'TXN006',
    userId: '1',
    userName: 'John Doe',
    amount: 750.00,
    currency: 'USD',
    type: 'sell',
    status: 'cancelled',
    date: '2024-08-27T14:20:00Z',
    fees: 0
  },
];

export const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState(false);
  
 const handleCopy = (textToCopy:string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // reset after 1.5s
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const badgeClasses = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[status as keyof typeof badgeClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy':
      case 'deposit':
        return <ArrowDownLeft size={16} className="text-green-500" />;
      case 'sell':
      case 'withdrawal':
        return <ArrowUpRight size={16} className="text-red-500" />;
      default:
        return <ArrowUpRight size={16} className="text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badgeClasses = {
      buy: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      sell: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      deposit: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      withdrawal: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[type as keyof typeof badgeClasses]}`}>
        {getTypeIcon(type)}
        <span className="ml-1">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </span>
    );
  };

  const handleTransactionAction = (transactionId: string, action: string) => {
    console.log(`Action: ${action} for transaction: ${transactionId}`);
  };

  const columns = [
    {
      key: 'id',
      label: 'Transaction ID',
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
      render: (value: string, row: Transaction) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
            <span className="text-primary-600 dark:text-primary-400 font-medium text-xs">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value: string) => getTypeBadge(value),
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value: number, row: Transaction) => (
        <div className="text-right">
          <p className="font-medium text-gray-900 dark:text-white">
            ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {row.currency}
          </p>
        </div>
      ),
    },
    {
      key: 'fees',
      label: 'Fees',
      sortable: true,
      render: (value: number) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          ${value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'date',
      label: 'Date',
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
      render: (value: any, row: Transaction) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleTransactionAction(row.id, 'view')}
            className="p-1 text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          {row.status === 'pending' && (
            <button
              onClick={() => handleTransactionAction(row.id, 'refresh')}
              className="p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              title="Refresh Status"
            >
              <RefreshCw size={16} />
            </button>
          )}
          <button
            onClick={() => handleTransactionAction(row.id, 'more')}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="More Actions"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      ),
    },
  ];

  const totalVolume = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalFees = filteredTransactions.reduce((sum, tx) => sum + tx.fees, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor all platform transactions and payments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Volume</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ${totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Fees</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ${totalFees.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <ArrowDownLeft className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {filteredTransactions.filter(tx => tx.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {filteredTransactions.filter(tx => tx.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
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
              placeholder="Search by transaction ID or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <Table
        columns={columns}
        data={filteredTransactions}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredTransactions.length / 10)}
        onPageChange={setCurrentPage}
      />

      {/* Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredTransactions.length} of {mockTransactions.length} transactions
      </div>
    </div>
  );
};