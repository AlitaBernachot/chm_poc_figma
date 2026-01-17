import React, { useState } from "react";
import {
  ChevronDown,
  MessageSquare,
  History,
  AlertCircle,
  ThumbsUp,
  RotateCcw,
  Clock,
} from "lucide-react";

export function HistorySection() {
  const [historyTab, setHistoryTab] = useState<
    "reviews" | "edits"
  >("reviews");
  const [isHistoryExpanded, setIsHistoryExpanded] =
    useState(true);

  return (
    <div className="mt-6 pt-6">
      <div
        id="history-section"
        className="bg-white rounded shadow p-6 border border-gray-200 scroll-mt-6"
      >
        <div
          className={`flex items-center justify-between ${isHistoryExpanded ? "mb-4 pb-3 border-b border-gray-200" : ""}`}
        >
          <h2 className="text-lg font-bold text-gray-800">
            History
          </h2>
          <button
            onClick={() =>
              setIsHistoryExpanded(!isHistoryExpanded)
            }
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title={
              isHistoryExpanded
                ? "Collapse section"
                : "Expand section"
            }
          >
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${isHistoryExpanded ? "" : "-rotate-90"}`}
            />
          </button>
        </div>
        {isHistoryExpanded && (
          <>
            <div className="mb-4">
              <div className="flex items-center gap-4 border-b border-gray-200">
                <button
                  onClick={() => setHistoryTab("reviews")}
                  className={`pb-3 px-2 text-sm font-medium transition-all flex items-center gap-2 ${
                    historyTab === "reviews"
                      ? "border-b-2 text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  style={
                    historyTab === "reviews"
                      ? {
                          borderColor: "#d4021c",
                          color: "#d4021c",
                        }
                      : {}
                  }
                >
                  <MessageSquare className="w-4 h-4" />
                  Reviews
                </button>
                <button
                  onClick={() => setHistoryTab("edits")}
                  className={`pb-3 px-2 text-sm font-medium transition-all flex items-center gap-2 ${
                    historyTab === "edits"
                      ? "border-b-2 text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  style={
                    historyTab === "edits"
                      ? {
                          borderColor: "#d4021c",
                          color: "#d4021c",
                        }
                      : {}
                  }
                >
                  <History className="w-4 h-4" />
                  Edits
                </button>
              </div>
            </div>

            {historyTab === "reviews" && (
              <div className="space-y-4">
                {/* Warning Message */}
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-800 mb-1">
                        Review Required
                      </p>
                      <p className="text-sm text-yellow-700">
                        The current version V6 is awaiting
                        review. Please review and approve or
                        request changes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review 1 - Approved */}
                <div className="border border-gray-200 rounded p-4 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm text-gray-900 leading-relaxed flex-1">
                      Everything looks great! The photos are
                      clear and the description is accurate.
                      Ready to publish.
                    </p>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold flex-shrink-0">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Approved
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2ODYzNTY2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Sophie Bernard"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-600">
                      Sophie Bernard
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs text-gray-500">
                      January 14, 2026 at 10:32 AM
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      Version 6
                    </span>
                  </div>
                </div>

                {/* Review 2 - Changes Requested */}
                <div className="border border-gray-200 rounded p-4 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm text-gray-900 leading-relaxed flex-1">
                      Please add more specific opening hours for
                      the summer season. Also, the wheelchair
                      accessibility information is missing.
                    </p>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold flex-shrink-0">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Changes Requested
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-white">
                        MK
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">
                      Marc Keller
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs text-gray-500">
                      January 12, 2026 at 3:45 PM
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      Version 5
                    </span>
                  </div>
                </div>

                {/* Review 3 - Comment */}
                <div className="border border-gray-200 rounded p-4 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm text-gray-900 leading-relaxed flex-1">
                      This POI would benefit from additional
                      photos showing the surrounding area and
                      parking options.
                    </p>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold flex-shrink-0">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Comment
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg1NzkyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Anna Lehmann"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-600">
                      Anna Lehmann
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs text-gray-500">
                      January 10, 2026 at 9:15 AM
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      Version 4
                    </span>
                  </div>
                </div>

                {/* Review 4 - Approved - V4 */}
                <div className="border border-gray-200 rounded p-4 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm text-gray-900 leading-relaxed flex-1">
                      Excellent update! The route connections
                      are now clearly indicated and the
                      difficulty rating matches the terrain.
                    </p>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold flex-shrink-0">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Approved
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-white">
                        PR
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">
                      Pierre Roux
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs text-gray-500">
                      January 10, 2026 at 2:30 PM
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      Version 4
                    </span>
                  </div>
                </div>

                {/* Review 5 - Changes Requested - V4 */}
                <div className="border border-gray-200 rounded p-4 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm text-gray-900 leading-relaxed flex-1">
                      The elevation data needs verification.
                      Please double-check the coordinates
                      against the official Swiss topo maps.
                    </p>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold flex-shrink-0">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Changes Requested
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3Mzc0MDcxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Christoph Weber"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-600">
                      Christoph Weber
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs text-gray-500">
                      January 10, 2026 at 11:20 AM
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      Version 4
                    </span>
                  </div>
                </div>

                {/* Review 6 - Comment - V3 */}
                <div className="border border-gray-200 rounded p-4 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm text-gray-900 leading-relaxed flex-1">
                      Great work on the multilingual
                      descriptions! The German and Italian
                      translations are very well done.
                    </p>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold flex-shrink-0">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Comment
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-white">
                        TM
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">
                      Thomas Müller
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs text-gray-500">
                      January 8, 2026 at 2:20 PM
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      Version 3
                    </span>
                  </div>
                </div>

                {/* Review 5 - Approved */}
                <div className="border border-gray-200 rounded p-4 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm text-gray-900 leading-relaxed flex-1">
                      Perfect! All the technical details are
                      accurate and the location coordinates are
                      correct.
                    </p>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold flex-shrink-0">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Approved
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2ODU4Nzg2MHww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Julie Dubois"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-600">
                      Julie Dubois
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs text-gray-500">
                      January 5, 2026 at 11:05 AM
                    </span>
                    <span className="text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      Version 2
                    </span>
                  </div>
                </div>
              </div>
            )}

            {historyTab === "edits" && (
              <div className="space-y-3">
                {/* Warning Message */}
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-800 mb-1">
                        Review Required
                      </p>
                      <p className="text-sm text-yellow-700">
                        The current version V6 is awaiting
                        review. Please review and approve or
                        request changes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* History Entry 1 - Most Recent V7 */}
                <div className="border border-gray-200 rounded p-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          V7
                        </div>
                      </div>
                      <div className="border-l border-gray-300 pl-4 flex-1">
                        <p className="text-sm text-gray-800">
                          January 16, 2026 at 9:12:45 AM
                        </p>
                        <p className="text-xs text-gray-500">
                          by Hiking Mrs. Bean
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">
                            Reviews:
                          </span>
                          <span className="text-xs text-gray-500">
                            No reviews yet
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors whitespace-nowrap"
                      title="Restore to this version"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                  </div>
                </div>

                {/* History Entry 2 - Current V6 */}
                <div
                  className="border rounded p-4 shadow-sm transition-colors"
                  style={{
                    backgroundColor: "#fef2f2",
                    borderColor: "#fecaca",
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          V6
                        </div>
                        <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">
                          Current
                        </span>
                      </div>
                      <div className="border-l border-gray-300 pl-4 flex-1">
                        <p className="text-sm text-gray-800">
                          January 15, 2026 at 2:45:30 PM
                        </p>
                        <p className="text-xs text-gray-500">
                          by Hiking Mrs. Bean
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">
                            Status:
                          </span>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                            <Clock className="w-3 h-3" />
                            <span>Review Required</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* History Entry 3 - V5 */}
                <div className="border border-gray-200 rounded p-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          V5
                        </div>
                      </div>
                      <div className="border-l border-gray-300 pl-4 flex-1">
                        <p className="text-sm text-gray-800">
                          January 14, 2026 at 9:20:15 AM
                        </p>
                        <p className="text-xs text-gray-500">
                          by Hiking Mrs. Bean
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">
                            Reviews:
                          </span>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                            <AlertCircle className="w-3 h-3" />
                            <span>Marc Keller</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors whitespace-nowrap"
                      title="Restore to this version"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                  </div>
                </div>

                {/* History Entry 4 - V4 */}
                <div className="border border-gray-200 rounded p-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          V4
                        </div>
                      </div>
                      <div className="border-l border-gray-300 pl-4 flex-1">
                        <p className="text-sm text-gray-800">
                          January 13, 2026 at 4:10:42 PM
                        </p>
                        <p className="text-xs text-gray-500">
                          by Hiking Mrs. Bean
                        </p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="text-xs text-gray-400">
                            Reviews:
                          </span>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                            <MessageSquare className="w-3 h-3" />
                            <span>Anna Lehmann</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                            <ThumbsUp className="w-3 h-3" />
                            <span>Pierre Roux</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                            <AlertCircle className="w-3 h-3" />
                            <span>Christoph Weber</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors whitespace-nowrap"
                      title="Restore to this version"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                  </div>
                </div>

                {/* History Entry 5 - V3 */}
                <div className="border border-gray-200 rounded p-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          V3
                        </div>
                      </div>
                      <div className="border-l border-gray-300 pl-4 flex-1">
                        <p className="text-sm text-gray-800">
                          January 12, 2026 at 11:35:28 AM
                        </p>
                        <p className="text-xs text-gray-500">
                          by Lucie Aubrac
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">
                            Reviews:
                          </span>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                            <MessageSquare className="w-3 h-3" />
                            <span>Thomas Müller</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors whitespace-nowrap"
                      title="Restore to this version"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                  </div>
                </div>

                {/* History Entry 6 - V2 */}
                <div className="border border-gray-200 rounded p-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          V2
                        </div>
                      </div>
                      <div className="border-l border-gray-300 pl-4 flex-1">
                        <p className="text-sm text-gray-800">
                          January 11, 2026 at 8:55:10 AM
                        </p>
                        <p className="text-xs text-gray-500">
                          by Hiking Mrs. Bean
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">
                            Reviews:
                          </span>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                            <ThumbsUp className="w-3 h-3" />
                            <span>Julie Dubois</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors whitespace-nowrap"
                      title="Restore to this version"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                  </div>
                </div>

                {/* History Entry 7 - V1 */}
                <div className="border border-gray-200 rounded p-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          V1
                        </div>
                      </div>
                      <div className="border-l border-gray-300 pl-4 flex-1">
                        <p className="text-sm text-gray-800">
                          January 10, 2026 at 3:22:05 PM
                        </p>
                        <p className="text-xs text-gray-500">
                          by Hiking Mrs. Bean
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">
                            Reviews:
                          </span>
                          <span className="text-xs text-gray-500">
                            No reviews yet
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors whitespace-nowrap"
                      title="Restore to this version"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}