'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Services Page
 * Showcasing 360° virtual tour solutions for different industries
 */
export default function ServicesPage() {
  const services = [
    {
      id: 'real-estate',
      title: 'Real Estate',
      tagline: 'Transform Property Marketing with Immersive Tours',
      icon: '🏠',
      description: 'Revolutionize how you showcase properties with our cutting-edge 360° virtual tour technology. Enable potential buyers to explore listings remotely, saving time while generating more qualified leads. Real estate professionals worldwide trust our platform to deliver engaging property presentations that drive faster sales.',
      image: '/360-real-city.jpg',
      features: [
        'Remote property viewing - Buyers can explore homes anytime, anywhere without scheduling conflicts',
        'Higher quality leads - Filter serious prospects who have already virtually toured the property',
        'Competitive advantage - Distinguish your listings with premium interactive experiences',
        'Enhanced online presence - Properties with virtual tours receive significantly more engagement',
      ],
    },
    {
      id: 'hospitality',
      title: 'Hospitality',
      tagline: 'Elevate Guest Confidence and Drive Reservations',
      icon: '🏨',
      description: 'Transform how travelers discover your venue with immersive 360° experiences. Our platform enables hotels, resorts, and vacation rentals to showcase their spaces authentically, building trust with potential guests before they book. Create memorable first impressions that convert browsers into confirmed reservations.',
      image: '/360-real-interior.jpg',
      features: [
        'Build booking confidence - Guests can virtually walk through rooms and amenities before reserving',
        'Captivating visual presentation - Create memorable impressions with interactive venue showcases',
        'Brand customization - Design tours that reflect your unique hospitality brand identity',
        'Google integration - Enhance discoverability through seamless Street View publishing',
      ],
    },
    {
      id: 'architecture',
      title: 'Architecture',
      tagline: 'Showcase Architectural Vision in Stunning Detail',
      icon: '🏛️',
      description: 'Transform static blueprints into immersive experiences that bring your designs to life. Our platform empowers architects and designers to present projects in ways that truly communicate spatial relationships and design intent, helping clients visualize the final result before construction begins.',
      image: '/360-real-nature.jpg',
      features: [
        'Immersive client presentations - Enable stakeholders to experience designs from within',
        'Complete design control - Tailor every aspect to perfectly represent your architectural vision',
        'Enhanced project marketing - Developers gain powerful tools to attract investors and buyers',
        'VR compatibility - Present designs using cutting-edge virtual reality technology',
      ],
    },
    {
      id: 'public-sector',
      title: 'Public Sector',
      tagline: 'Modernize Civic Engagement and Project Documentation',
      icon: '🏛️',
      description: 'Empower government agencies and municipalities with advanced documentation tools for infrastructure projects and public initiatives. Our virtual tour platform helps create comprehensive visual records that enhance community engagement, improve transparency, and streamline project communication with citizens and stakeholders.',
      image: '/360-real-mountain.jpg',
      features: [
        'Comprehensive documentation - Create detailed visual records of infrastructure and development projects',
        'Community transparency - Share project progress with citizens through accessible virtual tours',
        'Enhanced civic communication - Explain complex initiatives using intuitive visual formats',
        'Budget-friendly solution - Achieve professional documentation without expensive specialized equipment',
      ],
    },
    {
      id: 'insurance',
      title: 'Insurance',
      tagline: 'Optimize Claims Processing with Visual Documentation',
      icon: '🛡️',
      description: 'Streamline insurance workflows with comprehensive 360° visual documentation. Our platform provides insurance professionals with powerful tools to capture accurate property conditions, document claim details, and conduct remote assessments, improving efficiency while maintaining the highest standards of accuracy and security.',
      image: '/360-real-ocean.jpg',
      features: [
        'Precise damage documentation - Create comprehensive visual records for accurate claim processing',
        'Pre-loss assessments - Document property conditions for risk evaluation and underwriting',
        'Secure data handling - Control access with password protection and encrypted storage',
        'Efficient workflow - Reduce processing time and costs compared to traditional methods',
      ],
    },
    {
      id: 'construction',
      title: 'Construction',
      tagline: 'Document Project Evolution from Start to Finish',
      icon: '🏗️',
      description: 'Keep construction projects on track with comprehensive visual documentation at every stage. Our platform enables project managers and construction teams to create organized progress records that keep all stakeholders informed, facilitate better decision-making, and provide valuable project archives.',
      image: '/360-real-city.jpg',
      features: [
        'Organized progress tracking - Document each construction phase with clear visual records',
        'Stakeholder communication - Keep investors and managers updated with immersive progress reports',
        'Cost-effective documentation - Achieve professional results without complex systems',
        'Complete project lifecycle - Capture before, during, and after construction phases',
      ],
    },
    {
      id: 'luxury-vehicles',
      title: 'Luxury Vehicles',
      tagline: 'Premium Presentations for High-End Transportation',
      icon: '🚗',
      description: 'Elevate the presentation of luxury vehicles with immersive virtual showcases. Our platform enables dealers and brokers to create sophisticated interactive tours of high-end RVs, yachts, and aircraft, providing discerning buyers with the premium experience they expect while generating qualified interest.',
      image: '/360-real-interior.jpg',
      features: [
        'Premium buyer experience - Match the luxury of your inventory with sophisticated presentations',
        'Interior detail showcase - Highlight craftsmanship, amenities, and design elements comprehensively',
        'Qualified lead generation - Attract serious buyers through detailed virtual previews',
        'Professional branding - Present inventory with polished, customizable tour experiences',
      ],
    },
    {
      id: 'education',
      title: 'Education',
      tagline: 'Create Engaging Learning Experiences Beyond Classrooms',
      icon: '🎓',
      description: 'Transform educational content with interactive 360° learning experiences. Our platform empowers educators to create immersive lessons that bring subjects to life, from virtual science labs to historical site explorations, making learning more engaging and accessible for students everywhere.',
      image: '/360-real-nature.jpg',
      features: [
        'Enhanced student engagement - Make learning memorable through interactive virtual experiences',
        'Rich multimedia integration - Incorporate quizzes, videos, and informational overlays seamlessly',
        'Universal accessibility - Enable students to explore locations regardless of physical limitations',
        'Educational preservation - Archive important sites and research for future learning applications',
      ],
    },
    {
      id: 'small-business',
      title: 'Small Business',
      tagline: 'Amplify Your Local Presence and Attract Customers',
      icon: '🏪',
      description: 'Give your business space the spotlight it deserves with professional virtual tours. Our platform helps small businesses create engaging online experiences that showcase their unique environment, integrate with Google Street View for enhanced visibility, and convert online browsers into walk-in customers.',
      image: '/360-real-interior.jpg',
      features: [
        'Boosted online visibility - Integrate with Google Maps and Business to reach more local customers',
        'Customer confidence - Let prospects explore your space before visiting in person',
        'Custom brand experience - Design tours that authentically represent your business atmosphere',
        'Accessible marketing - Professional marketing tools at small business-friendly pricing',
      ],
    },
    {
      id: 'art-galleries',
      title: 'Art Galleries & Museums',
      tagline: 'Share Cultural Experiences with the World',
      icon: '🎨',
      description: 'Break down geographical barriers and share your exhibitions globally through virtual tours. Our platform enables galleries and museums to create immersive digital experiences that complement physical visits, preserve temporary exhibitions, and engage art enthusiasts from around the world.',
      image: '/360-real-city.jpg',
      features: [
        'Worldwide accessibility - Share exhibitions with international audiences instantly',
        'Digital preservation - Create lasting records of temporary or traveling exhibits',
        'Enhanced storytelling - Add context with audio narration, artist information, and multimedia',
        'Visitor inspiration - Preview exhibitions to encourage future in-person attendance',
      ],
    },
    {
      id: 'universities',
      title: 'Colleges & Universities',
      tagline: 'Connect with Future Students Through Virtual Campus Experiences',
      icon: '🏫',
      description: 'Bring your campus to prospective students wherever they are with comprehensive virtual tours. Our platform enables universities to create engaging digital experiences that showcase facilities, campus culture, and student life, helping families make informed decisions from any location.',
      image: '/360-real-nature.jpg',
      features: [
        'Extended recruitment reach - Connect with prospective students globally through virtual visits',
        'Comprehensive facility showcase - Highlight academic buildings, dormitories, and campus amenities',
        'Always-on availability - Provide campus tours anytime, accommodating different schedules and time zones',
        'Recruitment efficiency - Supplement traditional campus tours with scalable digital alternatives',
      ],
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
              Virtual Tour Platform for Any Industry
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              From real estate to education, hospitality to museums—our 360° virtual tour platform empowers businesses,
              educators, public sector, and more to create professionally interactive virtual experiences. Whether you're
              showcasing properties, documenting projects, or engaging students, our versatile solution delivers stunning
              results across every industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      {services.map((service, index) => (
        <section
          key={service.id}
          className={index % 2 === 0 ? 'section bg-white' : 'section bg-background-gray'}
        >
          <div className="container-custom">
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image - Left on even, Right on odd */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl overflow-hidden shadow-xl ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </motion.div>

              {/* Text Content - Right on even, Left on odd */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? 'lg:order-1' : ''}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
                  {service.title}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{service.icon}</span>
                  <p className="text-lg font-semibold text-neutral-700">{service.tagline}</p>
                </div>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-neutral-700">
                        <span className="font-semibold">{feature.split(' - ')[0]}</span>
                        {feature.includes(' - ') && ` - ${feature.split(' - ')[1]}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of professionals creating stunning 360° virtual experiences across every industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="btn-accent text-lg px-8 py-4 shadow-xl">
                Start Free Trial
              </a>
              <a
                href="/explore"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-medium hover:bg-white/20 transition-colors text-lg"
              >
                View Examples
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
