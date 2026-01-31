import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = forwardRef<HTMLElement>((props, ref) => {
  const location = useLocation();
  const isDocPage = location.pathname === '/doc';

  return (
    <nav ref={ref} className="fixed top-0 left-0 right-0 w-full border-b-2 border-gray-800 bg-gray-950 z-50" style={{ backgroundColor: '#030712' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-green-400 text-sm sm:text-base hover:text-green-300 transition-colors"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          [ASCII ART GENERATOR]
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className={`px-3 sm:px-4 py-2 bg-black border-2 text-xs sm:text-sm transition-all ${
              !isDocPage
                ? 'border-green-500 text-green-400'
                : 'border-gray-600 text-gray-400 hover:border-gray-500'
            }`}
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            [HOME]
          </Link>
          <Link
            to="/doc"
            className={`px-3 sm:px-4 py-2 bg-black border-2 text-xs sm:text-sm transition-all ${
              isDocPage
                ? 'border-green-500 text-green-400'
                : 'border-gray-600 text-gray-400 hover:border-gray-500'
            }`}
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            [DOC]
          </Link>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
