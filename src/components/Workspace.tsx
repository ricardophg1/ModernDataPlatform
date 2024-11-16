import React from 'react';
import { Layout, Database, FileCode, BarChart2, GitBranch, Brain } from 'lucide-react';

export function Workspace() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Workspace</h1>
        <p className="text-gray-600">Welcome to DataForge AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Query Data */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-blue-300 transition group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100">
              <Database className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-800">Query Data</h3>
              <p className="text-sm text-gray-600">Write and execute SQL queries</p>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-purple-300 transition group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100">
              <Brain className="h-6 w-6 text-purple-500" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-800">AI Analysis</h3>
              <p className="text-sm text-gray-600">Get instant insights</p>
            </div>
          </div>
        </div>

        {/* Dashboards */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-green-300 transition group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100">
              <BarChart2 className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-800">Dashboards</h3>
              <p className="text-sm text-gray-600">Create visualizations</p>
            </div>
          </div>
        </div>

        {/* Pipelines */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-orange-300 transition group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-50 rounded-lg group-hover:bg-orange-100">
              <GitBranch className="h-6 w-6 text-orange-500" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-800">Pipelines</h3>
              <p className="text-sm text-gray-600">Build data workflows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Activity items would go here */}
          <div className="text-gray-600">No recent activity</div>
        </div>
      </div>
    </div>
  );
}