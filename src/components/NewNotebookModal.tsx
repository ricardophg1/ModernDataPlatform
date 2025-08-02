import React, { useState } from 'react';
import { X, FileCode, Wand2, GitBranch, Book, Brain } from 'lucide-react';

export interface NotebookData {
  name: string;
  description: string;
  template: string;
  created: Date;
}

interface NewNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (notebook: NotebookData) => void;
}

export function NewNotebookModal({ isOpen, onClose, onCreate }: NewNotebookModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    {
      id: 'data-analysis',
      name: 'Data Analysis',
      description: 'Start with common data analysis imports and helper functions',
      icon: <Brain className="h-6 w-6 text-blue-400" />,
    },
    {
      id: 'ml-training',
      name: 'ML Model Training',
      description: 'Template for training and evaluating machine learning models',
      icon: <Wand2 className="h-6 w-6 text-purple-400" />,
    },
    {
      id: 'etl-pipeline',
      name: 'ETL Pipeline',
      description: 'Data extraction, transformation, and loading workflow',
      icon: <GitBranch className="h-6 w-6 text-green-400" />,
    },
    {
      id: 'blank',
      name: 'Blank Notebook',
      description: 'Start from scratch with an empty notebook',
      icon: <FileCode className="h-6 w-6 text-slate-400" />,
    },
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      name,
      description,
      template: selectedTemplate,
      created: new Date(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full shadow-xl border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Book className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Create New Notebook</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Notebook Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter notebook name"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  placeholder="Add a description (optional)"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                />
              </div>
            </div>

            {/* Templates */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                Choose a Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedTemplate === template.id
                        ? 'bg-blue-500/20 border-blue-500'
                        : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {template.icon}
                      <div>
                        <h3 className="text-white font-medium mb-1">{template.name}</h3>
                        <p className="text-sm text-slate-400">{template.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-slate-700">
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
              Create Notebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}