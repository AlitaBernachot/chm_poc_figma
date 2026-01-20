import { UserCircle, HelpCircle, Type, ExternalLink } from "lucide-react";
import logoImage from "figma:asset/ef1b8bba7a3f667eecda827bc7aaf76b96937417.png";
import { BurgerMenu } from "./BurgerMenu";

interface TopBarProps {
  isSidebarVisible: boolean;
  showAiButtons: boolean;
  onToggleSidebar: () => void;
  onToggleAiButtons: () => void;
  onLogoClick?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToPoi?: () => void;
  onImportPOIs?: () => void;
}

export const TopBar = ({
  isSidebarVisible,
  showAiButtons,
  onToggleSidebar,
  onToggleAiButtons,
  onLogoClick,
  onNavigateToDashboard,
  onNavigateToPoi,
  onImportPOIs,
}: TopBarProps) => {
  return (
    <header
      className="flex items-center justify-between px-4 py-3 shadow-sm"
      style={{ backgroundColor: "#C3C3C3" }}
    >
      <div className="flex items-center gap-4">
        <BurgerMenu 
          onNavigateToDashboard={onNavigateToDashboard}
          onNavigateToPoi={onNavigateToPoi}
          onImportPOIs={onImportPOIs}
        />

        <div className="flex items-center gap-4">
          <button
            onClick={onLogoClick}
            className="rounded p-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            style={{ backgroundColor: "#d4021c" }}
          >
            <img 
              src={logoImage} 
              alt="Logo" 
              className="w-[19px] h-[19px] object-cover"
            />
          </button>
          <button
            onClick={onLogoClick}
            className="font-['Source_Sans_3'] font-black text-gray-800 text-base tracking-wider uppercase hover:text-gray-600 transition-colors cursor-pointer"
          >
            Geo Back Office
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            AI Assistant
          </span>
          <button
            onClick={onToggleAiButtons}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              showAiButtons
                ? "bg-gradient-to-r from-violet-500 to-blue-500"
                : "bg-gray-300"
            }`}
            aria-label="Toggle AI Assistant"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                showAiButtons
                  ? "translate-x-4"
                  : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
          <Type className="w-4 h-4" />
          <span className="font-medium">
            Non Geo Back Office
          </span>
          <ExternalLink className="w-4 h-4" />
        </button>

        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
          <UserCircle className="w-4 h-4" />
          <span className="font-medium">Username</span>
        </button>

        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};