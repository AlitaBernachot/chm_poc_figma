import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import mapImage from "figma:asset/41aba0057f9f7c825a2d93c5e0cc3b84e958b742.png";
import { HistorySection } from "./HistorySection";
import { SEOSection } from "./SEOSection";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import {
  Clock,
  Type,
  ExternalLink,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Upload,
  Image,
  ChevronDown,
  ChevronUp,
  Hash,
  Sparkles,
  Copy,
  Pin,
  Pen,
  Users,
  Accessibility,
  PawPrint,
  DollarSign,
  MapPinned,
  Store,
  Sun,
  CloudSun,
  Calendar,
  GripVertical,
  FileEdit,
  List,
  Columns2,
  ArrowLeftRight,
  Save,
  Undo,
  Redo,
  Loader2,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  History,
  RotateCcw,
  Globe,
  Settings,
  Share2,
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
  MapPin,
  X,
  Plus,
  Edit,
  Check,
  Search,
  MoreVertical,
  Route,
} from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface POI {
  id: string;
  name: string;
  status: "draft" | "published";
  hasLocation: boolean;
}

const mockPOIs: POI[] = [
  { id: "1", name: "", status: "draft", hasLocation: false },
  {
    id: "2",
    name: "Bathing hut of Rorschach",
    status: "published",
    hasLocation: true,
  },
  {
    id: "3",
    name: "Market Hall Altenrhein",
    status: "draft",
    hasLocation: true,
  },
  {
    id: "4",
    name: "Henry Dunant Museum",
    status: "published",
    hasLocation: true,
  },
  {
    id: "5",
    name: "Unterrechstein spa Heiden",
    status: "published",
    hasLocation: true,
  },
  {
    id: "6",
    name: "Visitor Centre c-Brugg/UP Appenweier",
    status: "published",
    hasLocation: true,
  },
  {
    id: "7",
    name: "Main street Appenweill",
    status: "draft",
    hasLocation: true,
  },
  {
    id: "8",
    name: "Säntis",
    status: "published",
    hasLocation: true,
  },
  {
    id: "9",
    name: "Hinterballat-Amden",
    status: "published",
    hasLocation: true,
  },
  {
    id: "10",
    name: "Altendorf-Etzel",
    status: "published",
    hasLocation: true,
  },
  {
    id: "11",
    name: "Alte Etzelstrasse",
    status: "published",
    hasLocation: true,
  },
  {
    id: "12",
    name: "Abbey of Einsiedeln",
    status: "published",
    hasLocation: true,
  },
  {
    id: "13",
    name: "Rothenthurn",
    status: "published",
    hasLocation: true,
  },
  {
    id: "14",
    name: "Zugersphere Trail",
    status: "published",
    hasLocation: true,
  },
  {
    id: "15",
    name: "Lorrenliedorf - where bridges meet...",
    status: "published",
    hasLocation: true,
  },
];

