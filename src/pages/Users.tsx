import React, { useState } from 'react';
import { Search, Filter, Download, Plus, MoreHorizontal, Shield, ShieldX, Eye, Mail } from 'lucide-react';
import { Table } from '../components/Table';
import { User } from '../types';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-08-28',
    totalTrades: 45,
    kyc: 'approved'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'blocked',
    registrationDate: '2024-02-20',
    lastLogin: '2024-08-25',
    totalTrades: 12,
    kyc: 'pending'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2024-08-28',
    totalTrades: 78,
    kyc: 'approved'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    status: 'pending',
    registrationDate: '2024-08-20',
    lastLogin: '2024-08-27',
    totalTrades: 3,
    kyc: 'rejected'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    status: 'active',
    registrationDate: '2024-01-05',
    lastLogin: '2024-08-28',
    totalTrades: 156,
    kyc: 'approved'
  },
];

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [kycFilter, setKycFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesKyc = kycFilter === 'all' || user.kyc === kycFilter;
    
    return matchesSearch && matchesStatus && matchesKyc;
  });

  const getStatusBadge = (status: string) => {
    const badgeClasses = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      blocked: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    };
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[status as keyof typeof badgeClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getKycBadge = (kyc: string) => {
    const badgeClasses = {
      approved: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    };
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[kyc as keyof typeof badgeClasses]}`}>
        {kyc.charAt(0).toUpperCase() + kyc.slice(1)}
      </span>
    );
  };

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action: ${action} for user: ${userId}`);
  };

  const columns = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (value: string, row: User) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
            <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
              {row.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'kyc',
      label: 'KYC',
      sortable: true,
      render: (value: string) => getKycBadge(value),
    },
    {
      key: 'totalTrades',
      label: 'Total Trades',
      sortable: true,
    },
    {
      key: 'registrationDate',
      label: 'Registration',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: User) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleUserAction(row.id, 'view')}
            className="p-1 text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleUserAction(row.id, 'contact')}
            className="p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            title="Send Email"
          >
            <Mail size={16} />
          </button>
          {row.status === 'active' ? (
            <button
              onClick={() => handleUserAction(row.id, 'block')}
              className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              title="Block User"
            >
              <ShieldX size={16} />
            </button>
          ) : (
            <button
              onClick={() => handleUserAction(row.id, 'unblock')}
              className="p-1 text-gray-400 hover:text-green-500 dark:hover:text-green-400"
              title="Unblock User"
            >
              <Shield size={16} />
            </button>
          )}
          <button
            onClick={() => handleUserAction(row.id, 'more')}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="More Actions"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and monitor all registered users
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
            <Plus size={16} className="mr-2" />
            Add User
          </button>
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
              placeholder="Search users by name or email..."
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
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
              <option value="pending">Pending</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* KYC Filter */}
          <div className="relative">
            <select
              value={kycFilter}
              onChange={(e) => setKycFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All KYC</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <Table
        columns={columns}
        data={filteredUsers}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / 10)}
        onPageChange={setCurrentPage}
      />

      {/* Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredUsers.length} of {mockUsers.length} users
      </div>
    </div>
  );
};