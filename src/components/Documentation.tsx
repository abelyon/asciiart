import { useState } from 'react';
import type { ReactNode } from 'react';

interface DocSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const DocSection = ({ title, children, defaultOpen = false }: DocSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-2 border-gray-600 bg-gray-950 hover:bg-gray-900 transition-colors">
      <div
        className="w-full px-3 sm:px-4 py-2 flex items-center justify-between cursor-pointer"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        <span className="text-xs sm:text-sm text-gray-400">
          &gt; {title}
        </span>
        <span className="text-green-400 text-xs" onClick={() => setIsOpen(!isOpen)}>
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
              <li>• Supported characters: 0-9, A-Z, space, !, ., ?, :, _, -, [, ], &gt;, &lt;, /, =, +</li>
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

          <DocSection title="Copy Options" defaultOpen={true}>
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

          <DocSection title="UI Features" defaultOpen={true}>
            <div className="space-y-2">
              <div>
                <p className="text-green-400 font-semibold">COLLAPSIBLE SECTIONS</p>
                <p className="ml-4">
                  All input sections can be collapsed/expanded. Click the header or [+]/[-] button to toggle.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">INFO TOOLTIPS</p>
                <p className="ml-4">
                  Hover over [?] icons to see detailed information about each feature.
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
                  Use the [+]/[-] button at the bottom to collapse/expand the entire input section.
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

          <DocSection title="Supported Characters" defaultOpen={true}>
            <p className="ml-4">
              Digits: 0-9 | Letters: A-Z | Special: space, !, ., ?, :, _, -, [, ], &gt;, &lt;, /, =, +
            </p>
          </DocSection>
    </div>
  );
};
