import React, { useState } from 'react';
import { Database, GitBranch, Share2, Search, ZoomIn, ZoomOut, Layout, Box, ArrowRight, Settings, Download, Eye } from 'lucide-react';

interface Table {
  name: string;
  columns: Array<{
    name: string;
    type: string;
    isPrimary: boolean;
    isForeign: boolean;
    references?: string;
  }>;
  relationships: Array<{
    to: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }>;
}

interface Schema {
  name: string;
  tables: Table[];
}

export function DatabaseArchitecture() {
  const [view, setView] = useState<'er' | 'flow' | '3d'>('er');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Sample data - in a real app, this would come from your backend
  const schemas: Schema[] = [
    {
      name: 'retail_prod',
      tables: [
        {
          name: 'customers',
          columns: [
            { name: 'id', type: 'uuid', isPrimary: true, isForeign: false },
            { name: 'email', type: 'varchar', isPrimary: false, isForeign: false },
            { name: 'created_at', type: 'timestamp', isPrimary: false, isForeign: false }
          ],
          relationships: [
            { to: 'orders', type: 'one-to-many' }
          ]
        },
        {
          name: 'orders',
          columns: [
            { name: 'id', type: 'uuid', isPrimary: true, isForeign: false },
            { name: 'customer_id', type: 'uuid', isPrimary: false, isForeign: true, references: 'customers.id' },
            { name: 'total', type: 'decimal', isPrimary: false, isForeign: false },
            { name: 'status', type: 'varchar', isPrimary: false, isForeign: false }
          ],
          relationships: [
            { to: 'customers', type: 'many-to-one' }
          ]
        }
      ]
    }
  ];

  const handleGenerateArchitecture = async () => {
    setAiSuggestions([
      'Consider adding indexes on frequently queried columns',
      'Detected potential performance bottleneck in customer_orders join',
      'Recommend partitioning large tables by date'
    ]);
  };

  const renderPreview = () => {
    if (!selectedSchema) return null;
    const schema = schemas.find(s => s.name === selectedSchema);
    if (!schema) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-slate-800 rounded-xl max-w-6xl w-full h-[80vh] shadow-xl border border-slate-700 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <Eye className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Data Model Preview</h2>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-2 gap-6">
              {schema.tables.map(table => (
                <div key={table.name} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Database className="h-5 w-5 text-blue-400" />
                      <h3 className="text-lg font-medium text-white">{table.name}</h3>
                    </div>
                    <span className="text-sm text-slate-400">{table.columns.length} columns</span>
                  </div>

                  <div className="space-y-2">
                    {table.columns.map(column => (
                      <div
                        key={column.name}
                        className="flex items-center justify-between p-2 bg-slate-800 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          {column.isPrimary && (
                            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                          )}
                          {column.isForeign && (
                            <span className="w-2 h-2 bg-purple-400 rounded-full" />
                          )}
                          <span className="text-white">{column.name}</span>
                        </div>
                        <span className="text-sm text-slate-400">{column.type}</span>
                      </div>
                    ))}
                  </div>

                  {table.relationships.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-600">
                      <h4 className="text-sm font-medium text-slate-400 mb-2">Relationships</h4>
                      {table.relationships.map((rel, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-slate-300"
                        >
                          <ArrowRight className="h-4 w-4 text-blue-400" />
                          <span>{rel.to}</span>
                          <span className="text-slate-500">({rel.type})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={view}
              onChange={(e) => setView(e.target.value as any)}
              className="bg-slate-700 text-white px-3 py-1.5 rounded-lg"
            >
              <option value="er">ER Diagram</option>
              <option value="flow">Data Flow</option>
              <option value="3d">3D View</option>
            </select>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                className="p-2 hover:bg-slate-600 rounded-lg"
              >
                <ZoomOut className="h-5 w-5 text-slate-400" />
              </button>
              <span className="text-slate-400">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
                className="p-2 hover:bg-slate-600 rounded-lg"
              >
                <ZoomIn className="h-5 w-5 text-slate-400" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
            >
              <Eye className="h-5 w-5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setShowDataFlow(!showDataFlow)}
              className={`px-4 py-2 rounded-lg transition ${
                showDataFlow ? 'bg-blue-500 text-white' : 'text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={handleGenerateArchitecture}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Box className="h-5 w-5" />
              <span>AI Analyze</span>
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg">
              <Download className="h-5 w-5 text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg">
              <Settings className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Schema Browser */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Schemas</h3>
              <button className="p-2 hover:bg-slate-700 rounded-lg">
                <Search className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            <div className="space-y-2">
              {schemas.map((schema) => (
                <button
                  key={schema.name}
                  onClick={() => setSelectedSchema(schema.name)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedSchema === schema.name
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4" />
                    <span>{schema.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagram Area */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800 rounded-lg p-6 min-h-[600px]">
            {selectedSchema ? (
              <div className="h-full">
                {/* Here you would integrate with a diagram library */}
                <div className="text-center text-slate-400">
                  Interactive diagram would be rendered here
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Layout className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400">Select a schema to view its architecture</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Box className="h-6 w-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">AI Architecture Insights</h3>
          </div>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-slate-700/50 p-4 rounded-lg"
              >
                <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5" />
                <p className="text-slate-300">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && renderPreview()}
    </div>
  );
}