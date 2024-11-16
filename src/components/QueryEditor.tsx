import React, { useState } from 'react';
import { Play, Save, Download, Database, Table, ChevronRight, Code2 } from 'lucide-react';

interface QueryResult {
  columns: string[];
  rows: any[];
}

export function QueryEditor() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState('');
  const [selectedTable, setSelectedTable] = useState('');

  const executeQuery = async () => {
    setIsExecuting(true);
    try {
      // Simulate query execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResults({
        columns: ['id', 'name', 'value', 'timestamp'],
        rows: [
          { id: 1, name: 'Sample 1', value: 100, timestamp: '2024-03-15' },
          { id: 2, name: 'Sample 2', value: 200, timestamp: '2024-03-16' },
        ]
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden h-full flex flex-col">
      {/* Query Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <Database className="h-5 w-5 text-slate-400" />
          <select 
            className="bg-slate-700 text-white px-3 py-1.5 rounded-lg"
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(e.target.value)}
          >
            <option value="">Select Schema</option>
            <option value="public">public</option>
            <option value="analytics">analytics</option>
          </select>
          <ChevronRight className="h-4 w-4 text-slate-500" />
          <select
            className="bg-slate-700 text-white px-3 py-1.5 rounded-lg"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <option value="">Select Table</option>
            <option value="users">users</option>
            <option value="orders">orders</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Save className="h-5 w-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Download className="h-5 w-5 text-slate-400" />
          </button>
          <button 
            onClick={executeQuery}
            disabled={isExecuting}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center space-x-2 transition disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            <span>{isExecuting ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      {/* Query Input */}
      <div className="p-4 border-b border-slate-700">
        <div className="relative">
          <Code2 className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SELECT * FROM your_table"
            className="w-full h-40 bg-slate-900 text-white p-4 pl-12 rounded-lg font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead>
                  <tr>
                    {results.columns.map((column) => (
                      <th
                        key={column}
                        className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider bg-slate-800"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {results.rows.map((row, i) => (
                    <tr key={i}>
                      {results.columns.map((column) => (
                        <td
                          key={column}
                          className="px-6 py-4 whitespace-nowrap text-sm text-slate-300"
                        >
                          {row[column]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}