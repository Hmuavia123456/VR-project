'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Testimonials Page - Kuula Style Alternating Layout
 * Displays customer testimonials in a left-right alternating pattern
 */
export default function TestimonialsPage() {
  const allTestimonials = [
    {
      quote: "As an automotive dealership, presenting vehicles in an immersive way is crucial. Virtulee's 360° tours allow customers to explore every detail of our inventory from anywhere. The platform has reduced our sales cycle time and increased qualified leads significantly. It's the best investment we've made in our digital presence!",
      author: "Marcus Johnson",
      company: "Premier Auto Group"
    },
    {
      quote: "The ease of use is simply phenomenal. Even team members with no technical background can create professional-quality virtual tours in minutes. The drag-and-drop interface and intuitive editor make the entire process smooth. We've been able to showcase our entire campus to prospective students worldwide, resulting in higher application rates!",
      author: "Dr. Patricia Williams",
      company: "Metropolitan University"
    },
    {
      quote: "Virtulee has revolutionized how we document and showcase construction projects to stakeholders. The ability to create detailed 360° progress tours has improved communication with clients and reduced site visits. The platform is reliable, feature-rich, and delivers exceptional value. We now use it for every major project!",
      author: "Robert Chen",
      company: "BuildTech Construction"
    },
    {
      quote: "We've been using Virtulee for our museum exhibitions and the results have been outstanding. Visitors can now explore our collections virtually from anywhere in the world. The interactive features and high-quality imagery have significantly enhanced our digital presence. Our online visitor engagement has tripled since implementation!",
      author: "Sarah Mitchell",
      company: "National Heritage Museum"
    },
    {
      quote: "The analytics and insights provided by Virtulee are invaluable for our marketing strategy. We can track exactly how visitors interact with our virtual tours and optimize accordingly. The platform has helped us understand customer behavior better and improve our conversion rates. It's an essential tool for any modern business!",
      author: "James Anderson",
      company: "Global Marketing Solutions"
    },
    {
      quote: "Virtulee has transformed our restaurant's online presence completely. Potential customers can now take a virtual walk through our dining spaces, seeing the ambiance and atmosphere before making reservations. We've noticed a significant increase in bookings, especially from out-of-town guests. The return on investment has been incredible!",
      author: "Maria Rodriguez",
      company: "The Golden Fork Restaurant"
    }
  ]

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-white">
      {/* Simple Header Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container-custom max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#754E1A]">
              What users say about Virtulee
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Alternating Layout (Kuula Style) */}
      <section className="pb-16 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="space-y-10 sm:space-y-12">
            {allTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:items-start' : 'md:items-end'
                }`}
              >
                {/* Quote Card */}
                <div className="w-full md:w-5/6">
                  <div className="bg-white p-8 sm:p-10 shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-[#CBA35C]/20 hover:border-[#CBA35C]/40">
                    {/* Golden Quote Mark */}
                    <div className="text-[#CBA35C] text-6xl sm:text-7xl font-serif leading-none mb-4">
                      "
                    </div>

                    {/* Quote Text */}
                    <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Author Info Below Card */}
                  <div className="mt-4 px-2">
                    <div className="font-bold text-[#754E1A] text-base hover:underline cursor-pointer">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-neutral-600 italic">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#754E1A] mb-6">
              Ready to Create Your Own Success Story?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Join thousands of professionals using Virtulee to transform their business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-3 bg-[#CBA35C] text-white font-semibold text-lg shadow-lg hover:bg-[#754E1A] transition-all hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                href="/"
                className="px-8 py-3 border-2 border-[#CBA35C] text-[#754E1A] font-semibold text-lg hover:bg-[#CBA35C] hover:text-white transition-all"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
