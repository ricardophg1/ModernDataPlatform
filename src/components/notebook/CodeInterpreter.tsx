import { useState } from 'react';
import { Play, Loader2, XCircle } from 'lucide-react';

export type ExecutionResult =
  | { type: 'output'; content: string }
  | { type: 'table'; content: Record<string, unknown>[] };

interface CodeInterpreterProps {
  code: string;
  language: 'python' | 'sql';
  onResult: (result: ExecutionResult) => void;
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

  const simulateExecution = async (code: string, lang: string): Promise<ExecutionResult> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Increased delay for realism

    if (lang === 'python') {
      if (code.includes('error')) {
        throw new Error("Simulated Python Error: 'error' keyword detected.");
      }
      if (code.includes('print')) {
        return { type: 'output', content: `[stdout] ${code.match(/print\((.*)\)/)?.[1] || ''}` };
      }
      if (code.includes('import pandas')) {
        return { type: 'output', content: 'Pandas imported successfully. Ready for data analysis.' };
      }
      return { type: 'output', content: 'Python code executed without explicit output.' };
    }

    if (lang === 'sql') {
      const lowerCaseCode = code.toLowerCase();
      if (lowerCaseCode.includes('error')) {
        throw new Error("Simulated SQL Error: 'error' keyword detected.");
      }
      if (lowerCaseCode.includes('users')) {
        return {
          type: 'table',
          content: [
            { user_id: 'u001', email: 'alice@example.com', sign_up_date: '2023-01-15' },
            { user_id: 'u002', email: 'bob@example.com', sign_up_date: '2023-02-20' },
            { user_id: 'u003', email: 'charlie@example.com', sign_up_date: '2023-03-25' },
          ]
        };
      }
      if (lowerCaseCode.includes('products')) {
        return {
          type: 'table',
          content: [
            { product_id: 'p01', name: 'Laptop', price: 1200, stock: 50 },
            { product_id: 'p02', name: 'Mouse', price: 25, stock: 300 },
            { product_id: 'p03', name: 'Keyboard', price: 75, stock: 150 },
          ]
        };
      }
      return { type: 'output', content: 'SQL query executed. 0 rows returned.' };
    }

    // Fallback for other languages
    return { type: 'output', content: `Code in ${lang} executed successfully.` };
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