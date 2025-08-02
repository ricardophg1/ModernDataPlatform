import { useState } from 'react';
import { Plus, Search, FileCode, Brain, Share2 } from 'lucide-react';
import { NewNotebookModal, NotebookData } from './NewNotebookModal';
import { NotebookEditor } from './NotebookEditor';

interface Notebook {
  id: number;
  name: string;
  language: string;
  lastModified: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  aiAssisted: boolean;
  shared: boolean;
  version: string;
}

export function NotebooksSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewNotebookModalOpen, setIsNewNotebookModalOpen] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState<number | null>(null);
  const [notebooks, setNotebooks] = useState<Notebook[]>([
    {
      id: 1,
      name: 'Customer Segmentation Analysis',
      language: 'python',
      lastModified: '2h ago',
      status: 'completed',
      aiAssisted: true,
      shared: true,
      version: 'v2.1',
    },
    {
      id: 2,
      name: 'Sales Forecasting Model',
      language: 'python',
      lastModified: '1d ago',
      status: 'running',
      aiAssisted: true,
      shared: false,
      version: 'v1.3',
    },
    {
      id: 3,
      name: 'Data Quality Assessment',
      language: 'sql',
      lastModified: '3d ago',
      status: 'idle',
      aiAssisted: false,
      shared: true,
      version: 'v1.0',
    },
  ]);

  const handleCreateNotebook = (notebookData: NotebookData) => {
    const newNotebook: Notebook = {
      id: notebooks.length + 1,
      name: notebookData.name,
      language: 'python',
      lastModified: 'Just now',
      status: 'idle',
      aiAssisted: true,
      shared: false,
      version: 'v1.0',
    };
    setNotebooks([newNotebook, ...notebooks]);
    setSelectedNotebook(newNotebook.id);
  };

  if (selectedNotebook) {
    return (
      <div className="h-full">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedNotebook(null)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Notebooks
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Auto-saving...</span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              Share
            </button>
          </div>
        </div>
        <NotebookEditor />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">AI-Enhanced Notebooks</h1>
          <p className="text-slate-400">Create and collaborate on intelligent notebooks</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notebooks..."
              className="bg-slate-700/50 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button
            onClick={() => setIsNewNotebookModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <Plus className="h-5 w-5" />
            <span>New Notebook</span>
          </button>
        </div>
      </div>

      {/* Notebooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notebooks.map((notebook) => (
          <div
            key={notebook.id}
            onClick={() => setSelectedNotebook(notebook.id)}
            className="bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition cursor-pointer group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30">
                    <FileCode className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{notebook.name}</h3>
                    <p className="text-sm text-slate-400">Modified {notebook.lastModified}</p>
                  </div>
                </div>
                {notebook.aiAssisted && (
                  <div className="p-1.5 bg-purple-500/20 rounded-lg">
                    <Brain className="h-4 w-4 text-purple-400" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400">{notebook.version}</span>
                  {notebook.shared && (
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Share2 className="h-4 w-4" />
                      <span>Shared</span>
                    </div>
                  )}
                </div>
                <span className={`px-2 py-1 rounded ${
                  notebook.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                  notebook.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  notebook.status === 'error' ? 'bg-red-500/20 text-red-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {notebook.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Notebook Modal */}
      <NewNotebookModal
        isOpen={isNewNotebookModalOpen}
        onClose={() => setIsNewNotebookModalOpen(false)}
        onCreate={handleCreateNotebook}
      />
    </div>
  );
}