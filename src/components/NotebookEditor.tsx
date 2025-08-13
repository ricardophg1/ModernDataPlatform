import { useState, useRef } from 'react';
import { Play, Upload, Download, Brain, MessageSquare, Code2, Database, Table, Trash2 } from 'lucide-react';
// import { Plus, ChevronRight } from 'lucide-react'; // Icons planned for future toolbar/navigation features
import ReactMarkdown from 'react-markdown';
import { AIAssistant } from './AIAssistant';
import { CodeCell } from './notebook/CodeCell';

// Note: ExecutionResult is no longer needed here as CodeInterpreter manages its own output.
// We will define a simpler Cell type for the editor's state.
interface Cell {
  id: string;
  type: 'markdown' | 'python' | 'sql' | 'visualization';
  content: string;
  // output and metadata will be managed within the cell components or not at all for this implementation
  metadata?: {
    database?: string;
    table?: string;
    instance?: string;
  };
}

// --- .ipynb format interfaces ---
interface IpynbCell {
  cell_type: 'markdown' | 'code';
  source: string[];
  metadata: object;
  outputs?: Record<string, unknown>[];
  execution_count?: number | null;
}

interface IpynbNotebook {
  cells: IpynbCell[];
  metadata: object;
  nbformat: number;
  nbformat_minor: number;
}

export function NotebookEditor() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notebookTitle, setNotebookTitle] = useState('Untitled Notebook');
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

  const deleteCell = (id:string) => {
    setCells(cells.filter(cell => cell.id !== id));
  };

  const handleSave = () => {
    const notebookData = {
      nbformat: 4,
      nbformat_minor: 2,
      metadata: {
        language_info: {
          name: 'python',
        },
      },
      cells: cells.map(cell => {
        const cellType = (cell.type === 'python' || cell.type === 'sql') ? 'code' : 'markdown';
        const source = cell.content.split('\n').map(line => line + '\n');
        // Remove last newline if it's an empty line
        if (source.length > 1 && source[source.length - 1] === '\n') {
          source.pop();
          source[source.length - 1] = source[source.length - 1].replace(/\n$/, '');
        }

        const ipynbCell: Partial<IpynbCell> = {
          cell_type: cellType,
          metadata: {},
          source: source,
        };

        if (cellType === 'code') {
          ipynbCell.outputs = [];
          ipynbCell.execution_count = null;
        }

        return ipynbCell;
      }),
    };

    const blob = new Blob([JSON.stringify(notebookData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${notebookTitle.replace(/\s/g, '_')}.ipynb`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== 'string') throw new Error('Failed to read file content.');

        const notebookData: IpynbNotebook = JSON.parse(content);

        // Basic validation
        if (!notebookData.cells || !Array.isArray(notebookData.cells) || !notebookData.nbformat) {
          throw new Error('Invalid notebook format: "cells" array or "nbformat" not found.');
        }

        const newCells: Cell[] = notebookData.cells.map((ipynbCell: IpynbCell, index: number) => {
          let cellType: Cell['type'] = 'python'; // default for code cells
          if (ipynbCell.cell_type === 'markdown') {
            cellType = 'markdown';
          } else if (ipynbCell.source.join('').toLowerCase().includes('select')) {
            // simple heuristic to detect sql, could be improved
            cellType = 'sql';
          }

          return {
            id: `loaded-${Date.now()}-${index}`,
            type: cellType,
            content: ipynbCell.source.join(''),
          };
        });

        setCells(newCells);
        // Optionally, extract title from metadata if it exists
        const loadedTitle = file.name.replace(/\.ipynb$/, '');
        setNotebookTitle(loadedTitle);

      } catch (error) {
        console.error("Failed to load or parse notebook:", error);
        alert("Failed to load notebook. Make sure it's a valid .ipynb file.");
      }
    };
    reader.readAsText(file);

    // Reset the input value to allow loading the same file again
    event.target.value = '';
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
        if (activeCell === cell.id) {
          return (
            <textarea
              value={cell.content}
              onChange={(e) => updateCell(cell.id, { content: e.target.value })}
              placeholder="Enter markdown content..."
              className="w-full bg-transparent text-white font-mono resize-none focus:outline-none"
              rows={Math.max(5, cell.content.split('\n').length)}
              autoFocus
            />
          );
        }
        return (
          <div className="prose prose-invert min-h-[5rem]">
            <ReactMarkdown>{cell.content || "Click to edit..."}</ReactMarkdown>
          </div>
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
          <input
            type="text"
            value={notebookTitle}
            onChange={(e) => setNotebookTitle(e.target.value)}
            className="bg-slate-700 text-white font-bold rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition">
            <Play className="h-4 w-4" />
            <span>Run All</span>
          </button>
          <button onClick={handleSave} className="p-2 hover:bg-slate-700 rounded-lg transition" title="Download notebook">
            <Download className="h-5 w-5 text-slate-400" />
          </button>
          <button onClick={handleUploadClick} className="p-2 hover:bg-slate-700 rounded-lg transition" title="Upload notebook">
            <Upload className="h-5 w-5 text-slate-400" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLoad}
            className="hidden"
            accept=".ipynb"
          />
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCell(cell.id);
                }}
                className="p-1 hover:bg-slate-600 rounded"
              >
                <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-400" />
              </button>
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