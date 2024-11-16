import React, { useState } from 'react';
import { ArrowLeft, GitBranch, Play, Settings, Cloud, Server, AlertCircle, CheckCircle } from 'lucide-react';

interface ModelDeploymentViewProps {
  onBack: () => void;
}

export function ModelDeploymentView({ onBack }: ModelDeploymentViewProps) {
  const [selectedModel, setSelectedModel] = useState('');
  const [environment, setEnvironment] = useState('staging');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');

  const models = [
    {
      id: '1',
      name: 'Customer Churn Predictor',
      version: 'v2.1.0',
      accuracy: '94.2%',
      status: 'production'
    },
    {
      id: '2',
      name: 'Revenue Forecaster',
      version: 'v1.3.0',
      accuracy: '89.5%',
      status: 'staging'
    },
    {
      id: '3',
      name: 'Product Recommender',
      version: 'v1.0.0',
      accuracy: '92.1%',
      status: 'development'
    }
  ];

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentStatus('deploying');
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 3000));
      setDeploymentStatus('success');
    } catch (error) {
      setDeploymentStatus('error');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-400" />
        </button>
        <h2 className="text-xl font-semibold text-white">Deploy Model</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Model Selection */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <GitBranch className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-white">Select Model</h3>
          </div>

          <div className="space-y-3">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`w-full p-4 rounded-lg transition ${
                  selectedModel === model.id
                    ? 'bg-green-500/20 border border-green-500'
                    : 'bg-slate-700/50 border border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-white font-medium">{model.name}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-slate-400">{model.version}</span>
                      <span className="text-sm text-green-400">{model.accuracy}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    model.status === 'production' ? 'bg-green-500/20 text-green-400' :
                    model.status === 'staging' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {model.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deployment Configuration */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Cloud className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-white">Deployment Settings</h3>
          </div>

          {selectedModel ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Environment
                </label>
                <select
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="staging">Staging</option>
                  <option value="production">Production</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Compute Resources
                </label>
                <select
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="small">Small (2 vCPU, 4GB RAM)</option>
                  <option value="medium">Medium (4 vCPU, 8GB RAM)</option>
                  <option value="large">Large (8 vCPU, 16GB RAM)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Scaling
                </label>
                <select
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">No Auto-scaling</option>
                  <option value="auto">Auto-scale (1-3 instances)</option>
                  <option value="custom">Custom scaling policy</option>
                </select>
              </div>

              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isDeploying ? (
                  <>
                    <Server className="h-5 w-5 animate-pulse" />
                    <span>Deploying...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Deploy Model</span>
                  </>
                )}
              </button>

              {deploymentStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-green-400">Model deployed successfully!</p>
                </div>
              )}

              {deploymentStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="text-red-400">Deployment failed. Please try again.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Server className="h-12 w-12 text-slate-400 mb-4" />
              <p className="text-slate-400 max-w-sm">
                Select a model to configure deployment settings
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}