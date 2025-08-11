import { useState } from 'react';
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

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onChange?.(newCode);
  };

  return (
    <div id={id} className="space-y-4">
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

      {/* Code Execution Controls & Output */}
      <CodeInterpreter
        code={code}
        language={language}
      />
    </div>
  );
}