import React, { useState } from 'react';
import { Globe, Clock, Languages } from 'lucide-react';

export function GeneralSettings() {
  const [workspaceName, setWorkspaceName] = useState('Data Science Team');
  const [timeZone, setTimeZone] = useState('UTC');
  const [language, setLanguage] = useState('en');

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Workspace Name
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="text-blue-400 hover:text-blue-300 transition">
              Save
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Time Zone
          </label>
          <div className="flex items-center space-x-4">
            <select
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
            <button className="text-blue-400 hover:text-blue-300 transition">
              Change
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Language
          </label>
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
            <button className="text-blue-400 hover:text-blue-300 transition">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}