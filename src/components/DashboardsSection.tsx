import { useState } from 'react';
import { Plus, BarChart2, PieChart, LineChart, Calendar, Filter, Download, RefreshCw, Clock } from 'lucide-react';
import { AnalyticsDashboard } from './dashboards/AnalyticsDashboard';
import { MetricCard } from './dashboards/MetricCard';

export function DashboardsSection() {
  const [dateRange, setDateRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const metrics = [
    { 
      title: 'Total Users',
      value: '124,892',
      change: '+12.3%',
      trend: 'up',
      icon: <BarChart2 className="h-6 w-6 text-blue-400" />
    },
    {
      title: 'Active Sessions',
      value: '8,342',
      change: '+5.8%',
      trend: 'up',
      icon: <LineChart className="h-6 w-6 text-green-400" />
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.4%',
      trend: 'down',
      icon: <PieChart className="h-6 w-6 text-purple-400" />
    },
    {
      title: 'Avg. Session Time',
      value: '4m 32s',
      change: '+0.8%',
      trend: 'up',
      icon: <Clock className="h-6 w-6 text-orange-400" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Real-time insights and visualizations</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Date Range Selector */}
          <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-2">
            <Calendar className="h-5 w-5 text-slate-400" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-white border-none focus:ring-0"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>

          {/* Actions */}
          <button 
            onClick={handleRefresh}
            className={`p-2 hover:bg-slate-700 rounded-lg transition ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="h-5 w-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Filter className="h-5 w-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition">
            <Download className="h-5 w-5 text-slate-400" />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition">
            <Plus className="h-5 w-5" />
            <span>New Dashboard</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Dashboard */}
      <AnalyticsDashboard />
    </div>
  );
}