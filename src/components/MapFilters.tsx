import { SlidersHorizontal, X } from "lucide-react";

interface MapFiltersProps {
  filterCategory: string;
  filterStatus: string;
  filterSeason: string;
  onFilterCategoryChange: (value: string) => void;
  onFilterStatusChange: (value: string) => void;
  onFilterSeasonChange: (value: string) => void;
  filteredCount: number;
  totalCount: number;
  categories: Array<{ value: string; label: string }>;
}

export const MapFilters = ({
  filterCategory,
  filterStatus,
  filterSeason,
  onFilterCategoryChange,
  onFilterStatusChange,
  onFilterSeasonChange,
  filteredCount,
  totalCount,
  categories,
}: MapFiltersProps) => {
  const hasActiveFilters = filterCategory !== "all" || filterStatus !== "all" || filterSeason !== "all";

  const handleClearFilters = () => {
    onFilterCategoryChange("all");
    onFilterStatusChange("all");
    onFilterSeasonChange("all");
  };

  return (
    <div className="flex items-center gap-3">
      {/* Category Filter */}
      <select
        value={filterCategory}
        onChange={(e) => onFilterCategoryChange(e.target.value)}
        className="px-4 py-2.5 bg-white/95 backdrop-blur-sm border border-gray-300 rounded shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent hover:bg-white transition-all cursor-pointer"
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        ))}
      </select>
      
      {/* Status Filter */}
      <select
        value={filterStatus}
        onChange={(e) => onFilterStatusChange(e.target.value)}
        className="px-4 py-2.5 bg-white/95 backdrop-blur-sm border border-gray-300 rounded shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent hover:bg-white transition-all cursor-pointer"
      >
        <option value="all">All Statuses</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="approved">Approved</option>
        <option value="review-required">Review Required</option>
        <option value="pending">Pending</option>
      </select>
      
      {/* Season Filter */}
      <select
        value={filterSeason}
        onChange={(e) => onFilterSeasonChange(e.target.value)}
        className="px-4 py-2.5 bg-white/95 backdrop-blur-sm border border-gray-300 rounded shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent hover:bg-white transition-all cursor-pointer"
      >
        <option value="all">All Seasons</option>
        <option value="summer">☀️ Summer</option>
        <option value="winter">❄️ Winter</option>
      </select>
      
      {/* POI Counter */}
      <div className="px-4 py-2.5 bg-white/95 backdrop-blur-sm rounded shadow-lg border border-gray-300">
        <span className="text-sm text-gray-700">
          <span className="font-bold text-red-600">{filteredCount}</span>
          <span className="text-gray-500"> / {totalCount}</span>
        </span>
      </div>
      
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded shadow-lg transition-all flex items-center gap-2"
          title="Clear all filters"
        >
          <X className="w-4 h-4" />
          Clear
        </button>
      )}
    </div>
  );
};
