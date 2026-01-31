import { useState } from 'react';

interface ImageSettingsProps {
  imageBgEnabled: boolean;
  imageBgColor: string;
  onBgEnabledChange: (enabled: boolean) => void;
  onBgColorChange: (color: string) => void;
  info?: string;
}

export const ImageSettings = ({
  imageBgEnabled,
  imageBgColor,
  onBgEnabledChange,
  onBgColorChange,
  info,
}: ImageSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-gray-600 bg-gray-950 self-start group hover:bg-gray-900 transition-colors">
      <div
        className="w-full px-3 sm:px-4 py-2 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-400" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            &gt; Image Settings
          </span>
          {info && (
            <div className="relative info-group">
              <span className="text-green-400 text-xs cursor-help hover:text-green-300 transition-colors align-middle">[?]</span>
              <div className="info-tooltip absolute left-0 transform -translate-x-1/2 bottom-full mb-2 hidden z-50 w-[280px] max-w-[calc(100vw-1rem)] p-2 sm:p-3 bg-black border-2 border-green-500 text-green-400 text-[10px] sm:text-xs whitespace-normal shadow-lg" style={{ fontFamily: 'var(--font-space-mono)' }}>
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
        <div className="p-3 sm:p-4 pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-xs sm:text-sm text-gray-400 flex items-center gap-2 cursor-pointer" style={{ fontFamily: 'var(--font-space-mono)' }}>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={imageBgEnabled}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      onBgEnabledChange(checked);
                      // Set default color to gray-950 when enabling background
                      if (checked) {
                        onBgColorChange('#030712'); // gray-950
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                    imageBgEnabled 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-700 bg-black'
                  }`}>
                    {imageBgEnabled && (
                      <span className="text-black text-xs font-bold">[X]</span>
                    )}
                  </div>
                </div>
                Background
              </label>
            </div>
            {imageBgEnabled && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <label className="text-xs sm:text-sm text-gray-400" style={{ fontFamily: 'var(--font-space-mono)' }}>
                  Color:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={imageBgColor}
                    onChange={(e) => onBgColorChange(e.target.value)}
                    className="w-12 h-8 bg-black border-2 border-gray-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={imageBgColor}
                    onChange={(e) => onBgColorChange(e.target.value)}
                    placeholder="#000000"
                    className="px-2 py-1 bg-black border-2 border-gray-700 text-green-400 text-xs focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    style={{ fontFamily: 'var(--font-space-mono)' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
