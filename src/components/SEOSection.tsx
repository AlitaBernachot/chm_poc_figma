import { useState } from "react";
import {
  Globe,
  Settings,
  Share2,
  ChevronDown,
  Sparkles,
  Loader2,
  Check,
  X,
} from "lucide-react";

interface SEOSectionProps {
  // SEO State values
  seoMetaTitle: string;
  setSeoMetaTitle: (value: string) => void;
  seoMetaTitleDe: string;
  setSeoMetaTitleDe: (value: string) => void;
  seoMetaTitleIt: string;
  setSeoMetaTitleIt: (value: string) => void;
  seoMetaDescription: string;
  setSeoMetaDescription: (value: string) => void;
  seoMetaDescriptionDe: string;
  setSeoMetaDescriptionDe: (value: string) => void;
  seoMetaDescriptionIt: string;
  setSeoMetaDescriptionIt: (value: string) => void;
  seoKeywords: string;
  setSeoKeywords: (value: string) => void;
  seoKeywordsDe: string;
  setSeoKeywordsDe: (value: string) => void;
  seoKeywordsIt: string;
  setSeoKeywordsIt: (value: string) => void;
  seoCanonicalUrl: string;
  setSeoCanonicalUrl: (value: string) => void;
  seoOgTitle: string;
  setSeoOgTitle: (value: string) => void;
  seoOgTitleDe: string;
  setSeoOgTitleDe: (value: string) => void;
  seoOgTitleIt: string;
  setSeoOgTitleIt: (value: string) => void;
  seoOgDescription: string;
  setSeoOgDescription: (value: string) => void;
  seoOgDescriptionDe: string;
  setSeoOgDescriptionDe: (value: string) => void;
  seoOgDescriptionIt: string;
  setSeoOgDescriptionIt: (value: string) => void;
  seoOgImage: string;
  setSeoOgImage: (value: string) => void;
  seoRobots: string;
  setSeoRobots: (value: string) => void;
  slugUrl: string;
  setSlugUrl: (value: string) => void;
  slugUrlDe: string;
  setSlugUrlDe: (value: string) => void;
  slugUrlIt: string;
  setSlugUrlIt: (value: string) => void;
  
  // UI Control props
  showAiButtons?: boolean;
  onAiOptimize?: () => void;
  isAiOptimizing?: boolean;
  showActions?: boolean;
  onValidate?: () => void;
  onCancel?: () => void;
}

