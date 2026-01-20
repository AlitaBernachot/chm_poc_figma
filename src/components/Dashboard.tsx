import { 
  MapPin, 
  Route, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Users,
  BarChart3,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Edit3,
  Plus,
  Sparkles,
  Languages,
  Sun,
  Snowflake,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopBar";

interface DashboardProps {
  showAiButtons: boolean;
  onToggleAiButtons: () => void;
}

export const Dashboard = ({ showAiButtons, onToggleAiButtons }: DashboardProps) => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [poiStatusFilter, setPoiStatusFilter] = useState<"all" | "pending" | "changes" | "published">("all");
  const [routeFilter, setRouteFilter] = useState<"all" | "Pending Review" | "Changes Requested" | "Published">("all");
  const [isPoiDropdownOpen, setIsPoiDropdownOpen] = useState(false);
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = useState(false);

  // Mock data for KPIs
  const kpiData = {
    totalPois: 1247,
    poisChange: "+12%",
    poisTrend: "up",
    totalRoutes: 89,
    routesChange: "+5%",
    routesTrend: "up",
    pendingReview: 24,
    reviewChange: "+8",
    reviewTrend: "up",
    publishedToday: 6,
    publishedChange: "-2",
    publishedTrend: "down",
    totalViews: 45678,
    viewsChange: "+23%",
    viewsTrend: "up",
    avgRating: 4.6,
    ratingChange: "+0.2",
    ratingTrend: "up",
    summerRoutes: 54,
    winterRoutes: 35,
    summerChange: "+8%",
    winterChange: "+3%"
  };

  const recentPois = [
    { id: 1, name: "Château de Chillon", category: "Historic Sites", status: "Pending Review", date: "2026-01-19", user: "Marie L." },
    { id: 2, name: "Matterhorn Viewpoint", category: "Nature & Parks", status: "Pending Review", date: "2026-01-19", user: "Thomas K." },
    { id: 3, name: "Bern Old Town", category: "Historic Sites", status: "Pending Review", date: "2026-01-18", user: "Sophie M." },
    { id: 4, name: "Lake Geneva Promenade", category: "Nature & Parks", status: "Changes Requested", date: "2026-01-18", user: "David R." },
    { id: 5, name: "Jungfraujoch Restaurant", category: "Food & Drink", status: "Pending Review", date: "2026-01-17", user: "Anna B." },
    { id: 6, name: "Rhine Falls Viewpoint", category: "Nature & Parks", status: "Published", date: "2026-01-19", user: "Emma W." },
    { id: 7, name: "Zürich Old Town", category: "Historic Sites", status: "Published", date: "2026-01-18", user: "Lucas M." },
  ];

  const recentRoutes = [
    { id: 1, name: "Via Alpina Route Section 12", type: "Hiking", status: "Pending Review", date: "2026-01-19", user: "Peter S.", pois: 15, routeNumber: 961, languages: { en: true, de: true, fr: true, it: true } },
    { id: 2, name: "Rhone Cycling Path Extension", type: "Cycling", status: "Changes Requested", date: "2026-01-18", user: "Julia M.", pois: 22, routeNumber: 241, languages: { en: true, de: false, fr: true, it: false } },
    { id: 3, name: "Lake Lucerne Circuit", type: "Walking", status: "Pending Review", date: "2026-01-18", user: "Hans K.", pois: 18, routeNumber: 279, languages: { en: true, de: true, fr: false, it: true } },
    { id: 4, name: "Jura Crest Trail Update", type: "Hiking", status: "Pending Review", date: "2026-01-17", user: "Claire B.", pois: 31, routeNumber: 425, languages: { en: true, de: true, fr: true, it: false } },
    { id: 5, name: "Swiss National Park Loop", type: "Hiking", status: "Published", date: "2026-01-19", user: "Marco R.", pois: 28, routeNumber: 453, languages: { en: true, de: true, fr: true, it: true } },
    { id: 6, name: "Geneva Lake Path", type: "Cycling", status: "Published", date: "2026-01-18", user: "Sophie D.", pois: 19, routeNumber: 460, languages: { en: true, de: false, fr: false, it: true } },
  ];

  // Filter POIs and Routes based on selected status
  const filteredPois = recentPois.filter(poi => {
    if (poiStatusFilter === "all") return true;
    if (poiStatusFilter === "pending" && poi.status === "Pending Review") return true;
    if (poiStatusFilter === "changes" && poi.status === "Changes Requested") return true;
    if (poiStatusFilter === "published" && poi.status === "Published") return true;
    return false;
  });
  const filteredRoutes = recentRoutes.filter(route => {
    if (routeFilter === "all") return true;
    return route.status === routeFilter;
  });

  const topRoutes = [
    { id: 1, name: "Alpine Classic Trail", pois: 45, views: 12456, trend: "up" },
    { id: 2, name: "Lake Geneva Circuit", pois: 38, views: 10234, trend: "up" },
    { id: 3, name: "Swiss Heritage Path", pois: 52, views: 9876, trend: "down" },
    { id: 4, name: "Mountain Peaks Tour", pois: 29, views: 8543, trend: "up" },
  ];

  const categoryDistribution = [
    { name: "Nature & Parks", count: 342, percentage: 27 },
    { name: "Historic Sites", count: 298, percentage: 24 },
    { name: "Food & Drink", count: 224, percentage: 18 },
    { name: "Accommodations", count: 186, percentage: 15 },
    { name: "Activities", count: 124, percentage: 10 },
    { name: "Other", count: 73, percentage: 6 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-100 text-yellow-700";
      case "Changes Requested":
        return "bg-orange-100 text-orange-700";
      case "Published":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="h-full overflow-auto bg-[#f5f5f5]">
      <TopBar
        isSidebarVisible={false}
        showAiButtons={showAiButtons}
        onToggleSidebar={() => {}}
        onToggleAiButtons={onToggleAiButtons}
        onNavigateToPoi={() => navigate('/point-of-interest/edit?id=new')}
        onImportPOIs={() => navigate('/import-pois')}
      />
      <div className="p-8 max-w-[1800px] mx-auto">
        {/* Header with Actions */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome to the Geo Back Office</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/point-of-interest/edit?id=new')}
              className="flex items-center gap-2 px-4 py-2.5 text-white rounded hover:shadow-lg transition-all"
              style={{ backgroundColor: "#d4021c" }}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Add New POI</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2.5 text-white rounded hover:shadow-lg transition-all"
              style={{ backgroundColor: "#d4021c" }}
            >
              <Route className="w-4 h-4" />
              <span className="text-sm font-medium">Add New Route</span>
            </button>
            {showAiButtons && (
              <button 
                className="flex items-center gap-2 px-4 py-2.5 text-white rounded hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Create with AI Assist</span>
              </button>
            )}
          </div>
        </div>

        {/* KPI Cards - Fancy Grid Design */}
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {/* Total POIs - Card 1 */}
          <div className="col-span-2 lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-all">
            <p className="text-xs text-gray-500 mb-1">Total POIs</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              {kpiData.totalPois.toLocaleString()}
            </h3>
            {/* Mini sparkline visualization */}
            <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#d4021c"
                strokeWidth="2"
                points="0,25 20,20 40,15 60,18 80,10 100,8"
              />
            </svg>
          </div>

          {/* Category Quick View - Card 2 */}
          <div className="col-span-2 lg:col-span-1 rounded-2xl shadow-sm p-5 text-white" style={{ backgroundColor: "#d4021c" }}>
            <div className="flex flex-col h-full justify-between">
              <p className="text-xs text-white/80 mb-1">Categories</p>
              <h3 className="text-4xl font-bold mb-1">6</h3>
              <p className="text-xs text-white/90">Active types</p>
            </div>
          </div>

          {/* AI Promotion Card - Card 3 & 4 */}
          <div className="col-span-4 lg:col-span-2 rounded-2xl shadow-sm p-5 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            <div className="relative z-10">
              <p className="text-sm font-semibold mb-1">🎯 AI-Powered</p>
              <p className="text-xs text-white/90 mb-2">Create POIs & Routes faster</p>
              <button 
                className="px-3 py-1.5 bg-white/20 rounded text-xs font-medium hover:bg-white/30 transition-colors"
              >
                Try AI Now
              </button>
            </div>
            <div className="absolute right-3 bottom-2 text-6xl opacity-20">✨</div>
          </div>

          {/* Summer Routes - Card 5 */}
          <div className="col-span-2 lg:col-span-1 relative rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all" style={{ background: "linear-gradient(135deg, #FFA500 0%, #FFD700 100%)" }}>
            <div className="absolute top-0 right-0 opacity-20">
              <Sun className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10 p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <Sun className="w-4 h-4 text-white" />
                <p className="text-xs text-white/90 font-medium">Summer</p>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{kpiData.summerRoutes}</h3>
              <p className="text-xs text-white/80">active routes</p>
            </div>
          </div>

          {/* Winter Routes - Card 6 */}
          <div className="col-span-2 lg:col-span-1 relative rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all" style={{ background: "linear-gradient(135deg, #4A90E2 0%, #7FB3FF 100%)" }}>
            <div className="absolute top-0 right-0 opacity-20">
              <Snowflake className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10 p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <Snowflake className="w-4 h-4 text-white" />
                <p className="text-xs text-white/90 font-medium">Winter</p>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{kpiData.winterRoutes}</h3>
              <p className="text-xs text-white/80">active routes</p>
            </div>
          </div>
        </div>

        {/* Content and Review Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Route Activity */}
          <div className="bg-white rounded shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Recent Route Activity</h2>
              <div className="relative">
                <button
                  onClick={() => {
                    setIsRouteDropdownOpen(!isRouteDropdownOpen);
                    setIsPoiDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-all bg-white border border-gray-300 hover:border-gray-400"
                >
                  <span>
                    {routeFilter === "all" ? "All" : 
                     routeFilter === "Pending Review" ? "Pending" :
                     routeFilter === "Changes Requested" ? "Changes Requested" :
                     "Published"}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {isRouteDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded py-1 z-10">
                    <button
                      onClick={() => {
                        setRouteFilter("all");
                        setIsRouteDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setRouteFilter("Pending Review");
                        setIsRouteDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => {
                        setRouteFilter("Changes Requested");
                        setIsRouteDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Changes Requested
                    </button>
                    <button
                      onClick={() => {
                        setRouteFilter("Published");
                        setIsRouteDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Published
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-3">
              {filteredRoutes.map((route) => (
                <div 
                  key={route.id}
                  className="flex items-stretch border border-gray-200 rounded hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group overflow-hidden"
                >
                  {/* Route Number - Full Height */}
                  <div className="flex items-center justify-center bg-gray-100 px-4 border-r border-gray-200">
                    <span className="text-lg font-bold text-gray-700">{route.routeNumber}</span>
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-1 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">
                        {route.name}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs rounded ${getStatusColor(route.status)}`}>
                        {route.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Route className="w-3 h-3" />
                        {route.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {route.pois} POIs
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {route.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {route.user}
                      </span>
                    </div>
                  </div>
                  
                  {/* Language Indicators */}
                  <div className="flex items-center gap-1 px-3 border-l border-gray-200">
                    <Languages className="w-4 h-4 text-gray-400" />
                    <div className="flex gap-1">
                      <span 
                        className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                          route.languages.en 
                            ? 'bg-pink-100 text-pink-700' 
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        EN
                      </span>
                      <span 
                        className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                          route.languages.de 
                            ? 'bg-pink-100 text-pink-700' 
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        DE
                      </span>
                      <span 
                        className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                          route.languages.fr 
                            ? 'bg-pink-100 text-pink-700' 
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        FR
                      </span>
                      <span 
                        className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                          route.languages.it 
                            ? 'bg-pink-100 text-pink-700' 
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        IT
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded transition-colors"
            >
              View All Pending Routes
            </button>
          </div>

          {/* Recent POI Activity */}
          <div className="bg-white rounded shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent POI Activity</h2>
              <div className="relative">
                <button
                  onClick={() => {
                    setIsPoiDropdownOpen(!isPoiDropdownOpen);
                    setIsRouteDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-all bg-white border border-gray-300 hover:border-gray-400"
                >
                  <span>
                    {poiStatusFilter === "all" ? "All" : 
                     poiStatusFilter === "pending" ? "Pending" :
                     poiStatusFilter === "changes" ? "Changes Requested" :
                     "Published"}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {isPoiDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded py-1 z-10">
                    <button
                      onClick={() => {
                        setPoiStatusFilter("all");
                        setIsPoiDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setPoiStatusFilter("pending");
                        setIsPoiDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => {
                        setPoiStatusFilter("changes");
                        setIsPoiDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Changes Requested
                    </button>
                    <button
                      onClick={() => {
                        setPoiStatusFilter("published");
                        setIsPoiDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Published
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-3">
              {filteredPois.map((poi) => (
                <div 
                  key={poi.id}
                  onClick={() => navigate(`/point-of-interest/edit?id=${poi.id}`)}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">
                        {poi.name}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs rounded ${getStatusColor(poi.status)}`}>
                        {poi.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {poi.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {poi.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {poi.user}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded transition-colors"
            >
              View All Pending POIs
            </button>
          </div>
        </div>

        {/* Bottom Section - Categories and Top Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Distribution */}
          <div className="bg-white rounded shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">POI Categories</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {categoryDistribution.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm font-semibold text-gray-800">{category.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: index === 0 ? "#d4021c" : `hsl(${index * 60}, 70%, 50%)`
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Routes */}
          <div className="lg:col-span-2 bg-white rounded shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Top Routes</h2>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Route Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">POIs</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Views</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topRoutes.map((route) => (
                    <tr key={route.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">{route.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {route.pois}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {route.views.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {route.trend === "up" ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <ArrowUpRight className="w-4 h-4" />
                            <span className="text-sm font-semibold">Rising</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600">
                            <ArrowDownRight className="w-4 h-4" />
                            <span className="text-sm font-semibold">Falling</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};