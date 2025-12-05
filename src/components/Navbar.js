'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Navbar Component
 * Responsive navigation with mobile hamburger menu
 * Features: sticky header, smooth animations, active link highlighting
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/explore', label: 'Explore' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
  ]

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 bg-white w-full transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Brand Name */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center group">
              {/* Brand Name with Gradient */}
              <span className="text-2xl font-bold bg-gradient-to-r from-[#85603f] to-[#bd9354] bg-clip-text text-transparent">
                Virtulee
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex items-center gap-1 px-4 py-2 text-[#4a3424] hover:text-[#9e7540] font-medium text-[15px] transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#bd9354] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            {/* Contact Icon - Desktop only */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 text-[#9e7540] hover:text-[#85603f] font-medium text-[15px] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="hidden xl:inline">Contact Us</span>
            </Link>

            {/* Sign In - Desktop only */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 text-[#9e7540] hover:text-[#85603f] font-medium text-[15px] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-[#f5efd8] rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-[#85603f] rounded-full origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-[#bd9354] rounded-full"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-[#85603f] rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-[#e3d18a] overflow-hidden w-full"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 w-full">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between px-4 py-3 text-[#4a3424] hover:bg-[#f5efd8] font-medium rounded-md transition-colors"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-[#e3d18a] pt-4 mt-4 space-y-2">
                  <Link
                    href="/contact"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 px-4 py-3 text-[#9e7540] hover:bg-[#f5efd8] font-medium rounded-md transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Contact Us</span>
                  </Link>
                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 px-4 py-3 text-[#9e7540] hover:bg-[#f5efd8] font-medium rounded-md transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Sign In</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
