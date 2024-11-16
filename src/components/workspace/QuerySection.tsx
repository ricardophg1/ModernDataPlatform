import React, { useState } from 'react';
import { Play, Save, Download, Database, Table, ChevronRight, Code2, Brain } from 'lucide-react';

export function QuerySection() {
  const [query, setQuery] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecuteQuery = async () => {
    setIsExecuting(true);
    try {
      // Simulate query execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Handle query results
    } finally {
      setIsExecuting(false);
    }
  };

  const handleAIAssist = async () => {
    // Simulate AI assistance
    setAiSuggestion('Try adding a JOIN with the customers table to get more insights...');
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden">
      {/* Query Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <Database className="h-5 w-5 text-slate-400" />
          <select className="bg-slate-700 text-white px-3 py-1.5 rounded-lg">
            <option value="">Select Database</option>
            <option value="analytics">Analytics DB</option>
            <option value="production">Production DB</option>
          </select>
          <ChevronRight className="h-4 w-4 text-slate-500" />
          <select className="bg-slate-700 text-white px-3 py-1.5 rounded-lg">
            <option value="">Select Table</option>
            <option value="users">Users</option>
            <option value="orders">Orders</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleAIAssist}
            className="p-2 hover:bg-slate-700 rounded-lg transition flex items-center space-x-2 text-purple-400"
          >
            <Brain className="h-5 w-5" />
            <span>AI Assist</span>
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Save className="h-5 w-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Download className="h-5 w-5 text-slate-400" />
          </button>
          <button 
            onClick={handleExecuteQuery}
            disabled={isExecuting}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center space-x-2 transition disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            <span>{isExecuting ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      {/* Query Input */}
      <div className="p-4">
        <div className="relative">
          <Code2 className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Write your SQL query here..."
            className="w-full h-40 bg-slate-900 text-white p-4 pl-12 rounded-lg font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        {aiSuggestion && (
          <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-purple-400 font-medium">AI Suggestion</span>
            </div>
            <p className="text-slate-300">{aiSuggestion}</p>
          </div>
        )}
      </div>

      {/* Results will be shown here */}
    </div>
  );
}