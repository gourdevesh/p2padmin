import React, { useState } from 'react';
import { Save, Shield, DollarSign, Bell, Users, Globe, Lock, AlertCircle } from 'lucide-react';

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const settingsSections: SettingsSection[] = [
  { id: 'kyc', label: 'KYC & Verification', icon: Shield },
  { id: 'fees', label: 'Fee Management', icon: DollarSign },
  { id: 'security', label: 'Security Settings', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'users', label: 'User Settings', icon: Users },
  { id: 'platform', label: 'Platform Settings', icon: Globe },
];

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('kyc');
  const [formData, setFormData] = useState({
    // KYC Settings
    kycRequired: true,
    autoApproval: false,
    verificationLevel: 'strict',
    documentExpiration: 365,
    
    // Fee Settings
    tradingFee: 0.1,
    withdrawalFee: 5.0,
    depositFee: 0.0,
    minimumTrade: 10.0,
    
    // Security Settings
    twoFactorRequired: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    disputeAlerts: true,
    
    // User Settings
    maxActiveOrders: 10,
    tradingHoursEnabled: false,
    tradingStartHour: 9,
    tradingEndHour: 17,
    
    // Platform Settings
    maintenanceMode: false,
    registrationEnabled: true,
    tradingEnabled: true,
    supportEmail: 'support@p2p.com',
  });

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', formData);
    // Here you would typically send the data to your backend
  };

  const renderKYCSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Shield className="text-primary-600 dark:text-primary-400" size={24} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">KYC & Verification Settings</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.kycRequired}
              onChange={(e) => handleInputChange('kycRequired', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Require KYC for all users</span>
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 ml-7 mt-1">
            Users must complete identity verification before trading
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.autoApproval}
              onChange={(e) => handleInputChange('autoApproval', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Enable auto-approval</span>
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 ml-7 mt-1">
            Automatically approve KYC applications that meet criteria
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Verification Level
          </label>
          <select
            value={formData.verificationLevel}
            onChange={(e) => handleInputChange('verificationLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="strict">Strict</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Document Expiration (days)
          </label>
          <input
            type="number"
            value={formData.documentExpiration}
            onChange={(e) => handleInputChange('documentExpiration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );

  const renderFeeSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <DollarSign className="text-primary-600 dark:text-primary-400" size={24} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fee Management</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trading Fee (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.tradingFee}
            onChange={(e) => handleInputChange('tradingFee', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Withdrawal Fee ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.withdrawalFee}
            onChange={(e) => handleInputChange('withdrawalFee', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Deposit Fee ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.depositFee}
            onChange={(e) => handleInputChange('depositFee', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimum Trade Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.minimumTrade}
            onChange={(e) => handleInputChange('minimumTrade', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Lock className="text-primary-600 dark:text-primary-400" size={24} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.twoFactorRequired}
              onChange={(e) => handleInputChange('twoFactorRequired', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Require 2FA for all users</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={formData.sessionTimeout}
            onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={formData.maxLoginAttempts}
            onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimum Password Length
          </label>
          <input
            type="number"
            value={formData.passwordMinLength}
            onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );

  const renderPlatformSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Globe className="text-primary-600 dark:text-primary-400" size={24} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Platform Settings</h3>
      </div>
      
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-yellow-600 dark:text-yellow-400 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Platform Control</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                These settings affect all users and should be used carefully.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.maintenanceMode}
                onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Maintenance Mode</span>
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 ml-7 mt-1">
              Temporarily disable platform access for maintenance
            </p>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.registrationEnabled}
                onChange={(e) => handleInputChange('registrationEnabled', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Enable Registration</span>
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 ml-7 mt-1">
              Allow new users to register on the platform
            </p>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.tradingEnabled}
                onChange={(e) => handleInputChange('tradingEnabled', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Enable Trading</span>
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 ml-7 mt-1">
              Allow users to create and execute trades
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Support Email
            </label>
            <input
              type="email"
              value={formData.supportEmail}
              onChange={(e) => handleInputChange('supportEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'kyc':
        return renderKYCSettings();
      case 'fees':
        return renderFeeSettings();
      case 'security':
        return renderSecuritySettings();
      case 'platform':
        return renderPlatformSettings();
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Select a settings category from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure platform settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={18} className="mr-3" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};