import React from 'react';
import {
  Layout,
  Database,
  FileCode,
  BarChart2,
  Settings,
  Users,
  Clock,
  Box,
  GitBranch,
  Star,
  Lock,
} from 'lucide-react';

interface MenuItem {
  icon: JSX.Element;
  label: string;
  id: string;
}

interface SidebarProps {
  activeSection?: string;
  onNavigate: (section: string) => void;
  subscriptionPlan: 'free' | 'team';
}

const PREMIUM_ITEMS = ['models', 'pipelines', 'jobs'];

export function Sidebar({ activeSection = 'workspace', onNavigate, subscriptionPlan }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { icon: <Layout className="h-5 w-5" />, label: 'Workspace', id: 'workspace' },
    { icon: <Database className="h-5 w-5" />, label: 'Data', id: 'data' },
    { icon: <FileCode className="h-5 w-5" />, label: 'Notebooks', id: 'notebooks' },
    { icon: <BarChart2 className="h-5 w-5" />, label: 'Dashboards', id: 'dashboards' },
    { icon: <Box className="h-5 w-5" />, label: 'Models', id: 'models' },
    { icon: <GitBranch className="h-5 w-5" />, label: 'Pipelines', id: 'pipelines' },
    { icon: <Clock className="h-5 w-5" />, label: 'Jobs', id: 'jobs' },
    { icon: <Users className="h-5 w-5" />, label: 'Team', id: 'team' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="w-64 bg-custom-sidebar h-screen fixed left-0 top-0 text-white flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex items-center space-x-2 mb-8">
          <Database className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">DataForge AI</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isPremium = PREMIUM_ITEMS.includes(item.id);
            const isLocked = isPremium && subscriptionPlan === 'free';
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'hover:bg-white/5 text-slate-300'
                }`}
                disabled={isLocked}
              >
                {item.icon}
                <span className="flex-grow text-left">{item.label}</span>
                {isLocked && <Lock className="h-4 w-4 text-yellow-400" />}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="p-4">
        <button
          onClick={() => onNavigate('pricing')}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg transition bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          <Star className="h-5 w-5" />
          <span>Upgrade Plan</span>
        </button>
      </div>
    </div>
  );
}