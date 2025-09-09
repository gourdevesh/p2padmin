// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastProvider';

import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Transactions } from './pages/Transactions';
import { Wallets } from './pages/Wallets';
import { Disputes } from './pages/Disputes';
import { Settings } from './pages/Settings';

import Login from './pages/Login';
import Register from './pages/Register';

import { KYCPendingUsers } from './pages/ManageUsers/KYCPendingUsers';
import { KYCUnverifiedUsers } from './pages/ManageUsers/KYCUnverifiedUsers';
import { MobileUnverifiedUsers } from './pages/ManageUsers/MobileUnverfiedUsers';
import { EmailUnverifiedUsers } from './pages/ManageUsers/EmailUnverifiedUsers';
import { BannedUsers } from './pages/ManageUsers/BannedUsers';
import { AllUsers } from './pages/ManageUsers/AllUsers';
import { ActiveUsers } from './pages/ManageUsers/ActiveUsers';
import { PendingTickets } from './pages/SupportTicket/PendingTickets';
import { AllSupportTickets } from './pages/SupportTicket/AllSupportTickets';
import { CloseTickets } from './pages/SupportTicket/CloseTickets';
import { AnsweredTickets } from './pages/SupportTicket/AnsweredTickets';
import ReplyTicketWrapper from './pages/SupportTicket/ReplyTicketWrapper';
import UserDetail from './pages/ManageUsers/UsersDetails';
import PaymentDetails from './pages/managePayment/PaymentDetails';
import UPIDetails from './pages/managePayment/UPIDetails';
import { AssetsDetails } from './pages/AssetsDetails/AssetsDetails';
import { Admin } from './pages/Admin/Admin';
import { Advertisements } from './pages/Advertisements/Advertisements';
import { Profile } from './pages/Profile/Profile';
import { PasswordSetting } from './pages/Profile/PasswordSetting';
import { Setting } from './pages/Setting/Setting';
import TradeHistory from './pages/TradeHistory/TradeHistory';

function AppRoutes() {
  const location = useLocation();

  // Login & Register pages should not use the main Layout
  const noLayoutRoutes = ['/login', '/register'];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="App">
      <Routes>
        {/* No Layout Pages */}
        {isNoLayout && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {/* Layout Pages */}
        {!isNoLayout && (
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />

            {/* Users Management */}
            <Route path="/ActiveUsers" element={<ActiveUsers />} />
            <Route path="/banned" element={<BannedUsers />} />
            <Route path="/AllUsers" element={<AllUsers />} />
            <Route path="/kyc-pending" element={<KYCPendingUsers />} />
            <Route path="/kyc-unverified" element={<KYCUnverifiedUsers />} />
            <Route path="/mobile-unverified" element={<MobileUnverifiedUsers />} />
            <Route path="/email-unverified" element={<EmailUnverifiedUsers />} />
            <Route path="/user-detail/:user_id" element={<UserDetail />} />

            {/* Support Tickets */}
            <Route path="/pending-tickets" element={<PendingTickets />} />
            <Route path="/support-tickets" element={<AllSupportTickets />} />
            <Route path="/closed-tickets" element={<CloseTickets />} />
            <Route path="/answered-tickets" element={<AnsweredTickets />} />
            <Route path="/reply-ticket/:ticketId" element={<ReplyTicketWrapper />} />
            <Route path="/assets-details" element={<AssetsDetails />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/advertisements" element={<Advertisements />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password-setting" element={<PasswordSetting />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/trade-history" element={<TradeHistory />} />







            {/* Payment & Wallet */}
            <Route path="/get-payment-details" element={<PaymentDetails />} />
            <Route path="/upi-details" element={<UPIDetails />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/disputes" element={<Disputes />} />

            {/* Settings */}
            <Route path="/settings" element={<Settings />} />
          </Route>
        )}

        {/* Catch-all redirect */}
        <Route path="*" element={isNoLayout ? <Login /> : <Dashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
