import { fetchAllPOIData } from './poiData';

/**
 * POI interface matching the app's expected structure
 */
export interface POI {
  id: string;
  name: string;
  status: "draft" | "published";
  hasLocation: boolean;
  lastUpdated?: string;
  reviewStatus?: "review-required" | "approved" | "pending";
  category?: string;
  season?: "summer" | "winter" | "all-year";
}

/**
 * Raw POI data structure from the API
 */
interface RawPOIFeature {
  id: number;
  refid: number;
  title: string;
  abstract?: string;
  description?: string;
  photo?: string;
  photoSmall?: string;
  photoBig?: string;
  gallery?: Array<{
    src: string;
    srcBig: string;
    abstract: string;
    author: string;
    copyright: string;
  }>;
  addressCity?: string;
  addressEmail?: string;
  addressName?: string;
  addressPhone?: string;
  addressStreet?: string;
  addressUrl?: string;
  addressZip?: string;
  url?: string;
  canton?: number;
  touristicRegion?: number;
  [key: string]: unknown;
}

const POI_STORAGE_KEY = 'schweizmobil_pois';
const POI_TIMESTAMP_KEY = 'schweizmobil_pois_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Transform raw API POI data into app POI format
 */
function transformPOIData(rawData: unknown): POI[] {
  try {
    // Handle different possible API response structures
    let features: RawPOIFeature[] = [];
    
    if (Array.isArray(rawData)) {
      features = rawData;
    } else if (rawData && typeof rawData === 'object') {
      const data = rawData as Record<string, unknown>;
      if (Array.isArray(data.features)) {
        features = data.features;
      } else if (Array.isArray(data.data)) {
        features = data.data;
      }
    }

    const transformedPOIs = features.map((feature, index) => {
      const id = feature.id?.toString() || feature.refid?.toString() || `poi-${index}`;
      const name = feature.title || `POI #${id}`;
      
      // Determine category based on available data
      // This is a simple heuristic - adjust based on your needs
      const category = 'poi'; // Default category, could be enhanced with mapping logic
      
      // Determine if location exists (most POIs from API should have location)
      const hasLocation = true;
      
      return {
        id,
        name,
        status: 'published' as const,
        hasLocation,
        lastUpdated: new Date().toISOString().split('T')[0],
        reviewStatus: 'approved' as const,
        category,
        season: 'all-year' as const,
      };
    });

    // Always include the untitled POI at the beginning for creating new POIs
    return [
      { 
        id: "new", 
        name: "", 
        status: "draft" as const, 
        hasLocation: false, 
        lastUpdated: new Date().toISOString().split('T')[0], 
        reviewStatus: "pending" as const, 
        category: "poi", 
        season: "all-year" as const 
      },
      ...transformedPOIs
    ];
  } catch (error) {
    console.error('Error transforming POI data:', error);
    return [];
  }
}

/**
 * Get POIs from localStorage cache
 */
function getCachedPOIs(): POI[] | null {
  try {
    const cached = localStorage.getItem(POI_STORAGE_KEY);
    const timestamp = localStorage.getItem(POI_TIMESTAMP_KEY);
    
    if (!cached || !timestamp) {
      return null;
    }
    
    const cacheAge = Date.now() - parseInt(timestamp, 10);
    if (cacheAge > CACHE_DURATION) {
      console.log('POI cache expired, will fetch fresh data');
      return null;
    }
    
    const pois = JSON.parse(cached);
    console.log(`Loaded ${pois.length} POIs from cache (age: ${Math.round(cacheAge / 60000)} minutes)`);
    return pois;
  } catch (error) {
    console.error('Error reading POI cache:', error);
    return null;
  }
}

/**
 * Save POIs to localStorage cache
 */
function cachePOIs(pois: POI[]): void {
  try {
    localStorage.setItem(POI_STORAGE_KEY, JSON.stringify(pois));
    localStorage.setItem(POI_TIMESTAMP_KEY, Date.now().toString());
    console.log(`Cached ${pois.length} POIs to localStorage`);
  } catch (error) {
    console.error('Error caching POIs:', error);
  }
}

/**
 * Generate POI array by fetching from the API
 * This function will cache results in localStorage for 24 hours
 * @param forceRefresh - Force refresh even if cache is valid
 * @returns Array of POIs
 */
export async function generatePOIs(forceRefresh: boolean = false): Promise<POI[]> {
  try {
    // Check cache first unless force refresh is requested
    if (!forceRefresh) {
      const cachedPOIs = getCachedPOIs();
      if (cachedPOIs) {
        return cachedPOIs;
      }
    }
    
    console.log('Fetching POI data from API...');
    
    // Fetch POI data from API
    const rawData = await fetchAllPOIData();
    
    // Transform to expected format
    const pois = transformPOIData(rawData);
    
    if (pois.length === 0) {
      console.warn('No POIs were generated from API data');
    } else {
      console.log(`Successfully generated ${pois.length} POIs from API`);
      // Cache the results
      cachePOIs(pois);
    }
    
    return pois;
  } catch (error) {
    console.error('Error generating POIs:', error);
    
    // Try to return cached data as fallback
    const cachedPOIs = getCachedPOIs();
    if (cachedPOIs) {
      console.log('Using cached POIs as fallback');
      return cachedPOIs;
    }
    
    // Return empty array if all else fails
    return [];
  }
}

/**
 * Initialize POI data at app start
 * This will fetch POIs in the background and cache them
 */
export function initializePOIs(): void {
  generatePOIs()
    .then((pois) => {
      console.log(`POI initialization complete: ${pois.length} POIs available`);
      
      // Dispatch custom event so components can react to POI data being ready
      window.dispatchEvent(new CustomEvent('pois-loaded', { detail: { pois } }));
    })
    .catch((error) => {
      console.error('Failed to initialize POIs:', error);
    });
}

/**
 * Get current POIs (from cache or empty array)
 * This is synchronous and suitable for initial render
 */
export function getCurrentPOIs(): POI[] {
  return getCachedPOIs() || [];
}

/**
 * Clear POI cache
 */
export function clearPOICache(): void {
  localStorage.removeItem(POI_STORAGE_KEY);
  localStorage.removeItem(POI_TIMESTAMP_KEY);
  console.log('POI cache cleared');
}
