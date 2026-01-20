/**
 * Response structure from the keyword extraction API
 */
interface KeywordResponse {
  view_on?: string[];
  pass_through?: string[];
  food_and_drink?: string[];
  swim?: string[];
  [key: string]: string[] | undefined;
}

/**
 * Extracts AI-generated keywords from a POI description
 * @param description - The POI description to analyze
 * @returns Array of extracted keywords from all categories
 */
export async function extractKeywordsFromDescription(
  description: string
): Promise<string[]> {
  try {
    if (!description || description.trim().length === 0) {
        alert('No description provided for keyword extraction');
      console.warn('No description provided for keyword extraction');
      return [];
    }

    const encodedDescription = encodeURIComponent(description);
    const response = await fetch(
      `https://dev.schweizmobil.ch/api/6/llm_extract_route_keywords/${encodedDescription}`
    );

    if (!response.ok) {
      throw new Error(`Failed to extract keywords: ${response.statusText}`);
    }

    const data: KeywordResponse = await response.json();

    // Extract all keywords from all categories
    const allKeywords: string[] = [];
    
    Object.values(data).forEach((categoryKeywords) => {
      if (Array.isArray(categoryKeywords)) {
        allKeywords.push(...categoryKeywords);
      }
    });

    console.log(`Extracted ${allKeywords.length} keywords from description`);
    return allKeywords;
  } catch (error) {
    console.error('Error extracting keywords:', error);
    throw error;
  }
}
