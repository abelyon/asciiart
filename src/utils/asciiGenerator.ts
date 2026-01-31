import { ASCII_PATTERNS } from '../constants/asciiPatterns';

const MAX_HEIGHT = 7;
const FIXED_CHAR_WIDTH = 14;

export const generateAsciiArt = (
  input: string,
  slashChar: string,
  equalsChar: string,
  voidChar: string
): string[] => {
  if (!input.trim()) {
    return [];
  }

  // Helper function to get random character from a string if it contains multiple characters
  const getRandomChar = (charString: string): string => {
    if (charString.length > 1) {
      return charString[Math.floor(Math.random() * charString.length)];
    }
    return charString;
  };

  // Helper function to get character for replacement based on mode and current input character
  const getReplacementChar = (
    charString: string,
    inputChar: string
  ): string => {
    // If starts with "!ALPHA", use the input character itself
    if (charString === '!ALPHA') {
      return inputChar;
    }
    // Otherwise, use random selection for multi-character strings
    return getRandomChar(charString);
  };

  // Split input by newlines to handle multiple lines
  const inputLines = input.split('\n');
  const allAsciiLines: string[] = [];

  // Process each input line
  for (let lineIndex = 0; lineIndex < inputLines.length; lineIndex++) {
    const inputLine = inputLines[lineIndex];
    if (!inputLine.trim() && lineIndex < inputLines.length - 1) {
      // Add empty line spacing
      for (let i = 0; i < MAX_HEIGHT; i++) {
        allAsciiLines.push('');
      }
      continue;
    }

    const lines: string[] = [];
    // Initialize lines array for this input line
    for (let i = 0; i < MAX_HEIGHT; i++) {
      lines[i] = '';
    }

    // Process each character in the current input line
    for (let i = 0; i < inputLine.length; i++) {
      const char = inputLine[i].toUpperCase();
      const pattern = ASCII_PATTERNS[char] || ASCII_PATTERNS[' '];

      // Add each line of the pattern
      for (let j = 0; j < MAX_HEIGHT; j++) {
        let patternLine = pattern[j] || '';

        // Replace characters: / becomes slashChar, = becomes equalsChar, spaces become voidChar
        // If character input starts with "!", use the input character itself
        patternLine = patternLine.replace(/\//g, () => getReplacementChar(slashChar, char));
        patternLine = patternLine.replace(/=/g, () => getReplacementChar(equalsChar, char));
        patternLine = patternLine.replace(/ /g, () => getReplacementChar(voidChar, char));

        // Pad the line to fixed width to ensure consistent alignment
        const paddedLine = patternLine.padEnd(FIXED_CHAR_WIDTH, getReplacementChar(voidChar, char));
        lines[j] += paddedLine;
        // Add spacing between characters (except for the last character)
        if (i < inputLine.length - 1) {
          lines[j] += getReplacementChar(voidChar, char) + getReplacementChar(voidChar, char);
        }
      }
    }

    // Add the ASCII lines for this input line to the result
    allAsciiLines.push(...lines);

    // Add spacing between lines (except after the last line)
    if (lineIndex < inputLines.length - 1) {
      // Add one empty line between ASCII art blocks
      allAsciiLines.push('');
    }
  }

  return allAsciiLines;
};

export const generateTitleAsciiArt = (
  input: string,
  slashChar: string,
  equalsChar: string,
  voidChar: string
): string[] => {
  // Use the static title text
  const textToUse = input.trim() || 'ASCII ART';
  if (!textToUse) {
    return [];
  }

  // Helper function to get random character from a string if it contains multiple characters
  const getRandomChar = (charString: string): string => {
    if (charString.length > 1) {
      return charString[Math.floor(Math.random() * charString.length)];
    }
    return charString;
  };

  // Helper function to get character for replacement based on mode and current input character
  const getReplacementChar = (
    charString: string,
    inputChar: string
  ): string => {
    // If starts with "!", use special mode
    if (charString.startsWith('!')) {
      // Remove the "!" prefix
      const pattern = charString.substring(1);
      if (pattern === 'ASCII') {
        // Use the input character itself
        return inputChar;
      } else if (pattern.length > 0) {
        // Randomly pick from the pattern characters (e.g., "!&@#" randomly picks from "&@#")
        return getRandomChar(pattern);
      }
      // If just "!" with no pattern, treat as regular character
    }
    // Otherwise, use random selection for multi-character strings
    return getRandomChar(charString);
  };

  // Split text into sections (words)
  const words = textToUse.split(/\s+/).filter(word => word.length > 0);
  const allAsciiLines: string[] = [];

  // Process each word as a separate section
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex].toUpperCase();
    const lines: string[] = [];

    // Initialize lines array for this word
    for (let i = 0; i < MAX_HEIGHT; i++) {
      lines[i] = '';
    }

    // Process each character in the word
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const pattern = ASCII_PATTERNS[char] || ASCII_PATTERNS[' '];

      // Add each line of the pattern
      for (let j = 0; j < MAX_HEIGHT; j++) {
        let patternLine = pattern[j] || '';

        // Replace characters
        patternLine = patternLine.replace(/\//g, () => getReplacementChar(slashChar, char));
        patternLine = patternLine.replace(/=/g, () => getReplacementChar(equalsChar, char));
        patternLine = patternLine.replace(/ /g, () => getReplacementChar(voidChar, char));

        // Pad the line to fixed width
        const paddedLine = patternLine.padEnd(FIXED_CHAR_WIDTH, getReplacementChar(voidChar, char));
        lines[j] += paddedLine;
        // Add spacing between characters
        if (i < word.length - 1) {
          lines[j] += getReplacementChar(voidChar, char) + getReplacementChar(voidChar, char);
        }
      }
    }

    // Add the ASCII lines for this word
    allAsciiLines.push(...lines);

    // Add spacing between sections (except after the last section)
    if (wordIndex < words.length - 1) {
      allAsciiLines.push('');
    }
  }

  return allAsciiLines;
};
