import React, { useState } from 'react';
import { GitBranch, Plus, Play, Save, Clock, Settings } from 'lucide-react';

interface PipelineNode {
  id: string;
  type: string;
  name: string;
}

export function PipelineBuilder() {
  const [nodes, setNodes] = useState<PipelineNode[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addNode = (type: string) => {
    const newNode: PipelineNode = {
      id: Date.now().toString(),
      type,
      name: `${type} Node ${nodes.length + 1}`,
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Header */}
      <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Pipeline Name"
            className="bg-transparent text-white text-xl font-semibold focus:outline-none"
            defaultValue="New Pipeline"
          />
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Settings className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Clock className="h-5 w-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Save className="h-5 w-5 text-slate-400" />
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <Play className="h-4 w-4" />
            <span>{isRunning ? 'Stop' : 'Run'}</span>
          </button>
        </div>
      </div>

      {/* Node Palette */}
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-white font-medium mb-4">Add Nodes</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => addNode('source')}
            className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition flex items-center space-x-2"
          >
            <GitBranch className="h-5 w-5 text-blue-400" />
            <span className="text-white">Source</span>
          </button>
          <button
            onClick={() => addNode('transform')}
            className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition flex items-center space-x-2"
          >
            <GitBranch className="h-5 w-5 text-purple-400" />
            <span className="text-white">Transform</span>
          </button>
          <button
            onClick={() => addNode('destination')}
            className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition flex items-center space-x-2"
          >
            <GitBranch className="h-5 w-5 text-green-400" />
            <span className="text-white">Destination</span>
          </button>
        </div>
      </div>

      {/* Pipeline Canvas */}
      <div className="bg-slate-800 rounded-lg p-6 min-h-[500px]">
        {nodes.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Plus className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">Add nodes to build your pipeline</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="bg-slate-700 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <GitBranch className={`h-5 w-5 ${
                    node.type === 'source' ? 'text-blue-400' :
                    node.type === 'transform' ? 'text-purple-400' :
                    'text-green-400'
                  }`} />
                  <span className="text-white">{node.name}</span>
                </div>
                <button className="p-2 hover:bg-slate-600 rounded-lg transition">
                  <Settings className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}