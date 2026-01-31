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

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        {/* Output at the top - fixed */}
        <div className="w-full border-gray-800" style={{ padding: 'clamp(0.75rem, 3vw, 1.5rem)' }}>
        <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6">
          <AsciiArtDisplay ref={asciiArtRef} asciiArt={asciiArt} isTitle={true} isCentered={!text.trim()} />
        </div>
      </div>

      {/* Spacer to push input section down */}
      <div className="flex-1"></div>

      {/* Input section - sticky at bottom */}
      <div className="sticky bottom-0 border-gray-800">
        {/* Toggle button */}
        <div className="w-full flex justify-end px-4 py-4 border-b-2 border-gray-800">
          <button
            onClick={() => setIsInputSectionOpen(!isInputSectionOpen)}
            className="px-4 py-2 bg-black border-2 border-gray-600 hover:border-green-500 hover:bg-gray-900 text-green-400 text-sm sm:text-base transition-all"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            [{isInputSectionOpen ? '+' : '-'}]
          </button>
        </div>
        
        {/* Input content */}
        {isInputSectionOpen && (
          <div className="p-4 sm:p-6 bg-gray-950">
            <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
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
              <div className="text-gray-600 text-xs sm:text-sm text-center px-4 pt-2" style={{ fontFamily: 'var(--font-space-mono)' }}>
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
