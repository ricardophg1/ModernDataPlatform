import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Play, Clock, Settings, Brain, ChevronRight, BarChart2 } from 'lucide-react';

interface AutoMLViewProps {
  onBack: () => void;
}

export function AutoMLView({ onBack }: AutoMLViewProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [config, setConfig] = useState({
    timeLimit: '1',
    metric: 'accuracy',
    optimization: 'speed',
    dataset: ''
  });

  const handleStartAutoML = async () => {
    setIsRunning(true);
    // Simulate AutoML process with progress updates
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setIsRunning(false);
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
        <h2 className="text-xl font-semibold text-white">AutoML Training</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Brain className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium text-white">Configuration</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Dataset
              </label>
              <select
                value={config.dataset}
                onChange={(e) => setConfig({ ...config, dataset: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select dataset</option>
                <option value="customers">Customer Data</option>
                <option value="transactions">Transaction History</option>
                <option value="products">Product Catalog</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Time Limit (hours)
              </label>
              <input
                type="number"
                value={config.timeLimit}
                onChange={(e) => setConfig({ ...config, timeLimit: e.target.value })}
                min="1"
                max="24"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Optimization Metric
              </label>
              <select
                value={config.metric}
                onChange={(e) => setConfig({ ...config, metric: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="accuracy">Accuracy</option>
                <option value="f1">F1 Score</option>
                <option value="auc">AUC-ROC</option>
                <option value="rmse">RMSE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Optimization Priority
              </label>
              <select
                value={config.optimization}
                onChange={(e) => setConfig({ ...config, optimization: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="speed">Speed</option>
                <option value="accuracy">Accuracy</option>
                <option value="balanced">Balanced</option>
              </select>
            </div>

            <button
              onClick={handleStartAutoML}
              disabled={isRunning || !config.dataset}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-lg transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isRunning ? (
                <>
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span>Training in Progress...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Start AutoML Training</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress & Results */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <BarChart2 className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-white">Training Progress</h3>
          </div>

          {isRunning ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>{progress}% Complete</span>
                  <span>{Math.ceil((100 - progress) / 20)}h remaining</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Current Best Model</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white">XGBoost Classifier</span>
                    <span className="text-green-400">94.2% Accuracy</span>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Models Evaluated</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'XGBoost', score: '94.2%' },
                      { name: 'Random Forest', score: '92.8%' },
                      { name: 'LightGBM', score: '91.5%' }
                    ].map((model, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{model.name}</span>
                        <span className="text-green-400">{model.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Sparkles className="h-12 w-12 text-purple-400 mb-4" />
              <p className="text-slate-400 max-w-sm">
                Configure your AutoML settings and start training to see real-time progress and results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}