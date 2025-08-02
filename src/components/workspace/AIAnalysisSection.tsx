import { useState } from 'react';
import { Brain, BarChart2, Table, FileText } from 'lucide-react';

export function AIAnalysisSection() {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Analysis Input */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">AI Data Analysis</h2>
        </div>
        
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to analyze... (e.g., 'Analyze customer churn patterns over the last 6 months')"
            className="w-full h-32 bg-slate-700/50 text-white p-4 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition disabled:opacity-50"
          >
            <Brain className="h-5 w-5" />
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Data'}</span>
          </button>
        </div>
      </div>

      {/* Analysis Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 hover:ring-2 hover:ring-purple-500/50 transition cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart2 className="h-5 w-5 text-purple-400" />
            <h3 className="text-white font-medium">Trend Analysis</h3>
          </div>
          <p className="text-slate-400 text-sm">Identify patterns and trends in your data</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 hover:ring-2 hover:ring-purple-500/50 transition cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <Table className="h-5 w-5 text-purple-400" />
            <h3 className="text-white font-medium">Correlation Analysis</h3>
          </div>
          <p className="text-slate-400 text-sm">Discover relationships between variables</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 hover:ring-2 hover:ring-purple-500/50 transition cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-5 w-5 text-purple-400" />
            <h3 className="text-white font-medium">Summary Statistics</h3>
          </div>
          <p className="text-slate-400 text-sm">Get quick insights about your data</p>
        </div>
      </div>

      {/* Analysis Results will be shown here */}
    </div>
  );
}