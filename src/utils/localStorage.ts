/**
 * Loads the OpenAI API key from localStorage
 * @returns The API key if found, undefined otherwise
 */
export function loadOpenAIApiKey(): string | undefined {
  const key = localStorage.getItem('OPENAI_API_KEY');
  
  if (!key) {
    console.warn(
      'OpenAI API key not found in localStorage. ' +
      'AI-powered features may not work. ' +
      'Please set the OPENAI_API_KEY in localStorage.'
    );
    return undefined;
  }
  
  return key;
}
