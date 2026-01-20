import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ImprovedPoiPage from "./components/ImprovedPoiPage";
import ImportPOIsScreen from "./components/ImportPOIsScreen";
import AIAssistantModal from "./components/AIAssistantModal";
import { Dashboard } from "./components/Dashboard";
import { Sparkles } from "lucide-react";

export default function App() {
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showAiButtons, setShowAiButtons] = useState(true);
  const [isMapViewMode, setIsMapViewMode] = useState(false);

  const handleAIClick = () => {
    setShowAIPanel(!showAIPanel);
  };

  return (
    <BrowserRouter>
      <div className="relative w-full h-screen overflow-hidden bg-[#f5f5f5]">
        <Routes>
          <Route path="/" element={<Navigate to="/point-of-interest/edit?id=new" replace />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard 
                showAiButtons={showAiButtons}
                onToggleAiButtons={() => setShowAiButtons(!showAiButtons)}
              />
            }
          />
          <Route
            path="/point-of-interest/edit"
            element={
              <ImprovedPoiPage 
                showAiButtons={showAiButtons}
                onToggleAiButtons={() => setShowAiButtons(!showAiButtons)}
                onMapViewChange={setIsMapViewMode}
              />
            }
          />
          <Route
            path="/import-pois"
            element={<ImportPOIsScreen />}
          />
        </Routes>

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
          isMapView={isMapViewMode}
        />
      </div>
    </BrowserRouter>
  );
}