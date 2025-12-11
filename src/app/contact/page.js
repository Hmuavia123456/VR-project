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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset states
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')
    setFieldErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Success
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null)
        }, 5000)
      } else {
        // Error
        setSubmitStatus('error')

        // Handle validation errors
        if (data.errors) {
          setFieldErrors(data.errors)
          setErrorMessage('Please fix the errors below.')
        } else {
          setErrorMessage(data.error || 'Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: undefined
      })
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary-50 via-background-light to-primary-50">
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 shadow-xl border-2 border-[#CBA35C]/30 h-full max-w-2xl">
                {/* Golden accent bar */}
                <div className="w-20 h-1 bg-gradient-to-r from-[#CBA35C] to-[#754E1A] mb-6"></div>

                <h2 className="text-3xl font-bold text-[#754E1A] mb-2">
                  Send us a Message
                </h2>
                <p className="text-neutral-600 mb-8">We'd love to hear from you. Fill out the form below and we'll get back to you soon.</p>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-800 font-medium">
                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-800 font-medium">
                        {errorMessage}
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-[#754E1A] mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className={`w-full px-4 py-3 border-2 focus:ring-2 transition-all ${
                        fieldErrors.name
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-neutral-200 focus:ring-[#CBA35C]/50 focus:border-[#CBA35C]'
                      } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      placeholder="John Doe"
                    />
                    {fieldErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-[#754E1A] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className={`w-full px-4 py-3 border-2 focus:ring-2 transition-all ${
                        fieldErrors.email
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-neutral-200 focus:ring-[#CBA35C]/50 focus:border-[#CBA35C]'
                      } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      placeholder="john@example.com"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-[#754E1A] mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className={`w-full px-4 py-3 border-2 focus:ring-2 transition-all ${
                        fieldErrors.subject
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-neutral-200 focus:ring-[#CBA35C]/50 focus:border-[#CBA35C]'
                      } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      placeholder="How can we help?"
                    />
                    {fieldErrors.subject && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#754E1A] mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 border-2 focus:ring-2 transition-all resize-none ${
                        fieldErrors.message
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-neutral-200 focus:ring-[#CBA35C]/50 focus:border-[#CBA35C]'
                      } ${isSubmitting ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {fieldErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-3 font-semibold transition-all shadow-xl flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'bg-neutral-400 cursor-not-allowed'
                        : 'bg-[#CBA35C] hover:bg-[#754E1A]'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-4 p-5 bg-white border-2 border-[#CBA35C]/30 shadow-md">
                  <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-[#CBA35C] to-[#754E1A] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#754E1A] text-sm">Email</h3>
                    <p className="text-neutral-600 text-sm">support@virtualii.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-5 bg-white border-2 border-[#CBA35C]/30 shadow-md">
                  <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-[#CBA35C] to-[#754E1A] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#754E1A] text-sm">Phone</h3>
                    <p className="text-neutral-600 text-sm">+1 (888) 993-8990</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-5 bg-white border-2 border-[#CBA35C]/30 shadow-md">
                  <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-[#CBA35C] to-[#754E1A] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#754E1A] text-sm">Office</h3>
                    <p className="text-neutral-600 text-sm">123 Virtual Street, SF, CA 94103</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-center gap-4 p-5 bg-white border-2 border-[#CBA35C]/30 shadow-md">
                  <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-[#CBA35C] to-[#754E1A] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#754E1A] text-sm">Business Hours</h3>
                    <p className="text-neutral-600 text-sm">Mon-Fri: 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Links - Premium Card Style */}
              <div className="bg-gradient-to-br from-[#CBA35C] to-[#754E1A] p-6 shadow-xl">
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
                      className="w-11 h-11 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white shadow-md"
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
