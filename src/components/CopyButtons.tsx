import { useToast } from '../hooks/useToast';
import { ToastContainer } from './Toast';
import { validateText } from '../utils/characterValidation';

interface CopyButtonsProps {
  asciiArt: string[];
  asciiArtRef?: React.RefObject<HTMLPreElement | null>;
  imageBgEnabled: boolean;
  imageBgColor: string;
  text: string;
}

export const CopyButtons = ({ asciiArt, asciiArtRef, imageBgEnabled, imageBgColor, text }: CopyButtonsProps) => {
  const { toasts, showToast, hideToast } = useToast();

  const checkAndWarnInvalidChars = (): boolean => {
    const validation = validateText(text);
    if (validation.hasInvalidChars) {
      const invalidCharsStr = validation.invalidChars.join(', ');
      showToast(
        `Unsupported characters detected: ${invalidCharsStr}. These will be replaced with spaces.`,
        'warning'
      );
      return true;
    }
    return false;
  };

  const copyToClipboard = (text: string): Promise<void> => {
    // Try modern Clipboard API first (works best on desktop and modern mobile)
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(() => {
        // If Clipboard API fails, fall through to fallback
        throw new Error('Clipboard API failed');
      });
    }
    
    // Fallback for older browsers, mobile, and chat apps
    return new Promise((resolve, reject) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '0';
      textarea.style.top = '0';
      textarea.style.width = '2em';
      textarea.style.height = '2em';
      textarea.style.padding = '0';
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';
      textarea.style.background = 'transparent';
      textarea.style.opacity = '0';
      textarea.style.zIndex = '-1';
      textarea.setAttribute('readonly', '');
      textarea.setAttribute('aria-hidden', 'true');
      
      document.body.appendChild(textarea);
      
      // For iOS and some mobile browsers
      if (navigator.userAgent.match(/ipad|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(textarea);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        textarea.setSelectionRange(0, 999999);
      } else {
        textarea.select();
        textarea.setSelectionRange(0, 999999);
      }
      
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) {
          resolve();
        } else {
          reject(new Error('Copy command failed'));
        }
      } catch (err) {
        document.body.removeChild(textarea);
        reject(err);
      }
    });
  };

  const handleCopy = () => {
    checkAndWarnInvalidChars();
    const textToCopy = asciiArt.join('\n');
    copyToClipboard(textToCopy).then(() => {
      showToast('ASCII art copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy. Please try again.', 'error');
    });
  };

  const handleCopyDiscord = () => {
    checkAndWarnInvalidChars();
    // For chat apps, use code block format to preserve spacing
    const textToCopy = '```\n' + asciiArt.join('\n') + '\n```';
    copyToClipboard(textToCopy).then(() => {
      showToast('ASCII art copied for chat apps!', 'success');
    }).catch(() => {
      showToast('Failed to copy. Please try again.', 'error');
    });
  };

  const handleCopyAsImage = async () => {
    checkAndWarnInvalidChars();
    if (!asciiArtRef?.current) {
      showToast('Failed to copy image. Element not found.', 'error');
      return;
    }

    try {
      const preElement = asciiArtRef.current;
      const style = window.getComputedStyle(preElement);
      
      // Create a temporary pre element with exact same styling
      const tempPre = document.createElement('pre');
      tempPre.textContent = asciiArt.join('\n');
      tempPre.style.position = 'absolute';
      tempPre.style.left = '-9999px';
      tempPre.style.top = '-9999px';
      tempPre.style.fontFamily = style.fontFamily;
      tempPre.style.fontSize = style.fontSize;
      tempPre.style.color = style.color;
      tempPre.style.backgroundColor = style.backgroundColor || '#000000';
      tempPre.style.lineHeight = style.lineHeight;
      tempPre.style.whiteSpace = 'pre';
      tempPre.style.padding = style.padding;
      tempPre.style.margin = '0';
      document.body.appendChild(tempPre);

      // Get dimensions
      const width = tempPre.scrollWidth;
      const height = tempPre.scrollHeight;

      // Create canvas with higher resolution (3x scale for better quality)
      const scale = 6;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: false });
      if (!ctx) {
        document.body.removeChild(tempPre);
        throw new Error('Canvas context not available');
      }

      // Set canvas size with padding and scale
      const padding = 20;
      canvas.width = (width + padding * 2) * scale;
      canvas.height = (height + padding * 2) * scale;

      // Scale the context for high resolution
      ctx.scale(scale, scale);

      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Set background (use user settings or fallback to element style)
      const bgColor = imageBgEnabled ? imageBgColor : 'transparent';
      if (bgColor !== 'transparent' && bgColor !== '') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
      }
      // If transparent, canvas will have transparent background by default

      // Parse font size and scale it
      const fontSize = parseFloat(style.fontSize) || 14;
      const scaledFontSize = fontSize;

      // Set text style with scaled font
      ctx.fillStyle = style.color || '#4ade80';
      ctx.font = `${scaledFontSize}px ${style.fontFamily}`;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';

      // Draw text line by line
      const lines = asciiArt;
      const lineHeight = parseFloat(style.lineHeight) || fontSize;
      lines.forEach((line, index) => {
        ctx.fillText(line, padding, padding + index * lineHeight);
      });

      // Clean up
      document.body.removeChild(tempPre);

      // Convert to blob and copy (use PNG to support transparency)
      canvas.toBlob(async (blob) => {
        if (!blob) {
          showToast('Failed to create image.', 'error');
          return;
        }

        try {
          // Try modern Clipboard API with image support
          if (navigator.clipboard && navigator.clipboard.write && window.isSecureContext) {
            try {
              // Check if ClipboardItem is supported
              if (typeof ClipboardItem !== 'undefined') {
                const item = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([item]);
                showToast('ASCII art copied as image!', 'success');
                return;
              }
            } catch (clipboardErr) {
              // ClipboardItem might not be supported, fall through to download
              console.log('ClipboardItem not supported, using download fallback');
            }
          }
          
          // Fallback for mobile and browsers without image clipboard support
          // Create a temporary link and trigger download
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          const timestamp = new Date().getTime();
          link.download = `${timestamp}_ascii-art.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up after a delay
          setTimeout(() => {
            URL.revokeObjectURL(url);
          }, 100);
          
          showToast('Image ready! Check your downloads or share menu.', 'success');
        } catch (err) {
          // Final fallback: try to open image in new tab for manual copy
          try {
            const url = URL.createObjectURL(blob);
            const img = document.createElement('img');
            img.src = url;
            img.style.position = 'fixed';
            img.style.left = '-9999px';
            document.body.appendChild(img);
            
            // Try to select and copy (for some mobile browsers)
            setTimeout(() => {
              document.body.removeChild(img);
              URL.revokeObjectURL(url);
            }, 100);
            
            showToast('Image created. Use long-press to save or share.', 'success');
          } catch (finalErr) {
            showToast('Failed to copy image. Please try again.', 'error');
          }
        }
      }, 'image/png');
    } catch (err) {
      showToast('Failed to copy image. Please try again.', 'error');
    }
  };

  return (
    <>
      <div className="mt-2 space-y-2">
        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
          <button
            onClick={handleCopy}
            className="px-3 sm:px-4 py-1.5 bg-black border-2 border-gray-600 hover:border-green-500 hover:bg-gray-900 text-green-400 text-xs sm:text-sm transition-all"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            [COPY]
          </button>
          <button
            onClick={handleCopyDiscord}
            className="px-3 sm:px-4 py-1.5 bg-black border-2 border-gray-600 hover:border-green-500 hover:bg-gray-900 text-green-400 text-xs sm:text-sm transition-all"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            [COPY FOR CHAT]
          </button>
          <button
            onClick={handleCopyAsImage}
            className="px-3 sm:px-4 py-1.5 bg-black border-2 border-gray-600 hover:border-green-500 hover:bg-gray-900 text-green-400 text-xs sm:text-sm transition-all"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            [DOWNLOAD AS IMAGE]
          </button>
        </div>
      </div>
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </>
  );
};
