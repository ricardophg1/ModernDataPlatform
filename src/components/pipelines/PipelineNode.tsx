import React, { useState } from 'react';
import { Database, Code2, GitBranch, Settings, Play } from 'lucide-react';

interface Node {
  id: string;
  type: 'source' | 'transform' | 'destination';
  name: string;
  position: { x: number; y: number };
}

interface PipelineNodeProps {
  node: Node;
  onDrag: (id: string, position: { x: number; y: number }) => void;
  onConnect: (fromId: string, toId: string) => void;
  onConfigure: () => void;
}

export function PipelineNode({ node, onDrag, onConnect, onConfigure }: PipelineNodeProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('nodeId', node.id);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    onDrag(node.id, {
      x: e.clientX - rect.width / 2,
      y: e.clientY - rect.height / 2
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fromId = e.dataTransfer.getData('nodeId');
    onConnect(fromId, node.id);
  };

  return (
    <div
      className={`absolute p-4 rounded-lg transition cursor-move ${
        node.type === 'source' ? 'bg-blue-500/20 border border-blue-500/50' :
        node.type === 'transform' ? 'bg-purple-500/20 border border-purple-500/50' :
        'bg-green-500/20 border border-green-500/50'
      }`}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: '300px',
        opacity: isDragging ? 0.5 : 1
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {node.type === 'source' && <Database className="h-5 w-5 text-blue-400" />}
          {node.type === 'transform' && <Code2 className="h-5 w-5 text-purple-400" />}
          {node.type === 'destination' && <GitBranch className="h-5 w-5 text-green-400" />}
          <span className="text-white font-medium">{node.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onConfigure}
            className="p-1 hover:bg-slate-600 rounded"
          >
            <Settings className="h-4 w-4 text-slate-400" />
          </button>
          <button className="p-1 hover:bg-slate-600 rounded">
            <Play className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}