import { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { TextInput } from './components/TextInput';
import { CharacterInputs } from './components/CharacterInputs';
import { AsciiArtDisplay } from './components/AsciiArtDisplay';
import { CopyButtons } from './components/CopyButtons';
import { generateAsciiArt } from './utils/asciiGenerator';

const App = () => {
  const [asciiArt, setAsciiArt] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [slashChar, setSlashChar] = useState('/'); // Character for / elements
  const [equalsChar, setEqualsChar] = useState('='); // Character for = elements
  const [voidChar, setVoidChar] = useState(' '); // Character for void/background (spaces)
  const [isInputSectionOpen, setIsInputSectionOpen] = useState(true);
  const [imageBgEnabled, setImageBgEnabled] = useState(false);
  const [imageBgColor, setImageBgColor] = useState('#030712'); // gray-950
  const asciiArtRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    // Show "ASCII\nART" if text is empty, otherwise show user's input
    const displayText = text.trim() || 'ASCII\nART';
    const result = generateAsciiArt(displayText, slashChar, equalsChar, voidChar);
    setAsciiArt(result);
  }, [text, slashChar, equalsChar, voidChar]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking inside the input section
    const target = e.target as HTMLElement;
    const inputSection = target.closest('.input-section');
    if (!inputSection) {
      setIsInputSectionOpen(!isInputSectionOpen);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col" onDoubleClick={handleDoubleClick}>
        {/* Output at the top - fixed */}
        <div className="w-full border-gray-800" style={{ padding: 'clamp(0.75rem, 3vw, 1.5rem)' }}>
        <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6">
          <AsciiArtDisplay ref={asciiArtRef} asciiArt={asciiArt} isTitle={true} isCentered={!text.trim()} />
        </div>
      </div>

      {/* Spacer to push input section down */}
      <div className="flex-1"></div>

      {/* Input section - sticky at bottom */}
      <div className="sticky bottom-0 border-gray-800 input-section">
        {/* Instruction text */}
        <div className="w-full flex justify-center px-3 py-2 border-b-2 border-gray-800">
          <p className="text-gray-500 text-xs text-center" style={{ fontFamily: 'var(--font-space-mono)' }}>
            Double click anywhere to {isInputSectionOpen ? 'hide' : 'show'} input section
          </p>
        </div>
        
        {/* Input content */}
        {isInputSectionOpen && (
          <div className="p-3 sm:p-4 bg-gray-950">
            <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3">
              <TextInput 
                text={text} 
                onTextChange={setText}
                info="Enter the text you want to convert to ASCII art. Supports multiple lines - press Enter for a new line. Supported characters: 0-9, A-Z, space, !, ., and ?"
              />
              <CharacterInputs
                slashChar={slashChar}
                equalsChar={equalsChar}
                voidChar={voidChar}
                onSlashCharChange={setSlashChar}
                onEqualsCharChange={setEqualsChar}
                onVoidCharChange={setVoidChar}
                imageBgEnabled={imageBgEnabled}
                imageBgColor={imageBgColor}
                onImageBgEnabledChange={setImageBgEnabled}
                onImageBgColorChange={setImageBgColor}
              />
              <CopyButtons 
                asciiArt={asciiArt} 
                asciiArtRef={asciiArtRef}
                imageBgEnabled={imageBgEnabled}
                imageBgColor={imageBgColor}
              />
              <div className="text-gray-600 text-xs text-center px-2 pt-1" style={{ fontFamily: 'var(--font-space-mono)' }}>
                <p>&gt; Supported characters: 0-9, A-Z, space, !, ., and ?</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </Layout>
  );
};

export default App;
