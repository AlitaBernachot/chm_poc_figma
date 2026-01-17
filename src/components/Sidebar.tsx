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
  Clock,
  AlertCircle,
} from "lucide-react";

interface POI {
  id: string;
  name: string;
  status: "draft" | "published";
  hasLocation: boolean;
  lastUpdated?: string;
  reviewStatus?: "review-required" | "approved" | "pending";
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
}: SidebarProps) => {
  return (
    <aside
      className={`${isFullWidth ? 'w-full' : 'w-80'} bg-white border-r border-gray-200 flex flex-col shadow-sm ${isVisible ? "visible" : "hidden"}`}
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
        <div className={`${isFullWidth ? 'max-w-7xl mx-auto w-full' : ''} flex flex-col h-full`}>
          <button
            className={`${isFullWidth ? 'inline-flex w-auto self-start' : 'w-full'} text-white rounded px-4 py-3 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all mb-4 hover:opacity-90`}
            style={{ backgroundColor: "#d4021c" }}
          >
            <Plus className="w-5 h-5" />
            New place of interest
          </button>

          <div className={`flex gap-3 mb-4 ${isFullWidth ? '' : 'flex-col'}`}>
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

            {/* Single Filter - Only show in full width mode */}
            {isFullWidth && (
              <select className="w-64 bg-gray-100 hover:bg-gray-150 focus:bg-white border border-transparent focus:border-blue-400 rounded-md px-3 py-2.5 text-sm outline-none transition-all cursor-pointer">
                <option value="">All Filters</option>
                <optgroup label="Status">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </optgroup>
                <optgroup label="Review Status">
                  <option value="review-required">Review Required</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </optgroup>
                <optgroup label="Sort by">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </optgroup>
              </select>
            )}
          </div>

          {/* POI List */}
          <div className="flex-1 overflow-y-auto">
            {pois.map((poi, index) => (
              <div key={poi.id}>
                {isFullWidth ? (
                  // Full width layout with additional info
                  <button
                    onClick={() => onSelectPOI(poi.id)}
                    className={`w-full transition-all border rounded-md mb-1 ${
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
                    <div className="flex items-center gap-3 p-2.5">
                      {/* Status Icon */}
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

                      {/* Name */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-medium text-gray-800 truncate text-sm">
                          {poi.name || (
                            <span className="text-gray-400 italic">
                              <i>Untitled</i>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Last Updated */}
                      <div className="text-xs text-gray-500">
                        {poi.lastUpdated || "N/A"}
                      </div>
                      
                      {/* Review Status */}
                      {poi.reviewStatus && (
                        <div>
                          {poi.reviewStatus === "review-required" && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium whitespace-nowrap">
                              Review Required
                            </span>
                          )}
                          {poi.reviewStatus === "approved" && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium whitespace-nowrap">
                              Approved
                            </span>
                          )}
                          {poi.reviewStatus === "pending" && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium whitespace-nowrap">
                              Pending
                            </span>
                          )}
                        </div>
                      )}

                      {/* Location and Actions */}
                      <div className="flex items-center gap-2">
                        {poi.hasLocation ? (
                          <MapPin className="w-4 h-4 text-blue-600" />
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
                    </div>
                  </button>
                ) : (
                  // Original compact layout
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
                )}
                {index < pois.length - 1 && (
                  <div className="border-b border-gray-200 my-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};