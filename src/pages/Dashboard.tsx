import React from 'react';
import { Users, TrendingUp, DollarSign, AlertTriangle, Activity, ArrowUpRight } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { name: 'Jan', trades: 120, revenue: 4500 },
  { name: 'Feb', trades: 190, revenue: 6200 },
  { name: 'Mar', trades: 180, revenue: 5800 },
  { name: 'Apr', trades: 280, revenue: 8900 },
  { name: 'May', trades: 320, revenue: 10200 },
  { name: 'Jun', trades: 350, revenue: 12500 },
];

const tradeTypes = [
  { name: 'Buy Orders', value: 45, color: '#3b82f6' },
  { name: 'Sell Orders', value: 35, color: '#10b981' },
  { name: 'P2P Transfers', value: 20, color: '#f59e0b' },
];

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'Completed trade', amount: '$1,250', time: '2 minutes ago' },
  { id: 2, user: 'Jane Smith', action: 'Disputed transaction', amount: '$850', time: '5 minutes ago' },
  { id: 3, user: 'Mike Johnson', action: 'Wallet deposit', amount: '$2,100', time: '8 minutes ago' },
  { id: 4, user: 'Sarah Wilson', action: 'KYC approved', amount: '-', time: '12 minutes ago' },
  { id: 5, user: 'Alex Brown', action: 'New registration', amount: '-', time: '15 minutes ago' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your P2P platform.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Last updated</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Users"
          value="12,456"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Trades"
          value="1,234"
          change="+8% from yesterday"
          changeType="positive"
          icon={Activity}
          color="green"
        />
        <StatCard
          title="Completed Trades"
          value="45,678"
          change="+15% from last month"
          changeType="positive"
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value="$156,789"
          change="+23% from last month"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Pending Disputes"
          value="23"
          change="-5% from yesterday"
          changeType="positive"
          icon={AlertTriangle}
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Trades Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue & Trades</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">Trades</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">Revenue</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }} 
              />
              <Line type="monotone" dataKey="trades" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Trade Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Trade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tradeTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {tradeTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium flex items-center">
              View all
              <ArrowUpRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.action}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount !== '-' && (
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.amount}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};