export const SEOSection: React.FC<SEOSectionProps> = ({
  seoMetaTitle,
  setSeoMetaTitle,
  seoMetaTitleDe,
  setSeoMetaTitleDe,
  seoMetaTitleIt,
  setSeoMetaTitleIt,
  seoMetaDescription,
  setSeoMetaDescription,
  seoMetaDescriptionDe,
  setSeoMetaDescriptionDe,
  seoMetaDescriptionIt,
  setSeoMetaDescriptionIt,
  seoKeywords,
  setSeoKeywords,
  seoKeywordsDe,
  setSeoKeywordsDe,
  seoKeywordsIt,
  setSeoKeywordsIt,
  seoCanonicalUrl,
  setSeoCanonicalUrl,
  seoOgTitle,
  setSeoOgTitle,
  seoOgTitleDe,
  setSeoOgTitleDe,
  seoOgTitleIt,
  setSeoOgTitleIt,
  seoOgDescription,
  setSeoOgDescription,
  seoOgDescriptionDe,
  setSeoOgDescriptionDe,
  seoOgDescriptionIt,
  setSeoOgDescriptionIt,
  seoOgImage,
  setSeoOgImage,
  seoRobots,
  setSeoRobots,
  slugUrl,
  setSlugUrl,
  slugUrlDe,
  setSlugUrlDe,
  slugUrlIt,
  setSlugUrlIt,
  showAiButtons = false,
  onAiOptimize,
  isAiOptimizing = false,
  showActions = false,
  onValidate,
  onCancel,
}) => {
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);
  const [isSeoDeLangExpanded, setIsSeoDeLangExpanded] = useState(false);
  const [isSeoItLangExpanded, setIsSeoItLangExpanded] = useState(false);

  return (
    <div className="mt-6 pt-6 border-t border-gray-300" id="seo-section">
      <div className="bg-white rounded shadow p-6 border border-gray-200">
        <div className={`flex items-center justify-between ${isSeoExpanded ? 'mb-4 pb-3 border-b border-gray-200' : ''}`}>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">
              SEO Optimization
            </h2>
            {showAiButtons && !isAiOptimizing && !showActions && onAiOptimize && (
              <button
                onClick={onAiOptimize}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white rounded transition-all shadow-sm hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                AI Optimize SEO
              </button>
            )}
            {isAiOptimizing && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                }}
              >
                <Loader2 className="w-4 h-4 text-white animate-spin" />
                <span className="text-sm font-medium text-white">AI is optimizing SEO...</span>
              </div>
            )}
            {showActions && (
              <div className="flex items-center gap-2">
                <button
                  onClick={onValidate}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Validate
                </button>
                <button
                  onClick={onCancel}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsSeoExpanded(!isSeoExpanded)}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title={isSeoExpanded ? "Collapse section" : "Expand section"}
          >
            <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isSeoExpanded ? "" : "-rotate-90"}`} />
          </button>
        </div>

        {isSeoExpanded && (
          <div className="space-y-6">
            {/* Meta Information - Translatable */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Meta Information
              </h3>

              {/* French (Default) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    🇫🇷 Français (Default)
                  </span>
                </div>

                {/* Meta Title FR */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={seoMetaTitle}
                    onChange={(e) => setSeoMetaTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter meta title (50-60 characters recommended)"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {seoMetaTitle.length}/60 characters
                  </p>
                </div>

                {/* Meta Description FR */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={seoMetaDescription}
                    onChange={(e) => setSeoMetaDescription(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Enter meta description (150-160 characters recommended)"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {seoMetaDescription.length}/160 characters
                  </p>
                </div>

                {/* Keywords FR */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate keywords with commas
                  </p>
                </div>

                {/* Slug URL FR */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    value={slugUrl}
                    onChange={(e) => setSlugUrl(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="rhine-falls-schaffhausen"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL-friendly identifier (use lowercase and hyphens)
                  </p>
                </div>
              </div>

              {/* German Translation */}
              <div className="mt-4">
                <button
                  onClick={() => setIsSeoDeLangExpanded(!isSeoDeLangExpanded)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    🇩🇪 Deutsch
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isSeoDeLangExpanded ? "" : "-rotate-90"}`} />
                </button>

                {isSeoDeLangExpanded && (
                  <div className="mt-3 pl-4 space-y-4 border-l-2 border-gray-200">
                    {/* Meta Title DE */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Meta Title (DE)
                      </label>
                      <input
                        type="text"
                        value={seoMetaTitleDe}
                        onChange={(e) => setSeoMetaTitleDe(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Meta-Titel eingeben"
                        maxLength={60}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoMetaTitleDe.length}/60 Zeichen
                      </p>
                    </div>

                    {/* Meta Description DE */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Meta Description (DE)
                      </label>
                      <textarea
                        value={seoMetaDescriptionDe}
                        onChange={(e) => setSeoMetaDescriptionDe(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="Meta-Beschreibung eingeben"
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoMetaDescriptionDe.length}/160 Zeichen
                      </p>
                    </div>

                    {/* Keywords DE */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Keywords (DE)
                      </label>
                      <input
                        type="text"
                        value={seoKeywordsDe}
                        onChange={(e) => setSeoKeywordsDe(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-ne transition-all"
                        placeholder="Stichwort1, Stichwort2, Stichwort3"
                      />
                    </div>

                    {/* Slug URL DE */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Slug URL (DE)
                      </label>
                      <input
                        type="text"
                        value={slugUrlDe}
                        onChange={(e) => setSlugUrlDe(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="rheinfall-schaffhausen"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        URL-freundliche Kennung (Kleinbuchstaben und Bindestriche verwenden)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Italian Translation */}
              <div className="mt-4">
                <button
                  onClick={() => setIsSeoItLangExpanded(!isSeoItLangExpanded)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    🇮🇹 Italiano
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isSeoItLangExpanded ? "" : "-rotate-90"}`} />
                </button>

                {isSeoItLangExpanded && (
                  <div className="mt-3 pl-4 space-y-4 border-l-2 border-gray-200">
                    {/* Meta Title IT */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Meta Title (IT)
                      </label>
                      <input
                        type="text"
                        value={seoMetaTitleIt}
                        onChange={(e) => setSeoMetaTitleIt(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Inserisci il meta titolo"
                        maxLength={60}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoMetaTitleIt.length}/60 caratteri
                      </p>
                    </div>

                    {/* Meta Description IT */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Meta Description (IT)
                      </label>
                      <textarea
                        value={seoMetaDescriptionIt}
                        onChange={(e) => setSeoMetaDescriptionIt(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="Inserisci la meta descrizione"
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoMetaDescriptionIt.length}/160 caratteri
                      </p>
                    </div>

                    {/* Keywords IT */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Keywords (IT)
                      </label>
                      <input
                        type="text"
                        value={seoKeywordsIt}
                        onChange={(e) => setSeoKeywordsIt(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="parola chiave1, parola chiave2, parola chiave3"
                      />
                    </div>

                    {/* Slug URL IT */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Slug URL (IT)
                      </label>
                      <input
                        type="text"
                        value={slugUrlIt}
                        onChange={(e) => setSlugUrlIt(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="cascate-del-reno-sciaffusa"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Identificatore amichevole per URL (usa minuscole e trattini)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technical SEO */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Technical SEO
              </h3>

              <div className="space-y-4">
                {/* Canonical URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={seoCanonicalUrl}
                    onChange={(e) => setSeoCanonicalUrl(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="https://example.com/page"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    The preferred URL for this page to avoid duplicate content issues
                  </p>
                </div>

                {/* Robots Meta */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Robots Meta Tag
                  </label>
                  <select
                    value={seoRobots}
                    onChange={(e) => setSeoRobots(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="index, follow">Index, Follow (Default)</option>
                    <option value="noindex, follow">No Index, Follow</option>
                    <option value="index, nofollow">Index, No Follow</option>
                    <option value="noindex, nofollow">No Index, No Follow</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Control how search engines crawl and index this page
                  </p>
                </div>
              </div>
            </div>

            {/* Open Graph / Social Media */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Social Media (Open Graph)
              </h3>

              {/* French (Default) OG */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    🇫🇷 Français (Default)
                  </span>
                </div>

                {/* OG Title FR */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    OG Title
                  </label>
                  <input
                    type="text"
                    value={seoOgTitle}
                    onChange={(e) => setSeoOgTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Title for social media sharing"
                    maxLength={60}
                  />
                </div>

                {/* OG Description FR */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    OG Description
                  </label>
                  <textarea
                    value={seoOgDescription}
                    onChange={(e) => setSeoOgDescription(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Description for social media sharing"
                    rows={2}
                    maxLength={200}
                  />
                </div>

                {/* OG Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    OG Image URL
                  </label>
                  <input
                    type="url"
                    value={seoOgImage}
                    onChange={(e) => setSeoOgImage(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 1200x630px
                  </p>
                </div>
              </div>

              {/* German OG */}
              <div className="mt-4">
                <button
                  onClick={() => setIsSeoDeLangExpanded(!isSeoDeLangExpanded)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    🇩🇪 Deutsch
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isSeoDeLangExpanded ? "" : "-rotate-90"}`} />
                </button>

                {isSeoDeLangExpanded && (
                  <div className="mt-3 pl-4 space-y-4 border-l-2 border-gray-200">
                    {/* OG Title DE */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        OG Title (DE)
                      </label>
                      <input
                        type="text"
                        value={seoOgTitleDe}
                        onChange={(e) => setSeoOgTitleDe(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Titel für Social-Media-Sharing"
                        maxLength={60}
                      />
                    </div>

                    {/* OG Description DE */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        OG Description (DE)
                      </label>
                      <textarea
                        value={seoOgDescriptionDe}
                        onChange={(e) => setSeoOgDescriptionDe(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="Beschreibung für Social-Media-Sharing"
                        rows={2}
                        maxLength={200}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Italian OG */}
              <div className="mt-4">
                <button
                  onClick={() => setIsSeoItLangExpanded(!isSeoItLangExpanded)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    🇮🇹 Italiano
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isSeoItLangExpanded ? "" : "-rotate-90"}`} />
                </button>

                {isSeoItLangExpanded && (
                  <div className="mt-3 pl-4 space-y-4 border-l-2 border-gray-200">
                    {/* OG Title IT */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        OG Title (IT)
                      </label>
                      <input
                        type="text"
                        value={seoOgTitleIt}
                        onChange={(e) => setSeoOgTitleIt(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Titolo per la condivisione sui social media"
                        maxLength={60}
                      />
                    </div>

                    {/* OG Description IT */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        OG Description (IT)
                      </label>
                      <textarea
                        value={seoOgDescriptionIt}
                        onChange={(e) => setSeoOgDescriptionIt(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="Descrizione per la condivisione sui social media"
                        rows={2}
                        maxLength={200}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
