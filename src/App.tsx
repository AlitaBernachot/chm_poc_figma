import { useState } from "react";
import ImprovedPoiPage from "./components/ImprovedPoiPage";
import AIAssistantModal from "./components/AIAssistantModal";
import { Dashboard } from "./components/Dashboard";
import { Sparkles } from "lucide-react";

export default function App() {
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "poi">("poi");
  const [showAiButtons, setShowAiButtons] = useState(true);

  const handleAIClick = () => {
    setShowAIPanel(!showAIPanel);
  };

  const navigateToDashboard = () => {
    setCurrentView("dashboard");
  };

  const navigateToPoi = () => {
    setCurrentView("poi");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f5f5f5]">
      {currentView === "dashboard" ? (
        <Dashboard 
          onNavigateToPoi={navigateToPoi}
          showAiButtons={showAiButtons}
          onToggleAiButtons={() => setShowAiButtons(!showAiButtons)}
        />
      ) : (
        <ImprovedPoiPage 
          onNavigateHome={navigateToDashboard}
          showAiButtons={showAiButtons}
          onToggleAiButtons={() => setShowAiButtons(!showAiButtons)}
        />
      )}

      {/* AI Assistant Button */}
      {showAiButtons && (
        <button
          onClick={handleAIClick}
          className="fixed bottom-8 right-8 text-white rounded-full px-5 py-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 z-50 flex items-center gap-2 group"
          style={{
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-medium">AI Assistant</span>
        </button>
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal 
        isOpen={showAIPanel}
        onClose={() => setShowAIPanel(false)}
      />
    </div>
  );
}