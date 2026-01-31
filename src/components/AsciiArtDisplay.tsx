import { forwardRef } from 'react';

interface AsciiArtDisplayProps {
  asciiArt: string[];
  isTitle?: boolean;
  isCentered?: boolean;
}

export const AsciiArtDisplay = forwardRef<HTMLPreElement, AsciiArtDisplayProps>(
  ({ asciiArt, isTitle = false, isCentered = false }, ref) => {
    if (asciiArt.length === 0) {
      return null;
    }

    if (isTitle) {
      return (
        <div className={`w-full ${isCentered ? 'text-center' : 'text-left'}`}>
          <pre 
            ref={ref}
            className="text-green-400 leading-tight whitespace-pre overflow-x-auto font-mono w-full" 
            style={{
              fontSize: 'clamp(6px, 1.5vw, 16px)',
              lineHeight: '1.1'
            }}>
            {asciiArt.join('\n')}
          </pre>
        </div>
      );
    }

    return (
      <div className="bg-black text-start border-2 border-gray-600 overflow-x-auto w-full" 
        style={{
          padding: 'clamp(0.5rem, 2vw, 1.5rem)'
        }}>
        <pre 
          ref={ref}
          className="text-green-400 leading-tight whitespace-pre font-mono w-full"
          style={{
            fontSize: 'clamp(10px, 2vw, 16px)',
            lineHeight: '1.2'
          }}>
          {asciiArt.join('\n')}
        </pre>
      </div>
    );
  }
);
