## Documentation

### Overview

ASCII Art Generator converts text into blocky, retro-style ASCII art characters. You can customize the characters used, export as text or images, and use various advanced features for creative ASCII art generation.

### Text Input

**Enter Text (Multi-line supported)**

- Enter the text you want to convert to ASCII art
- Press Enter for a new line (supports multi-line input)
- Supported characters: 0-9, A-Z, space, !, ., ,, ?, :, _, -, [, ], {, }, /, =, +, #, <, >
- Empty input shows default "ASCII ART" example

### Character Inputs

**Slash Character (/)**

- Replaces all '/' characters in the ASCII patterns.
- Presets: /, ALPHA, |, #, *, &@#

**Equals Character (=)**

- Replaces all '=' characters in the ASCII patterns.
- Presets: =, Space, -, _, #

**Void Character (spaces)**

- Replaces all space characters (background/void areas).
- Presets: Space, ., ·, _, *

### Advanced Features

**Multiple Characters (Randomization)**

- Enter multiple characters like "&@#" to randomly select from them for each position. This creates varied, randomized ASCII art patterns.
- Example: Set Slash Character to "&@#" for random selection

**!ALPHA Mode**

- Set any character input to "!ALPHA" to use the input letter itself. Each letter in your text will be built using its own character.
- Example: Input "HELLO" with !ALPHA → H uses 'H', E uses 'E', etc.

**Whitespace Removal**

- All whitespaces are automatically removed from character inputs. Type " &@ #" and it becomes "&@#" automatically.

### Copy Options

**COPY**

- Copies the ASCII art as plain text to clipboard.

**COPY FOR CHAT**

- Copies the ASCII art wrapped in code blocks (```) for Discord and other chat apps. Preserves formatting and spacing.

**DOWNLOAD AS IMAGE**

- Exports the ASCII art as a high-resolution PNG image (6x scale). Works on desktop and mobile devices.
- Desktop: Copies to clipboard if supported, otherwise downloads
- Mobile: Downloads the image (check downloads folder)

**WARNING SYSTEM**

- When copying with unsupported characters in your input, a warning toast will appear listing which characters are not supported. The copy operation still proceeds, but unsupported characters are replaced with spaces in the ASCII art.

### Image Settings

**Background Toggle**

- Enable/disable background for exported images. When disabled, images have transparent background.

**Background Color**

- Customize the background color using the color picker or enter a hex code. Defaults to gray-950 (#030712) when enabled.

### UI Features

**Collapsible Sections**

- All input sections can be collapsed/expanded. Click the header or [+]/[-] button to toggle. Sections are designed to be compact and space-efficient for maximum preview visibility.

**Info Tooltips**

- Hover over [?] icons to see detailed information about each feature.

**Toast Notifications**

- Stackable toast notifications appear in the top-right corner for success, warning, and error messages. They include sound effects and auto-dismiss after 4 seconds.

**Responsive Design**

- Fully responsive layout that adapts to mobile, tablet, and desktop screens.

**Input Section Toggle**

- Double-click anywhere on the page (except inside the input section) to toggle the input section visibility. The instruction text at the bottom shows the current action.

**Updates Section**

- The Updates section at the top of the documentation page lists the latest features and changes. Each update is displayed as a collapsible section with a description and a link to navigate to the relevant documentation section.

**Scroll Indicators**

- Green gradient shadows appear on the sides of the ASCII art display when content is horizontally scrollable.

### Tips & Tricks

- Use "&@#" for randomized patterns - each position randomly picks from the set
- Use "!ALPHA" to make each letter use itself (great for colorful text)
- Combine features: Use !ALPHA for slash and &@# for equals for unique effects
- Multi-line input: Press Enter to create line breaks in your ASCII art
- Image export: Disable background for transparent images perfect for overlays
- Mobile: Images download automatically - check your downloads folder
- Chat apps: Use "Copy for Chat" for best formatting in Discord, Slack, etc.

### Supported Characters

Digits: 0-9 | Letters: A-Z | Special: space, !, ., ,, ?, :, _, -, [, ], {, }, /, =, +, #, <, >

Note: Unsupported characters will be replaced with spaces. A warning toast will appear when copying with unsupported characters.
