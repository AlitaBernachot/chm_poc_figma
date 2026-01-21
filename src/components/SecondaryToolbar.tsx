import {
  Clock,
  ChevronDown,
  Undo,
  Redo,
  Sparkles,
  Loader2,
  MapPin,
  Save,
  X,
} from "lucide-react";
import { FloatingQuickAccess } from "./FloatingQuickAccess";

interface SecondaryToolbarProps {
  isReviewDropdownOpen: boolean;
  setIsReviewDropdownOpen: (open: boolean) => void;
  isAiGeneratingReview: boolean;
  handleAiReviewSuggestion: () => void;
  reviewComment: string;
  setReviewComment: (comment: string) => void;
  reviewAction: "comment" | "approve" | "request-changes";
  setReviewAction: (action: "comment" | "approve" | "request-changes") => void;
  handleSubmitReview: () => void;
  setShowPreviewModal: (show: boolean) => void;
  isSaveDropdownOpen: boolean;
  setIsSaveDropdownOpen: (open: boolean) => void;
  onClose: () => void;
  showFloatingQuickAccess: boolean;
  scrollToSection: (sectionId: string) => void;
  selectedCategory: string;
  additionalLanguages: { id: number; name: string; flag: string; expanded: boolean }[];
  openLanguage: (language: "french" | "english" | "german" | number) => void;
}

export function SecondaryToolbar({
  isReviewDropdownOpen,
  setIsReviewDropdownOpen,
  isAiGeneratingReview,
  handleAiReviewSuggestion,
  reviewComment,
  setReviewComment,
  reviewAction,
  setReviewAction,
  handleSubmitReview,
  setShowPreviewModal,
  isSaveDropdownOpen,
  setIsSaveDropdownOpen,
  onClose,
  showFloatingQuickAccess,
  scrollToSection,
  selectedCategory,
  additionalLanguages,
  openLanguage,
}: SecondaryToolbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between relative">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <Clock className="absolute left-3 w-4 h-4 text-gray-500 pointer-events-none z-10" />
          <select className="pl-9 pr-10 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white">
            <option>Last change 5 min ago</option>
            <option>
              Version 1 - 5 min ago (Current)
            </option>
            <option>Version 2 - 1 hour ago</option>
            <option>Version 3 - Yesterday</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <button
            onClick={() => console.log('Undo')}
            className="px-2 py-1.5 transition-colors bg-white text-gray-600 hover:bg-gray-100"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-300"></div>
          
          <button
            onClick={() => console.log('Redo')}
            className="px-2 py-1.5 transition-colors bg-white text-gray-600 hover:bg-gray-100"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {showFloatingQuickAccess && (
          <FloatingQuickAccess
            scrollToSection={scrollToSection}
            selectedCategory={selectedCategory}
            additionalLanguages={additionalLanguages}
            openLanguage={openLanguage}
          />
        )}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <div className="relative">
          <button
            onClick={() => setIsReviewDropdownOpen(!isReviewDropdownOpen)}
            className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded hover:bg-yellow-200 transition-colors cursor-pointer"
          >
            Review required
          </button>
          
          {isReviewDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsReviewDropdownOpen(false)}
              />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-white rounded shadow-lg border border-gray-200 z-50">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">Finish your review</h3>
                    {!isAiGeneratingReview && (
                      <button
                        onClick={handleAiReviewSuggestion}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-xs font-semibold rounded transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        AI review suggestion
                      </button>
                    )}
                    {isAiGeneratingReview && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded text-xs">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        <span
                          style={{ 
                            background: 'linear-gradient(90deg, #ffffff 0%, #e0e7ff 25%, #ffffff 50%, #e0e7ff 75%, #ffffff 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'shine 2s linear infinite',
                          }}
                          className="font-semibold"
                        >
                          Thinking...
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Comment textarea */}
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Leave a comment"
                    disabled={isAiGeneratingReview}
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                  
                  {/* Review action radio buttons with custom styling */}
                  <div className="space-y-2 mb-4">
                    <label 
                      onClick={() => setReviewAction("comment")}
                      className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                        reviewAction === "comment" 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                        reviewAction === "comment" 
                          ? "border-blue-500" 
                          : "border-gray-300"
                      }`}>
                        {reviewAction === "comment" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Comment</div>
                        <div className="text-xs text-gray-500">Submit general feedback without explicit approval.</div>
                      </div>
                    </label>
                    
                    <label 
                      onClick={() => setReviewAction("approve")}
                      className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                        reviewAction === "approve" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                        reviewAction === "approve" 
                          ? "border-green-500" 
                          : "border-gray-300"
                      }`}>
                        {reviewAction === "approve" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Approve</div>
                        <div className="text-xs text-gray-500">Submit feedback and approve this POI.</div>
                      </div>
                    </label>
                    
                    <label 
                      onClick={() => setReviewAction("request-changes")}
                      className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                        reviewAction === "request-changes" 
                          ? "border-orange-500 bg-orange-50" 
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                        reviewAction === "request-changes" 
                          ? "border-orange-500" 
                          : "border-gray-300"
                      }`}>
                        {reviewAction === "request-changes" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Request changes</div>
                        <div className="text-xs text-gray-500">Submit feedback that must be addressed before approval.</div>
                      </div>
                    </label>
                  </div>
                  
                  {/* Submit button */}
                  <button
                    onClick={handleSubmitReview}
                    disabled={isAiGeneratingReview}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Submit review
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowPreviewModal(true)}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 border border-blue-300 hover:bg-blue-100 text-blue-700 rounded font-semibold transition-colors shadow-sm"
        >
          <MapPin className="w-4 h-4" />
          Map preview
        </button>

        <div className="relative">
          <div className="flex items-center bg-gray-700 hover:bg-gray-800 rounded shadow-sm overflow-hidden">
            <button className="flex items-center gap-2 px-4 py-1.5 text-white font-semibold transition-colors">
              <Save className="w-4 h-4" />
              Save as draft
            </button>
            <div className="w-px h-6 bg-gray-500"></div>
            <button 
              onClick={() => setIsSaveDropdownOpen(!isSaveDropdownOpen)}
              className="px-2 py-1.5 text-white transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          {isSaveDropdownOpen && (
            <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[200px]">
              <button 
                onClick={() => {
                  setIsSaveDropdownOpen(false);
                  // Handle save as draft
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700"
              >
                Save as draft
              </button>
              <button 
                onClick={() => {
                  setIsSaveDropdownOpen(false);
                  // Handle save and publish
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700"
              >
                Save and publish
              </button>
              <button 
                onClick={() => {
                  setIsSaveDropdownOpen(false);
                  // Handle archive
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700"
              >
                Archive
              </button>
            </div>
          )}
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}