import { Hash, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface FloatingQuickAccessProps {
  scrollToSection: (sectionId: string) => void;
  selectedCategory: string;
  additionalLanguages: { id: number; name: string; flag: string; expanded: boolean }[];
  openLanguage: (language: "french" | "english" | "german" | number) => void;
}

export function FloatingQuickAccess({ 
  scrollToSection, 
  selectedCategory, 
  additionalLanguages,
  openLanguage 
}: FloatingQuickAccessProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageSubmenuOpen, setIsLanguageSubmenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsLanguageSubmenuOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        title="Quick Access"
      >
        <Hash className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Quick Access</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded shadow-lg border border-gray-200 py-2 z-50">
          {/* Translatable Content with Language Submenu */}
          <div className="relative">
            <button
              onMouseEnter={() => setIsLanguageSubmenuOpen(true)}
              onClick={() => {
                scrollToSection("translatable-section");
                setIsOpen(false);
                setIsLanguageSubmenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium flex items-center justify-between"
            >
              Translatable Content
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>

            {isLanguageSubmenuOpen && (
              <div
                className="absolute left-full top-0 ml-1 w-56 bg-white rounded shadow-lg border border-gray-200 py-2 z-50"
                onMouseEnter={() => setIsLanguageSubmenuOpen(true)}
                onMouseLeave={() => setIsLanguageSubmenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Languages
                </div>
                <button
                  onClick={() => {
                    openLanguage("german");
                    setIsOpen(false);
                    setIsLanguageSubmenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  German (Main)
                </button>
                
                <button
                  onClick={() => {
                    openLanguage("french");
                    setIsOpen(false);
                    setIsLanguageSubmenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  French
                </button>

                <button
                  onClick={() => {
                    openLanguage("english");
                    setIsOpen(false);
                    setIsLanguageSubmenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  English
                </button>

                {additionalLanguages.map((language) => (
                  <button
                    key={language.id}
                    onClick={() => {
                      openLanguage(language.id);
                      setIsOpen(false);
                      setIsLanguageSubmenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              scrollToSection("technical-section");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Technical Details
          </button>

          {selectedCategory === "transit" && (
            <button
              onClick={() => {
                scrollToSection("transit-schedule-section");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Transit Schedule
            </button>
          )}

          {selectedCategory === "fountains" && (
            <button
              onClick={() => {
                scrollToSection("fountain-details-section");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Fountain Details
            </button>
          )}

          {selectedCategory === "food" && (
            <button
              onClick={() => {
                scrollToSection("restaurant-details-section");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Restaurant Details
            </button>
          )}

          {selectedCategory === "shops" && (
            <button
              onClick={() => {
                scrollToSection("shop-details-section");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Shop Details
            </button>
          )}

          <div className="border-t border-gray-200 my-1" />

          <button
            onClick={() => {
              scrollToSection("associated-routes-section");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Associated Routes
          </button>

          <button
            onClick={() => {
              scrollToSection("seo-section");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            SEO
          </button>

          <button
            onClick={() => {
              scrollToSection("history-section");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            History
          </button>
        </div>
      )}
    </div>
  );
}