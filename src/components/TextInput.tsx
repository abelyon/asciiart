import { useState } from 'react';

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  info?: string;
}

export const TextInput = ({ text, onTextChange, info }: TextInputProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-2 border-gray-600 bg-gray-950 hover:bg-gray-900 transition-colors">
      <div
        className="w-full px-2 sm:px-3 py-1.5 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-400" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            &gt; Enter Text (Multi-line supported)
          </span>
          {info && (
            <div className="relative info-group">
              <span className="text-green-400 text-xs cursor-help hover:text-green-300 transition-colors">[?]</span>
              <div className="info-tooltip absolute -right-29 sm:left-0 bottom-full mb-2 hidden z-50 w-[calc(100vw-2rem)] sm:w-[280px] md:w-[320px] max-w-[calc(100vw-1rem)] p-2 sm:p-3 bg-black border-2 border-green-500 text-green-400 text-[10px] sm:text-xs whitespace-normal shadow-lg" style={{ fontFamily: 'var(--font-space-mono)' }}>
                {info}
              </div>
            </div>
          )}
        </div>
        <span className="text-green-400 text-xs cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          [{isOpen ? '-' : '+'}]
        </span>
      </div>
      {isOpen && (
        <div className="p-2 sm:p-3 pt-0">
          <textarea
            placeholder="Enter text (e.g., 'ASCII ART' or multiple lines)"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            onFocus={(e) => {
              if (!isOpen) {
                setIsOpen(true);
              }
              setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
              }, 300);
            }}
            rows={3}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-black border-2 border-gray-700 text-green-400 text-sm sm:text-base focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-y"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          />
          <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'var(--font-space-mono)' }}>[Press Enter for a new line]</p>
        </div>
      )}
    </div>
  );
};
