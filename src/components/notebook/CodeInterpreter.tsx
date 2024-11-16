import React, { useState } from 'react';
import { Play, Loader2, XCircle } from 'lucide-react';

interface CodeInterpreterProps {
  code: string;
  language: 'python' | 'sql';
  onResult: (result: any) => void;
}

export function CodeInterpreter({ code, language, onResult }: CodeInterpreterProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeCode = async () => {
    setIsExecuting(true);
    setError(null);

    try {
      // In a real implementation, this would call your backend Python/SQL interpreter
      // For now, we'll simulate execution
      const result = await simulateExecution(code, language);
      onResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Execution failed');
    } finally {
      setIsExecuting(false);
    }
  };

  const simulateExecution = async (code: string, lang: string): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (lang === 'python') {
      // Simple Python code simulation
      if (code.includes('print')) {
        return { type: 'output', content: code.match(/print\("([^"]*)"\)/)?.[1] || '' };
      }
      if (code.includes('import')) {
        return { type: 'output', content: 'Module imported successfully' };
      }
    }

    if (lang === 'sql') {
      // Simple SQL query simulation
      if (code.toLowerCase().includes('select')) {
        return {
          type: 'table',
          content: [
            { id: 1, name: 'Sample Data', value: 100 },
            { id: 2, name: 'Test Row', value: 200 }
          ]
        };
      }
    }

    return { type: 'output', content: 'Code executed successfully' };
  };

  return (
    <div className="space-y-2">
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