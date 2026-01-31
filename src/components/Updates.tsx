import { useState } from 'react';
import type { ReactNode } from 'react';

interface UpdateSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const UpdateSection = ({ title, children, defaultOpen = false }: UpdateSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-2 border-gray-600 bg-gray-950 hover:bg-gray-900 transition-colors">
      <div
        className="w-full px-3 sm:px-4 py-2 flex items-center justify-between cursor-pointer"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs sm:text-sm text-gray-400">
          &gt; {title}
        </span>
        <span className="text-green-400 text-xs">
          [{isOpen ? '-' : '+'}]
        </span>
      </div>
      {isOpen && (
        <div className="p-3 sm:p-4 pt-0 text-xs sm:text-sm text-gray-300" style={{ fontFamily: 'var(--font-space-mono)' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export const Updates = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <UpdateSection title="Version 1.0.1 - Documentation Page">
        <div className="space-y-4">
          <div>
            <p className="text-green-400 font-semibold mb-2">ADDED</p>
            <ul className="list-none space-y-1 ml-4">
              <li>• Documentation page at /doc route with comprehensive feature explanations</li>
              <li>• Navbar with fixed positioning and navigation between Home and Documentation</li>
              <li>• Layout component for consistent page structure and navbar spacing</li>
              <li>• Space Grotesk font for titles and Space Mono font for body text throughout the app</li>
              <li>• Collapsible documentation sections with smooth scroll-to-view functionality</li>
              <li>• Responsive design improvements for mobile, tablet, and desktop</li>
            </ul>
          </div>

          <div>
            <p className="text-green-400 font-semibold mb-2">CHANGED</p>
            <ul className="list-none space-y-1 ml-4">
              <li>• Refactored documentation component to match app's terminal aesthetic</li>
              <li>• Updated typography system to use Space Grotesk (titles) and Space Mono (text)</li>
              <li>• Improved navbar spacing and fixed positioning to prevent content overlap</li>
              <li>• Enhanced documentation sections with consistent styling and collapsible behavior</li>
            </ul>
          </div>

          <div>
            <p className="text-green-400 font-semibold mb-2">FIXED</p>
            <ul className="list-none space-y-1 ml-4">
              <li>• Navbar now properly calculates height dynamically to prevent content hiding</li>
              <li>• Documentation sections properly styled to match the rest of the application</li>
            </ul>
          </div>
        </div>
      </UpdateSection>

      <UpdateSection title="Version 1.0.0 - Initial Release">
        <div className="space-y-3">
          <div>
            <p className="text-green-400 font-semibold mb-2">FEATURES</p>
            <ul className="list-none space-y-1 ml-4">
              <li>• Text to ASCII art conversion with customizable characters</li>
              <li>• Multi-line text input support</li>
              <li>• Character customization (Slash, Equals, Void characters)</li>
              <li>• Advanced features: Multiple character randomization, !ALPHA mode, Automatic whitespace removal</li>
              <li>• Copy options: Plain text, Copy for chat apps, Download as high-resolution PNG image</li>
              <li>• Image export settings: Background toggle, Custom background color picker</li>
              <li>• UI features: Collapsible input sections, Info tooltips, Toast notifications with sound effects</li>
              <li>• Fully responsive design for all screen sizes</li>
              <li>• Supported characters: 0-9, A-Z, space, !, ., ?, :, _, -, [, ], &gt;, &lt;, /, =, +</li>
            </ul>
          </div>
        </div>
      </UpdateSection>
    </div>
  );
};
