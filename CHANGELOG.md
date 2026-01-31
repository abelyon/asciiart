# Changelog

All notable changes to the ASCII Art Generator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Documentation page at `/doc` route with comprehensive feature explanations
- Navbar with fixed positioning and navigation between Home and Documentation
- Layout component for consistent page structure and navbar spacing
- Space Grotesk font for titles and Space Mono font for body text throughout the app
- Collapsible documentation sections with smooth scroll-to-view functionality
- Responsive design improvements for mobile, tablet, and desktop

### Changed
- Refactored documentation component to match app's terminal aesthetic
- Updated typography system to use Space Grotesk (titles) and Space Mono (text)
- Improved navbar spacing and fixed positioning to prevent content overlap
- Enhanced documentation sections with consistent styling and collapsible behavior

### Fixed
- Navbar now properly calculates height dynamically to prevent content hiding
- Documentation sections properly styled to match the rest of the application

## [1.0.0] - Initial Release

### Features
- Text to ASCII art conversion with customizable characters
- Multi-line text input support
- Character customization (Slash, Equals, Void characters)
- Advanced features:
  - Multiple character randomization (e.g., `&@#`)
  - !ALPHA mode for letter-specific ASCII art
  - Automatic whitespace removal
- Copy options:
  - Plain text copy
  - Copy for chat apps (Discord, Slack, etc.) with code blocks
  - Download as high-resolution PNG image
- Image export settings:
  - Background toggle (transparent or colored)
  - Custom background color picker
- UI features:
  - Collapsible input sections
  - Info tooltips with hover functionality
  - Toast notifications with sound effects
  - Responsive design for all screen sizes
  - Input section toggle button
- Supported characters: 0-9, A-Z, space, !, ., ?, :, _, -, [, ], >, <, /, =, +

---

## How to Update This Changelog

When making changes:

1. **Added**: New features
2. **Changed**: Changes in existing functionality
3. **Deprecated**: Soon-to-be removed features
4. **Removed**: Removed features
5. **Fixed**: Bug fixes
6. **Security**: Security fixes

### Example Entry:
```markdown
## [1.1.0] - 2024-01-15

### Added
- New feature description

### Changed
- Improvement description

### Fixed
- Bug fix description
```
