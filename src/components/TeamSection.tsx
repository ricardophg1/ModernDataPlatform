import React, { useState } from 'react';
import { Plus, Search, Users, Settings } from 'lucide-react';
import { TeamHeader } from './team/TeamHeader';
import { TeamMembers } from './team/TeamMembers';
import { TeamBoards } from './team/TeamBoards';
import { InviteMemberModal } from './team/InviteMemberModal';
import { AccessControlModal } from './team/AccessControlModal';
import { TeamSettingsModal } from './team/TeamSettingsModal';

export function TeamSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'members' | 'boards'>('members');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <TeamHeader
        onInvite={() => setIsInviteModalOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* View Toggle */}
      <div className="flex items-center space-x-1 border-b border-slate-700">
        <button
          onClick={() => setActiveView('members')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            activeView === 'members'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Team Members
        </button>
        <button
          onClick={() => setActiveView('boards')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            activeView === 'boards'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Boards & Projects
        </button>
      </div>

      {/* Main Content */}
      {activeView === 'members' ? (
        <TeamMembers
          searchQuery={searchQuery}
          onAccessControl={() => setIsAccessModalOpen(true)}
          onSettings={() => setIsSettingsModalOpen(true)}
        />
      ) : (
        <TeamBoards searchQuery={searchQuery} />
      )}

      {/* Modals */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
      <AccessControlModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />
      <TeamSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}