import { useState } from 'react';
import { ArrowLeft, Brain, Play, ChevronRight } from 'lucide-react';

interface ModelTrainingViewProps {
  onBack: () => void;
}

export function ModelTrainingView({ onBack }: ModelTrainingViewProps) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  // TODO: Add hyperparameter state management when configuration is implemented
  // const [hyperparameters, setHyperparameters] = useState({});
  const [isTraining, setIsTraining] = useState(false);

  const algorithms = [
    { id: 'rf', name: 'Random Forest', type: 'classification' },
    { id: 'xgb', name: 'XGBoost', type: 'classification' },
    { id: 'lr', name: 'Linear Regression', type: 'regression' },
    { id: 'nn', name: 'Neural Network', type: 'classification' }
  ];

  const handleStartTraining = async () => {
    setIsTraining(true);
    // Simulate training process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsTraining(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-700 rounded-lg transition"
        >
          <ArrowLeft className="h-5 w-5 text-slate-400" />
        </button>
        <h2 className="text-xl font-semibold text-white">Train New Model</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Algorithm Selection */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Select Algorithm</h3>
          <div className="space-y-3">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => setSelectedAlgorithm(algo.id)}
                className={`w-full p-4 rounded-lg transition ${
                  selectedAlgorithm === algo.id
                    ? 'bg-blue-500/20 border border-blue-500'
                    : 'bg-slate-700/50 border border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-blue-400" />
                    <div className="text-left">
                      <div className="text-white font-medium">{algo.name}</div>
                      <div className="text-sm text-slate-400 capitalize">{algo.type}</div>
                    </div>
                  </div>
                  {selectedAlgorithm === algo.id && (
                    <ChevronRight className="h-5 w-5 text-blue-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Training Configuration */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Configuration</h3>
          {selectedAlgorithm ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Training Dataset
                </label>
                <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select dataset</option>
                  <option value="customers">Customers Dataset</option>
                  <option value="transactions">Transactions Dataset</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Validation Split
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="20"
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Training: 80%</span>
                  <span>Validation: 20%</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStartTraining}
                  disabled={isTraining}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isTraining ? (
                    <>
                      <Brain className="h-5 w-5 animate-pulse" />
                      <span>Training...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      <span>Start Training</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 py-8">
              Select an algorithm to configure training parameters
            </div>
          )}
        </div>
      </div>

      {/* Training Progress */}
      {isTraining && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Training Progress</h3>
          <div className="space-y-4">
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '45%' }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Epoch 45/100</span>
              <span>Loss: 0.342</span>
              <span>Accuracy: 89.5%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}