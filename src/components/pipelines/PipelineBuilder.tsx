import React, { useState } from 'react';
import { Plus, Database, Code2, GitBranch, Settings, Play, Save, Clock, ArrowRight } from 'lucide-react';
import { PipelineNode } from './PipelineNode';
import { NodeConfigModal } from './NodeConfigModal';

interface Node {
  id: string;
  type: 'source' | 'transform' | 'destination';
  name: string;
  config: any;
  position: { x: number; y: number };
}

interface Connection {
  from: string;
  to: string;
}

export function PipelineBuilder() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState({ x: 0, y: 0 });

  const handleAddNode = (type: Node['type']) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type,
      name: `New ${type} node`,
      config: {},
      position: { x: 100, y: 100 }
    };
    setNodes([...nodes, newNode]);
  };

  const handleNodeDrag = (nodeId: string, position: { x: number; y: number }) => {
    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, position } : node
    ));
  };

  const handleNodeConnect = (fromId: string, toId: string) => {
    if (fromId !== toId) {
      setConnections([...connections, { from: fromId, to: toId }]);
    }
  };

  const handleNodeConfigure = (node: Node) => {
    setSelectedNode(node);
    setIsConfigModalOpen(true);
  };

  const handleSavePipeline = () => {
    // Save pipeline configuration
    console.log('Saving pipeline:', { nodes, connections });
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleAddNode('source')}
              className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition flex items-center space-x-2"
            >
              <Database className="h-5 w-5" />
              <span>Add Source</span>
            </button>
            <button
              onClick={() => handleAddNode('transform')}
              className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition flex items-center space-x-2"
            >
              <Code2 className="h-5 w-5" />
              <span>Add Transform</span>
            </button>
            <button
              onClick={() => handleAddNode('destination')}
              className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition flex items-center space-x-2"
            >
              <GitBranch className="h-5 w-5" />
              <span>Add Destination</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition">
              <Clock className="h-5 w-5 text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition">
              <Settings className="h-5 w-5 text-slate-400" />
            </button>
            <button
              onClick={handleSavePipeline}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
            >
              <Save className="h-5 w-5" />
              <span>Save Pipeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline Canvas */}
      <div 
        className="bg-slate-800 rounded-lg p-6 min-h-[600px] relative"
        onDragOver={(e) => {
          e.preventDefault();
          setDraggedPosition({ x: e.clientX, y: e.clientY });
        }}
      >
        {nodes.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Plus className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">Add nodes to build your pipeline</p>
            </div>
          </div>
        ) : (
          <div className="relative h-full">
            {/* Connection Lines */}
            <svg className="absolute inset-0 pointer-events-none">
              {connections.map((conn, index) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                return (
                  <line
                    key={index}
                    x1={fromNode.position.x + 150}
                    y1={fromNode.position.y + 30}
                    x2={toNode.position.x}
                    y2={toNode.position.y + 30}
                    stroke="#4B5563"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <PipelineNode
                key={node.id}
                node={node}
                onDrag={handleNodeDrag}
                onConnect={handleNodeConnect}
                onConfigure={() => handleNodeConfigure(node)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Node Configuration Modal */}
      {selectedNode && (
        <NodeConfigModal
          isOpen={isConfigModalOpen}
          onClose={() => setIsConfigModalOpen(false)}
          node={selectedNode}
          onSave={(config) => {
            setNodes(nodes.map(n =>
              n.id === selectedNode.id ? { ...n, config } : n
            ));
            setIsConfigModalOpen(false);
          }}
        />
      )}
    </div>
  );
}