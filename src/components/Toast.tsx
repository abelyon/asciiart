import { useEffect, useState, useRef } from 'react';
import { playSound } from '../utils/soundEffects';

interface ToastProps {
  id: string;
  message: string;
  onClose: (id: string) => void;
  type?: 'success' | 'error';
}

export const Toast = ({ id, message, onClose, type = 'success' }: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundPlayedRef = useRef(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => {
      setIsVisible(true);
      // Play sound effect when toast appears
      if (!soundPlayedRef.current) {
        playSound(type);
        soundPlayedRef.current = true;
      }
    });

    // Auto-dismiss after 3 seconds
    timeoutRef.current = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  const handleClose = () => {
    if (isExiting) return; // Prevent double-triggering
    
    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(() => {
      onClose(id);
    }, 350); // Slightly longer than animation for smooth transition
  };

  return (
    <div
      className={`toast-wrapper ${isVisible && !isExiting ? 'toast-enter' : ''} ${isExiting ? 'toast-exit' : ''}`}
    >
      <div
        className={`px-4 sm:px-6 py-3 sm:py-4 border-2 min-w-[280px] sm:min-w-[300px] max-w-[calc(100vw-2rem)] ${
          type === 'success'
            ? 'bg-black border-green-500 text-green-400'
            : 'bg-black border-red-600 text-red-400'
        }`}
        style={{ fontFamily: 'var(--font-space-mono)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs sm:text-sm">[{type === 'success' ? 'OK' : 'ERROR'}] {message}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type?: 'success' | 'error' }>;
  onClose: (id: string) => void;
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 flex flex-col gap-2 sm:gap-3 max-w-[calc(100vw-1rem)] sm:max-w-none">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={onClose}
        />
      ))}
    </div>
  );
};
