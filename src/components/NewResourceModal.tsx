import React, { useState } from 'react';
import { X, FileCode, BarChart2, GitBranch, Database, Terminal, Brain, Sparkles } from 'lucide-react';

interface ResourceData {
  type: string;
}

interface NewResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateResource: (resource: ResourceData) => void;
}

export function NewResourceModal({ isOpen, onClose, onCreateResource }: NewResourceModalProps) {
  const [selectedType, setSelectedType] = useState('');

  if (!isOpen) return null;

  const resourceTypes = [
    {
      id: 'query',
      name: 'SQL Query',
      description: 'Write and execute SQL queries with AI assistance',
      icon: <Terminal className="h-6 w-6 text-blue-400" />,
      aiFeatures: ['Query optimization', 'Schema suggestions', 'Natural language to SQL']
    },
    {
      id: 'notebook',
      name: 'AI Notebook',
      description: 'Interactive notebooks with Python, SQL, and visualizations',
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      aiFeatures: ['Code generation', 'Data analysis suggestions', 'Automated documentation']
    },
    {
      id: 'dashboard',
      name: 'Analytics Dashboard',
      description: 'Create interactive dashboards and visualizations',
      icon: <BarChart2 className="h-6 w-6 text-green-400" />,
      aiFeatures: ['Chart recommendations', 'Insight generation', 'Automated reporting']
    },
    {
      id: 'pipeline',
      name: 'Data Pipeline',
      description: 'Build automated data workflows and transformations',
      icon: <GitBranch className="h-6 w-6 text-orange-400" />,
      aiFeatures: ['Pipeline optimization', 'Error detection', 'Performance insights']
    }
  ];

  const handleCreate = (type: string) => {
    onCreateResource({ type });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl max-w-4xl w-full shadow-xl border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Database className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Create New Resource</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => handleCreate(type.id)}
                className="bg-slate-700/50 rounded-lg p-6 hover:bg-slate-700 transition-all cursor-pointer border border-slate-600 hover:border-blue-500/50 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-slate-900 transition-all">
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{type.name}</h3>
                    <p className="text-slate-300 mb-4">{type.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-slate-400">AI-Powered Features:</span>
                      </div>
                      <ul className="space-y-1">
                        {type.aiFeatures.map((feature, index) => (
                          <li key={index} className="text-sm text-slate-300 flex items-center space-x-2">
                            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-700 bg-slate-800/50">
          <p className="text-sm text-slate-400">
            All resources include AI assistance and real-time collaboration
          </p>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}