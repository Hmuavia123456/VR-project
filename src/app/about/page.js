'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

/**
 * About Page
 * Company information, mission, and team
 */
export default function AboutPage() {
  const team = [
    { name: 'Muhammad Uzair Karghatra', role: 'CEO & Founder', avatar: '👩‍💼', image: '/ceo-uzair.jpg' },
    { name: 'Michael Chen', role: 'CTO', avatar: '👨‍💻', image: null },
    { name: 'Habib Rehmani', role: 'Head of Design', avatar: '👩‍🎨', image: '/team-habib.jpg' },
    { name: 'Muhammad Awais', role: 'Head of Project', avatar: '👨‍🔬', image: '/team-awais.jpg' },
  ]

  const stats = [
    { number: '285K+', label: 'Active Users' },
    { number: '420K+', label: 'Tours Created' },
    { number: '145+', label: 'Countries' },
    { number: '99.9%', label: 'Uptime' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section bg-[#f5efd8]/50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[#4a3424] mb-6">
              Transforming How People Experience Spaces
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              We're on a mission to make immersive virtual tours accessible to everyone,
              empowering creators to share their spaces with the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#4a3424] mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-background-gray">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-[#4a3424] mb-6">
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
              className="relative h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl overflow-hidden shadow-xl"
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
      <section className="section bg-background-gray">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-[#4a3424] mb-4">
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
                <h3 className="text-xl font-bold text-[#4a3424] mb-1">
                  {member.name}
                </h3>
                <p className="text-neutral-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-[#4a3424] mb-6">
              Join Us on This Journey
            </h2>
            <p className="text-xl mb-8 text-neutral-600 max-w-2xl mx-auto">
              Whether you're a creator, business owner, or just curious about virtual tours,
              we'd love to have you on board.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:bg-primary-800 transition-colors">
                Get Started Today
              </Link>
              <Link href="/pricing" className="px-8 py-4 bg-accent-500 text-white rounded-lg font-semibold text-lg shadow-xl hover:bg-accent-600 transition-colors">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
