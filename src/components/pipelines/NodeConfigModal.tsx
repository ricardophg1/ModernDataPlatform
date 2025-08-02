import React, { useState } from 'react';
import { X, Database, Code2, GitBranch } from 'lucide-react';
import { PipelineNodeData, NodeConfig } from '../../types/pipeline';

interface NodeConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: PipelineNodeData;
  onSave: (config: NodeConfig) => void;
}

export function NodeConfigModal({ isOpen, onClose, node, onSave }: NodeConfigModalProps) {
  const [config, setConfig] = useState<NodeConfig>(node.config);
  const [name, setName] = useState(node.name);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...config, name });
  };

  const renderSourceConfig = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Data Source
        </label>
        <select
          value={config.source || ''}
          onChange={(e) => setConfig({ ...config, source: e.target.value })}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select source</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="mysql">MySQL</option>
          <option value="s3">Amazon S3</option>
        </select>
      </div>

      {config.source && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Query
          </label>
          <textarea
            value={config.query || ''}
            onChange={(e) => setConfig({ ...config, query: e.target.value })}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
            placeholder="SELECT * FROM table"
          />
        </div>
      )}
    </div>
  );

  const renderTransformConfig = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Transform Type
        </label>
        <select
          value={config.transformType || ''}
          onChange={(e) => setConfig({ ...config, transformType: e.target.value })}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select type</option>
          <option value="sql">SQL Transform</option>
          <option value="python">Python Transform</option>
          <option value="aggregation">Aggregation</option>
        </select>
      </div>

      {config.transformType && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Transform Code
          </label>
          <textarea
            value={config.code || ''}
            onChange={(e) => setConfig({ ...config, code: e.target.value })}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
            placeholder="Enter transformation code"
          />
        </div>
      )}
    </div>
  );

  const renderDestinationConfig = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Destination Type
        </label>
        <select
          value={config.destinationType || ''}
          onChange={(e) => setConfig({ ...config, destinationType: e.target.value })}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select destination</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="s3">Amazon S3</option>
          <option value="redshift">Redshift</option>
        </select>
      </div>

      {config.destinationType && (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Table Name
            </label>
            <input
              type="text"
              value={config.tableName || ''}
              onChange={(e) => setConfig({ ...config, tableName: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter table name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Write Mode
            </label>
            <select
              value={config.writeMode || ''}
              onChange={(e) => setConfig({ ...config, writeMode: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="append">Append</option>
              <option value="overwrite">Overwrite</option>
              <option value="upsert">Upsert</option>
            </select>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full shadow-xl border border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            {node.type === 'source' && <Database className="h-6 w-6 text-blue-400" />}
            {node.type === 'transform' && <Code2 className="h-6 w-6 text-purple-400" />}
            {node.type === 'destination' && <GitBranch className="h-6 w-6 text-green-400" />}
            <h2 className="text-xl font-semibold text-white">Configure Node</h2>
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
              Node Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter node name"
            />
          </div>

          {node.type === 'source' && renderSourceConfig()}
          {node.type === 'transform' && renderTransformConfig()}
          {node.type === 'destination' && renderDestinationConfig()}
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
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}