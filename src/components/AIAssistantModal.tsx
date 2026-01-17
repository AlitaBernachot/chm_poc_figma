import { useState } from "react";
import { X, MoreHorizontal, ArrowUp, Plus, ChevronDown, Wand2, CheckCircle, FileText, Sparkles } from "lucide-react";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistantModal({ isOpen, onClose }: AIAssistantModalProps) {
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [prompt, setPrompt] = useState("");

  if (!isOpen) return null;

  const mainActions = [
    { icon: CheckCircle, label: "Review the current POI" },
    { icon: Sparkles, label: "Improve the current POI" },
    { icon: FileText, label: "Generate a POI from a context" },
  ];

  const additionalActions = [
    { icon: Wand2, label: "Optimize SEO metadata" },
    { icon: CheckCircle, label: "Translate POI to another language" },
  ];

  const allActions = showMoreActions ? [...mainActions, ...additionalActions] : mainActions;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="fixed bottom-24 right-8 z-50 w-[480px] bg-white rounded shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between rounded-t" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)' }}>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-white" />
            <h2 className="text-base font-semibold text-white">AI Assistant</h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="hover:bg-white/20 rounded p-1.5 transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded p-1.5 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-5 space-y-5">
          {/* Greeting */}
          <div className="text-sm text-gray-600 flex items-center gap-1.5">
            <span className="text-xl animate-wave inline-block" style={{ transformOrigin: '70% 70%' }}>👋</span>
            <span>Hi, I am GAI, your AI assistant, how can I help you?</span>
          </div>

          {/* Action List */}
          <div className="space-y-2 px-6">
            {allActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded border border-purple-200 hover:border-purple-400 hover:bg-purple-50/50 transition-all text-left group"
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{action.label}</span>
                </button>
              );
            })}

            {/* Show More Button */}
            <button
              onClick={() => setShowMoreActions(!showMoreActions)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showMoreActions ? 'rotate-180' : ''}`} />
              <span className="font-medium">
                {showMoreActions ? "Show less" : "Show more"}
              </span>
            </button>
            
            {/* Or start asking text */}
            <div className="text-center pt-2">
              <span className="text-sm text-gray-500 italic">or simply start asking...</span>
            </div>
          </div>

          {/* Input Area */}
          <div className="pt-2 px-2">
            <div className="border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write a prompt, @someone, or use / for actions"
                className="w-full px-4 pt-3 pb-2 resize-none focus:outline-none text-sm min-h-[60px] max-h-32 rounded-t-lg"
                rows={2}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                }}
              />
              
              {/* Bottom toolbar */}
              <div className="flex items-center justify-between px-3 py-2 rounded-b-lg">
                <button
                  className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Add attachment"
                >
                  <Plus className="w-5 h-5 text-gray-500" />
                </button>
                
                <button
                  className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 rounded transition-colors"
                  aria-label="Send"
                  disabled={!prompt.trim()}
                >
                  <ArrowUp className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-wave {
          animation: wave 2.5s infinite;
        }
      `}</style>
    </>
  );
}