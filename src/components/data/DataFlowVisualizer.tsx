import React, { useState } from 'react';
import { ArrowRight, GitBranch, Database, Box, Zap, Plus, Settings, Play, AlertCircle } from 'lucide-react';

interface DataFlow {
  id: string;
  name: string;
  type: 'source' | 'transform' | 'destination';
  connections: string[];
  status?: 'active' | 'error' | 'idle';
  config?: {
    source?: {
      type: string;
      connection: string;
      table?: string;
    };
    transform?: {
      query: string;
      type: string;
    };
    destination?: {
      type: string;
      connection: string;
      table?: string;
    };
  };
}

export function DataFlowVisualizer() {
  const [flows, setFlows] = useState<DataFlow[]>([
    {
      id: '1',
      name: 'Customer Data',
      type: 'source',
      connections: ['2'],
      status: 'active',
      config: {
        source: {
          type: 'postgresql',
          connection: 'main_db',
          table: 'customers'
        }
      }
    },
    {
      id: '2',
      name: 'Data Enrichment',
      type: 'transform',
      connections: ['3'],
      status: 'active',
      config: {
        transform: {
          type: 'sql',
          query: 'SELECT * FROM customers WHERE status = "active"'
        }
      }
    },
    {
      id: '3',
      name: 'Analytics DB',
      type: 'destination',
      connections: [],
      status: 'active',
      config: {
        destination: {
          type: 'postgresql',
          connection: 'analytics_db',
          table: 'enriched_customers'
        }
      }
    }
  ]);

  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNode = (type: DataFlow['type']) => {
    const newFlow: DataFlow = {
      id: Date.now().toString(),
      name: `New ${type}`,
      type,
      connections: [],
      status: 'idle'
    };
    setFlows([...flows, newFlow]);
  };

  const handleConnect = (fromId: string, toId: string) => {
    setFlows(flows.map(flow => {
      if (flow.id === fromId) {
        return {
          ...flow,
          connections: [...flow.connections, toId]
        };
      }
      return flow;
    }));
  };

  const handleExecuteFlow = async (flowId: string) => {
    setFlows(flows.map(flow => {
      if (flow.id === flowId) {
        return { ...flow, status: 'active' };
      }
      return flow;
    }));

    // Simulate flow execution
    await new Promise(resolve => setTimeout(resolve, 2000));

    setFlows(flows.map(flow => {
      if (flow.id === flowId) {
        return { ...flow, status: Math.random() > 0.8 ? 'error' : 'active' };
      }
      return flow;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GitBranch className="h-6 w-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Data Flow Diagram</h3>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleAddNode('source')}
                className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Source</span>
              </button>
              <button
                onClick={() => handleAddNode('transform')}
                className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Transform</span>
              </button>
              <button
                onClick={() => handleAddNode('destination')}
                className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Destination</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="space-y-6">
          {flows.map((flow) => (
            <div key={flow.id} className="flex items-center space-x-4">
              <div
                className={`p-4 rounded-lg flex items-center justify-between w-64 ${
                  flow.type === 'source' ? 'bg-blue-500/20 hover:bg-blue-500/30' :
                  flow.type === 'transform' ? 'bg-purple-500/20 hover:bg-purple-500/30' :
                  'bg-green-500/20 hover:bg-green-500/30'
                } transition cursor-pointer group`}
                onClick={() => setSelectedFlow(flow.id)}
              >
                <div className="flex items-center space-x-3">
                  {flow.type === 'source' && <Database className="h-5 w-5 text-blue-400" />}
                  {flow.type === 'transform' && <Zap className="h-5 w-5 text-purple-400" />}
                  {flow.type === 'destination' && <Box className="h-5 w-5 text-green-400" />}
                  <span className="text-white">{flow.name}</span>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExecuteFlow(flow.id);
                    }}
                    className="p-1 hover:bg-slate-600 rounded"
                  >
                    <Play className="h-4 w-4 text-slate-400" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                    className="p-1 hover:bg-slate-600 rounded"
                  >
                    <Settings className="h-4 w-4 text-slate-400" />
                  </button>
                  {flow.status === 'error' && (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  )}
                </div>
              </div>
              {flow.connections.length > 0 && (
                <ArrowRight className="h-5 w-5 text-slate-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Flow Details */}
      {selectedFlow && (
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Flow Details</h3>
            <button
              onClick={() => setSelectedFlow(null)}
              className="text-slate-400 hover:text-white transition"
            >
              ×
            </button>
          </div>
          <div className="space-y-4">
            {flows.find(f => f.id === selectedFlow)?.config && (
              <pre className="bg-slate-900 p-4 rounded-lg overflow-auto text-sm text-slate-300">
                {JSON.stringify(flows.find(f => f.id === selectedFlow)?.config, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}