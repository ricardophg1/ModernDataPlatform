import React, { useState } from 'react';
import { Plus, Layout, GitBranch, Clock, Users } from 'lucide-react';
import { BoardView } from './board/BoardView';
import { CreateBoardModal } from './CreateBoardModal';

interface TeamBoardsProps {
  searchQuery: string;
}

interface Board {
  id: string;
  name: string;
  description: string;
  type: 'scrum' | 'kanban';
  members: number;
  lastActive: string;
}

export function TeamBoards({ searchQuery }: TeamBoardsProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  
  const boards: Board[] = [
    {
      id: '1',
      name: 'Data Pipeline Development',
      description: 'Building ETL pipelines for customer data',
      type: 'scrum',
      members: 5,
      lastActive: '10m ago'
    },
    {
      id: '2',
      name: 'ML Model Training',
      description: 'Customer churn prediction model development',
      type: 'kanban',
      members: 3,
      lastActive: '1h ago'
    }
  ];

  const filteredBoards = boards.filter(board =>
    board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedBoard) {
    return (
      <div className="h-full bg-slate-800">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <button
            onClick={() => setSelectedBoard(null)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Boards
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-400">
              <Users className="h-4 w-4 inline mr-1" />
              {selectedBoard.members} members
            </span>
            <span className={`px-2 py-1 rounded text-xs ${
              selectedBoard.type === 'scrum'
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-purple-500/20 text-purple-400'
            }`}>
              {selectedBoard.type.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 h-[calc(100vh-10rem)] overflow-hidden">
          <BoardView boardId={selectedBoard.id} boardType={selectedBoard.type} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-800 p-6 rounded-lg space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-slate-700/50 p-6 rounded-lg hover:ring-2 hover:ring-blue-500/50 transition group text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30">
              <Plus className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">New Board</h3>
              <p className="text-sm text-slate-400">Create a new project board</p>
            </div>
          </div>
        </button>

        <button className="bg-slate-700/50 p-6 rounded-lg hover:ring-2 hover:ring-purple-500/50 transition group text-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30">
              <Layout className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Templates</h3>
              <p className="text-sm text-slate-400">Start from a template</p>
            </div>
          </div>
        </button>

        <button className="bg-slate-700/50 p-6 rounded-lg hover:ring-2 hover:ring-green-500/50 transition group text-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30">
              <GitBranch className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Import</h3>
              <p className="text-sm text-slate-400">Import from other tools</p>
            </div>
          </div>
        </button>
      </div>

      {/* Boards List */}
      <div className="bg-slate-700/50 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-600">
          <h3 className="text-lg font-semibold text-white">Active Boards</h3>
        </div>
        <div className="divide-y divide-slate-600">
          {filteredBoards.map((board) => (
            <div
              key={board.id}
              className="p-4 hover:bg-slate-600/50 transition cursor-pointer"
              onClick={() => setSelectedBoard(board)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">{board.name}</h4>
                  <p className="text-slate-400 text-sm">{board.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-400">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {board.lastActive}
                  </span>
                  <span className="text-sm text-slate-400">
                    <Users className="h-4 w-4 inline mr-1" />
                    {board.members} members
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    board.type === 'scrum'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {board.type.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Board Modal */}
      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}