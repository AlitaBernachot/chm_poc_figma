import {
  Search,
  Plus,
  Edit,
  MapPin,
  MoreVertical,
  Check,
  X,
  Route,
  Waves,
  Baby,
  Mountain,
  Landmark,
  UtensilsCrossed,
  Trees,
  Hotel,
  Tent,
  ParkingCircle,
  Train,
  Droplet,
  Toilet,
  Dog,
  Zap,
  Flag,
  CheckSquare,
  ShoppingBag,
  Wifi,
  Wrench,
  Home,
  Banknote,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toggleButtonImg from "figma:asset/46a386f5920c10a34be8f262c1ef2db5bfd254a3.png";

interface POI {
  id: string;
  name: string;
  url?: string;
  status: "draft" | "published";
  hasLocation: boolean;
}

interface Category {
  value: string;
  label: string;
  icon: any;
}

interface SidebarProps {
  isVisible: boolean;
  pois: POI[];
  selectedPOI: string | null;
  searchQuery: string;
  selectedCategory: string;
  onSelectPOI: (id: string) => void;
  onSearchChange: (query: string) => void;
  isFullWidth?: boolean;
  onToggleVisibility?: () => void;
  isMapViewMode?: boolean;
  onNewPOI?: () => void;
}

const categories: Category[] = [
  {
    value: "beaches",
    label: "Beaches and Swimming Pools",
    icon: Waves,
  },
  { value: "kids", label: "For the Kids", icon: Baby },
  { value: "natural", label: "Natural Sights", icon: Mountain },
  { value: "poi", label: "Points of Interest", icon: Landmark },
  {
    value: "food",
    label: "Food and Drink -- [Editable details]",
    icon: UtensilsCrossed,
  },
  { value: "parks", label: "Parks", icon: Trees },
  {
    value: "accommodation",
    label: "Accommodation",
    icon: Hotel,
  },
  { value: "camping", label: "Camping Grounds", icon: Tent },
  { value: "parking", label: "Parking", icon: ParkingCircle },
  {
    value: "transit",
    label: "Train Stations and Bus Stops -- [Editable details]",
    icon: Train,
  },
  {
    value: "fountains",
    label: "Public Water Fountains -- [Editable details]",
    icon: Droplet,
  },
  { value: "toilets", label: "Public Toilets", icon: Toilet },
  { value: "dogs", label: "For Dogs", icon: Dog },
  {
    value: "ebike",
    label: "E-Bike Charging Points",
    icon: Zap,
  },
  { value: "passes", label: "Mountain Passes", icon: Flag },
  {
    value: "checkpoints",
    label: "Checkpoints",
    icon: CheckSquare,
  },
  { value: "shops", label: "Shops -- [Editable details]", icon: ShoppingBag },
  {
    value: "internet",
    label: "Internet Hot Spots",
    icon: Wifi,
  },
  { value: "repair", label: "Bike Repair", icon: Wrench },
  { value: "shelters", label: "Shelters", icon: Home },
  { value: "atms", label: "ATMs", icon: Banknote },
];

export const Sidebar = ({
  isVisible,
  pois,
  selectedPOI,
  searchQuery,
  selectedCategory,
  onSelectPOI,
  onSearchChange,
  isFullWidth,
  onToggleVisibility,
  isMapViewMode,
  onNewPOI,
}: SidebarProps) => {
  const [width, setWidth] = useState(320); // Default 320px (w-80)
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filters, setFilters] = useState({
    reviewRequired: false,
    changesRequested: false,
    commented: false,
    published: false,
    draft: false,
  });
  const [sortOption, setSortOption] = useState<string>("title-asc");
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const MIN_WIDTH = 280;
  const MAX_WIDTH = 800;
  
  // Adjust width when entering/exiting map view mode
  useEffect(() => {
    if (isMapViewMode) {
      setWidth(500); // Wider sidebar for map view
    } else {
      setWidth(320); // Reset to default when POI selected or map view exited
    }
  }, [isMapViewMode, selectedPOI]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (filterKey: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  return (
    <>
      {isVisible && (
        <aside
          ref={sidebarRef}
          style={{ width: `${width}px` }}
          className="bg-white border-r border-gray-200 flex flex-col shadow-sm relative flex-shrink-0"
        >
          {/* Tabs */}
          <div className="border-b border-gray-200 px-4 pt-4">
            <div className="flex gap-1 mb-0">
              <button className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 rounded-t transition-colors flex items-center gap-2">
                <Route className="w-4 h-4" />
                Routes
              </button>
              <button
                className="px-4 py-2.5 text-sm text-white rounded-t font-semibold shadow-sm flex items-center gap-2"
                style={{ backgroundColor: "#d4021c" }}
              >
                <MapPin className="w-4 h-4" />
                Places of Interest
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 flex flex-col overflow-hidden p-4">
            <button
              className="w-full text-white rounded px-4 py-3 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all mb-4 hover:opacity-90"
              style={{ backgroundColor: "#d4021c" }}
              onClick={onNewPOI}
            >
              <Plus className="w-5 h-5" />
              New place of interest
            </button>

            {/* Search and Filter/Sort Row */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for a POI"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-gray-100 hover:bg-gray-150 focus:bg-white border border-transparent focus:border-blue-400 rounded-md px-4 py-2.5 pr-10 text-sm outline-none transition-all"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Filter Button */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => {
                    setShowFilterDropdown(!showFilterDropdown);
                    setShowSortDropdown(false);
                  }}
                  className={`p-2.5 rounded border transition-all ${
                    showFilterDropdown || Object.values(filters).some(v => v)
                      ? "bg-red-50 border-red-400 text-red-600"
                      : "bg-gray-100 border-transparent text-gray-600 hover:bg-gray-150"
                  }`}
                  title="Filter"
                >
                  <Filter className="w-4 h-4" />
                </button>

                {/* Filter Dropdown */}
                {showFilterDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 w-56">
                    <div className="p-3">
                      <div className="text-xs font-semibold text-gray-500 mb-2">FILTER BY STATUS</div>
                      {[
                        { key: 'reviewRequired', label: 'Review required' },
                        { key: 'changesRequested', label: 'Changes requested' },
                        { key: 'commented', label: 'Commented' },
                        { key: 'published', label: 'Published' },
                        { key: 'draft', label: 'Draft' },
                      ].map(({ key, label }) => (
                        <label
                          key={key}
                          className="flex items-center gap-2 py-2 px-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters[key as keyof typeof filters]}
                            onChange={() => handleFilterChange(key as keyof typeof filters)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Button */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown);
                    setShowFilterDropdown(false);
                  }}
                  className={`p-2.5 rounded border transition-all ${
                    showSortDropdown
                      ? "bg-blue-50 border-blue-400 text-blue-600"
                      : "bg-gray-100 border-transparent text-gray-600 hover:bg-gray-150"
                  }`}
                  title="Sort"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>

                {/* Sort Dropdown */}
                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 w-56">
                    <div className="p-2">
                      <div className="text-xs font-semibold text-gray-500 px-2 py-1.5">SORT BY</div>
                      {[
                        { value: 'title-asc', label: 'Title (A-Z)' },
                        { value: 'title-desc', label: 'Title (Z-A)' },
                        { value: 'updated-asc', label: 'Update date (Oldest first)' },
                        { value: 'updated-desc', label: 'Update date (Newest first)' },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() => handleSortChange(value)}
                          className={`w-full text-left px-2 py-2 text-sm rounded transition-colors ${
                            sortOption === value
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* POI List */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {pois.map((poi, index) => (
                <div key={poi.id}>
                  <button
                    onClick={() => onSelectPOI(poi.id)}
                    className={`w-full flex items-center gap-2 p-2.5 rounded-md transition-all border ${
                      selectedPOI === poi.id
                        ? "shadow-sm"
                        : "hover:bg-gray-50 border-transparent"
                    }`}
                    style={
                      selectedPOI === poi.id
                        ? {
                            backgroundColor: "#fef2f2",
                            borderColor: "#fecaca",
                          }
                        : {}
                    }
                  >
                    <div
                      className={`p-1.5 rounded ${
                        poi.status === "draft" && selectedPOI !== poi.id
                          ? "bg-orange-100"
                          : poi.status === "published" && selectedPOI !== poi.id
                            ? "bg-green-100"
                            : ""
                      }`}
                      style={
                        selectedPOI === poi.id && poi.status === "draft"
                          ? { backgroundColor: "#ffedd5" }
                          : selectedPOI === poi.id && poi.status === "published"
                            ? { backgroundColor: "#dcfce7" }
                            : {}
                      }
                    >
                      {poi.status === "draft" ? (
                        <Edit
                          className={`w-3.5 h-3.5`}
                          style={{ color: "#f97316" }}
                        />
                      ) : (
                        <Check className="w-3.5 h-3.5 text-green-700" />
                      )}
                    </div>

                    <span className="flex-1 text-left text-sm font-medium text-gray-800 truncate">
                      {poi.name || (
                        <span className="text-gray-400 italic">
                          <i>Untitled</i>
                        </span>
                      )}
                    </span>

                    <div className="flex items-center gap-1">
                      {poi.hasLocation ? (
                        <MapPin className="w-4 h-4 text-blue-600" />
                      ) : selectedPOI === poi.id ? (
                        (() => {
                          const category = categories.find(
                            (c) => c.value === selectedCategory
                          );
                          if (!category) return null;
                          const CategoryIcon = category.icon;
                          return (
                            <CategoryIcon
                              className="w-4 h-4"
                              style={{ color: "#f97316" }}
                            />
                          );
                        })()
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("More options");
                        }}
                        className="p-0.5 hover:bg-gray-200 rounded cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </button>
                  {index < pois.length - 1 && (
                    <div className="border-b border-gray-200 my-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resizer */}
          <div
            className="absolute right-0 top-0 bottom-0 w-0.5 bg-gray-300 cursor-ew-resize hover:bg-gray-400 transition-colors"
            onMouseDown={handleMouseDown}
          />
        </aside>
      )}

      {/* Toggle Button */}
      {onToggleVisibility && (
        <button
          onClick={onToggleVisibility}
          className="absolute top-1/2 -translate-y-1/2 z-50 bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all rounded-r"
          style={{ left: isVisible ? `${width - 2}px` : '-2px' }}
          aria-label="Toggle sidebar"
        >
          <div className="px-0.5 py-1 flex items-center justify-center">
            {isVisible ? (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </div>
        </button>
      )}
    </>
  );
};