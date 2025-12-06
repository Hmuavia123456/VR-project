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
    <footer className="bg-footer text-white w-full max-w-full overflow-x-hidden" suppressHydrationWarning>
      <div className="w-full px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto py-2 sm:py-5 md:py-6" suppressHydrationWarning>
        {/* Top Section - Newsletter - MOBILE OPTIMIZED */}
        <div className="mb-2 sm:mb-4 md:mb-5 pb-2 sm:pb-4 md:pb-5 border-b border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 sm:gap-3 md:gap-4 items-start md:items-center">
            <div className="text-center md:text-left">
              <h3 className="text-xs sm:text-lg md:text-xl font-sans font-bold text-white mb-0 sm:mb-1">
                Stay in the Loop
              </h3>
              <p className="text-xs sm:text-sm text-white/80 hidden sm:block">
                Get the latest tours and VR news.
              </p>
            </div>
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-2 py-1 sm:px-3 sm:py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white text-[10px] sm:text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-2 py-1 sm:px-4 sm:py-2 bg-[#CBA35C] text-white rounded font-medium hover:bg-[#754E1A] transition-colors whitespace-nowrap text-[10px] sm:text-sm"
                >
                  {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section - Links - MOBILE OPTIMIZED */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-3 md:gap-4 mb-2 sm:mb-4 md:mb-5">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-1.5 sm:mb-3 md:mb-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 mb-1 sm:mb-2">
              {/* Beautiful Logo */}
              <div className="relative w-6 h-6 sm:w-9 sm:h-9 bg-gradient-to-br from-[#CBA35C] via-[#CBA35C] to-[#754E1A] rounded flex items-center justify-center shadow-lg flex-shrink-0">
                <div className="absolute inset-0.5 bg-gradient-to-br from-[#754E1A] to-[#CBA35C] rounded"></div>
                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
              <span className="text-xs sm:text-base md:text-lg font-sans font-bold text-white">
                Virtulee
              </span>
            </div>
            <p className="text-xs text-white/80 mb-1 sm:mb-2 px-2 sm:px-0 hidden sm:block">
              Immersive 360° tours.
            </p>
            {/* Social Links */}
            <div className="flex justify-center sm:justify-start space-x-0.5 sm:space-x-1.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-5 h-5 sm:w-7 sm:h-7 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="text-[10px] sm:text-xs">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns - MOBILE OPTIMIZED */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="text-center sm:text-left">
              <h4 className="text-white font-semibold mb-0.5 sm:mb-1.5 text-[10px] sm:text-sm">{category}</h4>
              <ul className="space-y-0">
                {links.slice(0, 3).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[10px] sm:text-xs text-white/80 hover:text-white transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="hidden sm:block">
                  <Link
                    href={links[3]?.href || '#'}
                    className="text-xs text-white/80 hover:text-white transition-colors inline-block"
                  >
                    {links[3]?.label}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Copyright - MOBILE OPTIMIZED */}
        <div className="pt-1.5 sm:pt-3 md:pt-4 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-2 md:gap-3">
          <p className="text-[9px] sm:text-xs text-white/80 text-center sm:text-left">
            © {new Date().getFullYear()} Virtulee. All rights reserved.
          </p>
          <div className="flex gap-1.5 sm:gap-3 md:gap-4 text-[9px] sm:text-xs">
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
