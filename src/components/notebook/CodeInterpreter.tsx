import { useState } from 'react';
import { Play, Loader2, XCircle } from 'lucide-react';
import { executeCode as executeCodeService, StreamChunk } from '../../services/kernelService';

interface CodeInterpreterProps {
  code: string;
  language: 'python' | 'sql';
  // This component will now manage its own output display.
  // The parent `CodeCell` will be updated to reflect this.
}

export function CodeInterpreter({ code, language }: CodeInterpreterProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<StreamChunk[]>([]);
  const [error, setError] = useState<string | null>(null);

  const executeCode = async () => {
    setIsExecuting(true);
    setError(null);
    setOutput([]);

    try {
      await executeCodeService({ code, language }, (chunk) => {
        if (chunk.type === 'error') {
          setError(chunk.message);
        } else {
          setOutput((prev) => [...prev, chunk]);
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={executeCode}
          disabled={isExecuting}
          className="bg-primary hover:bg-primary-light text-white px-3 py-1.5 rounded flex items-center space-x-2 text-sm disabled:opacity-50"
        >
          {isExecuting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Executing...</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Run</span>
            </>
          )}
        </button>
      </div>

      {/* Output Display */}
      {output.length > 0 && (
        <div className="mt-4 bg-slate-900/50 rounded-lg p-4 space-y-2">
          {output.map((chunk, i) => (
            <div key={i}>
              {chunk.type === 'status' && <p className="text-slate-400 text-sm italic">... {chunk.message}</p>}
              {chunk.type === 'stdout' && <pre className="text-white font-mono text-sm whitespace-pre-wrap">{chunk.data}</pre>}
              {chunk.type === 'stderr' && <pre className="text-red-400 font-mono text-sm whitespace-pre-wrap">{chunk.data}</pre>}
              {chunk.type === 'table' && (
                 <div className="overflow-x-auto">
                   <table className="min-w-full divide-y divide-slate-700">
                     <thead>
                       <tr>
                         {Object.keys(chunk.data[0]).map((key) => (
                           <th key={key} className="px-4 py-2 text-left text-sm font-medium text-slate-300">{key}</th>
                         ))}
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-700">
                       {chunk.data.map((row: Record<string, unknown>, i: number) => (
                         <tr key={i}>
                           {Object.values(row).map((value: unknown, j: number) => (
                             <td key={j} className="px-4 py-2 text-sm text-slate-300">{String(value)}</td>
                           ))}
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              )}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3 flex items-start space-x-2">
          <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
          <pre className="text-red-400 text-sm font-mono overflow-auto">
            {error}
          </pre>
        </div>
      )}
    </div>
  );
}