const categories = [
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

export default function ImprovedPoiPage() {
  const [selectedPOI, setSelectedPOI] = useState<string | null>(
    "1",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [isEnglishExpanded, setIsEnglishExpanded] =
    useState(false);
  const [isGermanExpanded, setIsGermanExpanded] =
    useState(false);
  const [customFields, setCustomFields] = useState<
    { id: number; label: string }[]
  >([]);
  const [nextFieldId, setNextFieldId] = useState(1);
  const [editingCustomFieldId, setEditingCustomFieldId] = useState<number | null>(null);
  const [technicalCustomFields, setTechnicalCustomFields] =
    useState<{ id: number; label: string }[]>([]);
  const [nextTechnicalFieldId, setNextTechnicalFieldId] =
    useState(1);
  const [additionalLanguages, setAdditionalLanguages] =
    useState<
      {
        id: number;
        name: string;
        flag: string;
        expanded: boolean;
      }[]
    >([]);
  const [nextLanguageId, setNextLanguageId] = useState(1);
  const [associatedRoutes, setAssociatedRoutes] = useState<
    {
      id: number;
      name: string;
      type: string;
      status: "active" | "inactive";
      isAiGenerated?: boolean;
      selected?: boolean;
    }[]
  >([
    {
      id: 1,
      name: "Lake Constance Tour",
      type: "Cycling",
      status: "active",
    },
    {
      id: 2,
      name: "Alpine Heritage Route",
      type: "Hiking",
      status: "active",
    },
  ]);
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [routeSearchQuery, setRouteSearchQuery] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] =
    useState(true);
  const [isAiTranslating, setIsAiTranslating] = useState(false);
  const [showRoutesOnMap, setShowRoutesOnMap] = useState(false);
  const [visibleRoutesOnMap, setVisibleRoutesOnMap] = useState<number[]>([]);
  const [isThinkingRoutes, setIsThinkingRoutes] = useState(false);
  const [showRouteActions, setShowRouteActions] = useState(false);
  const [nextRouteId, setNextRouteId] = useState(3);
  const [showPreviewModal, setShowPreviewModal] =
    useState(false);
  const [previewLanguage, setPreviewLanguage] = useState<
    "french" | "english" | "german"
  >("french");
  const [selectedCategory, setSelectedCategory] =
    useState("poi");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Family Friendly",
    "Wheelchair Accessible",
  ]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [showAiButtons, setShowAiButtons] = useState(true);
  const [translationViewMode, setTranslationViewMode] = useState<"accordion" | "columns">("accordion");
  const [leftColumnLanguage, setLeftColumnLanguage] = useState<string>("french");
  const [rightColumnLanguage, setRightColumnLanguage] = useState<string>("english");
  const [isSaveDropdownOpen, setIsSaveDropdownOpen] = useState(false);
  const [isAddLanguageDropdownOpen, setIsAddLanguageDropdownOpen] = useState(false);
  const [latitude, setLatitude] = useState("47.3769");
  const [longitude, setLongitude] = useState("8.5417");
  const [selectedIcon, setSelectedIcon] = useState("MapPin");
  const [iconColor, setIconColor] = useState("#ef4444");
  const [showIconDropdown, setShowIconDropdown] = useState(false);
  const [customIconUrl, setCustomIconUrl] = useState("");
  const [isAiGeneratingTags, setIsAiGeneratingTags] = useState(false);
  const [aiGeneratedTags, setAiGeneratedTags] = useState<string[]>([]);
  const [showValidateButton, setShowValidateButton] = useState(false);
  const [frenchTitle, setFrenchTitle] = useState("");
  const [frenchDescription, setFrenchDescription] =
    useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [englishDescription, setEnglishDescription] =
    useState("");
  const [germanTitle, setGermanTitle] = useState("");
  const [germanDescription, setGermanDescription] =
    useState("");
  const [
    otherLanguagesTitles,
    setOtherLanguagesTitles,
  ] = useState<Record<string, string>>({});
  const [
    otherLanguagesDescriptions,
    setOtherLanguagesDescriptions,
  ] = useState<Record<string, string>>({});
  const [showTranslateActions, setShowTranslateActions] = useState(false);
  const [isReviewDropdownOpen, setIsReviewDropdownOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewAction, setReviewAction] = useState<"comment" | "approve" | "request-changes">("comment");
  const [isAiGeneratingReview, setIsAiGeneratingReview] = useState(false);
  const [originalTranslations, setOriginalTranslations] = useState<{
    frenchTitle: string;
    englishTitle: string;
    germanTitle: string;
    frenchDescription: string;
    englishDescription: string;
    germanDescription: string;
    otherLanguagesTitles: Record<string, string>;
    otherLanguagesDescriptions: Record<string, string>;
  } | null>(null);
  const [transitScheduleInfo, setTransitScheduleInfo] = useState("");
  const [transitScheduleUrl, setTransitScheduleUrl] = useState("");
  const [fountainOpenHours, setFountainOpenHours] = useState("");
  const [fountainDrinkable, setFountainDrinkable] = useState(true);
  const [shopOpenHours, setShopOpenHours] = useState("");
  const [shopUrl, setShopUrl] = useState("");
  const [shopTitle, setShopTitle] = useState("");
  const [foodOpenHours, setFoodOpenHours] = useState("");
  const [foodUrl, setFoodUrl] = useState("");
  const [foodTitle, setFoodTitle] = useState("");
  const [photos, setPhotos] = useState<
    { id: number; url: string; alt: string; isAiGenerated?: boolean }[]
  >([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1650442940040-e094303e66b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2l0emVybGFuZCUyMG1vdW50YWluJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2ODU2NTY1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Switzerland mountain landscape",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1707426535185-1afa39b3d555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGxha2UlMjBzY2VuaWN8ZW58MXx8fHwxNzY4NTY1NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Swiss lake scenic view",
    },
  ]);
  const [isThinkingPicture, setIsThinkingPicture] = useState(false);
  const [showPictureActions, setShowPictureActions] = useState(false);
  const [nextPhotoId, setNextPhotoId] = useState(3);
  // SEO States
  const [seoMetaTitle, setSeoMetaTitle] = useState("Rheinfall - The Magnificent Rhine Falls");
  const [seoMetaTitleDe, setSeoMetaTitleDe] = useState("Rheinfall - Die prächtigen Rheinfälle");
  const [seoMetaTitleIt, setSeoMetaTitleIt] = useState("Cascate del Reno - Le magnifiche cascate");
  const [seoMetaDescription, setSeoMetaDescription] = useState("Visit the spectacular Rhine Falls in Schaffhausen, Switzerland's largest waterfall and one of Europe's most powerful waterfalls.");
  const [seoMetaDescriptionDe, setSeoMetaDescriptionDe] = useState("Besuchen Sie die spektakulären Rheinfälle in Schaffhausen, die grössten Wasserfälle der Schweiz.");
  const [seoMetaDescriptionIt, setSeoMetaDescriptionIt] = useState("Visita le spettacolari Cascate del Reno a Sciaffusa, la cascata più grande della Svizzera.");
  const [seoKeywords, setSeoKeywords] = useState("Rhine Falls, Rheinfall, Schaffhausen, Switzerland waterfall");
  const [seoKeywordsDe, setSeoKeywordsDe] = useState("Rheinfall, Rheinfälle, Schaffhausen, Schweizer Wasserfall");
  const [seoKeywordsIt, setSeoKeywordsIt] = useState("Cascate del Reno, Sciaffusa, cascata Svizzera");
  const [seoCanonicalUrl, setSeoCanonicalUrl] = useState("https://schweizmobil.ch/poi/rhine-falls");
  const [seoOgTitle, setSeoOgTitle] = useState("Rheinfall - The Magnificent Rhine Falls");
  const [seoOgTitleDe, setSeoOgTitleDe] = useState("Rheinfall - Die prächtigen Rheinfälle");
  const [seoOgTitleIt, setSeoOgTitleIt] = useState("Cascate del Reno - Le magnifiche cascate");
  const [seoOgDescription, setSeoOgDescription] = useState("Experience the power and beauty of Switzerland's largest waterfall.");
  const [seoOgDescriptionDe, setSeoOgDescriptionDe] = useState("Erleben Sie die Kraft und Schönheit des grössten Wasserfalls der Schweiz.");
  const [seoOgDescriptionIt, setSeoOgDescriptionIt] = useState("Scopri la potenza e la bellezza della cascata più grande della Svizzera.");
  const [seoOgImage, setSeoOgImage] = useState("https://images.unsplash.com/photo-1549665429-efc2f9000dbb");
  const [seoRobots, setSeoRobots] = useState("index, follow");
  const [slugUrl, setSlugUrl] = useState("rhine-falls-schaffhausen");
  const [slugUrlDe, setSlugUrlDe] = useState("rheinfall-schaffhausen");
  const [slugUrlIt, setSlugUrlIt] = useState("cascate-del-reno-sciaffusa");
  const [isAiOptimizingSeo, setIsAiOptimizingSeo] = useState(false);
  const [showSeoActions, setShowSeoActions] = useState(false);
  const [originalSeoValues, setOriginalSeoValues] = useState<{
    seoMetaTitle: string;
    seoMetaTitleDe: string;
    seoMetaTitleIt: string;
    seoMetaDescription: string;
    seoMetaDescriptionDe: string;
    seoMetaDescriptionIt: string;
    seoKeywords: string;
    seoKeywordsDe: string;
    seoKeywordsIt: string;
    seoOgTitle: string;
    seoOgTitleDe: string;
    seoOgTitleIt: string;
    seoOgDescription: string;
    seoOgDescriptionDe: string;
    seoOgDescriptionIt: string;
    slugUrl: string;
    slugUrlDe: string;
    slugUrlIt: string;
  } | null>(null);

  const defaultTags = [
    { name: "Family Friendly", icon: Users },
    { name: "Wheelchair Accessible", icon: Accessibility },
    { name: "Pet Friendly", icon: PawPrint },
    { name: "Free Entry", icon: DollarSign },
    { name: "Guided Tours", icon: MapPinned },
    { name: "WiFi Available", icon: Wifi },
    { name: "Parking Available", icon: ParkingCircle },
    { name: "Restaurant", icon: UtensilsCrossed },
    { name: "Gift Shop", icon: Store },
    { name: "Indoor", icon: Home },
    { name: "Outdoor", icon: Sun },
    { name: "Seasonal", icon: Calendar },
  ];

  const filteredPOIs = mockPOIs.filter((poi) =>
    poi.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const swapLanguages = () => {
    const temp = leftColumnLanguage;
    setLeftColumnLanguage(rightColumnLanguage);
    setRightColumnLanguage(temp);
  };

  const addLanguage = (languageName: string, flag: string) => {
    const newLang = {
      id: nextLanguageId,
      name: languageName,
      flag: flag,
      expanded: false,
    };
    setAdditionalLanguages([...additionalLanguages, newLang]);
    setNextLanguageId(nextLanguageId + 1);
    setIsAddLanguageDropdownOpen(false);
  };

  // Available languages to add (5 European languages)
  const availableLanguages = [
    { name: "Italian", flag: "🇮🇹" },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "Portuguese", flag: "🇵🇹" },
    { name: "Dutch", flag: "🇳🇱" },
    { name: "Polish", flag: "🇵🇱" },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag],
    );
  };

  const addCustomTag = () => {
    const defaultTagNames = defaultTags.map((tag) => tag.name);
    if (
      newTagInput.trim() &&
      !customTags.includes(newTagInput.trim()) &&
      !defaultTagNames.includes(newTagInput.trim())
    ) {
      setCustomTags([...customTags, newTagInput.trim()]);
      setSelectedTags([...selectedTags, newTagInput.trim()]);
      setNewTagInput("");
      setShowTagInput(false);
    }
  };

  const removeCustomTag = (tag: string) => {
    setCustomTags(customTags.filter((t) => t !== tag));
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleAiGenerateTags = () => {
    setIsAiGeneratingTags(true);
    setTimeout(() => {
      const newTags = ["Scenic Views", "Photography Spot", "Historic Site"];
      setAiGeneratedTags(newTags);
      setSelectedTags([...selectedTags, ...newTags]);
      setIsAiGeneratingTags(false);
      setShowValidateButton(true);
    }, 5000);
  };

  const validateAiTags = () => {
    // Keep only the AI-generated tags that are still selected
    const tagsToKeep = aiGeneratedTags.filter((tag) =>
      selectedTags.includes(tag)
    );
    // Add them to custom tags
    setCustomTags([...customTags, ...tagsToKeep]);
    // Clear AI-generated tags state
    setShowValidateButton(false);
    setAiGeneratedTags([]);
  };

  const cancelAiTags = () => {
    // Remove all AI-generated tags from selected tags
    setSelectedTags(
      selectedTags.filter((tag) => !aiGeneratedTags.includes(tag))
    );
    // Clear AI-generated tags state
    setShowValidateButton(false);
    setAiGeneratedTags([]);
  };

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${latitude}, ${longitude}`);
  };

  const handleAiTranslate = () => {
    // Store original values before AI translation
    setOriginalTranslations({
      frenchTitle,
      englishTitle,
      germanTitle,
      frenchDescription,
      englishDescription,
      germanDescription,
      otherLanguagesTitles: { ...otherLanguagesTitles },
      otherLanguagesDescriptions: { ...otherLanguagesDescriptions },
    });

    setIsAiTranslating(true);
    
    // Simulate AI translation process
    setTimeout(() => {
      // Generate random translations
      setFrenchTitle("Point de vue du sommet de la montagne");
      setFrenchDescription("Découvrez des vues panoramiques à couper le souffle sur les Alpes suisses depuis ce magnifique sommet de montagne. Parfait pour les passionnés de photographie et les amoureux de la nature.");
      
      setEnglishTitle("Mountain Peak Viewpoint");
      setEnglishDescription("Experience breathtaking panoramic views of the Swiss Alps from this stunning mountain peak. Perfect for photography enthusiasts and nature lovers.");
      
      setGermanTitle("Berggipfel Aussichtspunkt");
      setGermanDescription("Erleben Sie atemberaubende Panoramablicke auf die Schweizer Alpen von diesem atemberaubenden Berggipfel. Perfekt für Fotografie-Enthusiasten und Naturliebhaber.");

      // Generate translations for additional languages
      const newOtherTitles: Record<string, string> = {};
      const newOtherDescriptions: Record<string, string> = {};
      
      additionalLanguages.forEach((lang) => {
        if (lang.code === 'it') {
          newOtherTitles[lang.code] = "Punto Panoramico sulla Vetta";
          newOtherDescriptions[lang.code] = "Scopri viste panoramiche mozzafiato sulle Alpi svizzere da questa splendida vetta. Perfetto per gli appassionati di fotografia e gli amanti della natura.";
        } else if (lang.code === 'es') {
          newOtherTitles[lang.code] = "Mirador del Pico de la Montaña";
          newOtherDescriptions[lang.code] = "Experimenta vistas panorámicas impresionantes de los Alpes suizos desde esta impresionante cumbre. Perfecto para entusiastas de la fotografía y amantes de la naturaleza.";
        } else {
          newOtherTitles[lang.code] = `${lang.name} Mountain View`;
          newOtherDescriptions[lang.code] = `Beautiful panoramic views in ${lang.name} language.`;
        }
      });
      
      setOtherLanguagesTitles(newOtherTitles);
      setOtherLanguagesDescriptions(newOtherDescriptions);

      // Auto-expand all translation sections to show the results
      setIsEnglishExpanded(true);
      setIsGermanExpanded(true);
      setAdditionalLanguages(
        additionalLanguages.map((lang) => ({
          ...lang,
          expanded: true,
        })),
      );
      
      setIsAiTranslating(false);
      setShowTranslateActions(true);
    }, 3000);
  };

  const handleValidateTranslation = () => {
    // Keep the AI-generated translations
    setShowTranslateActions(false);
    setOriginalTranslations(null);
  };

  const handleCancelTranslation = () => {
    // Revert to original values
    if (originalTranslations) {
      setFrenchTitle(originalTranslations.frenchTitle);
      setEnglishTitle(originalTranslations.englishTitle);
      setGermanTitle(originalTranslations.germanTitle);
      setFrenchDescription(originalTranslations.frenchDescription);
      setEnglishDescription(originalTranslations.englishDescription);
      setGermanDescription(originalTranslations.germanDescription);
      setOtherLanguagesTitles(originalTranslations.otherLanguagesTitles);
      setOtherLanguagesDescriptions(originalTranslations.otherLanguagesDescriptions);
    }
    setShowTranslateActions(false);
    setOriginalTranslations(null);
  };

  const handleAiPictureGenerator = () => {
    setIsThinkingPicture(true);
    
    // Simulate AI picture generation after 3 seconds
    setTimeout(() => {
      const newPhoto = {
        id: nextPhotoId,
        url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBwYW5vcmFtYXxlbnwxfHx8fDE3Njg1NjU2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "AI Generated Swiss Alps panorama",
        isAiGenerated: true,
      };
      
      setPhotos([...photos, newPhoto]);
      setNextPhotoId(nextPhotoId + 1);
      setIsThinkingPicture(false);
      setShowPictureActions(true);
    }, 3000);
  };

  const handleValidatePictures = () => {
    // Keep the AI-generated pictures, just remove the flag
    setPhotos(
      photos.map((photo) => ({
        ...photo,
        isAiGenerated: false,
      }))
    );
    setShowPictureActions(false);
  };

  const handleCancelPictures = () => {
    // Remove all AI-generated pictures
    setPhotos(photos.filter((photo) => !photo.isAiGenerated));
    setShowPictureActions(false);
  };

  const handleAiPhotoClick = (photoId: number) => {
    // Remove the photo from the list when clicked
    setPhotos(photos.filter((photo) => photo.id !== photoId));
  };

  const openLanguage = (
    language: "english" | "german" | number,
  ) => {
    // Scroll to translatable section
    scrollToSection("translatable-section");

    // Expand the language
    setTimeout(() => {
      if (language === "english") {
        setIsEnglishExpanded(true);
      } else if (language === "german") {
        setIsGermanExpanded(true);
      } else {
        // It's an additional language ID
        setAdditionalLanguages(
          additionalLanguages.map((lang) =>
            lang.id === language
              ? { ...lang, expanded: true }
              : lang,
          ),
        );
      }
    }, 300); // Delay to allow scroll animation to start
  };

  const addCustomField = () => {
    setCustomFields([
      ...customFields,
      { id: nextFieldId, label: `Custom Field ${nextFieldId}` },
    ]);
    setNextFieldId(nextFieldId + 1);
  };

  const removeCustomField = (id: number) => {
    setCustomFields(
      customFields.filter((field) => field.id !== id),
    );
  };

  const updateCustomFieldLabel = (id: number, newLabel: string) => {
    setCustomFields(
      customFields.map((field) =>
        field.id === id ? { ...field, label: newLabel } : field
      )
    );
  };

  const addTechnicalCustomField = () => {
    setTechnicalCustomFields([
      ...technicalCustomFields,
      {
        id: nextTechnicalFieldId,
        label: `Technical Field ${nextTechnicalFieldId}`,
      },
    ]);
    setNextTechnicalFieldId(nextTechnicalFieldId + 1);
  };

  const removeTechnicalCustomField = (id: number) => {
    setTechnicalCustomFields(
      technicalCustomFields.filter((field) => field.id !== id),
    );
  };

  const removeLanguage = (id: number) => {
    setAdditionalLanguages(
      additionalLanguages.filter((lang) => lang.id !== id),
    );
  };

  const toggleLanguageExpanded = (id: number) => {
    setAdditionalLanguages(
      additionalLanguages.map((lang) =>
        lang.id === id
          ? { ...lang, expanded: !lang.expanded }
          : lang,
      ),
    );
  };

  const removeRoute = (id: number) => {
    setAssociatedRoutes(
      associatedRoutes.filter((route) => route.id !== id),
    );
  };

  const toggleRouteOnMap = (routeId: number) => {
    setVisibleRoutesOnMap((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId]
    );
  };

  const handleAiRoutesFinder = () => {
    setIsThinkingRoutes(true);
    
    // Simulate AI generation after 3 seconds
    setTimeout(() => {
      const newRoutes = [
        {
          id: nextRouteId,
          name: "Rhine Valley Trail",
          type: "Hiking",
          status: "active" as const,
          isAiGenerated: true,
          selected: true,
        },
        {
          id: nextRouteId + 1,
          name: "Swiss Panorama Ride",
          type: "Cycling",
          status: "active" as const,
          isAiGenerated: true,
          selected: true,
        },
        {
          id: nextRouteId + 2,
          name: "Mountain Pass Adventure",
          type: "E-Bike",
          status: "active" as const,
          isAiGenerated: true,
          selected: true,
        },
      ];
      
      setAssociatedRoutes([...associatedRoutes, ...newRoutes]);
      setNextRouteId(nextRouteId + 3);
      setIsThinkingRoutes(false);
      setShowRouteActions(true);
    }, 3000);
  };

  const handleValidateRoutes = () => {
    // Keep only selected AI-generated routes and remove the AI flags
    setAssociatedRoutes(
      associatedRoutes
        .filter((route) => !route.isAiGenerated || route.selected)
        .map((route) => ({
          ...route,
          isAiGenerated: false,
          selected: undefined,
        }))
    );
    setShowRouteActions(false);
  };

  const handleCancelRoutes = () => {
    // Remove all AI-generated routes
    setAssociatedRoutes(
      associatedRoutes.filter((route) => !route.isAiGenerated)
    );
    setShowRouteActions(false);
  };

  const toggleAiRouteSelection = (routeId: number) => {
    // Toggle the selected state for AI-generated routes
    setAssociatedRoutes(
      associatedRoutes.map((route) =>
        route.id === routeId && route.isAiGenerated
          ? { ...route, selected: !route.selected }
          : route
      )
    );
  };

  const movePhoto = (dragIndex: number, hoverIndex: number) => {
    const newPhotos = [...photos];
    const [draggedPhoto] = newPhotos.splice(dragIndex, 1);
    newPhotos.splice(hoverIndex, 0, draggedPhoto);
    setPhotos(newPhotos);
  };

  const removePhoto = (id: number) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const DraggablePhoto = ({
    photo,
    index,
  }: {
    photo: { id: number; url: string; alt: string; isAiGenerated?: boolean };
    index: number;
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
          movePhoto(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div
        ref={(node) => drag(drop(node))}
        onClick={photo.isAiGenerated ? () => handleAiPhotoClick(photo.id) : undefined}
        className={`relative aspect-square bg-gray-100 rounded overflow-hidden group ${
          photo.isAiGenerated ? 'cursor-pointer border-2' : 'cursor-move border border-gray-200'
        } ${isDragging ? "opacity-50" : ""}`}
        style={
          photo.isAiGenerated
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
        <div className="absolute inset-0 group-hover:bg-black/30 transition-all flex items-center justify-center pointer-events-none">
          {photo.isAiGenerated ? (
            <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded">Click to deselect</span>
          ) : (
            <GripVertical className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
        {!photo.isAiGenerated && (
          <button
            onClick={() => removePhoto(photo.id)}
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

  const handleAiReviewSuggestion = () => {
    setIsAiGeneratingReview(true);
    
    // Simulate AI review generation after 3 seconds
    setTimeout(() => {
      const suggestions = [
        "The POI information looks complete and accurate. The multilingual translations are well-formatted, and the location coordinates appear correct. The photos provide good visual context. Ready for approval.",
        "Please review the English translation - some phrases could be more natural. Also, consider adding more specific accessibility information for wheelchair users mentioned in the tags.",
        "Great work on the detailed description! However, the German translation seems to be missing some context from the French original. Please verify the route associations are correct.",
        "The technical details are comprehensive. Consider adding seasonal information since this is a mountain viewpoint. The current photos are good but could benefit from different weather conditions.",
      ];
      
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setReviewComment(randomSuggestion);
      setIsAiGeneratingReview(false);
    }, 3000);
  };

  const handleSubmitReview = () => {
    console.log("Review submitted:", {
      action: reviewAction,
      comment: reviewComment,
    });
    
    // Handle the different review actions
    if (reviewAction === "approve") {
      console.log("POI approved");
    } else if (reviewAction === "request-changes") {
      console.log("Changes requested");
    } else {
      console.log("Comment submitted");
    }
    
    // Reset and close
    setIsReviewDropdownOpen(false);
    setReviewComment("");
    setReviewAction("comment");
  };

  const handleAiOptimizeSeo = () => {
    // Store original SEO values
    setOriginalSeoValues({
      seoMetaTitle,
      seoMetaTitleDe,
      seoMetaTitleIt,
      seoMetaDescription,
      seoMetaDescriptionDe,
      seoMetaDescriptionIt,
      seoKeywords,
      seoKeywordsDe,
      seoKeywordsIt,
      seoOgTitle,
      seoOgTitleDe,
      seoOgTitleIt,
      seoOgDescription,
      seoOgDescriptionDe,
      seoOgDescriptionIt,
      slugUrl,
      slugUrlDe,
      slugUrlIt,
    });

    setIsAiOptimizingSeo(true);
    
    // Simulate AI SEO optimization process
    setTimeout(() => {
      // Generate optimized SEO content
      setSeoMetaTitle("Rhine Falls Schaffhausen | Switzerland's Largest Waterfall Experience");
      setSeoMetaTitleDe("Rheinfall Schaffhausen | Grösster Wasserfall der Schweiz");
      setSeoMetaTitleIt("Cascate del Reno | La cascata più grande della Svizzera");
      
      setSeoMetaDescription("Discover the majestic Rhine Falls in Schaffhausen, Europe's most powerful waterfall. Experience boat rides, viewing platforms, and stunning natural beauty in Switzerland's top attraction.");
      setSeoMetaDescriptionDe("Entdecken Sie die majestätischen Rheinfälle in Schaffhausen, Europas mächtigster Wasserfall. Erleben Sie Bootsfahrten, Aussichtsplattformen und atemberaubende Natur.");
      setSeoMetaDescriptionIt("Scopri le maestose Cascate del Reno a Sciaffusa, la cascata più potente d'Europa. Vivi gite in barca, piattaforme panoramiche e una natura mozzafiato.");
      
      setSeoKeywords("Rhine Falls, Rheinfall, Schaffhausen waterfall, Switzerland attractions, Europe waterfalls, boat tours, scenic viewpoints, Swiss tourism");
      setSeoKeywordsDe("Rheinfall, Schaffhausen Wasserfall, Schweizer Sehenswürdigkeiten, Europa Wasserfälle, Bootstouren, Aussichtspunkte");
      setSeoKeywordsIt("Cascate del Reno, Sciaffusa, attrazioni Svizzera, cascate Europa, tour in barca, punti panoramici");
      
      setSeoOgTitle("Rhine Falls Schaffhausen - Switzerland's Natural Wonder");
      setSeoOgTitleDe("Rheinfall Schaffhausen - Naturwunder der Schweiz");
      setSeoOgTitleIt("Cascate del Reno - Meraviglia naturale svizzera");
      
      setSeoOgDescription("Experience the thundering power and breathtaking beauty of Europe's most powerful waterfall. A must-visit Swiss destination.");
      setSeoOgDescriptionDe("Erleben Sie die donnernde Kraft und atemberaubende Schönheit des mächtigsten Wasserfalls Europas.");
      setSeoOgDescriptionIt("Vivi la potenza fragorosa e la bellezza mozzafiato della cascata più potente d'Europa.");
      
      // Generate optimized slug URLs
      setSlugUrl("rhine-falls-schaffhausen-switzerland-largest-waterfall");
      setSlugUrlDe("rheinfall-schaffhausen-groesster-wasserfall-schweiz");
      setSlugUrlIt("cascate-del-reno-sciaffusa-cascata-piu-grande-svizzera");
      
      setIsAiOptimizingSeo(false);
      setShowSeoActions(true);
    }, 3000);
  };

  const handleValidateSeo = () => {
    // Keep the AI-optimized SEO values
    setShowSeoActions(false);
    setOriginalSeoValues(null);
  };

  const handleCancelSeo = () => {
    // Revert to original SEO values
    if (originalSeoValues) {
      setSeoMetaTitle(originalSeoValues.seoMetaTitle);
      setSeoMetaTitleDe(originalSeoValues.seoMetaTitleDe);
      setSeoMetaTitleIt(originalSeoValues.seoMetaTitleIt);
      setSeoMetaDescription(originalSeoValues.seoMetaDescription);
      setSeoMetaDescriptionDe(originalSeoValues.seoMetaDescriptionDe);
      setSeoMetaDescriptionIt(originalSeoValues.seoMetaDescriptionIt);
      setSeoKeywords(originalSeoValues.seoKeywords);
      setSeoKeywordsDe(originalSeoValues.seoKeywordsDe);
      setSeoKeywordsIt(originalSeoValues.seoKeywordsIt);
      setSeoOgTitle(originalSeoValues.seoOgTitle);
      setSeoOgTitleDe(originalSeoValues.seoOgTitleDe);
      setSeoOgTitleIt(originalSeoValues.seoOgTitleIt);
      setSeoOgDescription(originalSeoValues.seoOgDescription);
      setSeoOgDescriptionDe(originalSeoValues.seoOgDescriptionDe);
      setSeoOgDescriptionIt(originalSeoValues.seoOgDescriptionIt);
      setSlugUrl(originalSeoValues.slugUrl);
      setSlugUrlDe(originalSeoValues.slugUrlDe);
      setSlugUrlIt(originalSeoValues.slugUrlIt);
    }
    setShowSeoActions(false);
    setOriginalSeoValues(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <style>
        {`
          @keyframes shine {
            0% {
              background-position: 200% center;
            }
            100% {
              background-position: -200% center;
            }
          }
        `}
      </style>
      <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <TopBar
        isSidebarVisible={isSidebarVisible}
        showAiButtons={showAiButtons}
        onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
        onToggleAiButtons={() => setShowAiButtons(!showAiButtons)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isVisible={isSidebarVisible}
          pois={filteredPOIs}
          selectedPOI={selectedPOI}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSelectPOI={setSelectedPOI}
          onSearchChange={setSearchQuery}
        />

        {/* Enhanced Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Sub-header */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                <Clock className="absolute left-3 w-4 h-4 text-gray-500 pointer-events-none z-10" />
                <select className="pl-9 pr-10 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white">
                  <option>Last change 5 min ago</option>
                  <option>
                    Version 1 - 5 min ago (Current)
                  </option>
                  <option>Version 2 - 1 hour ago</option>
                  <option>Version 3 - Yesterday</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <button
                  onClick={() => console.log('Undo')}
                  className="px-2 py-1.5 transition-colors bg-white text-gray-600 hover:bg-gray-100"
                  title="Undo"
                >
                  <Undo className="w-4 h-4" />
                </button>
                
                <div className="w-px h-6 bg-gray-300"></div>
                
                <button
                  onClick={() => console.log('Redo')}
                  className="px-2 py-1.5 transition-colors bg-white text-gray-600 hover:bg-gray-100"
                  title="Redo"
                >
                  <Redo className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="relative">
                <button
                  onClick={() => setIsReviewDropdownOpen(!isReviewDropdownOpen)}
                  className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded hover:bg-yellow-200 transition-colors cursor-pointer"
                >
                  Review required
                </button>
                
                {isReviewDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsReviewDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-white rounded shadow-lg border border-gray-200 z-50">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-800">Finish your review</h3>
                          {!isAiGeneratingReview && (
                            <button
                              onClick={handleAiReviewSuggestion}
                              className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-xs font-semibold rounded transition-all"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              AI review suggestion
                            </button>
                          )}
                          {isAiGeneratingReview && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded text-xs">
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                              <span
                                style={{ 
                                  background: 'linear-gradient(90deg, #ffffff 0%, #e0e7ff 25%, #ffffff 50%, #e0e7ff 75%, #ffffff 100%)',
                                  backgroundSize: '200% auto',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  animation: 'shine 2s linear infinite',
                                }}
                                className="font-semibold"
                              >
                                Thinking...
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Comment textarea */}
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Leave a comment"
                          disabled={isAiGeneratingReview}
                          className="w-full h-24 px-3 py-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        />
                        
                        {/* Review action radio buttons with custom styling */}
                        <div className="space-y-2 mb-4">
                          <label 
                            onClick={() => setReviewAction("comment")}
                            className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                              reviewAction === "comment" 
                                ? "border-blue-500 bg-blue-50" 
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                              reviewAction === "comment" 
                                ? "border-blue-500" 
                                : "border-gray-300"
                            }`}>
                              {reviewAction === "comment" && (
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800">Comment</div>
                              <div className="text-xs text-gray-500">Submit general feedback without explicit approval.</div>
                            </div>
                          </label>
                          
                          <label 
                            onClick={() => setReviewAction("approve")}
                            className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                              reviewAction === "approve" 
                                ? "border-green-500 bg-green-50" 
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                              reviewAction === "approve" 
                                ? "border-green-500" 
                                : "border-gray-300"
                            }`}>
                              {reviewAction === "approve" && (
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800">Approve</div>
                              <div className="text-xs text-gray-500">Submit feedback and approve this POI.</div>
                            </div>
                          </label>
                          
                          <label 
                            onClick={() => setReviewAction("request-changes")}
                            className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                              reviewAction === "request-changes" 
                                ? "border-orange-500 bg-orange-50" 
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                              reviewAction === "request-changes" 
                                ? "border-orange-500" 
                                : "border-gray-300"
                            }`}>
                              {reviewAction === "request-changes" && (
                                <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800">Request changes</div>
                              <div className="text-xs text-gray-500">Submit feedback that must be addressed before approval.</div>
                            </div>
                          </label>
                        </div>
                        
                        {/* Submit button */}
                        <button
                          onClick={handleSubmitReview}
                          disabled={isAiGeneratingReview}
                          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Submit review
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreviewModal(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 border border-blue-300 hover:bg-blue-100 text-blue-700 rounded font-semibold transition-colors shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                Preview on a map
              </button>

              <div className="relative">
                <div className="flex items-center bg-gray-700 hover:bg-gray-800 rounded shadow-sm overflow-hidden">
                  <button className="flex items-center gap-2 px-4 py-1.5 text-white font-semibold transition-colors">
                    <Save className="w-4 h-4" />
                    Save as draft
                  </button>
                  <div className="w-px h-6 bg-gray-500"></div>
                  <button 
                    onClick={() => setIsSaveDropdownOpen(!isSaveDropdownOpen)}
                    className="px-2 py-1.5 text-white transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                {isSaveDropdownOpen && (
                  <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[200px]">
                    <button 
                      onClick={() => {
                        setIsSaveDropdownOpen(false);
                        // Handle save as draft
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700"
                    >
                      Save as draft
                    </button>
                    <button 
                      onClick={() => {
                        setIsSaveDropdownOpen(false);
                        // Handle save and publish
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700"
                    >
                      Save and publish
                    </button>
                    <button 
                      onClick={() => {
                        setIsSaveDropdownOpen(false);
                        // Handle archive
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700"
                    >
                      Archive
                    </button>
                  </div>
                )}
              </div>
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Map and Form Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Quick Access Navigation */}
              <div className="bg-white rounded shadow px-4 py-3 border border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-600 mr-2">
                    Quick Access:
                  </span>
                  <button
                    onClick={() =>
                      scrollToSection("translatable-section")
                    }
                    className="px-3 py-1.5 text-sm rounded transition-colors font-medium"
                    style={{ color: "#d4021c" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "#fee2e2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "transparent")
                    }
                  >
                    Translatable Content
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() =>
                      scrollToSection("technical-section")
                    }
                    className="px-3 py-1.5 text-sm rounded transition-colors font-medium"
                    style={{ color: "#d4021c" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "#fee2e2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "transparent")
                    }
                  >
                    Technical Details
                  </button>
                  {selectedCategory === "transit" && (
                    <>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() =>
                          scrollToSection("transit-schedule-section")
                        }
                        className="px-3 py-1.5 text-sm rounded transition-colors font-medium"
                        style={{ color: "#d4021c" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "#fee2e2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        Transit Schedule
                      </button>
                    </>
                  )}
                  {selectedCategory === "fountains" && (
                    <>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() =>
                          scrollToSection("fountain-details-section")
                        }
                        className="px-3 py-1.5 text-sm rounded transition-colors font-medium"
                        style={{ color: "#d4021c" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "#fee2e2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        Fountain Details
                      </button>
                    </>
                  )}
                  {selectedCategory === "shops" && (
                    <>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() =>
                          scrollToSection("shop-details-section")
                        }
                        className="px-3 py-1.5 text-sm rounded transition-colors font-medium"
                        style={{ color: "#d4021c" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "#fee2e2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        Shop Details
                      </button>
                    </>
                  )}
                  {selectedCategory === "food" && (
                    <>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() =>
                          scrollToSection("food-details-section")
                        }
                        className="px-3 py-1.5 text-sm rounded transition-colors font-medium"
                        style={{ color: "#d4021c" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "#fee2e2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        Food & Drink Details
                      </button>
                    </>
                  )}
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() =>
                      scrollToSection("routes-section")
                    }
                    className="px-3 py-1.5 text-sm rounded transition-colors font-medium"
                    style={{ color: "#d4021c" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "#fee2e2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "transparent")
                    }
                  >
                    Associated Routes
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() =>
                      scrollToSection("seo-section")
                    }
                    className="px-3 py-1.5 text-sm rounded transition-colors font-medium"
                    style={{ color: "#d4021c" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "#fee2e2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "transparent")
                    }
                  >
                    SEO
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() =>
                      scrollToSection("history-section")
                    }
                    className="px-3 py-1.5 text-sm rounded transition-colors font-medium"
                    style={{ color: "#d4021c" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "#fee2e2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "transparent")
                    }
                  >
                    History
                  </button>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Languages:
                  </span>
                  <button
                    onClick={() =>
                      scrollToSection("translatable-section")
                    }
                    className="px-2 py-1 text-xs rounded transition-colors font-medium flex items-center gap-1"
                    style={{
                      backgroundColor: "#fef2f2",
                      color: "#d4021c",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "#fee2e2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "#fef2f2")
                    }
                  >
                    🇫🇷 FR
                  </button>
                  <button
                    onClick={() => openLanguage("english")}
                    className="px-2 py-1 text-xs bg-gray-50 text-gray-700 hover:bg-gray-100 rounded transition-colors font-medium flex items-center gap-1"
                  >
                    🇬🇧 EN
                  </button>
                  <button
                    onClick={() => openLanguage("german")}
                    className="px-2 py-1 text-xs bg-gray-50 text-gray-700 hover:bg-gray-100 rounded transition-colors font-medium flex items-center gap-1"
                  >
                    🇩🇪 DE
                  </button>
                  {additionalLanguages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => openLanguage(lang.id)}
                      className="px-2 py-1 text-xs bg-gray-50 text-gray-700 hover:bg-gray-100 rounded transition-colors font-medium flex items-center gap-1"
                    >
                      {lang.flag}{" "}
                      {lang.name.substring(0, 2).toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Translatable Content Section */}
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
                        onClick={handleAiTranslate}
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
                          onClick={handleValidateTranslation}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-green-500 hover:bg-green-600 rounded transition-colors shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Validate
                        </button>
                        <button
                          onClick={handleCancelTranslation}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-red-500 hover:bg-red-600 rounded transition-colors shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={addCustomField}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm rounded transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#d4021c" }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Custom Field
                    </button>
                    <div className="flex items-center gap-1 ml-2 border border-gray-300 rounded overflow-hidden">
                      <button
                        onClick={() => setTranslationViewMode("accordion")}
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
                        onClick={() => setTranslationViewMode("columns")}
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
                    {/* French (Main Language) - Always Open */}
                    <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🇫🇷</span>
                      <h3 className="text-base font-bold text-gray-700">
                        French (Main)
                      </h3>
                      <Pin className="w-4 h-4 text-gray-500" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={frenchTitle}
                        onChange={(e) => setFrenchTitle(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Untitled"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <RichTextEditor
                        value={frenchDescription}
                        onChange={setFrenchDescription}
                        placeholder=""
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
                      <div key={field.id} className="relative">
                        <div className="flex items-center gap-2 mb-2">
                          {editingCustomFieldId === field.id ? (
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateCustomFieldLabel(field.id, e.target.value)}
                              onBlur={() => setEditingCustomFieldId(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingCustomFieldId(null);
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
                                onClick={() => setEditingCustomFieldId(field.id)}
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
                            onClick={() =>
                              removeCustomField(field.id)
                            }
                            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                            title="Remove field"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* English Translation - Collapsible */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => openLanguage("english")}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🇬🇧</span>
                        <h3 className="text-base font-bold text-gray-700">
                          English (Translation)
                        </h3>
                      </div>
                      {isEnglishExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    {isEnglishExpanded && (
                      <div className="space-y-4 mt-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={englishTitle}
                            onChange={(e) => setEnglishTitle(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter English title..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                          </label>
                          <RichTextEditor
                            value={englishDescription}
                            onChange={setEnglishDescription}
                            placeholder="Enter English description..."
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
                          <div key={`en-${field.id}`}>
                            <div className="flex items-center gap-2 mb-2">
                              {editingCustomFieldId === field.id ? (
                                <input
                                  type="text"
                                  value={field.label}
                                  onChange={(e) => updateCustomFieldLabel(field.id, e.target.value)}
                                  onBlur={() => setEditingCustomFieldId(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      setEditingCustomFieldId(null);
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
                                    onClick={() => setEditingCustomFieldId(field.id)}
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
                      onClick={() => openLanguage("german")}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🇩🇪</span>
                        <h3 className="text-base font-bold text-gray-700">
                          German (Translation)
                        </h3>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          Required
                        </span>
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                          2 fields missing
                        </span>
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
                            onChange={(e) => setGermanTitle(e.target.value)}
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
                            onChange={setGermanDescription}
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
                          <div key={`de-${field.id}`}>
                            <div className="flex items-center gap-2 mb-2">
                              {editingCustomFieldId === field.id ? (
                                <input
                                  type="text"
                                  value={field.label}
                                  onChange={(e) => updateCustomFieldLabel(field.id, e.target.value)}
                                  onBlur={() => setEditingCustomFieldId(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      setEditingCustomFieldId(null);
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
                                    onClick={() => setEditingCustomFieldId(field.id)}
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
                        onClick={() => openLanguage(lang.id)}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {lang.flag}
                          </span>
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
                              value={otherLanguagesTitles[lang.code] || ""}
                              onChange={(e) => setOtherLanguagesTitles({
                                ...otherLanguagesTitles,
                                [lang.code]: e.target.value
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
                                setOtherLanguagesDescriptions(
                                  (prev) => ({
                                    ...prev,
                                    [lang.id]: value,
                                  }),
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
                                    onChange={(e) => updateCustomFieldLabel(field.id, e.target.value)}
                                    onBlur={() => setEditingCustomFieldId(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        setEditingCustomFieldId(null);
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
                                      onClick={() => setEditingCustomFieldId(field.id)}
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
                            setIsAddLanguageDropdownOpen(!isAddLanguageDropdownOpen);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm transition-colors hover:opacity-90"
                        >
                          <Plus className="w-4 h-4" />
                          Add Language
                        </button>
                        <div className="w-px h-6 bg-white opacity-50"></div>
                        <button 
                          onClick={() => setIsAddLanguageDropdownOpen(!isAddLanguageDropdownOpen)}
                          className="px-2 py-1.5 text-white transition-colors hover:opacity-90"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      {isAddLanguageDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsAddLanguageDropdownOpen(false)}
                          />
                          <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[200px]">
                            {availableLanguages.map((lang) => (
                              <button
                                key={lang.name}
                                onClick={() => addLanguage(lang.name, lang.flag)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700 flex items-center gap-2"
                              >
                                <span className="text-lg">{lang.flag}</span>
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
                        onChange={(e) => setLeftColumnLanguage(e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                      >
                        {leftColumnLanguage === "french" && <option value="french">🇫🇷 French (Main)</option>}
                        {leftColumnLanguage === "english" && <option value="english">🇬🇧 English</option>}
                        {leftColumnLanguage === "german" && <option value="german">🇩🇪 German</option>}
                        {rightColumnLanguage !== "french" && leftColumnLanguage !== "french" && <option value="french">🇫🇷 French (Main)</option>}
                        {rightColumnLanguage !== "english" && leftColumnLanguage !== "english" && <option value="english">🇬🇧 English</option>}
                        {rightColumnLanguage !== "german" && leftColumnLanguage !== "german" && <option value="german">🇩🇪 German</option>}
                        {additionalLanguages.map((lang) => (
                          (leftColumnLanguage === lang.id.toString() || rightColumnLanguage !== lang.id.toString()) && (
                            <option key={lang.id} value={lang.id.toString()}>
                              {lang.flag} {lang.name}
                            </option>
                          )
                        ))}
                      </select>
                    </div>
                    
                    <button
                      onClick={swapLanguages}
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
                        onChange={(e) => setRightColumnLanguage(e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                      >
                        {rightColumnLanguage === "french" && <option value="french">🇫🇷 French (Main)</option>}
                        {rightColumnLanguage === "english" && <option value="english">🇬🇧 English</option>}
                        {rightColumnLanguage === "german" && <option value="german">🇩🇪 German</option>}
                        {leftColumnLanguage !== "french" && rightColumnLanguage !== "french" && <option value="french">🇫🇷 French (Main)</option>}
                        {leftColumnLanguage !== "english" && rightColumnLanguage !== "english" && <option value="english">🇬🇧 English</option>}
                        {leftColumnLanguage !== "german" && rightColumnLanguage !== "german" && <option value="german">🇩🇪 German</option>}
                        {additionalLanguages.map((lang) => (
                          (rightColumnLanguage === lang.id.toString() || leftColumnLanguage !== lang.id.toString()) && (
                            <option key={lang.id} value={lang.id.toString()}>
                              {lang.flag} {lang.name}
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
                          if (leftColumnLanguage === "french") setFrenchDescription(value);
                          else if (leftColumnLanguage === "english") setEnglishDescription(value);
                          else if (leftColumnLanguage === "german") setGermanDescription(value);
                          else {
                            setOtherLanguagesDescriptions({
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
                              onChange={(e) => updateCustomFieldLabel(field.id, e.target.value)}
                              onBlur={() => setEditingCustomFieldId(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingCustomFieldId(null);
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
                                onClick={() => setEditingCustomFieldId(field.id)}
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
                          if (rightColumnLanguage === "french") setFrenchDescription(value);
                          else if (rightColumnLanguage === "english") setEnglishDescription(value);
                          else if (rightColumnLanguage === "german") setGermanDescription(value);
                          else {
                            setOtherLanguagesDescriptions({
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
                            setIsAddLanguageDropdownOpen(!isAddLanguageDropdownOpen);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm transition-colors hover:opacity-90"
                        >
                          <Plus className="w-4 h-4" />
                          Add Language
                        </button>
                        <div className="w-px h-6 bg-white opacity-50"></div>
                        <button 
                          onClick={() => setIsAddLanguageDropdownOpen(!isAddLanguageDropdownOpen)}
                          className="px-2 py-1.5 text-white transition-colors hover:opacity-90"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      {isAddLanguageDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsAddLanguageDropdownOpen(false)}
                          />
                          <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[200px]">
                            {availableLanguages.map((lang) => (
                              <button
                                key={lang.name}
                                onClick={() => addLanguage(lang.name, lang.flag)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700 flex items-center gap-2"
                              >
                                <span className="text-lg">{lang.flag}</span>
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

              {/* Technical Details and Map Section */}
              <div
                id="technical-section"
                className="grid grid-cols-2 gap-6 scroll-mt-6"
              >
                {/* Technical Details */}
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
                          onChange={(e) =>
                            setSelectedCategory(e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white pr-10"
                        >
                          {categories.map((category) => (
                            <option
                              key={category.value}
                              value={category.value}
                            >
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
                            const category = categories.find(
                              (c) =>
                                c.value === selectedCategory,
                            );
                            if (!category) return null;
                            const Icon = category.icon;
                            return (
                              <>
                                <div
                                  className="rounded p-2"
                                  style={{
                                    backgroundColor: "#d4021c",
                                  }}
                                >
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-700">
                                    {category.label}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Selected category
                                  </p>
                                  {selectedCategory === "transit" && (
                                    <button
                                      onClick={() => scrollToSection("transit-schedule-section")}
                                      className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                                    >
                                      → Go to Transit Schedule
                                    </button>
                                  )}
                                  {selectedCategory === "fountains" && (
                                    <button
                                      onClick={() => scrollToSection("fountain-details-section")}
                                      className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                                    >
                                      → Go to Fountain Details
                                    </button>
                                  )}
                                  {selectedCategory === "shops" && (
                                    <button
                                      onClick={() => scrollToSection("shop-details-section")}
                                      className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                                    >
                                      → Go to Shop Details
                                    </button>
                                  )}
                                  {selectedCategory === "food" && (
                                    <button
                                      onClick={() => scrollToSection("food-details-section")}
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
                            onClick={() => setShowIconDropdown(!showIconDropdown)}
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
                                    setSelectedIcon("MapPin");
                                    setShowIconDropdown(false);
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
                                    setSelectedIcon("Mountain");
                                    setShowIconDropdown(false);
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
                                    setSelectedIcon("Hotel");
                                    setShowIconDropdown(false);
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
                                    setSelectedIcon("UtensilsCrossed");
                                    setShowIconDropdown(false);
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
                                    onChange={(e) => setIconColor(e.target.value)}
                                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={iconColor}
                                    onChange={(e) => setIconColor(e.target.value)}
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
                              onChange={(e) => setCustomIconUrl(e.target.value)}
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
                                  // Handle file upload
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
                              background:
                                "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
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
                              onChange={(e) =>
                                setLatitude(e.target.value)
                              }
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
                              onChange={(e) =>
                                setLongitude(e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="8.5417"
                            />
                          </div>
                        </div>
                        <button
                          onClick={copyCoordinates}
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
                              onClick={handleAiGenerateTags}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-white rounded transition-colors hover:opacity-90"
                              style={{
                                background:
                                  "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
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
                                onClick={validateAiTags}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-green-500 hover:bg-green-600 rounded transition-colors shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Validate ({aiGeneratedTags.filter(tag => selectedTags.includes(tag)).length})
                              </button>
                              <button
                                onClick={cancelAiTags}
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
                                onClick={() => toggleTag(tag.name)}
                                className={`px-2.5 py-1 text-xs rounded-full transition-all flex items-center gap-1.5 ${
                                  selectedTags.includes(tag.name)
                                    ? "text-white shadow-sm"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                style={
                                  selectedTags.includes(tag.name)
                                    ? {
                                        backgroundColor:
                                          "#d4021c",
                                      }
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
                                onClick={() => toggleTag(tag)}
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
                                  onClick={() =>
                                    removeCustomTag(tag)
                                  }
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
                              onChange={(e) =>
                                setNewTagInput(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addCustomTag();
                                } else if (e.key === "Escape") {
                                  setShowTagInput(false);
                                  setNewTagInput("");
                                }
                              }}
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Enter custom tag name..."
                              autoFocus
                            />
                            <button
                              onClick={addCustomTag}
                              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setShowTagInput(false);
                                setNewTagInput("");
                              }}
                              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setShowTagInput(true)
                            }
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
                              onClick={handleAiPictureGenerator}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-white rounded transition-colors hover:opacity-90"
                              style={{
                                background:
                                  "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
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
                                onClick={handleValidatePictures}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-green-500 hover:bg-green-600 rounded transition-colors shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Validate
                              </button>
                              <button
                                onClick={handleCancelPictures}
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
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Add Technical Custom Field */}
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={addTechnicalCustomField}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm rounded transition-colors hover:opacity-90"
                        style={{ backgroundColor: "#d4021c" }}
                      >
                        <Plus className="w-4 h-4" />
                        Add Technical Field
                      </button>
                    </div>

                    {/* Technical Custom Fields */}
                    {technicalCustomFields.map((field) => (
                      <div
                        key={field.id}
                        className="relative mt-3"
                      >
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
                            onClick={() =>
                              removeTechnicalCustomField(
                                field.id,
                              )
                            }
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

                {/* Map and Associated Routes Column */}
                <div className="space-y-6">
                  {/* Map Section */}
                  <div className="bg-white rounded shadow border border-gray-200 overflow-hidden relative">
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                      {/* Toggle Switch for Show All Routes on Map */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700 font-medium">Show all routes</span>
                        <button
                          onClick={() => {
                            setShowRoutesOnMap(!showRoutesOnMap);
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            showRoutesOnMap ? "bg-green-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              showRoutesOnMap ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <button
                        onClick={() => setIsMapExpanded(true)}
                        className="bg-white hover:bg-gray-100 border border-gray-300 rounded p-2 shadow-sm transition-colors"
                        title="Expand map"
                      >
                        <Maximize2 className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                    <div className="h-full min-h-[500px] bg-green-100 relative">
                      <img
                        src={mapImage}
                        alt="Map view"
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Routes on Map */}
                      {(showRoutesOnMap || visibleRoutesOnMap.length > 0) && (
                        <>
                          {/* Route Lines Visualization */}
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ zIndex: 1 }}
                          >
                            {/* Lake Constance Tour - Route ID 1 */}
                            {(showRoutesOnMap || visibleRoutesOnMap.includes(1)) && (
                              <path
                                d="M 100 200 Q 200 100 350 250 T 600 200"
                                stroke="#3B82F6"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="8 4"
                                opacity="0.7"
                              />
                            )}
                            {/* Alpine Heritage Route - Route ID 2 */}
                            {(showRoutesOnMap || visibleRoutesOnMap.includes(2)) && (
                              <path
                                d="M 150 350 Q 300 280 450 320 T 650 380"
                                stroke="#10B981"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="8 4"
                                opacity="0.7"
                              />
                            )}
                          </svg>

                          {/* Route Labels */}
                          {(showRoutesOnMap || visibleRoutesOnMap.includes(1)) && (
                            <div
                              className="absolute top-1/3 left-1/3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5"
                              style={{ zIndex: 2 }}
                            >
                              <Route className="w-3.5 h-3.5" />
                              Lake Constance Tour
                            </div>
                          )}
                          {(showRoutesOnMap || visibleRoutesOnMap.includes(2)) && (
                            <div
                              className="absolute bottom-1/4 left-1/2 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5"
                              style={{ zIndex: 2 }}
                            >
                              <Route className="w-3.5 h-3.5" />
                              Alpine Heritage Route
                            </div>
                          )}
                        </>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center bg-white/90 backdrop-blur-sm rounded p-6 shadow-lg border border-gray-200">
                          <MapPin className="w-10 h-10 text-red-500 mx-auto mb-2" />
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            Click to set location
                          </h3>
                          <p className="text-sm text-gray-600">
                            Place the POI on the map
                          </p>
                          {(showRoutesOnMap || visibleRoutesOnMap.length > 0) && (
                            <p className="text-xs text-green-600 font-semibold mt-2">
                              ✓ {showRoutesOnMap ? "All routes" : `${visibleRoutesOnMap.length} route${visibleRoutesOnMap.length !== 1 ? 's' : ''}`} displayed on map
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Associated Routes Section */}
                  <div
                    id="routes-section"
                    className="bg-white rounded shadow p-6 border border-gray-200"
                  >
                    <div className="mb-4 pb-3 border-b border-gray-200 flex items-center justify-between">
                      <h2 className="text-lg font-bold text-gray-800">
                        Associated Routes ({associatedRoutes.length})
                      </h2>
                      {showAiButtons && !isThinkingRoutes && !showRouteActions && (
                        <button
                          onClick={handleAiRoutesFinder}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-white rounded transition-colors hover:opacity-90"
                          style={{
                            background:
                              "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                          }}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          AI Routes Finder
                        </button>
                      )}
                      {isThinkingRoutes && (
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
                      {showRouteActions && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleValidateRoutes}
                            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded transition-colors flex items-center gap-1.5 text-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Validate ({associatedRoutes.filter(route => route.isAiGenerated && route.selected).length})
                          </button>
                          <button
                            onClick={handleCancelRoutes}
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition-colors flex items-center gap-1.5 text-xs"
                          >
                            <X className="w-3.5 h-3.5" />
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Search Input with Add Route Button */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={routeSearchQuery}
                          onChange={(e) => setRouteSearchQuery(e.target.value)}
                          placeholder="Search for a route"
                          className="w-full bg-gray-100 hover:bg-gray-150 focus:bg-white border border-transparent focus:border-blue-400 rounded px-4 py-2.5 pr-10 text-sm outline-none transition-all"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <button
                        onClick={() => setShowAddRoute(true)}
                        disabled={!routeSearchQuery.trim()}
                        className="flex items-center gap-1.5 px-3 py-2.5 text-white text-sm rounded transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "#d4021c" }}
                      >
                        <Plus className="w-4 h-4" />
                        Add Route
                      </button>
                    </div>

                    <div className="space-y-4">
                      {associatedRoutes.map((route) => (
                        <div
                          key={route.id}
                          className="flex items-center gap-3"
                        >
                          {route.isAiGenerated && (
                            <div
                              onClick={() => toggleAiRouteSelection(route.id)}
                              className="flex-shrink-0 cursor-pointer"
                            >
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                route.selected
                                  ? 'bg-gradient-to-br from-purple-500 to-blue-500 border-transparent'
                                  : 'border-gray-300 bg-white hover:border-gray-400'
                              }`}>
                                {route.selected && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                          )}
                          <div
                            onClick={route.isAiGenerated ? () => toggleAiRouteSelection(route.id) : undefined}
                            className={`flex-1 flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-all border ${
                              route.isAiGenerated 
                                ? 'border cursor-pointer' 
                                : 'border-gray-200'
                            } ${
                              route.isAiGenerated && !route.selected ? 'opacity-50' : 'opacity-100'
                            }`}
                            style={
                              route.isAiGenerated
                                ? {
                                    borderImage: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%) 1',
                                    borderImageSlice: 1,
                                  }
                                : {}
                            }
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 rounded p-2">
                                <Route className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-base font-bold text-gray-700">
                                  {route.name}
                                </h3>
                                <span className="text-xs text-gray-500">
                                  {route.type}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!route.isAiGenerated && (
                                <>
                                  <button
                                    onClick={() => toggleRouteOnMap(route.id)}
                                    className={`px-3 py-2 rounded transition-colors flex items-center gap-1.5 ${
                                      visibleRoutesOnMap.includes(route.id)
                                        ? "bg-green-100 hover:bg-green-200 text-green-700"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    }`}
                                    title={visibleRoutesOnMap.includes(route.id) ? "Hide on map" : "Show on map"}
                                  >
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-xs font-medium">
                                      {visibleRoutesOnMap.includes(route.id) ? "On Map" : "Show"}
                                    </span>
                                  </button>
                                  <button
                                    className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                                    title="View route"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => removeRoute(route.id)}
                                    className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                                    title="Remove route"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              {route.isAiGenerated && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleRouteOnMap(route.id);
                                    }}
                                    className={`p-2 rounded transition-colors ${
                                      visibleRoutesOnMap.includes(route.id)
                                        ? "bg-green-100 hover:bg-green-200 text-green-700"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    }`}
                                    title={visibleRoutesOnMap.includes(route.id) ? "Hide on map" : "Show on map"}
                                  >
                                    <MapPin className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                                    title="View route"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Route Form */}
                      {showAddRoute && (
                        <div className="mt-4 border border-gray-200 rounded p-4 bg-gray-50">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-blue-100 rounded p-2">
                              <Route className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-base font-bold text-gray-700">
                              Add New Route
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Route Name
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                                placeholder="Enter route name..."
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Route Type
                              </label>
                              <select className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                                <option value="Cycling">
                                  Cycling
                                </option>
                                <option value="Hiking">
                                  Hiking
                                </option>
                                <option value="Walking">
                                  Walking
                                </option>
                                <option value="Driving">
                                  Driving
                                </option>
                              </select>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() =>
                                  setShowAddRoute(false)
                                }
                                className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() =>
                                  setShowAddRoute(false)
                                }
                                className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold transition-colors shadow-sm"
                              >
                                Add Route
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transit Schedule Section - Only shown when transit category is selected */}
              {selectedCategory === "transit" && (
                <div
                  id="transit-schedule-section"
                  className="bg-white rounded shadow p-6 border border-gray-200 scroll-mt-6"
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                    <Train className="w-5 h-5 inline-block mr-2 text-gray-700" />
                    Transit Schedule Information
                  </h2>

                  <div className="space-y-4">
                    {/* Schedule Information */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Schedule Information
                      </label>
                      <textarea
                        value={transitScheduleInfo}
                        onChange={(e) => setTransitScheduleInfo(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="Enter schedule details (e.g., operating hours, frequency, service days...)"
                        rows={4}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Provide information about bus/train schedules, operating hours, and service frequency
                      </p>
                    </div>

                    {/* Schedule URL Link */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Schedule URL
                      </label>
                      <div className="flex gap-2 items-start">
                        <input
                          type="url"
                          value={transitScheduleUrl}
                          onChange={(e) => setTransitScheduleUrl(e.target.value)}
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="https://sbb.ch/schedule..."
                        />
                        {transitScheduleUrl && (
                          <a
                            href={transitScheduleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition-colors flex items-center gap-2"
                            title="Open schedule link"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-700" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Link to online schedule or timetable (e.g., SBB, local transit authority)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Fountain Details Section - Only shown when fountains category is selected */}
              {selectedCategory === "fountains" && (
                <div
                  id="fountain-details-section"
                  className="bg-white rounded shadow p-6 border border-gray-200 scroll-mt-6"
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                    <Droplet className="w-5 h-5 inline-block mr-2 text-gray-700" />
                    Fountain Details
                  </h2>

                  <div className="space-y-4">
                    {/* Open Hours */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Open Hours
                      </label>
                      <input
                        type="text"
                        value={fountainOpenHours}
                        onChange={(e) => setFountainOpenHours(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g., 24/7, Seasonal (May-October), etc."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Specify when the fountain is accessible
                      </p>
                    </div>

                    {/* Drinkable Water */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Drinkable Water
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="drinkable"
                            checked={fountainDrinkable === true}
                            onChange={() => setFountainDrinkable(true)}
                            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Yes, drinkable</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="drinkable"
                            checked={fountainDrinkable === false}
                            onChange={() => setFountainDrinkable(false)}
                            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Not drinkable</span>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Indicate if the water is safe to drink
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Shop Details Section - Only shown when shops category is selected */}
              {selectedCategory === "shops" && (
                <div
                  id="shop-details-section"
                  className="bg-white rounded shadow p-6 border border-gray-200 scroll-mt-6"
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                    <ShoppingBag className="w-5 h-5 inline-block mr-2 text-gray-700" />
                    Shop Details
                  </h2>

                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Shop Name/Title
                      </label>
                      <input
                        type="text"
                        value={shopTitle}
                        onChange={(e) => setShopTitle(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g., Mountain Sports Shop, Local Grocery Store..."
                      />
                    </div>

                    {/* Open Hours/Days */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Open Hours/Days
                      </label>
                      <textarea
                        value={shopOpenHours}
                        onChange={(e) => setShopOpenHours(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="e.g., Mon-Fri: 9:00-18:00, Sat: 10:00-16:00, Sun: Closed"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Specify the shop's opening hours and days
                      </p>
                    </div>

                    {/* URL */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Website URL
                      </label>
                      <div className="flex gap-2 items-start">
                        <input
                          type="url"
                          value={shopUrl}
                          onChange={(e) => setShopUrl(e.target.value)}
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="https://..."
                        />
                        {shopUrl && (
                          <a
                            href={shopUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition-colors flex items-center gap-2"
                            title="Open shop website"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-700" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Link to the shop's website or online store
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Food & Drink Details Section - Only shown when food category is selected */}
              {selectedCategory === "food" && (
                <div
                  id="food-details-section"
                  className="bg-white rounded shadow p-6 border border-gray-200 scroll-mt-6"
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                    <UtensilsCrossed className="w-5 h-5 inline-block mr-2 text-gray-700" />
                    Food & Drink Details
                  </h2>

                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Restaurant/Cafe Name
                      </label>
                      <input
                        type="text"
                        value={foodTitle}
                        onChange={(e) => setFoodTitle(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g., Alpine Restaurant, Café Zurich..."
                      />
                    </div>

                    {/* Open Hours/Days */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Open Hours/Days
                      </label>
                      <textarea
                        value={foodOpenHours}
                        onChange={(e) => setFoodOpenHours(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="e.g., Mon-Sun: 11:00-22:00, Kitchen closes at 21:30"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Specify the restaurant's opening hours and days
                      </p>
                    </div>

                    {/* URL */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Website URL
                      </label>
                      <div className="flex gap-2 items-start">
                        <input
                          type="url"
                          value={foodUrl}
                          onChange={(e) => setFoodUrl(e.target.value)}
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="https://..."
                        />
                        {foodUrl && (
                          <a
                            href={foodUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition-colors flex items-center gap-2"
                            title="Open restaurant website"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-700" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Link to the restaurant's website, menu, or booking page
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Section */}
              <SEOSection
                seoMetaTitle={seoMetaTitle}
                setSeoMetaTitle={setSeoMetaTitle}
                seoMetaTitleDe={seoMetaTitleDe}
                setSeoMetaTitleDe={setSeoMetaTitleDe}
                seoMetaTitleIt={seoMetaTitleIt}
                setSeoMetaTitleIt={setSeoMetaTitleIt}
                seoMetaDescription={seoMetaDescription}
                setSeoMetaDescription={setSeoMetaDescription}
                seoMetaDescriptionDe={seoMetaDescriptionDe}
                setSeoMetaDescriptionDe={setSeoMetaDescriptionDe}
                seoMetaDescriptionIt={seoMetaDescriptionIt}
                setSeoMetaDescriptionIt={setSeoMetaDescriptionIt}
                seoKeywords={seoKeywords}
                setSeoKeywords={setSeoKeywords}
                seoKeywordsDe={seoKeywordsDe}
                setSeoKeywordsDe={setSeoKeywordsDe}
                seoKeywordsIt={seoKeywordsIt}
                setSeoKeywordsIt={setSeoKeywordsIt}
                seoCanonicalUrl={seoCanonicalUrl}
                setSeoCanonicalUrl={setSeoCanonicalUrl}
                seoOgTitle={seoOgTitle}
                setSeoOgTitle={setSeoOgTitle}
                seoOgTitleDe={seoOgTitleDe}
                setSeoOgTitleDe={setSeoOgTitleDe}
                seoOgTitleIt={seoOgTitleIt}
                setSeoOgTitleIt={setSeoOgTitleIt}
                seoOgDescription={seoOgDescription}
                setSeoOgDescription={setSeoOgDescription}
                seoOgDescriptionDe={seoOgDescriptionDe}
                setSeoOgDescriptionDe={setSeoOgDescriptionDe}
                seoOgDescriptionIt={seoOgDescriptionIt}
                setSeoOgDescriptionIt={setSeoOgDescriptionIt}
                seoOgImage={seoOgImage}
                setSeoOgImage={setSeoOgImage}
                seoRobots={seoRobots}
                setSeoRobots={setSeoRobots}
                slugUrl={slugUrl}
                setSlugUrl={setSlugUrl}
                slugUrlDe={slugUrlDe}
                setSlugUrlDe={setSlugUrlDe}
                slugUrlIt={slugUrlIt}
                setSlugUrlIt={setSlugUrlIt}
                showAiButtons={showAiButtons}
                onAiOptimize={handleAiOptimizeSeo}
                isAiOptimizing={isAiOptimizingSeo}
                showActions={showSeoActions}
                onValidate={handleValidateSeo}
                onCancel={handleCancelSeo}
              />

              {/* History Section */}
              <HistorySection />
            </div>
          </div>
        </main>
      </div>

      {/* Map Expansion Modal */}
      {isMapExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">
                Map View
              </h2>
              <div className="flex items-center gap-3">
                {/* Toggle Switch for Show All Routes on Map */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 font-medium">Show all routes</span>
                  <button
                    onClick={() => {
                      setShowRoutesOnMap(!showRoutesOnMap);
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showRoutesOnMap ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showRoutesOnMap ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <button
                  onClick={() => setIsMapExpanded(false)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-green-100 relative overflow-hidden">
              <img
                src={mapImage}
                alt="Map view"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Routes on Map */}
              {showRoutesOnMap && (
                <>
                  {/* Route Lines Visualization */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                  >
                    <path
                      d="M 100 200 Q 200 100 350 250 T 600 200"
                      stroke="#3B82F6"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="8 4"
                      opacity="0.7"
                    />
                    <path
                      d="M 150 350 Q 300 280 450 320 T 650 380"
                      stroke="#10B981"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="8 4"
                      opacity="0.7"
                    />
                  </svg>

                  {/* Route Labels */}
                  <div
                    className="absolute top-1/3 left-1/3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5"
                    style={{ zIndex: 2 }}
                  >
                    <Route className="w-3.5 h-3.5" />
                    Lake Constance Tour
                  </div>
                  <div
                    className="absolute bottom-1/4 left-1/2 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5"
                    style={{ zIndex: 2 }}
                  >
                    <Route className="w-3.5 h-3.5" />
                    Alpine Heritage Route
                  </div>
                </>
              )}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white/90 backdrop-blur-sm rounded p-8 shadow-lg border border-gray-200">
                  <MapPin className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Click to set location
                  </h3>
                  <p className="text-sm text-gray-600">
                    Place the POI on the map
                  </p>
                  {showRoutesOnMap && (
                    <p className="text-xs text-green-600 font-semibold mt-2">
                      ✓ Routes displayed on map
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800">
                  Preview - <i>Untitled</i>
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {/* Toggle Switch for Show All Routes */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 font-medium">Show all routes</span>
                  <button
                    onClick={() => {
                      setShowRoutesOnMap(!showRoutesOnMap);
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showRoutesOnMap ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showRoutesOnMap ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                {/* Language Switcher */}
                <div className="flex items-center gap-2 bg-gray-100 rounded p-1">
                  <button
                    onClick={() => setPreviewLanguage("french")}
                    className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1.5 ${
                      previewLanguage === "french"
                        ? "bg-orange-500 text-white font-semibold shadow-sm"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    🇫🇷 French
                  </button>
                  <button
                    onClick={() =>
                      setPreviewLanguage("english")
                    }
                    className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1.5 ${
                      previewLanguage === "english"
                        ? "bg-orange-500 text-white font-semibold shadow-sm"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => setPreviewLanguage("german")}
                    className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1.5 ${
                      previewLanguage === "german"
                        ? "bg-orange-500 text-white font-semibold shadow-sm"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    🇩🇪 German
                  </button>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-green-100 relative overflow-hidden">
              <img
                src={mapImage}
                alt="Map view"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* POI Marker with Custom Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {/* Custom Icon Display */}
                <div className="bg-white rounded-lg shadow-2xl p-4 border-4 border-red-500 mb-2 animate-bounce">
                  <MapPin className="w-12 h-12 text-red-500" />
                </div>

                {/* POI Information Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-gray-200 max-w-sm">
                  {/* Language Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded flex items-center gap-1">
                      {previewLanguage === "french" &&
                        "🇫🇷 French"}
                      {previewLanguage === "english" &&
                        "🇬🇧 English"}
                      {previewLanguage === "german" &&
                        "🇩🇪 German"}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded p-2">
                      <MapPin className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {previewLanguage === "french" &&
                          (mockPOIs.find(
                            (poi) => poi.id === selectedPOI,
                          )?.name ||
                            "Untitled")}
                        {previewLanguage === "english" &&
                          (mockPOIs.find(
                            (poi) => poi.id === selectedPOI,
                          )?.name
                            ? `${mockPOIs.find((poi) => poi.id === selectedPOI)?.name} (EN)`
                            : "Untitled")}
                        {previewLanguage === "german" &&
                          (mockPOIs.find(
                            (poi) => poi.id === selectedPOI,
                          )?.name
                            ? `${mockPOIs.find((poi) => poi.id === selectedPOI)?.name} (DE)`
                            : "Untitled")}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center gap-1.5">
                          <span className="font-semibold">
                            {previewLanguage === "french" &&
                              "Statut:"}
                            {previewLanguage === "english" &&
                              "Status:"}
                            {previewLanguage === "german" &&
                              "Status:"}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              mockPOIs.find(
                                (poi) => poi.id === selectedPOI,
                              )?.status === "draft"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {previewLanguage === "french" &&
                              (mockPOIs.find(
                                (poi) => poi.id === selectedPOI,
                              )?.status === "draft"
                                ? "brouillon"
                                : "publié")}
                            {previewLanguage === "english" &&
                              (mockPOIs.find(
                                (poi) => poi.id === selectedPOI,
                              )?.status ||
                                "draft")}
                            {previewLanguage === "german" &&
                              (mockPOIs.find(
                                (poi) => poi.id === selectedPOI,
                              )?.status === "draft"
                                ? "Entwurf"
                                : "veröffentlicht")}
                          </span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span className="font-semibold">
                            {previewLanguage === "french" &&
                              "Coordonnées:"}
                            {previewLanguage === "english" &&
                              "Coordinates:"}
                            {previewLanguage === "german" &&
                              "Koordinaten:"}
                          </span>
                          <span>47.3769, 8.5417</span>
                          <button
                            onClick={copyCoordinates}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                            title="Copy coordinates"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span className="font-semibold">
                            {previewLanguage === "french" &&
                              "Altitude:"}
                            {previewLanguage === "english" &&
                              "Altitude:"}
                            {previewLanguage === "german" &&
                              "Höhe:"}
                          </span>
                          <span>450m</span>
                        </p>
                      </div>

                      {/* Photos Section */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-2">
                          {previewLanguage === "french" &&
                            "Photos:"}
                          {previewLanguage === "english" &&
                            "Photos:"}
                          {previewLanguage === "german" &&
                            "Fotos:"}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          <img
                            src="https://images.unsplash.com/photo-1716109074712-ea9d6a00c21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGxhbmRtYXJrfGVufDF8fHx8MTc2ODQ3NzMyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="POI Photo 1"
                            className="w-full h-16 object-cover rounded"
                          />
                          <img
                            src="https://images.unsplash.com/photo-1642039101732-ad98409bee48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZpZXdwb2ludHxlbnwxfHx8fDE3Njg0NzczMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="POI Photo 2"
                            className="w-full h-16 object-cover rounded"
                          />
                          <img
                            src="https://images.unsplash.com/photo-1708984125885-d93dd16f759e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjB0cmFpbCUyMG1hcmtlcnxlbnwxfHx8fDE3Njg0NzczMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="POI Photo 3"
                            className="w-full h-16 object-cover rounded"
                          />
                        </div>
                      </div>

                      {/* Associated Routes on Preview */}
                      {associatedRoutes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs font-semibold text-gray-700 mb-1.5">
                            {previewLanguage === "french" &&
                              "Apparaît sur les itinéraires:"}
                            {previewLanguage === "english" &&
                              "Appears on routes:"}
                            {previewLanguage === "german" &&
                              "Erscheint auf Routen:"}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {associatedRoutes.map((route) => (
                              <span
                                key={route.id}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded flex items-center gap-1"
                              >
                                <Route className="w-3 h-3" />
                                {route.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200">
                <h4 className="text-xs font-bold text-gray-700 mb-2">
                  {previewLanguage === "french" && "Légende"}
                  {previewLanguage === "english" && "Legend"}
                  {previewLanguage === "german" && "Legende"}
                </h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="bg-red-500 rounded p-1">
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                    <span>
                      {previewLanguage === "french" &&
                        "POI actuel"}
                      {previewLanguage === "english" &&
                        "Current POI"}
                      {previewLanguage === "german" &&
                        "Aktueller POI"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="bg-blue-500 rounded p-1">
                      <Route className="w-3 h-3 text-white" />
                    </div>
                    <span>
                      {previewLanguage === "french" &&
                        "Itinéraire associé"}
                      {previewLanguage === "english" &&
                        "Associated Route"}
                      {previewLanguage === "german" &&
                        "Zugehörige Route"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="bg-white hover:bg-gray-100 border border-gray-300 rounded p-2 shadow-md transition-colors">
                  <Plus className="w-4 h-4 text-gray-700" />
                </button>
                <button className="bg-white hover:bg-gray-100 border border-gray-300 rounded p-2 shadow-md transition-colors">
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      </div>
    </DndProvider>
  );
}