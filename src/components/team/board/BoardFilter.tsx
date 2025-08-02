import React from 'react';
import { Search, Filter, SortAsc, User } from 'lucide-react';

type FilterOptions = Record<string, unknown>;

interface BoardFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

export function BoardFilter({ onSearch, onFilterChange }: BoardFilterProps) {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="relative flex-1">
        <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search issues..."
          className="w-full bg-slate-700/50 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-slate-700 rounded-lg transition flex items-center space-x-2 text-slate-400">
          <User className="h-5 w-5" />
          <span>Assignee</span>
        </button>

        <button className="p-2 hover:bg-slate-700 rounded-lg transition flex items-center space-x-2 text-slate-400">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>

        <button className="p-2 hover:bg-slate-700 rounded-lg transition flex items-center space-x-2 text-slate-400">
          <SortAsc className="h-5 w-5" />
          <span>Sort</span>
        </button>
      </div>
    </div>
  );
}