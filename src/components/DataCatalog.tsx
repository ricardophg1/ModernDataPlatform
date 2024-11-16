import React from 'react';
import { Database, Table, FileSpreadsheet } from 'lucide-react';

export function DataCatalog() {
  const databases = [
    {
      name: 'Analytics',
      tables: [
        { name: 'customer_events', rows: '2.3M', size: '1.2GB' },
        { name: 'product_metrics', rows: '500K', size: '450MB' },
      ]
    },
    {
      name: 'Production',
      tables: [
        { name: 'users', rows: '1.1M', size: '800MB' },
        { name: 'orders', rows: '5.2M', size: '2.1GB' },
      ]
    }
  ];

  return (
    <div className="bg-slate-800 rounded-lg">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Data Catalog</h3>
      </div>
      <div className="p-4 space-y-4">
        {databases.map((db) => (
          <div key={db.name} className="space-y-2">
            <div className="flex items-center space-x-2 text-white">
              <Database className="h-4 w-4 text-blue-400" />
              <span className="font-medium">{db.name}</span>
            </div>
            <div className="ml-6 space-y-2">
              {db.tables.map((table) => (
                <div key={table.name} className="flex items-center justify-between text-slate-300 hover:bg-slate-700 p-2 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Table className="h-4 w-4" />
                    <span>{table.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>{table.rows}</span>
                    <span>{table.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}