import React, { useState } from 'react';
import { X, Settings, Globe, Shield, Bell } from 'lucide-react';

interface TeamSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeamSettingsModal({ isOpen, onClose }: TeamSettingsModalProps) {
  const [settings, setSettings] = useState({
    teamName: 'Data Science Team',
    visibility: 'private',
    notifications: {
      newMembers: true,
      projectUpdates: true,
      mentions: true
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full shadow-xl border border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Team Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Team Name
            </label>
            <input
              type="text"
              value={settings.teamName}
              onChange={(e) => setSettings({ ...settings, teamName: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Team Visibility
            </label>
            <select
              value={settings.visibility}
              onChange={(e) => setSettings({ ...settings, visibility: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="private">Private</option>
              <option value="organization">Organization</option>
              <option value="public">Public</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-4">
              Notification Settings
            </h3>
            <div className="space-y-3">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                >
                  <span className="text-white">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [key]: e.target.checked
                      }
                    })}
                    className="rounded border-slate-600 text-blue-500 focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}