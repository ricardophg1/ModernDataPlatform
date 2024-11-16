import React, { useState } from 'react';
import { Plus, Search, GitBranch, Play, Clock, Settings, AlertCircle, Database, ArrowRight, Code2, Pause } from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  type: 'etl' | 'ml' | 'analytics';
  status: 'running' | 'completed' | 'scheduled';
  lastRun: string;
  nextRun: string;
  description: string;
}

export function PipelinesSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pipelines] = useState<Pipeline[]>([
    {
      id: '1',
      name: 'Customer Data ETL',
      type: 'etl',
      status: 'running',
      lastRun: '10m ago',
      nextRun: '50m',
      description: 'Extract, transform, load customer data'
    },
    {
      id: '2',
      name: 'ML Model Training',
      type: 'ml',
      status: 'completed',
      lastRun: '2h ago',
      nextRun: '22h',
      description: 'Train and deploy ML models'
    },
    {
      id: '3',
      name: 'Analytics Dashboard Update',
      type: 'analytics',
      status: 'scheduled',
      lastRun: '1d ago',
      nextRun: '1h',
      description: 'Process analytics data'
    }
  ]);

  const handlePipelineAction = (pipelineId: string, action: 'start' | 'pause' | 'settings') => {
    // Handle pipeline actions
    console.log(`Pipeline ${pipelineId} action: ${action}`);
  };

  const handleCreatePipeline = () => {
    // Handle pipeline creation
    console.log('Creating new pipeline');
  };

  const filteredPipelines = pipelines.filter(pipeline =>
    pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pipeline.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Data Pipelines</h1>
          <p className="text-slate-400">Build and automate data workflows</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pipelines..."
              className="bg-slate-700/50 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button 
            onClick={handleCreatePipeline}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <Plus className="h-5 w-5" />
            <span>New Pipeline</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 p-6 rounded-lg hover:ring-2 hover:ring-orange-500/50 transition group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30">
              <Database className="h-6 w-6 text-orange-400" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-white">ETL Pipeline</h3>
              <p className="text-sm text-slate-400">Extract, transform, load</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg hover:ring-2 hover:ring-orange-500/50 transition group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30">
              <Code2 className="h-6 w-6 text-orange-400" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-white">ML Pipeline</h3>
              <p className="text-sm text-slate-400">Train and deploy models</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg hover:ring-2 hover:ring-orange-500/50 transition group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30">
              <GitBranch className="h-6 w-6 text-orange-400" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-white">Analytics Pipeline</h3>
              <p className="text-sm text-slate-400">Process analytics data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Pipelines */}
      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Active Pipelines</h3>
        </div>
        <div className="divide-y divide-slate-700">
          {filteredPipelines.map((pipeline) => (
            <div
              key={pipeline.id}
              className="p-4 hover:bg-slate-700/50 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg bg-orange-500/20`}>
                    {pipeline.type === 'etl' ? (
                      <Database className="h-5 w-5 text-orange-400" />
                    ) : pipeline.type === 'ml' ? (
                      <Code2 className="h-5 w-5 text-orange-400" />
                    ) : (
                      <GitBranch className="h-5 w-5 text-orange-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{pipeline.name}</h4>
                    <p className="text-sm text-slate-400">{pipeline.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-400">Last run: {pipeline.lastRun}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-400">Next run: {pipeline.nextRun}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    pipeline.status === 'running' ? 'bg-orange-500/20 text-orange-400' :
                    pipeline.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handlePipelineAction(pipeline.id, pipeline.status === 'running' ? 'pause' : 'start')}
                      className="p-2 hover:bg-slate-600 rounded-lg"
                    >
                      {pipeline.status === 'running' ? (
                        <Pause className="h-4 w-4 text-orange-400" />
                      ) : (
                        <Play className="h-4 w-4 text-green-400" />
                      )}
                    </button>
                    <button 
                      onClick={() => handlePipelineAction(pipeline.id, 'settings')}
                      className="p-2 hover:bg-slate-600 rounded-lg"
                    >
                      <Settings className="h-4 w-4 text-slate-400" />
                    </button>
                    {pipeline.status === 'failed' && (
                      <button className="p-2 hover:bg-slate-600 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Builder */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Pipeline Builder</h3>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
            Save Pipeline
          </button>
        </div>
        <div className="h-[400px] bg-slate-900 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center">
          <div className="text-center text-slate-400">
            <GitBranch className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg">Drag and drop nodes to build your pipeline</p>
            <p className="text-sm">Connect data sources, transformations, and outputs</p>
          </div>
        </div>
      </div>
    </div>
  );
}