import { useState } from "react";
import ImprovedPoiPage from "./components/ImprovedPoiPage";
import { Sparkles, X } from "lucide-react";

export default function App() {
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIClick = () => {
    setShowAIPanel(true);
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      setAiSuggestion(`Based on your current POI data, I've analyzed the following insights:

• You have 15 points of interest in your database
• 80% are geolocated successfully
• Suggested optimization: Add more descriptive content to "Market Hall Altenrhein" and "Visitor Centre c-Brugg/UP Appenweier"
• Popular categories: Museums (5), Historic Sites (4), Recreation (6)
• Recommendation: Consider adding route connections between nearby POIs to improve user experience`);
      setIsGenerating(false);
    }, 1500);
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

      {/* AI Panel */}
      {showAIPanel && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-in fade-in duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    AI Assistant
                  </h2>
                  <p className="text-sm text-white/80">
                    Intelligent suggestions for your POIs
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAIPanel(false)}
                className="hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <Sparkles className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    Analyzing your POI data...
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      AI Insights & Recommendations
                    </h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {aiSuggestion}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white border-2 border-purple-200 text-purple-700 rounded px-4 py-3 font-medium hover:bg-purple-50 transition-colors">
                      Auto-optimize Routes
                    </button>
                    <button className="bg-white border-2 border-blue-200 text-blue-700 rounded px-4 py-3 font-medium hover:bg-blue-50 transition-colors">
                      Generate Descriptions
                    </button>
                    <button className="bg-white border-2 border-green-200 text-green-700 rounded px-4 py-3 font-medium hover:bg-green-50 transition-colors">
                      Suggest Connections
                    </button>
                    <button className="bg-white border-2 border-orange-200 text-orange-700 rounded px-4 py-3 font-medium hover:bg-orange-50 transition-colors">
                      Analyze Trends
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                AI suggestions are based on current POI data and
                best practices
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}