import { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, X, Brain } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'code' | 'query' | 'analysis' | 'general';
  suggestions?: string[];
}

interface AIAssistantProps {
  context?: {
    currentView?: string;
    selectedData?: unknown;
    activeProject?: string;
  };
}

export function AIAssistant({ context }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const contextBasedSuggestions = {
    data: [
      "Help me optimize this query",
      "Analyze this dataset for patterns",
      "Suggest data cleaning steps",
      "Generate a data validation script"
    ],
    notebooks: [
      "Debug this code block",
      "Explain this algorithm",
      "Optimize this function",
      "Suggest improvements"
    ],
    pipelines: [
      "Design a new pipeline",
      "Optimize pipeline performance",
      "Add error handling",
      "Suggest monitoring metrics"
    ],
    models: [
      "Help tune hyperparameters",
      "Analyze model performance",
      "Suggest feature engineering",
      "Explain model predictions"
    ]
  };

  useEffect(() => {
    if (context?.currentView) {
      setSuggestions(contextBasedSuggestions[context.currentView as keyof typeof contextBasedSuggestions] || []);
    }
  }, [context?.currentView]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: getContextAwareResponse(userMessage),
      timestamp: new Date(),
      suggestions: getSmartSuggestions(userMessage)
    };

    return response;
  };

  const getContextAwareResponse = (message: string): string => {
    // In a real implementation, this would call your AI service
    // For now, we'll return context-aware mock responses
    if (message.toLowerCase().includes('query')) {
      return "I can help optimize your query. Would you like me to analyze its performance or suggest improvements for better readability?";
    } else if (message.toLowerCase().includes('pipeline')) {
      return "I can help design or optimize your data pipeline. What specific aspect would you like to focus on?";
    } else if (message.toLowerCase().includes('model')) {
      return "I can assist with model development. Would you like help with hyperparameter tuning, feature engineering, or performance analysis?";
    }
    return "I understand you need help. Could you provide more details about what you'd like to accomplish?";
  };

  const getSmartSuggestions = (message: string): string[] => {
    // Generate contextual suggestions based on user input
    if (message.toLowerCase().includes('query')) {
      return [
        "Show query performance metrics",
        "Optimize query structure",
        "Add index recommendations",
        "Generate documentation"
      ];
    }
    return [
      "Tell me more about what you need",
      "Show me an example",
      "Explain the current issue",
      "Suggest best practices"
    ];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      const aiResponse = await generateResponse(input);
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const renderMessage = (message: Message) => {
    return (
      <div
        key={message.id}
        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[80%] rounded-lg p-4 ${
            message.type === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-700 text-slate-200'
          }`}
        >
          {message.type === 'assistant' && (
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">AI Assistant</span>
            </div>
          )}
          <p className="text-sm">{message.content}</p>
          {message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="block w-full text-left px-3 py-2 rounded bg-slate-600/50 hover:bg-slate-600 text-sm text-slate-200 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-slate-800 rounded-lg shadow-xl transition-all duration-300 ${
      isMinimized ? 'w-auto' : 'w-96'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-400" />
          <span className={`font-medium text-white ${isMinimized ? 'hidden' : 'block'}`}>
            AI Assistant
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-slate-700 rounded"
          >
            {isMinimized ? (
              <Sparkles className="h-5 w-5 text-blue-400" />
            ) : (
              <X className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && messages.length === 0 && (
            <div className="px-4 pb-2">
              <div className="text-sm text-slate-400 mb-2">Suggested questions:</div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left px-3 py-2 rounded bg-slate-700/50 hover:bg-slate-700 text-sm text-slate-200 transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about your data, code, or analysis..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={isThinking}
                className={`bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition ${
                  isThinking ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isThinking ? (
                  <Brain className="h-5 w-5 text-white animate-pulse" />
                ) : (
                  <Send className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}