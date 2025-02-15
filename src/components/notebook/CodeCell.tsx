import React, { useState } from 'react';
import { Code2 } from 'lucide-react';
import { CodeInterpreter } from './CodeInterpreter';

interface CodeCellProps {
  id: string;
  language: 'python' | 'sql';
  initialCode?: string;
  onChange?: (code: string) => void;
}

export function CodeCell({ id, language, initialCode = '', onChange }: CodeCellProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<any>(null);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onChange?.(newCode);
  };

  const handleResult = (result: any) => {
    setOutput(result);
  };

  return (
    <div className="space-y-2">
      {/* Code Editor */}
      <div className="relative">
        <div className="absolute left-4 top-4">
          <Code2 className="h-5 w-5 text-slate-500" />
        </div>
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className="w-full bg-slate-900 text-white p-4 pl-12 rounded-lg font-mono resize-none focus:ring-2 focus:ring-primary focus:outline-none min-h-[120px]"
          placeholder={`Enter ${language} code...`}
        />
      </div>

      {/* Code Execution Controls */}
      <CodeInterpreter
        code={code}
        language={language}
        onResult={handleResult}
      />

      {/* Output Display */}
      {output && (
        <div className="mt-4 bg-slate-900/50 rounded-lg p-4">
          {output.type === 'output' && (
            <pre className="text-white font-mono text-sm whitespace-pre-wrap">
              {output.content}
            </pre>
          )}
          {output.type === 'table' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead>
                  <tr>
                    {Object.keys(output.content[0]).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-2 text-left text-sm font-medium text-slate-300"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {output.content.map((row: any, i: number) => (
                    <tr key={i}>
                      {Object.values(row).map((value: any, j: number) => (
                        <td
                          key={j}
                          className="px-4 py-2 text-sm text-slate-300"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}