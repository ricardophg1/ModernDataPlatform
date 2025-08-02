import React, { useState } from 'react';
import { X, Brain, Database, GitBranch, Sparkles } from 'lucide-react';

export interface NewModelData {
  name: string;
  type: 'classification' | 'regression' | 'recommendation';
  description: string;
  dataset: string;
  target: string;
}

interface NewModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (modelData: NewModelData) => void;
}

export function NewModelModal({ isOpen, onClose, onCreate }: NewModelModalProps) {
  const [modelData, setModelData] = useState<NewModelData>({
    name: '',
    type: 'classification',
    description: '',
    dataset: '',
    target: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(modelData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full shadow-xl border border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Brain className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Create New Model</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Model Name
            </label>
            <input
              type="text"
              value={modelData.name}
              onChange={(e) => setModelData({ ...modelData, name: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter model name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Model Type
            </label>
            <select
              value={modelData.type}
              onChange={(e) => setModelData({ ...modelData, type: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="classification">Classification</option>
              <option value="regression">Regression</option>
              <option value="recommendation">Recommendation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={modelData.description}
              onChange={(e) => setModelData({ ...modelData, description: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
              placeholder="Describe your model's purpose and requirements"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Dataset
            </label>
            <select
              value={modelData.dataset}
              onChange={(e) => setModelData({ ...modelData, dataset: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a dataset</option>
              <option value="customers">Customers Dataset</option>
              <option value="transactions">Transactions Dataset</option>
              <option value="products">Products Dataset</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Target Variable
            </label>
            <input
              type="text"
              value={modelData.target}
              onChange={(e) => setModelData({ ...modelData, target: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter target variable name"
            />
          </div>
        </form>

        <div className="flex items-center justify-end space-x-4 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Create Model
          </button>
        </div>
      </div>
    </div>
  );
}