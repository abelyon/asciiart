# ASCII Art Generator

A modern, responsive web application that converts text into blocky, retro-style ASCII art characters. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Text to ASCII Art Conversion**: Convert any text into blocky ASCII art characters
- **Multi-line Support**: Create ASCII art with multiple lines
- **Customizable Characters**: 
  - Slash character (`/`) replacement
  - Equals character (`=`) replacement
  - Void/background character replacement
- **Advanced Features**:
  - Multiple character randomization (e.g., `&@#` randomly selects from the set)
  - `!ALPHA` mode: Each letter uses itself to form its ASCII art
  - Automatic whitespace removal
- **Export Options**:
  - Copy as plain text
  - Copy for chat apps (Discord, Slack, etc.) with code blocks
  - Download as high-resolution PNG image
- **Image Settings**:
  - Toggle background (transparent or colored)
  - Custom background color picker
- **UI Features**:
  - Collapsible input sections
  - Info tooltips with hover functionality
  - Toast notifications with sound effects
  - Fully responsive design
  - Fixed navbar with smooth navigation

## Supported Characters

- Digits: `0-9`
- Letters: `A-Z`
- Special: `space`, `!`, `.`, `?`, `:`, `_`, `-`, `[`, `]`, `>`, `<`, `/`, `=`, `+`

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **React Router** - Client-side routing
- **Space Grotesk & Space Mono** - Typography

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── AsciiArtDisplay.tsx
│   ├── CharacterInput.tsx
│   ├── CharacterInputs.tsx
│   ├── CopyButtons.tsx
│   ├── Documentation.tsx
│   ├── ImageSettings.tsx
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── TextInput.tsx
│   └── Toast.tsx
├── constants/       # Constants and data
│   └── asciiPatterns.ts
├── hooks/          # Custom React hooks
│   └── useToast.ts
├── pages/          # Page components
│   └── DocumentationPage.tsx
├── utils/          # Utility functions
│   ├── asciiGenerator.ts
│   └── soundEffects.ts
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Documentation

Visit `/doc` route in the application for comprehensive documentation of all features.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed list of changes and updates.

## Author

**Your Name**
- GitHub: [@abelyon](https://github.com/abelyon)
- Email: your.email@example.com

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]
