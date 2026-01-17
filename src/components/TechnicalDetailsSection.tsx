import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ChevronDown,
  Sparkles,
  Copy,
  Plus,
  X,
  Check,
  Upload,
  MapPin,
  Mountain,
  Hotel,
  UtensilsCrossed,
  GripVertical,
  Loader2,
  Users,
  Accessibility,
  PawPrint,
  DollarSign,
  MapPinned,
  Wifi,
  ParkingCircle,
  Store,
  Home,
  Sun,
  Calendar,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Photo {
  id: number;
  url: string;
  alt: string;
  isAiGenerated?: boolean;
  isValidated?: boolean;
}

interface TechnicalField {
  id: number;
  label: string;
}

interface Category {
  value: string;
  label: string;
  icon: any;
}

interface Tag {
  name: string;
  icon: any;
}

interface TechnicalDetailsSectionProps {
  // Category
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onScrollToSection: (sectionId: string) => void;
  
  // Icons
  selectedIcon: string;
  iconColor: string;
  customIconUrl: string;
  showIconDropdown: boolean;
  onIconChange: (icon: string) => void;
  onIconColorChange: (color: string) => void;
  onCustomIconUrlChange: (url: string) => void;
  onToggleIconDropdown: (show: boolean) => void;
  
  // Coordinates
  latitude: string;
  longitude: string;
  onLatitudeChange: (lat: string) => void;
  onLongitudeChange: (lon: string) => void;
  onCopyCoordinates: () => void;
  
  // Tags
  defaultTags: Tag[];
  selectedTags: string[];
  customTags: string[];
  aiGeneratedTags: string[];
  isAiGeneratingTags: boolean;
  showValidateButton: boolean;
  newTagInput: string;
  showTagInput: boolean;
  onToggleTag: (tag: string) => void;
  onAddCustomTag: () => void;
  onRemoveCustomTag: (tag: string) => void;
  onHandleAiGenerateTags: () => void;
  onValidateAiTags: () => void;
  onCancelAiTags: () => void;
  onNewTagInputChange: (value: string) => void;
  onShowTagInputChange: (show: boolean) => void;
  
  // Photos
  photos: Photo[];
  isThinkingPicture: boolean;
  showPictureActions: boolean;
  onAiPictureGenerator: () => void;
  onValidatePictures: () => void;
  onCancelPictures: () => void;
  onAiPhotoClick: (photoId: number) => void;
  onMovePhoto: (dragIndex: number, hoverIndex: number) => void;
  onRemovePhoto: (id: number) => void;
  
  // Technical Custom Fields
  technicalCustomFields: TechnicalField[];
  onAddTechnicalCustomField: () => void;
  onRemoveTechnicalCustomField: (id: number) => void;
  
  // General
  showAiButtons: boolean;
}

