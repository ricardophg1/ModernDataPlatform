import React from 'react';
import { Cloud, Database, Lock } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  status: 'connected' | 'disconnected';
  type: string;
}

export function IntegrationsSettings() {
  const integrations: Integration[] = [
    {
      id: 'aws',
      name: 'AWS',
      description: 'Cloud Storage & Compute',
      icon: <Database className="h-6 w-6 text-blue-400" />,
      status: 'connected',
      type: 'Cloud Services'
    },
    {
      id: 'gcp',
      name: 'Google Cloud',
      description: 'Cloud Platform Services',
      icon: <Cloud className="h-6 w-6 text-purple-400" />,
      status: 'disconnected',
      type: 'Cloud Services'
    },
    {
      id: 'azure',
      name: 'Azure',
      description: 'Microsoft Cloud Services',
      icon: <Database className="h-6 w-6 text-blue-400" />,
      status: 'disconnected',
      type: 'Cloud Services'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Cloud Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-slate-700/50 rounded-lg p-4 hover:ring-2 hover:ring-blue-500/50 transition"
            >
              <div className="flex items-center justify-between mb-4">
                {integration.icon}
                <span className={`text-xs px-2 py-1 rounded ${
                  integration.status === 'connected'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-slate-600 text-slate-300'
                }`}>
                  {integration.status === 'connected' ? 'Connected' : 'Connect'}
                </span>
              </div>
              <h3 className="text-white font-medium mb-1">{integration.name}</h3>
              <p className="text-sm text-slate-400">{integration.description}</p>
              {integration.status === 'connected' && (
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <button className="text-sm text-red-400 hover:text-red-300 transition">
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Connection Status */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Connection Status</h3>
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-white">All systems operational</span>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">API Keys</h3>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-sm">
            Generate New Key
          </button>
        </div>
        <div className="bg-slate-700/50 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left p-4 text-slate-400">Key Name</th>
                <th className="text-left p-4 text-slate-400">Created</th>
                <th className="text-left p-4 text-slate-400">Last Used</th>
                <th className="text-right p-4 text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-600">
                <td className="p-4 text-white">Production API Key</td>
                <td className="p-4 text-slate-400">Mar 1, 2024</td>
                <td className="p-4 text-slate-400">2 hours ago</td>
                <td className="p-4 text-right">
                  <button className="text-red-400 hover:text-red-300 transition">
                    Revoke
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}