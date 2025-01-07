'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ThemeToggle from '../components/ThemeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [storeMenuTimeout, setStoreMenuTimeout] = useState<NodeJS.Timeout | null>(null); // Tipo corregido

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (storeMenuTimeout) {
      clearTimeout(storeMenuTimeout); // Limpia el timeout si existe
    }
    setIsStoreOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsStoreOpen(false);
    }, 300); // Retraso de 300ms antes de cerrar el menú
    setStoreMenuTimeout(timeout);
  };

  const navItems = [
    ['INICIO', '/'],
    ['SOBRE MÍ', '/sobre-mi'],
    ['PORTFOLIO', '/portfolio'],
    ['CONTACTO', '/contacto'],
  ];

  const storeItems = [
    ['Templates / Componentes', '/ventas/templates'],
    ['Juegos Digitales', '/ventas/juegos'],
    ['Electrónica', '/ventas/electronica'],
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            tulogo
          </Link>
          <div className="items-center hidden space-x-8 md:flex">
            {navItems.map(([title, url]) => (
              <Link
                key={url}
                href={url}
                className="text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {title}
              </Link>
            ))}
            {/* Menú desplegable para la tienda */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                onClick={() => setIsStoreOpen((prev) => !prev)}
              >
                TIENDA
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {isStoreOpen && (
                <div className="absolute top-full left-0 bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-2 py-2 w-48">
                  {storeItems.map(([title, url]) => (
                    <Link
                      key={url}
                      href={url}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsStoreOpen(false)}
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>
          <button
            className="text-gray-600 md:hidden dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 space-y-4 md:hidden">
            {navItems.map(([title, url]) => (
              <Link
                key={url}
                href={url}
                className="block text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {title}
              </Link>
            ))}
            {/* Menú desplegable para la tienda en móviles */}
            <div>
              <button
                className="flex items-center gap-1 text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsStoreOpen(!isStoreOpen)}
              >
                TIENDA
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-4 h-4 transition-transform ${isStoreOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {isStoreOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {storeItems.map(([title, url]) => (
                    <Link
                      key={url}
                      href={url}
                      className="block text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsStoreOpen(false);
                      }}
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="pt-4">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}