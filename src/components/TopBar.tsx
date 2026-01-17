import { Menu, UserCircle, HelpCircle, Type, ExternalLink } from "lucide-react";
import svgPaths from "../imports/svg-8l0xqjbg6b";

interface TopBarProps {
  isSidebarVisible: boolean;
  showAiButtons: boolean;
  onToggleSidebar: () => void;
  onToggleAiButtons: () => void;
}

export const TopBar = ({
  isSidebarVisible,
  showAiButtons,
  onToggleSidebar,
  onToggleAiButtons,
}: TopBarProps) => {
  return (
    <header
      className="flex items-center justify-between px-4 py-3 shadow-sm"
      style={{ backgroundColor: "#C3C3C3" }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-300 rounded-md transition-colors"
          aria-label={
            isSidebarVisible ? "Hide sidebar" : "Show sidebar"
          }
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex items-center gap-4">
          <div
            className="rounded p-2 shadow-md"
            style={{ backgroundColor: "#d4021c" }}
          >
            <div className="relative shrink-0 size-[19px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 19 19"
              >
                <g>
                  <path
                    d={svgPaths.p1fef0580}
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d={svgPaths.p28850300}
                    fill="#ffffff"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d={svgPaths.p2dc4db00}
                    fill="#ffffff"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d={svgPaths.p21b8db80}
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2.375 15.8333H4.75"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
          </div>
          <h1 className="font-['Source_Sans_3'] font-black text-gray-800 text-base tracking-wider uppercase">
            Geo Back Office
          </h1>
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
