import React, { useState } from 'react';
import { Shield, Key, Lock, LogOut } from 'lucide-react';

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [activeSessions] = useState([
    {
      device: 'Chrome on Windows',
      location: 'New York, USA',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      device: 'Safari on MacOS',
      location: 'London, UK',
      lastActive: '2 days ago',
      current: false
    }
  ]);

  return (
    <div className="p-6 space-y-8">
      {/* Two-Factor Authentication */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Add an extra layer of security</p>
              <p className="text-sm text-slate-400">
                Protect your account with an additional verification step
              </p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-4 py-2 rounded-lg transition ${
                twoFactorEnabled
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-slate-600 text-white'
              }`}
            >
              {twoFactorEnabled ? 'Enabled' : 'Enable'}
            </button>
          </div>
        </div>
      </div>

      {/* Password */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Password</h3>
        <button className="bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2">
          <Key className="h-4 w-4" />
          <span>Change Password</span>
        </button>
      </div>

      {/* Active Sessions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
        <div className="space-y-4">
          {activeSessions.map((session, index) => (
            <div
              key={index}
              className="bg-slate-700/50 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-white font-medium">{session.device}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-slate-400">{session.location}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{session.lastActive}</span>
                </div>
              </div>
              {session.current ? (
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                  Current Session
                </span>
              ) : (
                <button className="text-red-400 hover:text-red-300 transition">
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}