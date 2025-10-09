// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
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
import SystemSettings from './pages/Setting/SystemSetting';
import AddAdmin from './pages/Admin/AddAdmin';
import { DisputeDetail } from './pages/DisputeDetails';
import WalletPaymentCards from './pages/managePayment/WalletPaymentCards';
import GlobalPaymentForm from './pages/GlobalPayment';
import CurrencyWisePaymentForm from './pages/CurrencyWisePaymentForm';
import InternationalPaymentForm from './pages/InternationalPaymentForm';
import UpiPaymentForm from './pages/UpiPaymentForm';
import { AddressVerificationDetails } from './pages/AdminVerificationDetails/AddressVerificationDetails';
import { VerificationDetails } from './pages/AdminVerificationDetails/VerificationDetails';
import WebsideUpdateDetails from './pages/WebsideDetailsUpdate/WebsideUpdateDetails';
import UpdateWebsiteLogoFavicon from './pages/WebsideDetailsUpdate/UpdateWebsiteLogoFavicon';
import { ProtectedRoute } from './utils/ProtectedRoute';

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
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
          <Route path="/system-setting" element={<SystemSettings />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/dispute-details" element={<DisputeDetail />} />
          <Route path="/wallet" element={<WalletPaymentCards />} />
          <Route path="/global-payment" element={<GlobalPaymentForm />} />
          <Route path="/currency-payment" element={<CurrencyWisePaymentForm />} />
          <Route path="/international-payment" element={<InternationalPaymentForm />} />
          <Route path="/upi-payment" element={<UpiPaymentForm />} />
          <Route path="/address-verification-details" element={<AddressVerificationDetails />} />
          <Route path="/id-verification-details" element={<VerificationDetails />} />
          <Route path="/WebsideUpdateDetails" element={<WebsideUpdateDetails />} />
          <Route path="/UpdateWebsiteLogoFavicon" element={<UpdateWebsiteLogoFavicon />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
