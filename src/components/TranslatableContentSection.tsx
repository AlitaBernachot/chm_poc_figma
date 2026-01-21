import React from "react";
import { RichTextEditor } from "./RichTextEditor";
import {
  Sparkles,
  Loader2,
  Check,
  X,
  Plus,
  List,
  Columns2,
  ChevronDown,
  ChevronUp,
  Pin,
  Pen,
  ArrowLeftRight,
} from "lucide-react";

interface CustomField {
  id: number;
  label: string;
}

interface AdditionalLanguage {
  id: number;
  name: string;
  flag: string;
  expanded: boolean;
  code?: string;
}

interface TranslatableContentSectionProps {
  // View Mode
  translationViewMode: "accordion" | "columns";
  onTranslationViewModeChange: (mode: "accordion" | "columns") => void;

  // AI Translation
  showAiButtons: boolean;
  isAiTranslating: boolean;
  showTranslateActions: boolean;
  onAiTranslate: () => void;
  onValidateTranslation: () => void;
  onCancelTranslation: () => void;

  // Custom Fields
  customFields: CustomField[];
  editingCustomFieldId: number | null;
  onAddCustomField: () => void;
  onRemoveCustomField: (id: number) => void;
  onUpdateCustomFieldLabel: (id: number, newLabel: string) => void;
  onEditingCustomFieldIdChange: (id: number | null) => void;

  // French 
  frenchTitle: string;
  frenchDescription: string;
  onFrenchTitleChange: (value: string) => void;
  onFrenchDescriptionChange: (value: string) => void;

  // English Translation (Main Language)
  isEnglishExpanded: boolean;
  englishTitle: string;
  englishDescription: string;
  onOpenLanguage: (language: "english" | "german" | number) => void;
  onEnglishTitleChange: (value: string) => void;
  onEnglishDescriptionChange: (value: string) => void;

  // German Translation
  isGermanExpanded: boolean;
  germanTitle: string;
  germanDescription: string;
  onGermanTitleChange: (value: string) => void;
  onGermanDescriptionChange: (value: string) => void;

  // Additional Languages
  additionalLanguages: AdditionalLanguage[];
  otherLanguagesTitles: Record<string, string>;
  otherLanguagesDescriptions: Record<string, string>;
  onOtherLanguagesTitlesChange: (titles: Record<string, string>) => void;
  onOtherLanguagesDescriptionsChange: (descriptions: Record<string, string>) => void;

  // Add Language
  availableLanguages: { name: string; flag: string }[];
  isAddLanguageDropdownOpen: boolean;
  onAddLanguageDropdownOpenChange: (isOpen: boolean) => void;
  onAddLanguage: (name: string, flag: string) => void;

  // Column View
  leftColumnLanguage: string;
  rightColumnLanguage: string;
  onLeftColumnLanguageChange: (language: string) => void;
  onRightColumnLanguageChange: (language: string) => void;
  onSwapLanguages: () => void;
}

