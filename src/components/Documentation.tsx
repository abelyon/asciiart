import { useState, useRef } from 'react';
import type { ReactNode } from 'react';

interface DocSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

const DocSection = ({ title, children, defaultOpen = false, id }: DocSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} id={id} className="border-2 border-gray-600 bg-gray-950 hover:bg-gray-900 transition-colors">
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


export const Documentation = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
          <DocSection title="Overview" defaultOpen={true}>
            <p>
              ASCII Art Generator converts text into blocky, retro-style ASCII art characters. 
              You can customize the characters used, export as text or images, and use various 
              advanced features for creative ASCII art generation.
            </p>
          </DocSection>

          <DocSection title="Text Input" defaultOpen={true}>
            <p className="text-green-400 font-semibold mb-2">ENTER TEXT (MULTI-LINE SUPPORTED)</p>
            <ul className="list-none space-y-1 ml-4">
              <li>• Enter the text you want to convert to ASCII art</li>
              <li>• Press Enter for a new line (supports multi-line input)</li>
              <li>• Supported characters: 0-9, A-Z, space, !, ., comma, ?, :, _, -, [, ], {'{'}, {'}'}, /, =, +, #, &lt;, &gt;</li>
              <li>• Empty input shows default "ASCII ART" example</li>
            </ul>
          </DocSection>

          <DocSection title="Character Inputs" defaultOpen={true}>
            <div className="space-y-3">
              <div>
                <p className="text-green-400 font-semibold">SLASH CHARACTER (/)</p>
                <p className="ml-4">Replaces all '/' characters in the ASCII patterns.</p>
                <p className="ml-4 text-gray-500">Presets: /, ALPHA, |, #, *, &@#</p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">EQUALS CHARACTER (=)</p>
                <p className="ml-4">Replaces all '=' characters in the ASCII patterns.</p>
                <p className="ml-4 text-gray-500">Presets: =, Space, -, _, #</p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">VOID CHARACTER (spaces)</p>
                <p className="ml-4">Replaces all space characters (background/void areas).</p>
                <p className="ml-4 text-gray-500">Presets: Space, ., ·, _, *</p>
              </div>
            </div>
          </DocSection>

          <DocSection title="Advanced Features" defaultOpen={true}>
            <div className="space-y-3">
              <div>
                <p className="text-green-400 font-semibold">MULTIPLE CHARACTERS (RANDOMIZATION)</p>
                <p className="ml-4">
                  Enter multiple characters like "&@#" to randomly select from them for each position. 
                  This creates varied, randomized ASCII art patterns.
                </p>
                <p className="ml-4 text-gray-500">Example: Set Slash Character to "&@#" for random selection</p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">!ALPHA MODE</p>
                <p className="ml-4">
                  Set any character input to "!ALPHA" to use the input letter itself. 
                  Each letter in your text will be built using its own character.
                </p>
                <p className="ml-4 text-gray-500">Example: Input "HELLO" with !ALPHA → H uses 'H', E uses 'E', etc.</p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">WHITESPACE REMOVAL</p>
                <p className="ml-4">
                  All whitespaces are automatically removed from character inputs. 
                  Type " &@ #" and it becomes "&@#" automatically.
                </p>
              </div>
            </div>
          </DocSection>

          <DocSection title="Copy Options" defaultOpen={true} id="copy-options">
            <div className="space-y-2">
              <div>
                <p className="text-green-400 font-semibold">COPY</p>
                <p className="ml-4">Copies the ASCII art as plain text to clipboard.</p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">COPY FOR CHAT</p>
                <p className="ml-4">
                  Copies the ASCII art wrapped in code blocks (```) for Discord and other chat apps. 
                  Preserves formatting and spacing.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">DOWNLOAD AS IMAGE</p>
                <p className="ml-4">
                  Exports the ASCII art as a high-resolution PNG image (6x scale). 
                  Works on desktop and mobile devices.
                </p>
                <p className="ml-4 text-gray-500">
                  • Desktop: Copies to clipboard if supported, otherwise downloads
                </p>
                <p className="ml-4 text-gray-500">
                  • Mobile: Downloads the image (check downloads folder)
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">WARNING SYSTEM</p>
                <p className="ml-4">
                  When copying with unsupported characters in your input, a warning toast will appear 
                  listing which characters are not supported. The copy operation still proceeds, but 
                  unsupported characters are replaced with spaces in the ASCII art.
                </p>
              </div>
            </div>
          </DocSection>

          <DocSection title="Image Settings" defaultOpen={true}>
            <div className="space-y-2">
              <div>
                <p className="text-green-400 font-semibold">BACKGROUND TOGGLE</p>
                <p className="ml-4">
                  Enable/disable background for exported images. When disabled, images have transparent background.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">BACKGROUND COLOR</p>
                <p className="ml-4">
                  Customize the background color using the color picker or enter a hex code. 
                  Defaults to gray-950 (#030712) when enabled.
                </p>
              </div>
            </div>
          </DocSection>

          <DocSection title="UI Features" defaultOpen={true} id="ui-features">
            <div className="space-y-2">
              <div>
                <p className="text-green-400 font-semibold">COLLAPSIBLE SECTIONS</p>
                <p className="ml-4">
                  All input sections can be collapsed/expanded. Click the header or [+]/[-] button to toggle. 
                  Sections are designed to be compact and space-efficient for maximum preview visibility.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">INFO TOOLTIPS</p>
                <p className="ml-4">
                  Hover over [?] icons to see detailed information about each feature.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">TOAST NOTIFICATIONS</p>
                <p className="ml-4">
                  Stackable toast notifications appear in the top-right corner for success, warning, and error messages. 
                  They include sound effects and auto-dismiss after 4 seconds.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">UPDATES SECTION</p>
                <p className="ml-4">
                  The Updates section at the top of the documentation page lists the latest features and changes. 
                  Each update is displayed as a collapsible section with a description and a link to navigate to the 
                  relevant documentation section.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">RESPONSIVE DESIGN</p>
                <p className="ml-4">
                  Fully responsive layout that adapts to mobile, tablet, and desktop screens.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">INPUT SECTION TOGGLE</p>
                <p className="ml-4">
                  Double-click anywhere on the page (except inside the input section) to toggle the input section visibility. 
                  The instruction text at the bottom shows the current action.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">SCROLL INDICATORS</p>
                <p className="ml-4">
                  Green gradient shadows appear on the sides of the ASCII art display when content is horizontally scrollable.
                </p>
              </div>
            </div>
          </DocSection>

          <DocSection title="Tips & Tricks" defaultOpen={true}>
            <ul className="list-none space-y-1 ml-4">
              <li>• Use "&@#" for randomized patterns - each position randomly picks from the set</li>
              <li>• Use "!ALPHA" to make each letter use itself (great for colorful text)</li>
              <li>• Combine features: Use !ALPHA for slash and &@# for equals for unique effects</li>
              <li>• Multi-line input: Press Enter to create line breaks in your ASCII art</li>
              <li>• Image export: Disable background for transparent images perfect for overlays</li>
              <li>• Mobile: Images download automatically - check your downloads folder</li>
              <li>• Chat apps: Use "Copy for Chat" for best formatting in Discord, Slack, etc.</li>
            </ul>
          </DocSection>

          <DocSection title="Supported Characters" defaultOpen={true} id="supported-characters">
            <p className="ml-4">
              Digits: 0-9 | Letters: A-Z | Special: space, !, ., comma, ?, :, _, -, [, ], {'{'}, {'}'}, /, =, +, #, &lt;, &gt;
            </p>
            <p className="ml-4 mt-2 text-gray-500">
              Note: Unsupported characters will be replaced with spaces. A warning toast will appear when copying with unsupported characters.
            </p>
          </DocSection>
    </div>
  );
};
