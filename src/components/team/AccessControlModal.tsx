import React, { useState } from 'react';
import { X, Shield, Users, Lock } from 'lucide-react';

interface AccessControlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessControlModal({ isOpen, onClose }: AccessControlModalProps) {
  const [selectedRole, setSelectedRole] = useState('viewer');
  const [permissions, setPermissions] = useState({
    viewData: true,
    editData: false,
    manageUsers: false,
    manageSettings: false
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full shadow-xl border border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Access Control</h2>
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
            <label className="block text-sm font-medium text-slate-300 mb-4">
              Role Templates
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedRole('viewer')}
                className={`p-4 rounded-lg border text-left transition ${
                  selectedRole === 'viewer'
                    ? 'bg-blue-500/20 border-blue-500'
                    : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                }`}
              >
                <Users className="h-5 w-5 text-blue-400 mb-2" />
                <h3 className="text-white font-medium mb-1">Viewer</h3>
                <p className="text-sm text-slate-400">View-only access</p>
              </button>

              <button
                onClick={() => setSelectedRole('editor')}
                className={`p-4 rounded-lg border text-left transition ${
                  selectedRole === 'editor'
                    ? 'bg-purple-500/20 border-purple-500'
                    : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                }`}
              >
                <Lock className="h-5 w-5 text-purple-400 mb-2" />
                <h3 className="text-white font-medium mb-1">Editor</h3>
                <p className="text-sm text-slate-400">Edit and manage data</p>
              </button>

              <button
                onClick={() => setSelectedRole('admin')}
                className={`p-4 rounded-lg border text-left transition ${
                  selectedRole === 'admin'
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                }`}
              >
                <Shield className="h-5 w-5 text-green-400 mb-2" />
                <h3 className="text-white font-medium mb-1">Admin</h3>
                <p className="text-sm text-slate-400">Full access control</p>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-4">
              Custom Permissions
            </h3>
            <div className="space-y-3">
              {Object.entries(permissions).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                >
                  <span className="text-white">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setPermissions({ ...permissions, [key]: e.target.checked })}
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