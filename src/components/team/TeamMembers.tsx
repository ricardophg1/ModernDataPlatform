import React from 'react';
import { Settings, Shield, Clock } from 'lucide-react';

interface TeamMembersProps {
  searchQuery: string;
  onAccessControl: () => void;
  onSettings: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  access: 'Admin' | 'Editor' | 'Viewer';
  lastActive: string;
  avatar?: string;
}

export function TeamMembers({ searchQuery, onAccessControl, onSettings }: TeamMembersProps) {
  const members: TeamMember[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      role: 'Data Engineer',
      access: 'Admin',
      lastActive: '5m ago'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'Data Scientist',
      access: 'Editor',
      lastActive: '1h ago'
    },
    {
      id: '3',
      name: 'Mike Peters',
      role: 'Analyst',
      access: 'Viewer',
      lastActive: '2h ago'
    }
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Team Members</h3>
      </div>
      <div className="divide-y divide-slate-700">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="p-4 hover:bg-slate-700/50 transition flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-medium">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="text-white font-medium">{member.name}</h4>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400">
                <Clock className="h-4 w-4 inline mr-1" />
                Active {member.lastActive}
              </span>
              <span className={`px-2 py-1 rounded text-xs ${
                member.access === 'Admin' ? 'bg-purple-500/20 text-purple-400' :
                member.access === 'Editor' ? 'bg-blue-500/20 text-blue-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {member.access}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={onAccessControl}
                  className="p-2 hover:bg-slate-600 rounded-lg"
                >
                  <Shield className="h-4 w-4 text-slate-400" />
                </button>
                <button
                  onClick={onSettings}
                  className="p-2 hover:bg-slate-600 rounded-lg"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}