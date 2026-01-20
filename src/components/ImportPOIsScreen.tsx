import { Upload, Map, Globe, Sparkles, FileUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopBar";
import { useState } from "react";

interface ImportPOIsScreenProps {
  onClose?: () => void;
}

export default function ImportPOIsScreen({ onClose }: ImportPOIsScreenProps) {
  const navigate = useNavigate();
  const [showAiButtons] = useState(true);
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1); // Go back to previous page
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <TopBar
        isSidebarVisible={false}
        showAiButtons={showAiButtons}
        onToggleSidebar={() => {}}
        onToggleAiButtons={() => {}}
        onLogoClick={() => navigate('/dashboard')}
        onNavigateToDashboard={() => navigate('/dashboard')}
        onNavigateToPoi={() => navigate('/point-of-interest/edit?id=new')}
        onImportPOIs={() => navigate('/import-pois')}
      />
      
      <div className="flex-1 w-full bg-white flex items-center justify-center overflow-auto">
        <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome!</h1>
          <p className="text-gray-600">
            To start working, please import<br />a list of your POIs.
          </p>
        </div>

        {/* Import Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Import from File */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <FileUp className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">CSV Upload</h3>
            <p className="text-sm text-gray-500 mb-6 min-h-[60px]">
              Not using any CRM? Don't worry, just drag and drop your POIs in a CSV file and upload it.
            </p>
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Import
            </button>
          </div>

          {/* JSON Upload */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <FileUp className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">JSON Upload</h3>
            <p className="text-sm text-gray-500 mb-6 min-h-[60px]">
              Import POIs from a JSON file with custom structured data and attributes.
            </p>
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Import
            </button>
          </div>

          {/* AI Help Import */}
          <div 
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            style={{ background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' }}
          >
            <div 
              className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4"
            >
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">AI Help Me Import POIs</h3>
            <p className="text-sm text-white/90 mb-6 min-h-[60px]">
              Let our AI assistant guide you through the import process and help organize your POIs.
            </p>
            <button 
              className="w-full px-4 py-2 text-sm font-medium text-purple-700 bg-white rounded hover:bg-white/90 transition-colors"
            >
              Get AI Help
            </button>
          </div>

          {/* Connect to OSM */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Map className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">OpenStreetMap</h3>
            <p className="text-sm text-gray-500 mb-6 min-h-[60px]">
              Import POIs from OpenStreetMap to quickly populate your database with verified locations.
            </p>
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Connect
            </button>
          </div>

          {/* Connect to Overture Maps */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Overture Maps</h3>
            <p className="text-sm text-gray-500 mb-6 min-h-[60px]">
              Access high-quality, open map data from Overture Maps for comprehensive POI coverage.
            </p>
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Connect
            </button>
          </div>

          {/* Another platform */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Another platform?</h3>
            <p className="text-sm text-gray-500 mb-6 min-h-[60px]">
              Okay, we need some informations about that. Could you reach us? We do our best!
            </p>
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Reach Us
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}