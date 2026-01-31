import type { ReactNode } from 'react';
import { useRef, useEffect, useState } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navbarRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(60);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <Navbar ref={navbarRef} />
      <div style={{ paddingTop: `${navbarHeight}px` }}>
        {children}
      </div>
    </div>
  );
};
