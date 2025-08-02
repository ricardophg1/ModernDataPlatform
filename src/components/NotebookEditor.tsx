import React, { useState } from 'react';
import { Play, Save, Download, Plus, Brain, MessageSquare, Code2, Database, Table, ChevronRight } from 'lucide-react';
import { AIAssistant } from './AIAssistant';
import { CodeCell } from './notebook/CodeCell';
import { ExecutionResult } from './notebook/CodeInterpreter';

interface Cell {
  id: string;
  type: 'markdown' | 'python' | 'sql' | 'visualization';
  content: string;
  output?: ExecutionResult;
  metadata?: {
    database?: string;
    table?: string;
    instance?: string;
  };
}

export function NotebookEditor() {
  const [cells, setCells] = useState<Cell[]>([
    {
      id: '1',
      type: 'markdown',
      content: '# Data Analysis Notebook\nUse this notebook to analyze your data with AI assistance.',
    },
  ]);
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const addCell = (type: Cell['type']) => {
    const newCell: Cell = {
      id: Date.now().toString(),
      type,
      content: '',
      metadata: type === 'sql' ? { instance: '', database: '', table: '' } : undefined
    };
    setCells([...cells, newCell]);
    setActiveCell(newCell.id);
  };

  const updateCell = (id: string, updates: Partial<Cell>) => {
    setCells(cells.map(cell => 
      cell.id === id ? { ...cell, ...updates } : cell
    ));
  };

  const executeCell = async (id: string) => {
    const cell = cells.find(c => c.id === id);
    if (!cell) return;

    // Execution is now handled by the CodeCell component
    // This method can be used for batch execution
  };

  const renderCellContent = (cell: Cell) => {
    switch (cell.type) {
      case 'python':
      case 'sql':
        return (
          <CodeCell
            id={cell.id}
            language={cell.type}
            initialCode={cell.content}
            onChange={(code) => updateCell(cell.id, { content: code })}
          />
        );
      case 'markdown':
        return (
          <textarea
            value={cell.content}
            onChange={(e) => updateCell(cell.id, { content: e.target.value })}
            placeholder="Enter markdown content..."
            className="w-full bg-transparent text-white font-mono resize-none focus:outline-none"
            rows={5}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition">
            <Play className="h-4 w-4" />
            <span>Run All</span>
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Save className="h-5 w-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Download className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className="bg-secondary/20 hover:bg-secondary/30 text-secondary px-4 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <Brain className="h-4 w-4" />
            <span>AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Add Cell Menu */}
      <div className="p-4 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => addCell('markdown')}
            className="px-3 py-1.5 rounded bg-slate-700 text-white hover:bg-slate-600 transition flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Add Text</span>
          </button>
          <button
            onClick={() => addCell('python')}
            className="px-3 py-1.5 rounded bg-slate-700 text-white hover:bg-slate-600 transition flex items-center space-x-2"
          >
            <Code2 className="h-4 w-4" />
            <span>Add Python</span>
          </button>
          <button
            onClick={() => addCell('sql')}
            className="px-3 py-1.5 rounded bg-slate-700 text-white hover:bg-slate-600 transition flex items-center space-x-2"
          >
            <Database className="h-4 w-4" />
            <span>Add SQL</span>
          </button>
          <button
            onClick={() => addCell('visualization')}
            className="px-3 py-1.5 rounded bg-slate-700 text-white hover:bg-slate-600 transition flex items-center space-x-2"
          >
            <Table className="h-4 w-4" />
            <span>Add Chart</span>
          </button>
        </div>
      </div>

      {/* Cells */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className={`bg-slate-800 rounded-lg overflow-hidden border ${
              activeCell === cell.id ? 'border-primary' : 'border-slate-700'
            }`}
            onClick={() => setActiveCell(cell.id)}
          >
            <div className="flex items-center justify-between p-2 bg-slate-700/50 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                {cell.type === 'markdown' && <MessageSquare className="h-4 w-4 text-primary" />}
                {cell.type === 'python' && <Code2 className="h-4 w-4 text-green-400" />}
                {cell.type === 'sql' && <Database className="h-4 w-4 text-secondary" />}
                {cell.type === 'visualization' && <Table className="h-4 w-4 text-orange-400" />}
                <span className="text-sm text-slate-400 capitalize">{cell.type}</span>
              </div>
            </div>
            <div className="p-4">
              {renderCellContent(cell)}
            </div>
          </div>
        ))}
      </div>

      {/* AI Assistant */}
      {showAIAssistant && <AIAssistant />}
    </div>
  );
}