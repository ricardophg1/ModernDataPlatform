import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';
import { DataSection } from './components/DataSection';
import { NotebooksSection } from './components/NotebooksSection';
import { DashboardsSection } from './components/DashboardsSection';
import { ModelsSection } from './components/ModelsSection';
import { PipelinesSection } from './components/PipelinesSection';
import { JobsSection } from './components/JobsSection';
import { TeamSection } from './components/TeamSection';
import { SettingsSection } from './components/SettingsSection';

function App() {
  const [activeSection, setActiveSection] = useState('workspace');

  const renderSection = () => {
    switch (activeSection) {
      case 'data':
        return <DataSection />;
      case 'notebooks':
        return <NotebooksSection />;
      case 'dashboards':
        return <DashboardsSection />;
      case 'models':
        return <ModelsSection />;
      case 'pipelines':
        return <PipelinesSection />;
      case 'jobs':
        return <JobsSection />;
      case 'team':
        return <TeamSection />;
      case 'settings':
        return <SettingsSection />;
      case 'workspace':
      default:
        return <Workspace />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="ml-64 p-8">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;