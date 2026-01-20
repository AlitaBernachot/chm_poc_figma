import { Menu, Settings, Users, FileText, HelpCircle, LogOut, LayoutDashboard, MapPin, Plus, List, ChevronRight, Route, Image, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface BurgerMenuProps {
  onNavigateToDashboard?: () => void;
  onNavigateToPoi?: () => void;
  onImportPOIs?: () => void;
}

export const BurgerMenu = ({ onNavigateToDashboard, onNavigateToPoi, onImportPOIs }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHoveredSubmenu(null);
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
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        aria-label="Menu"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded shadow-lg border border-gray-200 py-2 z-50">
          {/* Dashboard */}
          <button
            onClick={() => {
              onNavigateToDashboard?.();
              setIsOpen(false);
              setHoveredSubmenu(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-gray-500" />
            Dashboard
          </button>

          {/* Routes with Flyout Submenu */}
          <div 
            className="relative"
            onMouseEnter={() => setHoveredSubmenu('routes')}
            onMouseLeave={() => setHoveredSubmenu(null)}
          >
            <button
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Route className="w-4 h-4 text-gray-500" />
                Routes
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            {/* Flyout Submenu */}
            {hoveredSubmenu === 'routes' && (
              <div className="absolute left-full top-0 ml-1 w-52 bg-white rounded shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    console.log("Add New Route");
                    setIsOpen(false);
                    setHoveredSubmenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-500" />
                  Add New Route
                </button>
                <button
                  onClick={() => {
                    console.log("View All Routes");
                    setIsOpen(false);
                    setHoveredSubmenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <List className="w-4 h-4 text-gray-500" />
                  View All Routes
                </button>
                <button
                  onClick={() => {
                    console.log("Import a list of Routes");
                    setIsOpen(false);
                    setHoveredSubmenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  Import a list of Routes
                </button>
              </div>
            )}
          </div>

          {/* Points of Interest with Flyout Submenu */}
          <div 
            className="relative"
            onMouseEnter={() => setHoveredSubmenu('poi')}
            onMouseLeave={() => setHoveredSubmenu(null)}
          >
            <button
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                Points of Interest
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            {/* Flyout Submenu */}
            {hoveredSubmenu === 'poi' && (
              <div className="absolute left-full top-0 ml-1 w-52 bg-white rounded shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    onNavigateToPoi?.();
                    setIsOpen(false);
                    setHoveredSubmenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-500" />
                  Add New POI
                </button>
                <button
                  onClick={() => {
                    onNavigateToPoi?.();
                    setIsOpen(false);
                    setHoveredSubmenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <List className="w-4 h-4 text-gray-500" />
                  View All POIs
                </button>
                <button
                  onClick={() => {
                    onImportPOIs?.();
                    setIsOpen(false);
                    setHoveredSubmenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  Import a list of POIs
                </button>
              </div>
            )}
          </div>

          {/* Media Management */}
          <button
            onClick={() => {
              console.log("Media Management");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Image className="w-4 h-4 text-gray-500" />
            Media Management
          </button>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2" />

          {/* Settings */}
          <button
            onClick={() => {
              console.log("Settings");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            Settings
          </button>

          {/* User Management */}
          <button
            onClick={() => {
              console.log("Users");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Users className="w-4 h-4 text-gray-500" />
            User Management
          </button>

          {/* Documentation */}
          <button
            onClick={() => {
              console.log("Docs");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4 text-gray-500" />
            Documentation
          </button>

          {/* Help & Support */}
          <button
            onClick={() => {
              console.log("Help");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-gray-500" />
            Help & Support
          </button>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2" />

          {/* Log Out */}
          <button
            onClick={() => {
              console.log("Logout");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4 text-gray-500" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};