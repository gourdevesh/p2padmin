import React, { useState } from 'react';
import { Search, Filter, Plus, AlertTriangle, Clock, CheckCircle, Eye, MessageCircle, User, MoreHorizontal } from 'lucide-react';
import { Table } from '../components/Table';
import { Dispute } from '../types';
import { useNavigate } from 'react-router-dom';

const mockDisputes: Dispute[] = [
  {
    id: 'DSP001',
    tradeId: 'TXN001',
    reporter: 'John Doe',
    reported: 'Jane Smith',
    category: 'Payment Issue',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-08-28T09:30:00Z',
    description: 'Payment was not received after completing the trade. Seller is not responding to messages.'
  },
  {
    id: 'DSP002',
    tradeId: 'TXN045',
    reporter: 'Mike Johnson',
    reported: 'Sarah Wilson',
    category: 'Fraudulent Activity',
    status: 'investigating',
    priority: 'high',
    createdAt: '2024-08-27T14:20:00Z',
    description: 'Suspicious activity detected. Multiple failed verification attempts.'
  },
  {
    id: 'DSP003',
    tradeId: 'TXN032',
    reporter: 'Alex Brown',
    reported: 'Chris Davis',
    category: 'Communication',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-08-25T11:15:00Z',
    description: 'User was unresponsive during trade negotiation phase.'
  },
  {
    id: 'DSP004',
    tradeId: 'TXN067',
    reporter: 'Emma Wilson',
    reported: 'David Lee',
    category: 'Terms Violation',
    status: 'escalated',
    priority: 'medium',
    createdAt: '2024-08-26T16:45:00Z',
    description: 'Trade terms were not followed as agreed upon in the initial contract.'
  },
  {
    id: 'DSP005',
    tradeId: 'TXN089',
    reporter: 'Tom Brown',
    reported: 'Lisa Garcia',
    category: 'Technical Issue',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-08-28T08:10:00Z',
    description: 'Platform error occurred during trade execution causing financial discrepancy.'
  },
];

export const Disputes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredDisputes = mockDisputes.filter(dispute => {
    const matchesSearch = dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.reported.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.tradeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || dispute.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || dispute.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        icon: Clock,
        label: 'Pending'
      },
      investigating: { 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        icon: Eye,
        label: 'Investigating'
      },
      resolved: { 
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        icon: CheckCircle,
        label: 'Resolved'
      },
      escalated: { 
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        icon: AlertTriangle,
        label: 'Escalated'
      },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const StatusIcon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <StatusIcon size={12} className="mr-1" />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800',
    };
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${priorityClasses[priority as keyof typeof priorityClasses]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const handleDisputeAction = (disputeId: string, action: string) => {
    console.log(`Action: ${action} for dispute: ${disputeId}`);
navigate('/dispute-details');
    // Implement action handling logic here (e.g., navigate to detail page, open modal, etc.)
  };

  const columns = [
    {
      key: 'id',
      label: 'Dispute ID',
      sortable: true,
      render: (value: string) => (
        <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
          {value}
        </span>
      ),
    },
    {
      key: 'tradeId',
      label: 'Trade ID',
      sortable: true,
      render: (value: string) => (
        <span className="font-mono text-sm text-primary-600 dark:text-primary-400 hover:underline cursor-pointer">
          {value}
        </span>
      ),
    },
    {
      key: 'reporter',
      label: 'Dispute Details',
      render: (value: string, row: Dispute) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <User size={12} className="text-gray-400 mr-1" />
            <span className="font-medium text-gray-900 dark:text-white">Reporter: {value}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <User size={12} className="text-gray-400 mr-1" />
            <span>Reported: {row.reported}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md">
          {value}
        </span>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (value: string) => getPriorityBadge(value),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'createdAt',
      label: 'Created',
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
      render: (value: any, row: Dispute) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDisputeAction(row.id, 'view')}
            className="p-1 text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleDisputeAction(row.id, 'message')}
            className="p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            title="Send Message"
          >
            <MessageCircle size={16} />
          </button>
          {row.status === 'pending' && (
            <button
              onClick={() => handleDisputeAction(row.id, 'escalate')}
              className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              title="Escalate"
            >
              <AlertTriangle size={16} />
            </button>
          )}
          <button
            onClick={() => handleDisputeAction(row.id, 'more')}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="More Actions"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      ),
    },
  ];

  const pendingCount = filteredDisputes.filter(d => d.status === 'pending').length;
  const investigatingCount = filteredDisputes.filter(d => d.status === 'investigating').length;
  const highPriorityCount = filteredDisputes.filter(d => d.priority === 'high').length;
  const resolvedCount = filteredDisputes.filter(d => d.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dispute Center</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and resolve user disputes and conflicts
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
            <Plus size={16} className="mr-2" />
            New Dispute
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {pendingCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Investigating</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {investigatingCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Eye className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {highPriorityCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {resolvedCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search disputes..."
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
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 w-full text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 w-full text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 w-full text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Fraudulent Activity">Fraudulent Activity</option>
              <option value="Communication">Communication</option>
              <option value="Terms Violation">Terms Violation</option>
              <option value="Technical Issue">Technical Issue</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Disputes Table */}
      <Table
        columns={columns}
        data={filteredDisputes}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredDisputes.length / 10)}
        onPageChange={setCurrentPage}
      />

      {/* Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredDisputes.length} of {mockDisputes.length} disputes
      </div>
    </div>
  );
};