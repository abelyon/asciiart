import { useState } from 'react';

interface UpdateItem {
  title: string;
  description?: string;
  sectionId: string;
}

interface UpdateSectionProps {
  title: string;
  description?: string;
  sectionId: string;
  defaultOpen?: boolean;
}

const UpdateSection = ({ title, description, sectionId, defaultOpen = false }: UpdateSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const scrollToSection = (targetSectionId: string) => {
    const element = document.getElementById(targetSectionId);
    if (element) {
      // Check if section is closed by looking for content div
      const section = element.closest('.border-2');
      if (section) {
        const contentDiv = section.querySelector('[class*="p-3"]');
        const isOpen = contentDiv !== null;
        
        // If closed, open it first
        if (!isOpen) {
          const toggleButton = section.querySelector('[class*="cursor-pointer"]');
          if (toggleButton) {
            (toggleButton as HTMLElement).click();
            // Wait a bit for the section to open, then scroll
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
            return;
          }
        }
      }
      
      // Scroll to the section
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
          {description && <p className="mb-2">{description}</p>}
          <button
            onClick={() => scrollToSection(sectionId)}
            className="text-green-400 hover:text-green-300 hover:underline transition-colors"
          >
            &gt; Go to documentation section
          </button>
        </div>
      )}
    </div>
  );
};

export const Updates = () => {
  const updates: UpdateItem[] = [
    { 
      title: 'Warning system for unsupported characters', 
      description: 'When copying ASCII art with unsupported characters, a warning toast appears listing which characters are not supported. The copy operation still proceeds, but unsupported characters are replaced with spaces.',
      sectionId: 'copy-options' 
    },
    { 
      title: 'Toast notifications with sound effects', 
      description: 'Stackable toast notifications appear in the top-right corner for success, warning, and error messages. They include sound effects and auto-dismiss after 4 seconds.',
      sectionId: 'ui-features' 
    },
    { 
      title: 'Scroll indicators for horizontal scrolling', 
      description: 'Green gradient shadows appear on the sides of the ASCII art display when content is horizontally scrollable, providing visual feedback to users.',
      sectionId: 'ui-features' 
    },
    { 
      title: 'Enhanced character support', 
      description: 'Added support for additional characters including comma, curly braces, hash, and more. Unsupported characters are automatically replaced with spaces.',
      sectionId: 'supported-characters' 
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {updates.map((update, index) => (
        <UpdateSection
          key={index}
          title={update.title}
          description={update.description}
          sectionId={update.sectionId}
          defaultOpen={false}
        />
      ))}
    </div>
  );
};
