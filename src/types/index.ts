import { iconMap } from "../components/Sidebar";

export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'blocked' | 'pending';
  registrationDate: string;
  lastLogin: string;
  totalTrades: number;
  kyc: 'pending' | 'approved' | 'rejected';
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  date: string;
  fees: number;
}

export interface Wallet {
  id: string;
  userId: string;
  userName: string;
  currency: string;
  balance: number;
  lockedBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  lastActivity: string;
}

export interface Dispute {
  id: string;
  tradeId: string;
  reporter: string;
  reported: string;
  category: string;
  status: 'pending' | 'investigating' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  description: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeTrades: number;
  completedTrades: number;
  totalRevenue: number;
  pendingDisputes: number;
  monthlyGrowth: number;
}
type IconKey = keyof typeof iconMap;

export interface NavigationItem {
  id: string;
  label: string;
  icon: IconKey;   // ✅ restrict to valid keys
  path?: any;
  badge?: number;
  children?: NavigationItem[];
    permission?: string;

}