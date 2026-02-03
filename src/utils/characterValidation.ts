import { ASCII_PATTERNS } from '../constants/asciiPatterns';

/**
 * Checks if the input text contains any characters that are not supported in ASCII_PATTERNS
 * @param text - The input text to validate
 * @returns An object with `hasInvalidChars` boolean and `invalidChars` array of unique unsupported characters
 */
export const validateText = (text: string): { hasInvalidChars: boolean; invalidChars: string[] } => {
  if (!text.trim()) {
    return { hasInvalidChars: false, invalidChars: [] };
  }

  // Get all supported characters from ASCII_PATTERNS
  const supportedChars = new Set(Object.keys(ASCII_PATTERNS));
  
  // Also support newlines (they're handled separately in the generator)
  supportedChars.add('\n');
  
  // Check each character in the input text
  const invalidCharsSet = new Set<string>();
  const upperText = text.toUpperCase();
  
  for (let i = 0; i < upperText.length; i++) {
    const char = upperText[i];
    // Skip newlines as they're handled separately
    if (char === '\n') continue;
    
    if (!supportedChars.has(char)) {
      invalidCharsSet.add(char);
    }
  }

  const invalidChars = Array.from(invalidCharsSet).sort();
  
  return {
    hasInvalidChars: invalidChars.length > 0,
    invalidChars,
  };
};
