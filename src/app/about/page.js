'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/**
 * Animated Counter Component
 */
function AnimatedCounter({ value, duration = 2 }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true })

  // Extract number and suffix (K+, %, etc.)
  const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''))
  const suffix = value.toString().replace(/[0-9.]/g, '')

  useEffect(() => {
    if (!isInView) return

    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(numericValue * progress)
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(numericValue)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, numericValue, duration])

  return (
    <span ref={countRef}>
      {Math.floor(count)}{suffix}
    </span>
  )
}

/**
 * About Page
 * Company information, mission, and team
 */
export default function AboutPage() {
  const team = [
    { name: 'Muhammad Uzair Karghatra', role: 'CEO & Founder', avatar: '👩‍💼', image: '/ceo-uzair.jpg' },
    { name: 'Michael Chen', role: 'CTO', avatar: '👨‍💻', image: null },
    { name: 'Hassan Muavia', role: 'Head of Design', avatar: '👩‍🎨', image: '/team-habib.jpg' },
    { name: 'Muhammad Awais', role: 'Head of Project', avatar: '👨‍🔬', image: '/team-awais.jpg' },
  ]

  const stats = [
    {
      number: '285K+',
      label: 'Active Users',
      gradient: 'from-[#754E1A] to-[#8B6635]',
      shadowColor: 'shadow-[#754E1A]/20'
    },
    {
      number: '420K+',
      label: 'Tours Created',
      gradient: 'from-[#8B6635] to-[#C4975F]',
      shadowColor: 'shadow-[#8B6635]/20'
    },
    {
      number: '145+',
      label: 'Countries',
      gradient: 'from-[#C4975F] to-[#D4A574]',
      shadowColor: 'shadow-[#C4975F]/20'
    },
    {
      number: '99.9%',
      label: 'Uptime',
      gradient: 'from-[#A67C52] to-[#754E1A]',
      shadowColor: 'shadow-[#A67C52]/20'
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section bg-[#FEF9F0]/50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[#754E1A] mb-6">
              Transforming How People Experience Spaces
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              We're on a mission to make immersive virtual tours accessible to everyone,
              empowering creators to share their spaces with the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Enhanced Interactive Design */}
      <section className="section bg-gradient-to-br from-[#FEF9F0] via-white to-[#FFF5E6] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#754E1A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C4975F] rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#754E1A] mb-3">
              Our Impact in Numbers
            </h2>
            <p className="text-neutral-600 text-lg">
              Trusted by thousands worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Card */}
                <div className="relative p-8 rounded-2xl bg-white border-2 border-[#754E1A]/10 shadow-lg overflow-hidden backdrop-blur-sm">
                  {/* Subtle Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`}></div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Animated Number */}
                    <div className={`
                      text-4xl md:text-5xl lg:text-6xl font-extrabold
                      bg-gradient-to-r ${stat.gradient}
                      bg-clip-text text-transparent
                      mb-3
                    `}>
                      <AnimatedCounter value={stat.number} duration={2.5} />
                    </div>

                    {/* Label */}
                    <div className="text-neutral-700 font-semibold text-base md:text-lg">
                      {stat.label}
                    </div>

                    {/* Decorative Line */}
                    <motion.div
                      className={`h-1 bg-gradient-to-r ${stat.gradient} mx-auto mt-4 rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Decorative Wave */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-1 bg-gradient-to-r from-[#754E1A] via-[#C4975F] to-[#754E1A] rounded-full mt-12 max-w-3xl mx-auto"
          ></motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-[#754E1A] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  Virtulee was founded in 2020 with a simple idea: what if anyone could
                  create stunning, immersive virtual experiences without needing expensive
                  equipment or technical expertise?
                </p>
                <p>
                  Starting in a small garage with just a team of three, we've grown into a
                  platform used by thousands of real estate agents, travel companies,
                  educators, and creators worldwide.
                </p>
                <p>
                  Today, we're proud to be at the forefront of the virtual tour revolution,
                  helping people connect with spaces in ways that were never before possible.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-primary-500/20 to-primary-500/20 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/360-neuer-zollhof-bright.jpg"
                alt="Our Story"
                fill
                unoptimized
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-[#754E1A] mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The passionate people behind Virtulee
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                {member.image ? (
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-7xl mb-4">{member.avatar}</div>
                )}
                <h3 className="text-xl font-bold text-[#754E1A] mb-1">
                  {member.name}
                </h3>
                <p className="text-neutral-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-[#754E1A] mb-6">
              Join Us on This Journey
            </h2>
            <p className="text-xl mb-8 text-neutral-600 max-w-2xl mx-auto">
              Whether you're a creator, business owner, or just curious about virtual tours,
              we'd love to have you on board.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-primary-400 text-white px-8 py-3 font-semibold text-lg shadow-xl hover:bg-primary-700 transition-all hover:scale-105">
                Get Started Today
              </Link>
              <Link href="/pricing" className="px-8 py-3 bg-primary-600 text-white font-semibold text-lg shadow-xl hover:bg-primary-700 transition-all hover:scale-105">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
