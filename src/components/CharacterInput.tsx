import { useState } from 'react';

interface CharacterInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  placeholder: string;
  presets: { label: string; value: string }[];
  description: string;
  defaultValue: string;
  info?: string;
}

export const CharacterInput = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  presets,
  description,
  defaultValue,
  info,
}: CharacterInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-gray-600 bg-gray-950 self-start group hover:bg-gray-900 transition-colors">
      <div
        className="w-full px-2 sm:px-3 py-1.5 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-400" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            &gt; {label}
          </span>
          {info && (
            <div className="relative info-group">
              <span className="text-green-400 text-xs cursor-help hover:text-green-300 transition-colors align-middle">[?]</span>
              <div className="info-tooltip absolute left-2 transform -translate-x-1/2 bottom-full mb-2 hidden z-50 w-[280px] max-w-[calc(100vw-1rem)] p-2 sm:p-3 bg-black border-2 border-green-500 text-green-400 text-[10px] sm:text-xs whitespace-normal shadow-lg" style={{ fontFamily: 'var(--font-space-mono)' }}>
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
          <input
            type="text"
            value={value === ' ' ? ' ' : value}
            onChange={(e) => {
              let val = e.target.value;
              if (val === ' ') {
                onChange(val);
              } else {
                val = val.replace(/\s/g, '');
                onChange(val);
              }
            }}
            onFocus={(e) => {
              // Ensure section is open
              if (!isOpen) {
                setIsOpen(true);
              }
              // Scroll input into view when keyboard appears on mobile/tablet
              setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
              }, 300);
            }}
            onBlur={(e) => {
              let val = e.target.value;
              if (val !== ' ') {
                val = val.replace(/\s/g, '');
              }
              if (!val || val === '') {
                onBlur?.(defaultValue);
              } else if (val !== e.target.value) {
                onChange(val);
              }
            }}
            placeholder={placeholder}
            className="w-full px-2 sm:px-3 py-1.5 bg-black border-2 border-gray-700 text-green-400 text-sm sm:text-base focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          />
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {presets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => onChange(preset.value)}
                className="px-1.5 py-0.5 text-xs bg-gray-900 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-colors"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'var(--font-space-mono)' }}>[{description}]</p>
        </div>
      )}
    </div>
  );
};
