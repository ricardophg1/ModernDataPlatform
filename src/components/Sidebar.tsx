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
} from 'lucide-react';

interface MenuItem {
  icon: JSX.Element;
  label: string;
  id: string;
}

interface SidebarProps {
  activeSection?: string;
  onNavigate: (section: string) => void;
}

export function Sidebar({ activeSection = 'workspace', onNavigate }: SidebarProps) {
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
    <div className="w-64 bg-custom-sidebar h-screen fixed left-0 top-0 text-white">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <Database className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">DataForge AI</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeSection === item.id
                  ? 'bg-white/10 text-white'
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}