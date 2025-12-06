'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Dynamically import Hero360 and TourViewer to avoid SSR issues with Three.js
const Hero360 = dynamic(() => import('@/components/Hero360'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-900">
      <div className="text-white text-2xl">Loading experience...</div>
    </div>
  ),
})

const TourViewer = dynamic(() => import('@/components/TourViewer'), {
  ssr: false,
})

/**
 * Home Page - CloudPano Style
 * Professional virtual tour platform landing page
 */
export default function HomePage() {
  const [selectedTour, setSelectedTour] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      quote: "Virtulee helped us sell properties 3x faster. The 360° tours are incredibly easy to create and our clients love them!",
      author: "Sarah Johnson",
      role: "Real Estate Agent",
      company: "Premier Properties"
    },
    {
      quote: "Best investment for our hotel. Bookings increased by 45% after we added virtual tours to our website.",
      author: "Michael Chen",
      role: "Hotel Manager",
      company: "Ocean View Resort"
    },
    {
      quote: "The interface is so simple, even non-tech people on our team can create professional tours in minutes.",
      author: "Emily Rodriguez",
      role: "Marketing Director",
      company: "AutoMax Dealership"
    },
    {
      quote: "Game changer for our museum! We can now reach audiences worldwide and preserve exhibitions digitally.",
      author: "Dr. Amanda Foster",
      role: "Museum Director",
      company: "City Art Museum"
    },
    {
      quote: "Our students love the virtual campus tours. Applications increased by 60% this year!",
      author: "Robert Williams",
      role: "Admissions Director",
      company: "State University"
    }
  ]

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="w-full max-w-full overflow-x-hidden" suppressHydrationWarning>
      {/* Hero Section - Kuula Style with Stunning 360° Background */}
      <Hero360 imageUrl="/hero-360.jpg" />

      {/* Split Section 1 - Like Kuula (Left: Tour, Right: Text) */}
      <section className="section bg-primary-50 w-full max-w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left - 360° Tour Preview */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 cursor-pointer"
              onClick={() => setSelectedTour({
                id: 'feature-1',
                title: 'The Rooster Restaurant - 360° Tour',
                description: 'Experience our interactive virtual tour',
                url: '/360-real-interior.jpg',
                type: 'photo',
                hotspots: [
                  { position: [100, 0, 0], title: 'Dining Area', description: 'Modern restaurant seating' },
                  { position: [-80, 0, 50], title: 'Bar Section', description: 'Full-service bar' },
                ],
              })}
            >
              <div className="relative h-full overflow-hidden group shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                <img
                  src="/360-real-interior.jpg"
                  alt="Virtual Tour Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Right - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-[#754E1A] mb-4 sm:mb-6">
                Create Virtual Tours that engage your audience
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mb-4 sm:mb-6 leading-relaxed">
                Our editor is simple but packed with powerful features. With the{' '}
                <span className="font-semibold text-[#CBA35C]">PRO</span> and{' '}
                <span className="font-semibold text-[#CBA35C]">BUSINESS</span> plans
                you can create unlimited tours, add labels, custom hotspots, nadir and zenith patches,
                background audio, interactive cards and floor plans. Create beautiful 3D 360 tours that your
                users won't easily forget!
              </p>
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={() => setSelectedTour({
                    id: 'feature-1',
                    title: 'The Rooster Restaurant - 360° Tour',
                    description: 'Experience our interactive virtual tour',
                    url: '/360-real-interior.jpg',
                    type: 'photo',
                    hotspots: [
                      { position: [100, 0, 0], title: 'Dining Area', description: 'Modern restaurant seating' },
                      { position: [-80, 0, 50], title: 'Bar Section', description: 'Full-service bar' },
                    ],
                  })}
                  className="w-full sm:w-auto px-8 py-3 bg-[#CBA35C] text-white rounded-lg font-medium hover:bg-[#754E1A] transition-colors shadow-md hover:shadow-lg text-center"
                >
                  WATCH VIRTUAL TOUR
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Split Section 2 - Reverse Layout (Left: Text, Right: Tour) */}
      <section className="section bg-primary-50 w-full max-w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-[#754E1A] mb-4 sm:mb-6">
                The smoothest and most efficient 3D 360 Virtual Tour player on the web
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mb-4 sm:mb-6 leading-relaxed">
                Don't just show images to your clients - give them an experience! Kuula offers the smoothest
                and most efficient 3D 360 Virtual Tour player on the web. Perfect to the last detail.
              </p>
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={() => setSelectedTour({
                    id: 'feature-2',
                    title: 'Modern Living Space - 360° Experience',
                    description: 'Explore this stunning interior',
                    url: '/360-real-city.jpg',
                    type: 'photo',
                    hotspots: [
                      { position: [100, 0, 0], title: 'Living Area', description: 'Spacious and modern' },
                      { position: [-80, 20, 50], title: 'Outdoor View', description: 'Beautiful scenery' },
                    ],
                  })}
                  className="w-full sm:w-auto px-8 py-3 bg-[#CBA35C] text-white rounded-lg font-medium hover:bg-[#754E1A] transition-colors shadow-md hover:shadow-lg text-center"
                >
                  WATCH VIRTUAL TOUR
                </button>
              </div>
            </motion.div>

            {/* Right - 360° Tour Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 cursor-pointer"
              onClick={() => setSelectedTour({
                id: 'feature-2',
                title: 'Modern Living Space - 360° Experience',
                description: 'Explore this stunning interior',
                url: '/360-real-city.jpg',
                type: 'photo',
                hotspots: [
                  { position: [100, 0, 0], title: 'Living Area', description: 'Spacious and modern' },
                  { position: [-80, 20, 50], title: 'Outdoor View', description: 'Beautiful scenery' },
                ],
              })}
            >
              <div className="relative h-full overflow-hidden group shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                <img
                  src="/360-real-city.jpg"
                  alt="Virtual Tour Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Split Section 3 - NEW: Advanced Features (Left: Tour, Right: Text) */}
      <section className="section bg-primary-50 w-full max-w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left - 360° Video Tour Preview */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 cursor-pointer"
              onClick={() => setSelectedTour({
                id: 'feature-3',
                title: 'Mountain Paradise - 360° Video Experience',
                description: 'Immersive video tour of breathtaking landscapes',
                url: '/360-real-mountain.jpg',
                type: 'photo',
                hotspots: [
                  { position: [120, 30, 0], title: 'Mountain Peak', description: 'Stunning panoramic views' },
                  { position: [-100, -20, 60], title: 'Valley View', description: 'Natural beauty at its finest' },
                  { position: [0, 40, -100], title: 'Sky View', description: 'Clear blue skies' },
                ],
              })}
            >
              <div className="relative h-full overflow-hidden group shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                <img
                  src="/360-real-mountain.jpg"
                  alt="360 Video Tour Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Right - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-[#754E1A] mb-4 sm:mb-6">
                Experience immersive 360° video tours like never before
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mb-4 sm:mb-6 leading-relaxed">
                Take your virtual tours to the next level with{' '}
                <span className="font-semibold text-[#754E1A]">360° video support</span>.
                Showcase dynamic environments, moving scenes, and real-time experiences that static
                images simply cannot capture. Perfect for tourism, events, and experiential marketing.
              </p>
              <p className="text-base sm:text-lg text-neutral-600 mb-4 sm:mb-6 leading-relaxed">
                Our advanced video player supports{' '}
                <span className="font-semibold text-[#754E1A]">4K resolution</span>,
                smooth playback, and interactive hotspots - all optimized for both desktop and mobile devices.
                Create unforgettable experiences that truly transport your audience.
              </p>
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={() => setSelectedTour({
                    id: 'feature-3',
                    title: 'Mountain Paradise - 360° Video Experience',
                    description: 'Immersive video tour of breathtaking landscapes',
                    url: '/360-real-mountain.jpg',
                    type: 'photo',
                    hotspots: [
                      { position: [120, 30, 0], title: 'Mountain Peak', description: 'Stunning panoramic views' },
                      { position: [-100, -20, 60], title: 'Valley View', description: 'Natural beauty at its finest' },
                      { position: [0, 40, -100], title: 'Sky View', description: 'Clear blue skies' },
                    ],
                  })}
                  className="w-full sm:w-auto px-8 py-3 bg-[#CBA35C] text-white rounded-lg font-medium hover:bg-[#754E1A] transition-colors shadow-md hover:shadow-lg text-center"
                >
                  WATCH VIRTUAL TOUR
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="section bg-primary-50 w-full max-w-full">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-[#754E1A] mb-4 sm:mb-6">
              Create Your First Tour in 3 Simple Steps
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              From capture to publish in under 5 minutes. No technical expertise needed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Capture',
                description: 'Use any 360° camera or our mobile app to capture your space. We support all major 360° cameras.',
                features: ['Any 360° camera', 'Mobile app', 'DSLR panoramas'],
                gradient: 'from-[#CBA35C] to-[#CBA35C]',
                image: (
                  <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden shadow-lg group">
                    <img
                      src="/capture-camera.jpg"
                      alt="Capture with 360 camera"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ),
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Create',
                description: 'Upload and customize your tour with our drag-and-drop editor. Add hotspots, info cards, and branding.',
                features: ['Drag-and-drop', 'Hotspots', 'Custom branding'],
                gradient: 'from-[#CBA35C] to-[#CBA35C]',
                image: (
                  <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden shadow-lg group">
                    <img
                      src="/create-software.jpg"
                      alt="Create and customize your tour"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ),
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Publish',
                description: 'Share your tour instantly with a single link. Embed on your website or share on social media.',
                features: ['Instant hosting', 'Embed anywhere', 'Social sharing'],
                gradient: 'from-[#CBA35C] to-[#754E1A]',
                image: (
                  <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden shadow-lg group">
                    <img
                      src="/publish-share.webp"
                      alt="Publish and share your tour"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ),
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                ),
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden border border-neutral-100">
                  {/* Illustration Image */}
                  {item.image && item.image}

                  <h3 className="text-2xl font-bold text-[#754E1A] mb-3">{item.title}</h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">{item.description}</p>

                  <ul className="space-y-3">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-neutral-700 flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#CBA35C] flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section bg-primary-50 w-full max-w-full">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-[#754E1A] mb-4 sm:mb-6">
              Trusted Across Every Industry
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              From real estate to education, businesses worldwide rely on Virtulee.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                title: 'Real Estate',
                desc: 'Property tours that sell faster',
                color: 'from-blue-500 to-blue-600',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
              },
              {
                title: 'Hospitality',
                desc: 'Showcase hotels & resorts',
                color: 'from-purple-500 to-purple-600',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: 'Automotive',
                desc: 'Interactive vehicle tours',
                color: 'from-red-500 to-red-600',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                ),
              },
              {
                title: 'Education',
                desc: 'Virtual campus tours',
                color: 'from-green-500 to-green-600',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                title: 'Construction',
                desc: 'Project documentation',
                color: 'from-yellow-500 to-orange-500',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: 'Museums',
                desc: 'Virtual exhibitions',
                color: 'from-blue-400 to-blue-500',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
              },
              {
                title: 'Commercial',
                desc: 'Office & retail spaces',
                color: 'from-blue-600 to-blue-700',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: 'Photography',
                desc: 'Professional services',
                color: 'from-cyan-500 to-cyan-600',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all duration-300 border border-neutral-100 text-center h-full">
                  <div className="inline-flex p-3 rounded-lg bg-[#CBA35C] text-white mb-3 group-hover:scale-110 transition-transform">
                    {industry.icon}
                  </div>
                  <h3 className="font-bold text-[#CBA35C] mb-2 text-lg">{industry.title}</h3>
                  <p className="text-sm text-neutral-600">{industry.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section - Slideshow */}
      <section className="section bg-primary-50 w-full max-w-full">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-[#754E1A] mb-4 sm:mb-6">
              What Our Customers Say
            </h2>
          </motion.div>

          {/* Testimonial Slideshow */}
          <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
            {/* Main Testimonial Card */}
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-xl p-6 sm:p-8 md:p-12"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 sm:mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-6 sm:mb-8 text-center leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </p>

              {/* Author */}
              <div className="text-center">
                <div className="font-bold text-[#754E1A] text-lg">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-sm text-neutral-600">
                  {testimonials[currentTestimonial].role}
                </div>
                <div className="text-sm text-[#CBA35C] font-medium">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute -left-2 sm:left-0 md:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[#754E1A] hover:bg-[#CBA35C] hover:text-white hover:border-[#236476] transition-all z-10"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute -right-2 sm:right-0 md:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[#754E1A] hover:bg-[#CBA35C] hover:text-white hover:border-[#236476] transition-all z-10"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentTestimonial === index
                      ? 'w-8 bg-[#CBA35C]'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-50 w-full max-w-full">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-[#754E1A] mb-4 sm:mb-6">
                Start Creating Amazing Virtual Tours Today
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8">
                Join over 70,000 professionals using our platform to create stunning 360° experiences
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="bg-primary-400 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:bg-primary-700 transition-all hover:scale-105 text-center"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/pricing"
                  className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg shadow-xl hover:bg-primary-700 transition-all hover:scale-105 text-center"
                >
                  View Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tour Viewer Modal */}
      {selectedTour && (
        <TourViewer
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </div>
  )
}
