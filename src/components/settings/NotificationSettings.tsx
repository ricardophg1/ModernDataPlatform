import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, AlertCircle } from 'lucide-react';

export function NotificationSettings() {
  const [emailSettings, setEmailSettings] = useState({
    dailyDigest: true,
    weeklyReport: true,
    mentions: true,
    teamUpdates: false
  });

  const [pushSettings, setPushSettings] = useState({
    newComments: true,
    taskAssignments: true,
    statusChanges: false,
    teamAnnouncements: true
  });

  const handleEmailToggle = (key: string) => {
    setEmailSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePushToggle = (key: string) => {
    setPushSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Email Notifications */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(emailSettings).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
            >
              <div>
                <p className="text-white font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-sm text-slate-400">
                  Receive updates about your workspace activity
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleEmailToggle(key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Push Notifications</h3>
        <div className="space-y-4">
          {Object.entries(pushSettings).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
            >
              <div>
                <p className="text-white font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-sm text-slate-400">
                  Get instant notifications in your browser
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handlePushToggle(key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Alert Preferences</h3>
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Do Not Disturb</p>
              <p className="text-sm text-slate-400">
                Pause all notifications during specific hours
              </p>
            </div>
            <button className="text-orange-400 hover:text-orange-300 transition">
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}