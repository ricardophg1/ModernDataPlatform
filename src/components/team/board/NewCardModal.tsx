import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface NewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (card: any) => void;
}

export function NewCardModal({ isOpen, onClose, onCreate }: NewCardModalProps) {
  const [cardData, setCardData] = useState({
    type: 'task',
    title: '',
    description: '',
    priority: 'medium',
    labels: [] as string[],
    estimate: 0
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(cardData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full shadow-xl border border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Plus className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Create New Issue</h2>
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
              Issue Type
            </label>
            <select
              value={cardData.type}
              onChange={(e) => setCardData({ ...cardData, type: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="story">Story</option>
              <option value="task">Task</option>
              <option value="bug">Bug</option>
              <option value="epic">Epic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={cardData.title}
              onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter issue title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={cardData.description}
              onChange={(e) => setCardData({ ...cardData, description: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
              placeholder="Describe the issue..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Priority
            </label>
            <select
              value={cardData.priority}
              onChange={(e) => setCardData({ ...cardData, priority: e.target.value })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="highest">Highest</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="lowest">Lowest</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Labels
            </label>
            <input
              type="text"
              placeholder="Add labels (comma separated)"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setCardData({
                ...cardData,
                labels: e.target.value.split(',').map(label => label.trim())
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Estimate (hours)
            </label>
            <input
              type="number"
              value={cardData.estimate}
              onChange={(e) => setCardData({ ...cardData, estimate: parseInt(e.target.value) })}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
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
            Create Issue
          </button>
        </div>
      </div>
    </div>
  );
}