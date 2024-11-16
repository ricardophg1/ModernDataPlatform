import React, { useState } from 'react';
import { Globe, Shield, CreditCard, Bell, Cloud, Database, Lock, User } from 'lucide-react';
import { GeneralSettings } from './settings/GeneralSettings';
import { SecuritySettings } from './settings/SecuritySettings';
import { BillingSettings } from './settings/BillingSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { IntegrationsSettings } from './settings/IntegrationsSettings';

export function SettingsSection() {
  const [activeSection, setActiveSection] = useState('general');

  const renderSection = () => {
    switch (activeSection) {
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return <BillingSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your workspace settings and preferences</p>
      </div>

      {/* Settings Navigation */}
      <div className="flex space-x-1 border-b border-slate-700">
        <button
          onClick={() => setActiveSection('general')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            activeSection === 'general'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <Globe className="h-4 w-4 inline-block mr-2" />
          General
        </button>
        <button
          onClick={() => setActiveSection('security')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            activeSection === 'security'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <Shield className="h-4 w-4 inline-block mr-2" />
          Security
        </button>
        <button
          onClick={() => setActiveSection('billing')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            activeSection === 'billing'
              ? 'text-green-400 border-b-2 border-green-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <CreditCard className="h-4 w-4 inline-block mr-2" />
          Billing
        </button>
        <button
          onClick={() => setActiveSection('notifications')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            activeSection === 'notifications'
              ? 'text-orange-400 border-b-2 border-orange-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <Bell className="h-4 w-4 inline-block mr-2" />
          Notifications
        </button>
        <button
          onClick={() => setActiveSection('integrations')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            activeSection === 'integrations'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <Cloud className="h-4 w-4 inline-block mr-2" />
          Integrations
        </button>
      </div>

      {/* Settings Content */}
      <div className="bg-slate-800 rounded-lg">
        {renderSection()}
      </div>
    </div>
  );
}