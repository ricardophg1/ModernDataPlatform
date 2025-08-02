import { useState } from 'react';
import { Plus, Search, Brain, Sparkles, GitBranch, History, Play, Settings } from 'lucide-react';
import { NewModelModal, NewModelData } from './models/NewModelModal';
import { ModelTrainingView } from './models/ModelTrainingView';
import { AutoMLView } from './models/AutoMLView';
import { ModelDeploymentView } from './models/ModelDeploymentView';

interface Model {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'recommendation';
  status: 'production' | 'training' | 'development';
  metrics: {
    accuracy?: number;
    f1Score?: number;
    rmse?: number;
    mae?: number;
  };
  lastTrained: string;
  version: string;
}

export function ModelsSection() {
  const [activeView, setActiveView] = useState<'list' | 'train' | 'automl' | 'deploy'>('list');
  const [isNewModelModalOpen, setIsNewModelModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const models: Model[] = [
    {
      id: '1',
      name: 'Customer Churn Predictor',
      type: 'classification',
      status: 'production',
      metrics: {
        accuracy: 0.92,
        f1Score: 0.89
      },
      lastTrained: '2h ago',
      version: 'v2.1.0'
    },
    {
      id: '2',
      name: 'Revenue Forecaster',
      type: 'regression',
      status: 'training',
      metrics: {
        rmse: 0.15,
        mae: 0.12
      },
      lastTrained: '1d ago',
      version: 'v1.3.0'
    },
    {
      id: '3',
      name: 'Product Recommender',
      type: 'recommendation',
      status: 'development',
      metrics: {
        accuracy: 0.85
      },
      lastTrained: '3d ago',
      version: 'v1.0.0'
    }
  ];

  const handleCreateModel = (modelData: NewModelData) => {
    console.log('Creating new model:', modelData);
    setIsNewModelModalOpen(false);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'train':
        return <ModelTrainingView onBack={() => setActiveView('list')} />;
      case 'automl':
        return <AutoMLView onBack={() => setActiveView('list')} />;
      case 'deploy':
        return <ModelDeploymentView onBack={() => setActiveView('list')} />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveView('train')}
                className="bg-slate-800 p-6 rounded-lg hover:ring-2 hover:ring-blue-500/50 transition group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30">
                    <Brain className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-white">Train Model</h3>
                    <p className="text-sm text-slate-400">Create new ML model</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveView('automl')}
                className="bg-slate-800 p-6 rounded-lg hover:ring-2 hover:ring-purple-500/50 transition group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-white">AutoML</h3>
                    <p className="text-sm text-slate-400">Automated training</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveView('deploy')}
                className="bg-slate-800 p-6 rounded-lg hover:ring-2 hover:ring-green-500/50 transition group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30">
                    <GitBranch className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-white">Deploy</h3>
                    <p className="text-sm text-slate-400">Production deployment</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Models List */}
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-white">Active Models</h3>
              </div>
              <div className="divide-y divide-slate-700">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className="p-4 hover:bg-slate-700/50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          model.type === 'classification' ? 'bg-blue-500/20' :
                          model.type === 'regression' ? 'bg-purple-500/20' :
                          'bg-green-500/20'
                        }`}>
                          <Brain className={`h-5 w-5 ${
                            model.type === 'classification' ? 'text-blue-400' :
                            model.type === 'regression' ? 'text-purple-400' :
                            'text-green-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{model.name}</h4>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-slate-400 capitalize">{model.type}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-400">v{model.version}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        {/* Metrics */}
                        <div className="flex items-center space-x-4">
                          {model.metrics.accuracy && (
                            <div className="text-right">
                              <div className="text-sm text-slate-400">Accuracy</div>
                              <div className="text-white font-medium">
                                {(model.metrics.accuracy * 100).toFixed(1)}%
                              </div>
                            </div>
                          )}
                          {model.metrics.rmse && (
                            <div className="text-right">
                              <div className="text-sm text-slate-400">RMSE</div>
                              <div className="text-white font-medium">
                                {model.metrics.rmse.toFixed(3)}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            model.status === 'production' ? 'bg-green-500/20 text-green-400' :
                            model.status === 'training' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {model.status}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-slate-600 rounded-lg">
                              <Play className="h-4 w-4 text-slate-400" />
                            </button>
                            <button className="p-2 hover:bg-slate-600 rounded-lg">
                              <History className="h-4 w-4 text-slate-400" />
                            </button>
                            <button className="p-2 hover:bg-slate-600 rounded-lg">
                              <Settings className="h-4 w-4 text-slate-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Models</h1>
          <p className="text-slate-400">Train and deploy machine learning models</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models..."
              className="bg-slate-700/50 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button
            onClick={() => setIsNewModelModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <Plus className="h-5 w-5" />
            <span>New Model</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {renderMainContent()}

      {/* New Model Modal */}
      <NewModelModal
        isOpen={isNewModelModalOpen}
        onClose={() => setIsNewModelModalOpen(false)}
        onCreate={handleCreateModel}
      />
    </div>
  );
}