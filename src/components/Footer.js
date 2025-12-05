'use client'

import Link from 'next/link'
import { useState } from 'react'

/**
 * Footer Component
 * Beautiful footer with brand, links, newsletter signup, and social icons
 */
export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Mock newsletter subscription (no backend)
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const footerLinks = {
    Product: [
      { label: 'Features', href: '/#features' },
      { label: 'Explore Tours', href: '/explore' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'API', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Tutorials', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  }

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: '#' },
    { name: 'Facebook', icon: 'f', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'LinkedIn', icon: 'in', href: '#' },
    { name: 'YouTube', icon: '▶', href: '#' },
  ]

  return (
    <footer className="bg-[#4a3424] text-white w-full max-w-full overflow-x-hidden" suppressHydrationWarning>
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 md:py-10" suppressHydrationWarning>
        {/* Top Section - Newsletter - FIXED FOR MOBILE */}
        <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start md:items-center">
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold text-white mb-2">
                Stay in the Loop
              </h3>
              <p className="text-sm sm:text-base text-white/80">
                Get the latest tours, features, and VR news delivered to your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#85603f] text-white rounded-lg font-medium hover:bg-[#6b4d32] transition-colors whitespace-nowrap text-sm sm:text-base"
                >
                  {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section - Links - FIXED FOR MOBILE */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-4 sm:mb-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3">
              {/* Beautiful Logo */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#bd9354] via-[#9e7540] to-[#85603f] rounded-xl flex items-center justify-center shadow-xl flex-shrink-0">
                <div className="absolute inset-0.5 bg-gradient-to-br from-[#6b4d32] to-[#85603f] rounded-xl"></div>
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-sans font-bold text-white">
                Virtulee
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 px-4 sm:px-0">
              Immersive 360° virtual tours that transport you anywhere.
            </p>
            {/* Social Links */}
            <div className="flex justify-center sm:justify-start space-x-2 sm:space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="text-xs sm:text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns - BETTER MOBILE LAYOUT */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="text-center sm:text-left">
              <h4 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{category}</h4>
              <ul className="space-y-1 sm:space-y-1.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Copyright - FIXED FOR MOBILE */}
        <div className="pt-4 sm:pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-white/80 text-center sm:text-left">
            © {new Date().getFullYear()} Virtulee. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link href="#" className="text-white/80 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-white/80 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-white/80 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