const DraggablePhoto = ({
  photo,
  index,
  onMove,
  onRemove,
  onAiPhotoClick,
}: {
  photo: Photo;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (id: number) => void;
  onAiPhotoClick: (photoId: number) => void;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "photo",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "photo",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
  });

  const isUnvalidatedAi = photo.isAiGenerated && !photo.isValidated;
  
  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={isUnvalidatedAi ? () => onAiPhotoClick(photo.id) : undefined}
      className={`relative aspect-square bg-gray-100 rounded overflow-hidden group ${
        isUnvalidatedAi ? 'cursor-pointer border-2' : 'cursor-move border border-gray-200'
      } ${isDragging ? "opacity-50" : ""}`}
      style={
        isUnvalidatedAi
          ? {
              borderImage: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%) 1',
              borderImageSlice: 1,
            }
          : {}
      }
    >
      <ImageWithFallback
        src={photo.url}
        alt={photo.alt}
        className="w-full h-full object-cover"
      />
      {photo.isAiGenerated && (
        <div className="absolute top-1 left-1 flex items-center gap-1 px-2 py-1 rounded text-white text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)' }}>
          <Sparkles className="w-3 h-3" />
          AI Generated
        </div>
      )}
      <div className="absolute inset-0 group-hover:bg-black/30 transition-all flex items-center justify-center pointer-events-none">
        {isUnvalidatedAi ? (
          <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded">Click to deselect</span>
        ) : (
          <GripVertical className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      {!isUnvalidatedAi && (
        <button
          onClick={() => onRemove(photo.id)}
          className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      <div className="absolute bottom-1 left-1 bg-gray-900 bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
        {index + 1}
      </div>
    </div>
  );
};

export const TechnicalDetailsSection: React.FC<TechnicalDetailsSectionProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onScrollToSection,
  selectedIcon,
  iconColor,
  customIconUrl,
  showIconDropdown,
  onIconChange,
  onIconColorChange,
  onCustomIconUrlChange,
  onToggleIconDropdown,
  latitude,
  longitude,
  onLatitudeChange,
  onLongitudeChange,
  onCopyCoordinates,
  defaultTags,
  selectedTags,
  customTags,
  aiGeneratedTags,
  isAiGeneratingTags,
  showValidateButton,
  newTagInput,
  showTagInput,
  onToggleTag,
  onAddCustomTag,
  onRemoveCustomTag,
  onHandleAiGenerateTags,
  onValidateAiTags,
  onCancelAiTags,
  onNewTagInputChange,
  onShowTagInputChange,
  photos,
  isThinkingPicture,
  showPictureActions,
  onAiPictureGenerator,
  onValidatePictures,
  onCancelPictures,
  onAiPhotoClick,
  onMovePhoto,
  onRemovePhoto,
  technicalCustomFields,
  onAddTechnicalCustomField,
  onRemoveTechnicalCustomField,
  showAiButtons,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white rounded shadow p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
          Technical Details
        </h2>

        <div className="space-y-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white pr-10"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {/* Selected Category Preview */}
            {selectedCategory && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded">
                {(() => {
                  const category = categories.find((c) => c.value === selectedCategory);
                  if (!category) return null;
                  const Icon = category.icon;
                  return (
                    <>
                      <div className="rounded p-2" style={{ backgroundColor: "#d4021c" }}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{category.label}</p>
                        <p className="text-xs text-gray-500">Selected category</p>
                        {selectedCategory === "transit" && (
                          <button
                            onClick={() => onScrollToSection("transit-schedule-section")}
                            className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                          >
                            → Go to Transit Schedule
                          </button>
                        )}
                        {selectedCategory === "fountains" && (
                          <button
                            onClick={() => onScrollToSection("fountain-details-section")}
                            className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                          >
                            → Go to Fountain Details
                          </button>
                        )}
                        {selectedCategory === "shops" && (
                          <button
                            onClick={() => onScrollToSection("shop-details-section")}
                            className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                          >
                            → Go to Shop Details
                          </button>
                        )}
                        {selectedCategory === "food" && (
                          <button
                            onClick={() => onScrollToSection("food-details-section")}
                            className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                          >
                            → Go to Food & Drink Details
                          </button>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL
            </label>
            <input
              type="url"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="https://..."
            />
          </div>

          {/* Custom Icon Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Custom Display Icon
            </label>
            <div className="space-y-3">
              <div className="relative">
                <div
                  onClick={() => onToggleIconDropdown(!showIconDropdown)}
                  className="border border-gray-300 rounded p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded p-3 border border-gray-300 shadow-sm">
                      {selectedIcon === "MapPin" && <MapPin className="w-6 h-6" style={{ color: iconColor }} />}
                      {selectedIcon === "Mountain" && <Mountain className="w-6 h-6" style={{ color: iconColor }} />}
                      {selectedIcon === "Hotel" && <Hotel className="w-6 h-6" style={{ color: iconColor }} />}
                      {selectedIcon === "UtensilsCrossed" && <UtensilsCrossed className="w-6 h-6" style={{ color: iconColor }} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        Current Icon Preview
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        This icon will be displayed on the map and in lists
                      </p>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {showIconDropdown && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded shadow-lg z-10 p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Choose an icon</p>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <button
                        onClick={() => {
                          onIconChange("MapPin");
                          onToggleIconDropdown(false);
                        }}
                        className={`p-4 border-2 rounded hover:bg-gray-50 transition-colors ${
                          selectedIcon === "MapPin" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        }`}
                      >
                        <MapPin className="w-6 h-6 mx-auto" style={{ color: iconColor }} />
                        <p className="text-xs text-gray-600 mt-1">Map Pin</p>
                      </button>
                      <button
                        onClick={() => {
                          onIconChange("Mountain");
                          onToggleIconDropdown(false);
                        }}
                        className={`p-4 border-2 rounded hover:bg-gray-50 transition-colors ${
                          selectedIcon === "Mountain" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        }`}
                      >
                        <Mountain className="w-6 h-6 mx-auto" style={{ color: iconColor }} />
                        <p className="text-xs text-gray-600 mt-1">Mountain</p>
                      </button>
                      <button
                        onClick={() => {
                          onIconChange("Hotel");
                          onToggleIconDropdown(false);
                        }}
                        className={`p-4 border-2 rounded hover:bg-gray-50 transition-colors ${
                          selectedIcon === "Hotel" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        }`}
                      >
                        <Hotel className="w-6 h-6 mx-auto" style={{ color: iconColor }} />
                        <p className="text-xs text-gray-600 mt-1">Hotel</p>
                      </button>
                      <button
                        onClick={() => {
                          onIconChange("UtensilsCrossed");
                          onToggleIconDropdown(false);
                        }}
                        className={`p-4 border-2 rounded hover:bg-gray-50 transition-colors ${
                          selectedIcon === "UtensilsCrossed" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        }`}
                      >
                        <UtensilsCrossed className="w-6 h-6 mx-auto" style={{ color: iconColor }} />
                        <p className="text-xs text-gray-600 mt-1">Restaurant</p>
                      </button>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Icon Color
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={iconColor}
                          onChange={(e) => onIconColorChange(e.target.value)}
                          className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={iconColor}
                          onChange={(e) => onIconColorChange(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Custom Icon */}
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customIconUrl}
                    onChange={(e) => onCustomIconUrlChange(e.target.value)}
                    placeholder="Custom icon URL or file path"
                    className="flex-1 px-3 py-2 border border-dashed border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  />
                  <input
                    type="file"
                    id="custom-icon-upload"
                    accept="image/png,image/jpeg,image/svg+xml"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log('Custom icon uploaded:', file.name);
                      }
                    }}
                    className="hidden"
                  />
                  <button
                    onClick={() => document.getElementById('custom-icon-upload')?.click()}
                    className="px-4 py-2 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors whitespace-nowrap hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Coordinates
              </label>
              {showAiButtons && (
                <button
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-white rounded transition-colors hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Locator
                </button>
              )}
            </div>
            <div className="flex gap-3 items-end">
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => onLatitudeChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                    placeholder="47.3769"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => onLongitudeChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                    placeholder="8.5417"
                  />
                </div>
              </div>
              <button
                onClick={onCopyCoordinates}
                className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-gray-300 rounded transition-colors"
                title="Copy coordinates"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Altitude (m)
            </label>
            <input
              type="number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="450"
            />
          </div>

          {/* Tags Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tags ({selectedTags.length})
              </label>
              <div className="flex items-center gap-2">
                {showAiButtons && !isAiGeneratingTags && !showValidateButton && (
                  <button
                    onClick={onHandleAiGenerateTags}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-white rounded transition-colors hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Generate
                  </button>
                )}
                {isAiGeneratingTags && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded text-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
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
                {showValidateButton && (
                  <>
                    <button
                      onClick={onValidateAiTags}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-green-500 hover:bg-green-600 rounded transition-colors shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Validate ({aiGeneratedTags.filter(tag => selectedTags.includes(tag)).length})
                    </button>
                    <button
                      onClick={onCancelAiTags}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-red-500 hover:bg-red-600 rounded transition-colors shadow-sm"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-3">
              {/* Default Tags */}
              <div className="flex flex-wrap gap-1.5">
                {defaultTags.map((tag) => {
                  const IconComponent = tag.icon;
                  return (
                    <button
                      key={tag.name}
                      onClick={() => onToggleTag(tag.name)}
                      className={`px-2.5 py-1 text-xs rounded-full transition-all flex items-center gap-1.5 ${
                        selectedTags.includes(tag.name)
                          ? "text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      style={
                        selectedTags.includes(tag.name)
                          ? { backgroundColor: "#d4021c" }
                          : {}
                      }
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      {tag.name}
                    </button>
                  );
                })}
              </div>

              {/* AI Generated Tags */}
              {aiGeneratedTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {aiGeneratedTags.map((tag, index) => (
                    <button
                      key={tag}
                      onClick={() => onToggleTag(tag)}
                      className={`px-2.5 py-1 text-xs rounded-full shadow-sm transition-all animate-[fadeIn_0.5s_ease-in-out] ${
                        selectedTags.includes(tag)
                          ? "text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      style={{
                        ...(selectedTags.includes(tag)
                          ? {
                              background: showValidateButton
                                ? "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)"
                                : "#d4021c",
                            }
                          : {}),
                        animationDelay: `${index * 0.2}s`,
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {/* Custom Tags */}
              {customTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {customTags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-blue-500 text-white shadow-sm"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => onRemoveCustomTag(tag)}
                        className="hover:bg-blue-600 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Custom Tag */}
              {showTagInput ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => onNewTagInputChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onAddCustomTag();
                      } else if (e.key === "Escape") {
                        onShowTagInputChange(false);
                        onNewTagInputChange("");
                      }
                    }}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter custom tag name..."
                    autoFocus
                  />
                  <button
                    onClick={onAddCustomTag}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onShowTagInputChange(false);
                      onNewTagInputChange("");
                    }}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onShowTagInputChange(true)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm rounded transition-colors border hover:opacity-80"
                  style={{ color: "#d4021c", borderColor: "#d4021c" }}
                >
                  <Plus className="w-4 h-4" />
                  Add Custom Tag
                </button>
              )}
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Photos ({photos.length})
              </label>
              <div className="flex items-center gap-2">
                {showAiButtons && !isThinkingPicture && !showPictureActions && (
                  <button
                    onClick={onAiPictureGenerator}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-white rounded transition-colors hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Picture Generator
                  </button>
                )}
                {isThinkingPicture && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded text-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
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
                {showPictureActions && (
                  <>
                    <button
                      onClick={onValidatePictures}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-green-500 hover:bg-green-600 rounded transition-colors shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Validate
                    </button>
                    <button
                      onClick={onCancelPictures}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-red-500 hover:bg-red-600 rounded transition-colors shadow-sm"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded p-6 hover:border-gray-400 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="bg-gray-100 rounded-full p-3">
                  <Upload className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Click to upload photos
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Preview of uploaded photos */}
            {photos.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-2 font-medium">
                  Drag to reorder photos
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <DraggablePhoto
                      key={photo.id}
                      photo={photo}
                      index={index}
                      onMove={onMovePhoto}
                      onRemove={onRemovePhoto}
                      onAiPhotoClick={onAiPhotoClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add Technical Custom Field */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onAddTechnicalCustomField}
              className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm rounded transition-colors hover:opacity-90"
              style={{ backgroundColor: "#d4021c" }}
            >
              <Plus className="w-4 h-4" />
              Add Technical Field
            </button>
          </div>

          {/* Technical Custom Fields */}
          {technicalCustomFields.map((field) => (
            <div key={field.id} className="relative mt-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
                <button
                  onClick={() => onRemoveTechnicalCustomField(field.id)}
                  className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                  title="Remove field"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};
