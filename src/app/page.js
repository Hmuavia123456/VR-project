'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Dynamically import Hero360 and TourViewer to avoid SSR issues with Three.js
const Hero360 = dynamic(() => import('@/components/Hero360'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-accent-900">
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

  return (
    <>
      {/* Hero Section - Simple 360° Background with One Beautiful Sentence */}
      <Hero360 imageUrl="/360-real-mountain.jpg" />

      {/* Split Section 1 - Like Kuula (Left: Tour, Right: Text) */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - 360° Tour Preview */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl overflow-hidden group cursor-pointer shadow-xl"
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
              <Image
                src="/360-real-interior.jpg"
                alt="Virtual Tour Preview"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <svg className="w-10 h-10 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Right - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
                Create Virtual Tours that engage your audience
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                Our editor is simple but packed with powerful features. With the{' '}
                <span className="font-semibold text-primary-600">PRO</span> and{' '}
                <span className="font-semibold text-accent-600">BUSINESS</span> plans
                you can create unlimited tours, add labels, custom hotspots, nadir and zenith patches,
                background audio, interactive cards and floor plans. Create beautiful 3D 360 tours that your
                users won't easily forget!
              </p>
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
                className="inline-block px-8 py-3 border-2 border-neutral-900 text-neutral-900 rounded-lg font-medium hover:bg-neutral-900 hover:text-white transition-colors"
              >
                WATCH INTRO VIDEO
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Split Section 2 - Reverse Layout (Left: Text, Right: Tour) */}
      <section className="section bg-background-gray">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
                The smoothest and most efficient 3D 360 Virtual Tour player on the web
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Don't just show images to your clients - give them an experience! Kuula offers the smoothest
                and most efficient 3D 360 Virtual Tour player on the web. Perfect to the last detail.
              </p>
            </motion.div>

            {/* Right - 360° Tour Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl overflow-hidden group cursor-pointer shadow-xl"
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
              <Image
                src="/360-real-city.jpg"
                alt="Virtual Tour Preview"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <svg className="w-10 h-10 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
              Create Your First Tour in 3 Simple Steps
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              From capture to publish in under 5 minutes. No technical expertise needed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: '📷',
                title: 'Capture',
                description: 'Use any 360° camera or our mobile app to capture your space. We support all major 360° cameras.',
                features: ['Any 360° camera', 'Mobile app', 'DSLR panoramas']
              },
              {
                step: '02',
                icon: '✨',
                title: 'Create',
                description: 'Upload and customize your tour with our drag-and-drop editor. Add hotspots, info cards, and branding.',
                features: ['Drag-and-drop', 'Hotspots', 'Custom branding']
              },
              {
                step: '03',
                icon: '🚀',
                title: 'Publish',
                description: 'Share your tour instantly with a single link. Embed on your website or share on social media.',
                features: ['Instant hosting', 'Embed anywhere', 'Social sharing']
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
                <div className="card text-center hover:shadow-xl transition-shadow">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="text-6xl mb-4 mt-8">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                  <p className="text-neutral-600 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-neutral-500 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-background-gray">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
              Everything You Need to Create Amazing Tours
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Professional features that make your virtual tours stand out from the competition.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🌍', title: '360° Immersion', description: 'Fully immersive panoramic views with smooth navigation.' },
              { icon: '🎥', title: '4K Quality', description: 'Crystal-clear high-resolution images and videos.' },
              { icon: '📱', title: 'Cross-Platform', description: 'Works on desktop, mobile, tablets, and VR headsets.' },
              { icon: '⚡', title: 'Lightning Fast', description: 'Global CDN hosting for instant loading worldwide.' },
              { icon: '🎯', title: 'Interactive Hotspots', description: 'Add clickable points with info, images, and videos.' },
              { icon: '🔒', title: 'Secure & Private', description: 'Enterprise-grade security for your tours.' },
              { icon: '🎨', title: 'Custom Branding', description: 'Add your logo, colors, and custom domain.' },
              { icon: '📊', title: 'Analytics', description: 'Track views, engagement, and user behavior.' },
              { icon: '🔗', title: 'Easy Embedding', description: 'One-click embed on any website or platform.' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
              Trusted Across Every Industry
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              From real estate to education, businesses worldwide rely on VirtualTours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏠', title: 'Real Estate', desc: 'Property tours that sell faster' },
              { icon: '🏨', title: 'Hospitality', desc: 'Showcase hotels & resorts' },
              { icon: '🚗', title: 'Automotive', desc: 'Interactive vehicle tours' },
              { icon: '🎓', title: 'Education', desc: 'Virtual campus tours' },
              { icon: '🏗️', title: 'Construction', desc: 'Project documentation' },
              { icon: '🎨', title: 'Museums', desc: 'Virtual exhibitions' },
              { icon: '💼', title: 'Commercial', desc: 'Office & retail spaces' },
              { icon: '📸', title: 'Photography', desc: 'Professional services' },
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-hover text-center"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-bold text-neutral-900 mb-1">{industry.title}</h3>
                <p className="text-sm text-neutral-600">{industry.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Join Thousands of Happy Users
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "VirtualTours helped us sell properties 3x faster. The 360° tours are incredibly easy to create and our clients love them!",
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
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <div className="font-bold text-neutral-900">{testimonial.author}</div>
                  <div className="text-sm text-neutral-600">{testimonial.role}</div>
                  <div className="text-sm text-primary-600">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Create Your First Virtual Tour?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join 70,000+ users creating stunning 360° experiences. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-accent text-lg px-8 py-4 shadow-xl">
                Start Free Trial - No Credit Card
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-medium hover:bg-white/20 transition-colors text-lg"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-white/20">
              <div className="text-sm text-white/70">TRUSTED BY</div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tour Viewer Modal */}
      {selectedTour && (
        <TourViewer
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </>
  )
}
