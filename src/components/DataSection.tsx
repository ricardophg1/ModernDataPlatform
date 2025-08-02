import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { DataCatalog } from './DataCatalog';
import { DatabaseArchitecture } from './data/DatabaseArchitecture';
import { DataFlowVisualizer } from './data/DataFlowVisualizer';
import { UploadDataModal } from './data/UploadDataModal';
import { ConnectDatabaseModal } from './data/ConnectDatabaseModal';
import { APIIntegrationModal } from './data/APIIntegrationModal';

export function DataSection() {
  const [view, setView] = useState('architecture');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isConnectDBModalOpen, setIsConnectDBModalOpen] = useState(false);
  const [isAPIModalOpen, setIsAPIModalOpen] = useState(false);

  const handleFileUpload = (file: File) => {
    console.log('Uploading file:', file.name);
  };

  const handleDatabaseConnect = (config: any) => {
    console.log('Connecting to database:', config);
  };

  const handleAPIConnect = (config: any) => {
    console.log('Connecting to API:', config);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Data Architecture</h1>
          <p className="text-slate-400">Design and visualize your data infrastructure</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search data sources..."
              className="bg-slate-700/50 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button 
            onClick={() => setIsConnectDBModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <Plus className="h-5 w-5" />
            <span>Connect Database</span>
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center space-x-1 border-b border-slate-700">
        <button
          onClick={() => setView('architecture')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            view === 'architecture'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Architecture
        </button>
        <button
          onClick={() => setView('flow')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            view === 'flow'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Data Flow
        </button>
        <button
          onClick={() => setView('catalog')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
            view === 'catalog'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Catalog
        </button>
      </div>

      {/* Main Content */}
      {view === 'architecture' && <DatabaseArchitecture />}
      {view === 'flow' && <DataFlowVisualizer />}
      {view === 'catalog' && <DataCatalog />}

      {/* Modals */}
      <UploadDataModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
      />

      <ConnectDatabaseModal
        isOpen={isConnectDBModalOpen}
        onClose={() => setIsConnectDBModalOpen(false)}
        onConnect={handleDatabaseConnect}
      />

      <APIIntegrationModal
        isOpen={isAPIModalOpen}
        onClose={() => setIsAPIModalOpen(false)}
        onConnect={handleAPIConnect}
      />
    </div>
  );
}