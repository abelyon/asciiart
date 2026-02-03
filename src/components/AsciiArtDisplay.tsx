import { forwardRef, useState, useEffect, useRef } from 'react';

interface AsciiArtDisplayProps {
  asciiArt: string[];
  isTitle?: boolean;
  isCentered?: boolean;
}

export const AsciiArtDisplay = forwardRef<HTMLPreElement, AsciiArtDisplayProps>(
  ({ asciiArt, isTitle = false, isCentered = false }, ref) => {
    const [scrollClasses, setScrollClasses] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const checkScroll = () => {
      if (!containerRef.current) return;
      const element = containerRef.current.querySelector('pre');
      if (!element) return;

      const { scrollLeft, scrollWidth, clientWidth } = element;
      let classes = 'scroll-shadow-container';
      
      if (scrollLeft > 0) {
        classes += ' scrollable-left';
      }
      if (scrollLeft < scrollWidth - clientWidth - 1) {
        classes += ' scrollable-right';
      }
      
      setScrollClasses(classes);
    };

    useEffect(() => {
      checkScroll();
      const element = containerRef.current?.querySelector('pre');
      if (element) {
        element.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        return () => {
          element.removeEventListener('scroll', checkScroll);
          window.removeEventListener('resize', checkScroll);
        };
      }
    }, [asciiArt]);

    if (asciiArt.length === 0) {
      return null;
    }

    if (isTitle) {
      return (
        <div ref={containerRef} className={`w-full ${isCentered ? 'text-center' : 'text-left'} ${scrollClasses}`}>
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
      <div ref={containerRef} className={`bg-black text-start border-2 border-gray-600 overflow-x-auto w-full ${scrollClasses}`}
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
