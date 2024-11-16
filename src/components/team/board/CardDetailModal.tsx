import React, { useState } from 'react';
import { X, MessageSquare, Paperclip, Link, Clock, User, Tag, AlertCircle } from 'lucide-react';

interface CardDetailModalProps {
  cardId: string;
  onClose: () => void;
}

export function CardDetailModal({ cardId, onClose }: CardDetailModalProps) {
  const [comment, setComment] = useState('');

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl max-w-4xl w-full h-[90vh] shadow-xl border border-slate-700 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-400" />
            <span className="text-xs text-slate-400 font-medium">TASK-{cardId}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-6 p-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Title */}
              <div>
                <input
                  type="text"
                  className="w-full bg-transparent text-2xl font-bold text-white border-0 focus:ring-0 p-0"
                  defaultValue="Implement data validation"
                />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">Description</h3>
                <textarea
                  className="w-full min-h-[200px] bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue="Add validation rules for incoming data..."
                />
              </div>

              {/* Comments */}
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-4">Comments</h3>
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-medium">AJ</span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">Status</h3>
                <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Review</option>
                  <option>Done</option>
                </select>
              </div>

              {/* Assignee */}
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">Assignee</h3>
                <button className="w-full flex items-center space-x-2 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white hover:bg-slate-700 transition">
                  <User className="h-4 w-4" />
                  <span>Select assignee</span>
                </button>
              </div>

              {/* Labels */}
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">Labels</h3>
                <button className="w-full flex items-center space-x-2 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white hover:bg-slate-700 transition">
                  <Tag className="h-4 w-4" />
                  <span>Add labels</span>
                </button>
              </div>

              {/* Story Points */}
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">Story Points</h3>
                <input
                  type="number"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={5}
                />
              </div>

              {/* Sprint */}
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">Sprint</h3>
                <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sprint 1</option>
                  <option>Sprint 2</option>
                  <option>Backlog</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">Due Date</h3>
                <input
                  type="date"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-700">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition">
              <Paperclip className="h-4 w-4" />
              <span>Attach</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition">
              <Link className="h-4 w-4" />
              <span>Link issue</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-slate-400 hover:text-white transition">
              Delete
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}