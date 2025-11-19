'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * About Page
 * Company information, mission, and team
 */
export default function AboutPage() {
  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', avatar: '👩‍💼' },
    { name: 'Michael Chen', role: 'CTO', avatar: '👨‍💻' },
    { name: 'Emily Rodriguez', role: 'Head of Design', avatar: '👩‍🎨' },
    { name: 'David Park', role: 'Lead Developer', avatar: '👨‍🔬' },
  ]

  const stats = [
    { number: '73K+', label: 'Active Users' },
    { number: '200K+', label: 'Tours Created' },
    { number: '81+', label: 'Countries' },
    { number: '99.9%', label: 'Uptime' },
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Innovation',
      description: 'Pushing the boundaries of virtual reality and immersive technology.',
    },
    {
      icon: '🤝',
      title: 'Customer First',
      description: 'Your success is our success. We listen, adapt, and deliver.',
    },
    {
      icon: '🌍',
      title: 'Accessibility',
      description: 'Making virtual tours available to everyone, everywhere.',
    },
    {
      icon: '⚡',
      title: 'Excellence',
      description: 'Committed to delivering the highest quality experiences.',
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
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
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
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
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  VirtualTours was founded in 2020 with a simple idea: what if anyone could
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
              className="relative h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The passionate people behind VirtualTours
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
                <div className="text-7xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-neutral-600">{member.role}</p>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Join Us on This Journey
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Whether you're a creator, business owner, or just curious about virtual tours,
              we'd love to have you on board.
            </p>
            <Link href="/register" className="btn-accent text-lg px-8 py-4">
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
