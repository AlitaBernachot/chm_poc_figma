// MapSection.tsx - This is a simplified placeholder
// The actual implementation would require extracting all the map logic

import React, { useRef, useEffect, useState } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, Mountain, Hotel, UtensilsCrossed, Locate, Pencil } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { POI } from '../utils/poiStore';

interface MapSectionProps {
  height?: number; // Height in pixels
  pois?: POI[]; // POIs to display on the map
  selectedPoiId?: string; // Currently selected POI ID
  selectedIcon?: string; // Icon name to display
  iconColor?: string; // Icon color
}

/**
 * Transform Swiss LV95 coordinates to WGS84 (lon, lat)
 * Using official Swiss coordinate transformation formulas
 */
function lv95ToWgs84(easting: number, northing: number): [number, number] {
  // Convert LV95 to LV03 (subtract offset)
  const y = (easting - 2600000) / 1000000;
  const x = (northing - 1200000) / 1000000;
  
  // Convert LV03 to WGS84 using official approximation formula
  // Lambda (longitude)
  const lambda = 2.6779094
    + 4.728982 * y
    + 0.791484 * y * x
    + 0.1306 * y * x * x
    - 0.0436 * y * y * y;
  
  // Phi (latitude)  
  const phi = 16.9023892
    + 3.238272 * x
    - 0.270978 * y * y
    - 0.002528 * x * x
    - 0.0447 * y * y * x
    - 0.0140 * x * x * x;
  
  // Convert to decimal degrees
  const lon = lambda * 100 / 36;
  const lat = phi * 100 / 36;
  
  return [lon, lat];
}

export const MapSection: React.FC<MapSectionProps> = ({
  height = 500,
  pois = [],
  selectedPoiId,
  selectedIcon = 'MapPin',
  iconColor = '#ef4444'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);
  const [currentPoiCoordinates, setCurrentPoiCoordinates] = useState<[number, number] | null>(null);

  // Handle zoom to feature
  const handleZoomToFeature = () => {
    if (map.current && currentPoiCoordinates) {
      map.current.flyTo({
        center: currentPoiCoordinates,
        zoom: 16,
        duration: 1000
      });
    }
  };

  // Handle edit coordinates (placeholder for now)
  const handleEditCoordinates = () => {
    console.log('Edit coordinates clicked');
    // This will be implemented when you need coordinate editing functionality
  };

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [8.5417, 47.3769], // Zurich, Switzerland
      zoom: 8,
      scrollZoom: true
    });

    // Add navigation controls (zoom buttons)
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers when POIs change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Only display the selected POI
    const selectedPoi = pois.find(poi => poi.id === selectedPoiId);
    if (!selectedPoi?.feature?.geometry?.coordinates || !map.current) return;

    const [easting, northing] = selectedPoi.feature.geometry.coordinates;
    
    console.log('POI coordinates (raw):', { easting, northing });
    console.log('POI data:', selectedPoi);
      
    // Try without transformation first - maybe coordinates are already in WGS84
    let lon = easting;
    let lat = northing;
    
    // If coordinates look like Swiss LV95 (small values), add prefix
    if (easting < 3000000 && northing < 2000000) {
      // These might be LV95 coordinates without the leading digits
      // Add the typical LV95 prefixes
      const fullEasting = 2000000 + easting;
      const fullNorthing = 1000000 + northing;
      console.log('Adjusted to full LV95:', { fullEasting, fullNorthing });
      [lon, lat] = lv95ToWgs84(fullEasting, fullNorthing);
    }
    
    console.log('Final coordinates (WGS84):', { lon, lat });

    // Get the icon component based on selectedIcon
    let IconComponent;
    switch (selectedIcon) {
      case 'Mountain':
        IconComponent = Mountain;
        break;
      case 'Hotel':
        IconComponent = Hotel;
        break;
      case 'UtensilsCrossed':
        IconComponent = UtensilsCrossed;
        break;
      case 'MapPin':
      default:
        IconComponent = MapPin;
        break;
    }

    // Create marker element with icon
    const el = document.createElement('div');
    el.className = 'poi-marker';
    el.style.cursor = 'pointer';
    el.style.transition = 'transform 0.2s';
    el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))';
    
    // Render the Lucide icon to SVG string
    const iconSvg = renderToStaticMarkup(
      <IconComponent size={32} color={iconColor} strokeWidth={2.5} fill={'white'} />
    );
    
    el.innerHTML = iconSvg;

    // Create marker and add to map
    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([lon, lat])
      .setPopup(
        new maplibregl.Popup({ offset: 25 })
          .setHTML(`
            <div style="padding: 8px;">
              <strong>${selectedPoi.name || 'Untitled'}</strong><br/>
              <small>ID: ${selectedPoi.id}</small><br/>
              <small>Status: ${selectedPoi.status}</small>
            </div>
          `)
      )
      .addTo(map.current);

    markers.current.push(marker);

    // Store current POI coordinates
    setCurrentPoiCoordinates([lon, lat]);

    // Center map on the POI
    map.current.flyTo({
      center: [lon, lat],
      zoom: 14,
      duration: 1000
    });
  }, [pois, selectedPoiId, selectedIcon, iconColor]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} style={{ height: `${height}px` }} className="absolute inset-0 w-full"></div>
      
      {/* Bottom left controls */}
      {currentPoiCoordinates && (
        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
          <button
            onClick={handleZoomToFeature}
            className="bg-white hover:bg-gray-100 border border-gray-300 rounded px-3 py-2 shadow-md transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
            title="Zoom to feature"
          >
            <Locate className="w-4 h-4" />
            Zoom to feature
          </button>
          <button
            onClick={handleEditCoordinates}
            className="bg-white hover:bg-gray-100 border border-gray-300 rounded px-3 py-2 shadow-md transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
            title="Edit coordinates"
          >
            <Pencil className="w-4 h-4" />
            Edit coordinates
          </button>
        </div>
      )}
    </div>
  );
};