export const TranslatableContentSection: React.FC<TranslatableContentSectionProps> = ({
  translationViewMode,
  onTranslationViewModeChange,
  showAiButtons,
  isAiTranslating,
  showTranslateActions,
  onAiTranslate,
  onValidateTranslation,
  onCancelTranslation,
  customFields,
  editingCustomFieldId,
  onAddCustomField,
  onRemoveCustomField,
  onUpdateCustomFieldLabel,
  onEditingCustomFieldIdChange,
  frenchTitle,
  frenchDescription,
  onFrenchTitleChange,
  onFrenchDescriptionChange,
  isFrenchExpanded,
  isEnglishExpanded,
  englishTitle,
  englishDescription,
  onOpenLanguage,
  onEnglishTitleChange,
  onEnglishDescriptionChange,
  isGermanExpanded,
  germanTitle,
  germanDescription,
  onGermanTitleChange,
  onGermanDescriptionChange,
  additionalLanguages,
  otherLanguagesTitles,
  otherLanguagesDescriptions,
  onOtherLanguagesTitlesChange,
  onOtherLanguagesDescriptionsChange,
  availableLanguages,
  isAddLanguageDropdownOpen,
  onAddLanguageDropdownOpenChange,
  onAddLanguage,
  leftColumnLanguage,
  rightColumnLanguage,
  onLeftColumnLanguageChange,
  onRightColumnLanguageChange,
  onSwapLanguages,
}) => {
  return (
    <div
      id="translatable-section"
      className="bg-white rounded shadow p-6 border border-gray-200 scroll-mt-6"
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">
          Translatable Content
        </h2>
        <div className="flex items-center gap-2">
          {showAiButtons && !isAiTranslating && !showTranslateActions && (
            <button
              onClick={onAiTranslate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm rounded transition-all shadow-sm hover:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
              }}
            >
              <Sparkles className="w-4 h-4" />
              AI Generate translations
            </button>
          )}
          {isAiTranslating && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded text-sm">
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span
                style={{ 
                  background: 'linear-gradient(90deg, #ffffff 0%, #e0e7ff 25%, #ffffff 50%, #e0e7ff 75%, #ffffff 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shine 2s linear infinite'
                }}
                className="font-semibold"
              >
                Thinking...
              </span>
            </div>
          )}
          {showTranslateActions && (
            <>
              <button
                onClick={onValidateTranslation}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-green-500 hover:bg-green-600 rounded transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                Validate
              </button>
              <button
                onClick={onCancelTranslation}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-red-500 hover:bg-red-600 rounded transition-colors shadow-sm"
              >
                <X className="w-3.5 h-3.5" />
                Cancel
              </button>
            </>
          )}
          <button
            onClick={onAddCustomField}
            className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm rounded transition-colors hover:opacity-90"
            style={{ backgroundColor: "#d4021c" }}
          >
            <Plus className="w-4 h-4" />
            Add Custom Field
          </button>
          <div className="flex items-center gap-1 ml-2 border border-gray-300 rounded overflow-hidden">
            <button
              onClick={() => onTranslationViewModeChange("accordion")}
              className={`p-1.5 transition-colors ${
                translationViewMode === "accordion"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              title="Accordion view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => onTranslationViewModeChange("columns")}
              className={`p-1.5 transition-colors ${
                translationViewMode === "columns"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              title="Column view"
            >
              <Columns2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Conditional rendering based on view mode */}
      {translationViewMode === "accordion" ? (
        <div className="space-y-6">
          {/* English (Main Language) - Always Open */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-base font-bold text-gray-700">
                English (Main)
              </h3>
              <Pin className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={englishTitle}
                onChange={(e) => onEnglishTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Untitled"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <RichTextEditor
                value={englishDescription}
                onChange={onEnglishDescriptionChange}
                placeholder=""
                showAiButton={showAiButtons}
                onAiGenerate={() =>
                  console.log(
                    "AI Generate English Description",
                  )
                }
                showHelpLink={showAiButtons}
                onHelpClick={() =>
                  console.log(
                    "Help generate English description",
                  )
                }
              />
            </div>

            {/* Custom Fields for English */}
            {customFields.map((field) => (
              <div key={field.id} className="relative">
                <div className="flex items-center gap-2 mb-2">
                  {editingCustomFieldId === field.id ? (
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => onUpdateCustomFieldLabel(field.id, e.target.value)}
                      onBlur={() => onEditingCustomFieldIdChange(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onEditingCustomFieldIdChange(null);
                        }
                      }}
                      autoFocus
                      className="flex-1 px-2 py-1 text-sm font-semibold text-gray-700 border border-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <>
                      <label className="text-sm font-semibold text-gray-700">
                        {field.label}
                      </label>
                      <button
                        onClick={() => onEditingCustomFieldIdChange(field.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Edit field name"
                      >
                        <Pen className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                  />
                  <button
                    onClick={() => onRemoveCustomField(field.id)}
                    className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                    title="Remove field"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* French Translation - Collapsible */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => onOpenLanguage("french")}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-700">
                  French (Translation)
                </h3>
              </div>
              {isFrenchExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {isFrenchExpanded && (
              <div className="space-y-4 mt-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={frenchTitle}
                    onChange={(e) => onFrenchTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter French title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <RichTextEditor
                    value={frenchDescription}
                    onChange={onFrenchDescriptionChange}
                    placeholder="Enter French description..."
                    showAiButton={showAiButtons}
                    onAiGenerate={() =>
                      console.log(
                        "AI Generate French Description",
                      )
                    }
                    showHelpLink={showAiButtons}
                    onHelpClick={() =>
                      console.log(
                        "Help generate French description",
                      )
                    }
                  />
                </div>

                {/* Custom Fields for French */}
                {customFields.map((field) => (
                  <div key={`fr-${field.id}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {editingCustomFieldId === field.id ? (
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => onUpdateCustomFieldLabel(field.id, e.target.value)}
                          onBlur={() => onEditingCustomFieldIdChange(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onEditingCustomFieldIdChange(null);
                            }
                          }}
                          autoFocus
                          className="flex-1 px-2 py-1 text-sm font-semibold text-gray-700 border border-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      ) : (
                        <>
                          <label className="text-sm font-semibold text-gray-700">
                            {field.label}
                          </label>
                          <button
                            onClick={() => onEditingCustomFieldIdChange(field.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Edit field name"
                          >
                            <Pen className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                        </>
                      )}
                    </div>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* German Translation - Collapsible */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => onOpenLanguage("german")}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-700">
                  German (Translation)
                </h3>
              </div>
              {isGermanExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {isGermanExpanded && (
              <div className="space-y-4 mt-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={germanTitle}
                    onChange={(e) => onGermanTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter German title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <RichTextEditor
                    value={germanDescription}
                    onChange={onGermanDescriptionChange}
                    placeholder="Enter German description..."
                    showAiButton={showAiButtons}
                    onAiGenerate={() =>
                      console.log(
                        "AI Generate German Description",
                      )
                    }
                    showHelpLink={showAiButtons}
                    onHelpClick={() =>
                      console.log(
                        "Help generate German description",
                      )
                    }
                  />
                </div>

                {/* Custom Fields for German */}
                {customFields.map((field) => (
                  <div key={`en-${field.id}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {editingCustomFieldId === field.id ? (
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => onUpdateCustomFieldLabel(field.id, e.target.value)}
                          onBlur={() => onEditingCustomFieldIdChange(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onEditingCustomFieldIdChange(null);
                            }
                          }}
                          autoFocus
                          className="flex-1 px-2 py-1 text-sm font-semibold text-gray-700 border border-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      ) : (
                        <>
                          <label className="text-sm font-semibold text-gray-700">
                            {field.label}
                          </label>
                          <button
                            onClick={() => onEditingCustomFieldIdChange(field.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Edit field name"
                          >
                            <Pen className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                        </>
                      )}
                    </div>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Languages - Collapsible */}
          {additionalLanguages.map((lang) => (
            <div
              key={lang.id}
              className="pt-3 border-t border-gray-200"
            >
              <button
                onClick={() => onOpenLanguage(lang.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gray-700">
                    {lang.name} (Translation)
                  </h3>
                </div>
                {lang.expanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {lang.expanded && (
                <div className="space-y-4 mt-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={otherLanguagesTitles[lang.code || lang.id.toString()] || ""}
                      onChange={(e) => onOtherLanguagesTitlesChange({
                        ...otherLanguagesTitles,
                        [lang.code || lang.id.toString()]: e.target.value
                      })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={`Enter ${lang.name} title...`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <RichTextEditor
                      value={
                        otherLanguagesDescriptions[
                          lang.id
                        ] || ""
                      }
                      onChange={(value) =>
                        onOtherLanguagesDescriptionsChange(
                          {
                            ...otherLanguagesDescriptions,
                            [lang.id]: value,
                          },
                        )
                      }
                      placeholder={`Enter ${lang.name} description...`}
                      showAiButton={showAiButtons}
                      onAiGenerate={() =>
                        console.log(
                          `AI Generate ${lang.name} Description`,
                        )
                      }
                      showHelpLink={showAiButtons}
                      onHelpClick={() =>
                        console.log(
                          `Help generate ${lang.name} description`,
                        )
                      }
                    />
                  </div>

                  {/* Custom Fields for Additional Language */}
                  {customFields.map((field) => (
                    <div key={`${lang.id}-${field.id}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {editingCustomFieldId === field.id ? (
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => onUpdateCustomFieldLabel(field.id, e.target.value)}
                            onBlur={() => onEditingCustomFieldIdChange(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                onEditingCustomFieldIdChange(null);
                              }
                            }}
                            autoFocus
                            className="flex-1 px-2 py-1 text-sm font-semibold text-gray-700 border border-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        ) : (
                          <>
                            <label className="text-sm font-semibold text-gray-700">
                              {field.label}
                            </label>
                            <button
                              onClick={() => onEditingCustomFieldIdChange(field.id)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                              title="Edit field name"
                            >
                              <Pen className="w-3.5 h-3.5 text-gray-500" />
                            </button>
                          </>
                        )}
                      </div>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Add Language Button */}
          <div className="pt-4 border-t border-gray-200">
            <div className="relative inline-block">
              <div className="flex items-center rounded overflow-hidden" style={{ backgroundColor: "#d4021c" }}>
                <button
                  onClick={() => {
                    // Default action - open dropdown
                    onAddLanguageDropdownOpenChange(!isAddLanguageDropdownOpen);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm transition-colors hover:opacity-90"
                >
                  <Plus className="w-4 h-4" />
                  Add Language
                </button>
                <div className="w-px h-6 bg-white opacity-50"></div>
                <button 
                  onClick={() => onAddLanguageDropdownOpenChange(!isAddLanguageDropdownOpen)}
                  className="px-2 py-1.5 text-white transition-colors hover:opacity-90"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              {isAddLanguageDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => onAddLanguageDropdownOpenChange(false)}
                  />
                  <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[200px]">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.name}
                        onClick={() => onAddLanguage(lang.name, lang.flag)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700"
                      >
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Language selector row with swap button */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Language:
              </label>
              <select
                value={leftColumnLanguage}
                onChange={(e) => onLeftColumnLanguageChange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              >
                {leftColumnLanguage === "french" && <option value="french">French</option>}
                {leftColumnLanguage === "english" && <option value="english">English</option>}
                {leftColumnLanguage === "german" && <option value="german">German (Main)</option>}
                {rightColumnLanguage !== "french" && leftColumnLanguage !== "french" && <option value="french">French</option>}
                {rightColumnLanguage !== "english" && leftColumnLanguage !== "english" && <option value="english">English</option>}
                {rightColumnLanguage !== "german" && leftColumnLanguage !== "german" && <option value="german">German (Main)</option>}
                {additionalLanguages.map((lang) => (
                  (leftColumnLanguage === lang.id.toString() || rightColumnLanguage !== lang.id.toString()) && (
                    <option key={lang.id} value={lang.id.toString()}>
                      {lang.name}
                    </option>
                  )
                ))}
              </select>
            </div>
            
            <button
              onClick={onSwapLanguages}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Swap languages"
            >
              <ArrowLeftRight className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex-1 flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Language:
              </label>
              <select
                value={rightColumnLanguage}
                onChange={(e) => onRightColumnLanguageChange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              >
                {rightColumnLanguage === "french" && <option value="french">French</option>}
                {rightColumnLanguage === "english" && <option value="english">English</option>}
                {rightColumnLanguage === "german" && <option value="german">German (Main)</option>}
                {leftColumnLanguage !== "french" && rightColumnLanguage !== "french" && <option value="french">French</option>}
                {leftColumnLanguage !== "english" && rightColumnLanguage !== "english" && <option value="english">English</option>}
                {leftColumnLanguage !== "german" && rightColumnLanguage !== "german" && <option value="german">German (Main)</option>}
                {additionalLanguages.map((lang) => (
                  (rightColumnLanguage === lang.id.toString() || leftColumnLanguage !== lang.id.toString()) && (
                    <option key={lang.id} value={lang.id.toString()}>
                      {lang.name}
                    </option>
                  )
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder={leftColumnLanguage === "french" ? "Untitled" : `Enter ${leftColumnLanguage} title...`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <RichTextEditor
                  value={
                    leftColumnLanguage === "french"
                      ? frenchDescription
                      : leftColumnLanguage === "english"
                        ? englishDescription
                        : leftColumnLanguage === "german"
                          ? germanDescription
                          : otherLanguagesDescriptions[leftColumnLanguage] || ""
                  }
                  onChange={(value) => {
                    if (leftColumnLanguage === "french") onFrenchDescriptionChange(value);
                    else if (leftColumnLanguage === "english") onEnglishDescriptionChange(value);
                    else if (leftColumnLanguage === "german") onGermanDescriptionChange(value);
                    else {
                      onOtherLanguagesDescriptionsChange({
                        ...otherLanguagesDescriptions,
                        [leftColumnLanguage]: value
                      });
                    }
                  }}
                  placeholder={leftColumnLanguage === "french" ? "" : `Enter ${leftColumnLanguage} description...`}
                  showAiButton={showAiButtons}
                  onAiGenerate={() =>
                    console.log(
                      `AI Generate ${leftColumnLanguage} Description`,
                    )
                  }
                  showHelpLink={showAiButtons}
                  onHelpClick={() =>
                    console.log(
                      `Help generate ${leftColumnLanguage} description`,
                    )
                  }
                />
              </div>

              {/* Custom Fields for Left Column */}
              {customFields.map((field) => (
                <div key={`left-${field.id}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {editingCustomFieldId === field.id ? (
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => onUpdateCustomFieldLabel(field.id, e.target.value)}
                        onBlur={() => onEditingCustomFieldIdChange(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onEditingCustomFieldIdChange(null);
                          }
                        }}
                        autoFocus
                        className="flex-1 px-2 py-1 text-sm font-semibold text-gray-700 border border-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <>
                        <label className="text-sm font-semibold text-gray-700">
                          {field.label}
                        </label>
                        <button
                          onClick={() => onEditingCustomFieldIdChange(field.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Edit field name"
                        >
                          <Pen className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </>
                    )}
                  </div>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                  />
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder={rightColumnLanguage === "french" ? "Untitled" : `Enter ${rightColumnLanguage} title...`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <RichTextEditor
                  value={
                    rightColumnLanguage === "french"
                      ? frenchDescription
                      : rightColumnLanguage === "english"
                        ? englishDescription
                        : rightColumnLanguage === "german"
                          ? germanDescription
                          : otherLanguagesDescriptions[rightColumnLanguage] || ""
                  }
                  onChange={(value) => {
                    if (rightColumnLanguage === "french") onFrenchDescriptionChange(value);
                    else if (rightColumnLanguage === "english") onEnglishDescriptionChange(value);
                    else if (rightColumnLanguage === "german") onGermanDescriptionChange(value);
                    else {
                      onOtherLanguagesDescriptionsChange({
                        ...otherLanguagesDescriptions,
                        [rightColumnLanguage]: value
                      });
                    }
                  }}
                  placeholder={rightColumnLanguage === "french" ? "" : `Enter ${rightColumnLanguage} description...`}
                  showAiButton={showAiButtons}
                  onAiGenerate={() =>
                    console.log(
                      `AI Generate ${rightColumnLanguage} Description`,
                    )
                  }
                  showHelpLink={showAiButtons}
                  onHelpClick={() =>
                    console.log(
                      `Help generate ${rightColumnLanguage} description`,
                    )
                  }
                />
              </div>

              {/* Custom Fields for Right Column */}
              {customFields.map((field) => (
                <div key={`right-${field.id}`}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Add Language Button for Column View */}
          <div className="pt-4 border-t border-gray-200">
            <div className="relative inline-block">
              <div className="flex items-center rounded overflow-hidden" style={{ backgroundColor: "#d4021c" }}>
                <button
                  onClick={() => {
                    // Default action - open dropdown
                    onAddLanguageDropdownOpenChange(!isAddLanguageDropdownOpen);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm transition-colors hover:opacity-90"
                >
                  <Plus className="w-4 h-4" />
                  Add Language
                </button>
                <div className="w-px h-6 bg-white opacity-50"></div>
                <button 
                  onClick={() => onAddLanguageDropdownOpenChange(!isAddLanguageDropdownOpen)}
                  className="px-2 py-1.5 text-white transition-colors hover:opacity-90"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              {isAddLanguageDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => onAddLanguageDropdownOpenChange(false)}
                  />
                  <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[200px]">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.name}
                        onClick={() => onAddLanguage(lang.name, lang.flag)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700"
                      >
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};