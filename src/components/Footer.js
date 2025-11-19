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
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom py-12 md:py-16">
        {/* Top Section - Newsletter */}
        <div className="mb-12 pb-12 border-b border-neutral-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Stay in the Loop
              </h3>
              <p className="text-neutral-400">
                Get the latest tours, features, and VR news delivered to your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors whitespace-nowrap"
                >
                  {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">VR</span>
              </div>
              <span className="text-xl font-display font-bold text-white">
                VirtualTours
              </span>
            </div>
            <p className="text-sm text-neutral-400 mb-6">
              Immersive 360° virtual tours that transport you anywhere.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} VirtualTours. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
