/**
 * GeoJSON Feature with POI cluster data
 */
interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    children: Record<string, unknown>;
    resolution: number;
  };
  id: number;
}

/**
 * GeoJSON FeatureCollection response
 */
interface GeoJSONResponse {
  type: string;
  features: GeoJSONFeature[];
}

/**
 * Fetches clustered POI data from the GeoJSON endpoint
 * @param url - The GeoJSON endpoint URL
 * @returns Array of POI IDs
 */
export async function fetchPOIClusterIds(
  url: string = 'https://data.schweizmobil.ch/poi-clusters-prod/21781/clustered_Sightseeing.geojson'
): Promise<number[]> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch POI clusters: ${response.statusText}`);
    }
    
    const data: GeoJSONResponse = await response.json();
    
    // Extract all IDs from features
    const ids = data.features.map(feature => feature.id);
    
    console.log(`Extracted ${ids.length} POI cluster IDs`);
    return ids;
  } catch (error) {
    console.error('Error fetching POI cluster IDs:', error);
    throw error;
  }
}

/**
 * Fetches detailed POI information for given IDs
 * @param ids - Array of POI IDs to fetch
 * @param lang - Language code (default: 'en')
 * @returns POI details from the API
 */
export async function fetchPOIDetails(
  ids: number[],
  lang: string = 'de'
): Promise<unknown> {
  try {
    const idsString = ids.join(',');
    const url = `https://schweizmobil.ch/api/4/feature/sightseeing/${idsString}?lang=${lang}`;
    
    console.log(`Fetching POI details for ${ids.length} IDs...`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch POI details: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log(`Successfully fetched POI details`);
    return data;
  } catch (error) {
    console.error('Error fetching POI details:', error);
    throw error;
  }
}

/**
 * Complete workflow: Fetch cluster IDs and then fetch their details
 * @param clusterUrl - The GeoJSON cluster endpoint URL
 * @param lang - Language code (default: 'en')
 * @returns POI details for all clustered POIs
 */
export async function fetchAllPOIData(
  clusterUrl?: string,
  lang: string = 'en'
): Promise<unknown> {
  try {
    // Step 1: Fetch cluster IDs
    const ids = await fetchPOIClusterIds(clusterUrl);
    
    // Step 2: Fetch details for all IDs
    const details = await fetchPOIDetails(ids, lang);
    
    return details;
  } catch (error) {
    console.error('Error in complete POI data fetch workflow:', error);
    throw error;
  }
}
