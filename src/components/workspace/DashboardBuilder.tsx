import React, { useState } from 'react';
import { BarChart2, PieChart, LineChart, Plus, Layout, Settings } from 'lucide-react';

export function DashboardBuilder() {
  const [layout, setLayout] = useState<string[]>([]);

  const addWidget = (type: string) => {
    setLayout([...layout, type]);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Dashboard Title"
            className="bg-transparent text-white text-xl font-semibold focus:outline-none"
            defaultValue="New Dashboard"
          />
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Settings className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
          Save Dashboard
        </button>
      </div>

      {/* Widget Palette */}
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-white font-medium mb-4">Add Widgets</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => addWidget('bar')}
            className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition group"
          >
            <BarChart2 className="h-5 w-5 text-green-400" />
          </button>
          <button
            onClick={() => addWidget('pie')}
            className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition group"
          >
            <PieChart className="h-5 w-5 text-blue-400" />
          </button>
          <button
            onClick={() => addWidget('line')}
            className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition group"
          >
            <LineChart className="h-5 w-5 text-purple-400" />
          </button>
          <button
            onClick={() => addWidget('custom')}
            className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition group"
          >
            <Layout className="h-5 w-5 text-orange-400" />
          </button>
        </div>
      </div>

      {/* Dashboard Canvas */}
      <div className="bg-slate-800 rounded-lg p-6 min-h-[500px]">
        {layout.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Plus className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">Add widgets to your dashboard</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {layout.map((widget, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-4 aspect-video">
                {/* Widget content will go here */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}