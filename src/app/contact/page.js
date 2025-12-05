'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Contact Page
 * Get in touch with us
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary-50 via-background-light to-accent-50">
      {/* Header */}
      <section className="py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-primary-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              Have questions about our virtual tour platform? We're here to help!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl border border-primary-100 h-full">
                <h2 className="text-3xl font-bold text-primary-900 mb-6">
                  Send us a Message
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
                    <p className="text-accent-800 font-medium">
                      ✓ Thank you! We'll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-primary-900 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-primary-900 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-primary-900 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="How can we help?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-primary-900 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact Cards */}
              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-primary-200 hover:shadow-lg hover:border-primary-300 transition-all group">
                  <div className="flex-shrink-0 w-11 h-11 bg-primary-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 text-sm">Email</h3>
                    <p className="text-neutral-600 text-sm">support@virtualii.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-accent-200 hover:shadow-lg hover:border-accent-300 transition-all group">
                  <div className="flex-shrink-0 w-11 h-11 bg-accent-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent-900 text-sm">Phone</h3>
                    <p className="text-neutral-600 text-sm">+1 (888) 993-8990</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-primary-200 hover:shadow-lg hover:border-primary-300 transition-all group">
                  <div className="flex-shrink-0 w-11 h-11 bg-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 text-sm">Office</h3>
                    <p className="text-neutral-600 text-sm">123 Virtual Street, SF, CA 94103</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-accent-200 hover:shadow-lg hover:border-accent-300 transition-all group">
                  <div className="flex-shrink-0 w-11 h-11 bg-accent-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent-900 text-sm">Business Hours</h3>
                    <p className="text-neutral-600 text-sm">Mon-Fri: 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Links - Premium Card Style */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-6 shadow-xl">
                <h3 className="font-bold text-white mb-4 text-lg">Connect With Us</h3>
                <p className="text-primary-100 text-sm mb-6">
                  Follow us on social media for updates, tips, and virtual tour inspiration.
                </p>
                <div className="flex gap-3">
                  {[
                    { name: 'Twitter', icon: 'M8 19c11 0 17-9 17-17v-1c1-1 2-2 3-3-1 0-2 1-3 1 1-1 2-2 2-3-1 1-2 1-3 2-1-1-3-2-5-2-4 0-7 3-7 7v1c-3 0-6-2-8-4-1 1-1 3 0 4-1 0-2 0-3-1 0 3 2 5 5 6h-3c1 2 3 3 5 3-2 2-5 3-8 2 3 2 6 3 9 3' },
                    { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                    { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-md hover:scale-110"
                      aria-label={social.name}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
