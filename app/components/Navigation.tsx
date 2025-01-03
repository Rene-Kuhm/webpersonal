'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import ThemeToggle from '../components/ThemeToggle'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    ['INICIO', '/'],
    ['SOBRE MÍ', '/sobre-mi'],
    ['PORTFOLIO', '/portfolio'],
    ['BLOG', '/blog'],
    ['APRENDE PROGRAMACIÓN', '/aprende'],
    ['CONTACTO', '/contacto'],
  ]

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white dark:bg-gray-900 shadow-md py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            tulogo
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(([title, url]) => (
              <Link
                key={url}
                href={url}
                className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {title}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          <button
            className="md:hidden text-gray-600 dark:text-gray-300"
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
          <div className="md:hidden mt-4 space-y-4">
            {navItems.map(([title, url]) => (
              <Link
                key={url}
                href={url}
                className="block text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {title}
              </Link>
            ))}
            <div className="pt-4">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

