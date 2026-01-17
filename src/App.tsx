import { useState } from "react";
import ImprovedPoiPage from "./components/ImprovedPoiPage";
import AIAssistantModal from "./components/AIAssistantModal";
import { Sparkles } from "lucide-react";

export default function App() {
  const [showAIPanel, setShowAIPanel] = useState(false);

  const handleAIClick = () => {
    setShowAIPanel(!showAIPanel);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f5f5f5]">
      <ImprovedPoiPage />

      {/* AI Assistant Button */}
      <button
        onClick={handleAIClick}
        className="fixed bottom-8 right-8 text-white rounded px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 flex items-center gap-2 group"
        style={{
          background:
            "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
        }}
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="font-semibold">AI Assistant</span>
      </button>

      {/* AI Assistant Modal */}
      <AIAssistantModal 
        isOpen={showAIPanel}
        onClose={() => setShowAIPanel(false)}
      />
    </div>
  );
}