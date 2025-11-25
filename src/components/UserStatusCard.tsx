import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarStatusCardProps {
  label: string;
  count: number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  path: string;
}

export const SidebarStatusCard: React.FC<SidebarStatusCardProps> = ({
  label,
  count,
  icon: Icon,
  color = 'purple',
  path
}) => {

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  };

  return (
    <a
      href={path}
      className="block bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </p>

          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {count}
          </p>
        </div>

        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </a>
  );
};
