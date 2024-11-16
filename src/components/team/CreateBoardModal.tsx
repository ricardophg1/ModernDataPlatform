import React, { useState } from 'react';
import { X, Layout, GitBranch } from 'lucide-react';

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateBoardModal({ isOpen, onClose }: CreateBoardModalProps) {
  const [boardType, setBoardType] = useState<'scrum' | 'kanban'>('scrum');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle board creation
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full shadow-xl border border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Layout className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Create New Board</h2>
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
              Board Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setBoardType('scrum')}
                className={`p-4 rounded-lg border text-left transition ${
                  boardType === 'scrum'
                    ? 'bg-blue-500/20 border-blue-500'
                    : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                }`}
              >
                <GitBranch className="h-5 w-5 text-blue-400 mb-2" />
                <h3 className="text-white font-medium mb-1">Scrum Board</h3>
                <p className="text-sm text-slate-400">
                  For agile teams using sprints
                </p>
              </button>

              <button
                type="button"
                onClick={() => setBoardType('kanban')}
                className={`p-4 rounded-lg border text-left transition ${
                  boardType === 'kanban'
                    ? 'bg-purple-500/20 border-purple-500'
                    : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                }`}
              >
                <Layout className="h-5 w-5 text-purple-400 mb-2" />
                <h3 className="text-white font-medium mb-1">Kanban Board</h3>
                <p className="text-sm text-slate-400">
                  For continuous flow teams
                </p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Board Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter board name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
              placeholder="Describe your board's purpose"
            />
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}