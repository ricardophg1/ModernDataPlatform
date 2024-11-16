import React from 'react';
import { Plus, Search, Users } from 'lucide-react';

interface TeamHeaderProps {
  onInvite: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function TeamHeader({ onInvite, onSearch, searchQuery }: TeamHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Team</h1>
        <p className="text-slate-400">Manage team members and projects</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search members..."
            className="bg-slate-700/50 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
        <button
          onClick={onInvite}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
        >
          <Plus className="h-5 w-5" />
          <span>Invite Member</span>
        </button>
      </div>
    </div>
  );
}