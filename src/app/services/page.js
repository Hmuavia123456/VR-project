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
      description: 'Showcase stunning properties with breathtaking 360° virtual tours that capture every architectural detail and luxurious feature. Our platform enables real estate agents and brokers to present homes in their best light, allowing potential buyers to explore beautiful interiors, modern designs, and elegant spaces from anywhere in the world. Create compelling virtual experiences that highlight the unique character and premium quality of each property.',
      image: '/real-estate-modern.jpg',
      features: [
        'Stunning property showcases - Display luxurious interiors and architectural beauty in immersive detail',
        'Remote viewing experience - Buyers explore properties 24/7 from the comfort of their homes',
        'Qualified lead generation - Attract serious buyers who have already experienced the property virtually',
        'Competitive market edge - Stand out with premium virtual tours that sell properties faster',
      ],
    },
    {
      id: 'hospitality',
      title: 'Hospitality',
      tagline: 'Elevate Guest Confidence and Drive Reservations',
      icon: '🏨',
      description: 'Present your hospitality venue with inviting 360° virtual tours that showcase comfortable accommodations, welcoming interiors, and thoughtfully designed spaces. Our platform helps hotels, resorts, bed & breakfasts, and vacation rentals build trust with potential guests by offering authentic virtual walkthroughs of rooms, common areas, and amenities. Create warm, engaging experiences that inspire confidence and drive bookings.',
      image: '/hospitality-interior.jpg',
      features: [
        'Welcoming space presentation - Showcase comfortable rooms and inviting interiors that appeal to guests',
        'Virtual room previews - Let travelers explore accommodations and amenities before booking',
        'Trust building experience - Authentic tours that accurately represent your hospitality offering',
        'Booking conversion boost - Convert browsers into guests with immersive virtual experiences',
      ],
    },
    {
      id: 'architecture',
      title: 'Architecture',
      tagline: 'Showcase Architectural Vision in Stunning Detail',
      icon: '🏛️',
      description: 'Present architectural masterpieces with immersive 360° virtual tours that capture striking designs, innovative structures, and bold geometric forms. Our platform enables architects and designers to showcase modern buildings, creative spaces, and cutting-edge architectural concepts in ways that truly communicate vision and spatial brilliance. Transform how you present contemporary architecture, from concept to completion.',
      image: '/architecture-modern.jpg',
      features: [
        'Stunning architectural showcase - Present modern designs and innovative structures in immersive detail',
        'Spatial storytelling - Communicate design intent and architectural vision through virtual experiences',
        'Client engagement - Enable stakeholders to explore and appreciate architectural creativity',
        'Portfolio excellence - Create compelling presentations that win projects and attract clients',
      ],
    },
    {
      id: 'public-sector',
      title: 'Public Sector',
      tagline: 'Modernize Civic Engagement and Project Documentation',
      icon: '🏛️',
      description: 'Transform how government agencies and municipalities document public buildings, heritage sites, and civic infrastructure with immersive 360° virtual tours. Our platform enables public sector organizations to create engaging visual records of government facilities, historical landmarks, community centers, and public spaces. Enhance transparency, improve citizen access, and preserve important civic assets for future generations.',
      image: '/public-sector-building.jpg',
      features: [
        'Historic preservation - Document and showcase heritage buildings and culturally significant sites',
        'Public facility access - Provide virtual tours of government buildings and community spaces',
        'Civic transparency - Share infrastructure projects and developments with citizens digitally',
        'Cultural education - Create immersive experiences that educate and engage the public',
      ],
    },
    {
      id: 'insurance',
      title: 'Insurance',
      tagline: 'Optimize Claims Processing with Visual Documentation',
      icon: '🛡️',
      description: 'Revolutionize insurance documentation with detailed 360° virtual tours for property assessment and claims processing. Our platform enables insurance professionals to conduct thorough remote inspections, document property conditions accurately, and create comprehensive visual records for residential and commercial properties. Streamline workflows, reduce site visit costs, and maintain detailed documentation for risk assessment and claim verification.',
      image: '/insurance-property.jpg',
      features: [
        'Remote property inspections - Conduct detailed assessments without physical site visits',
        'Accurate condition documentation - Create comprehensive visual records for underwriting and claims',
        'Claim verification efficiency - Review property damage and validate claims with immersive documentation',
        'Risk assessment tools - Evaluate properties thoroughly for accurate insurance coverage decisions',
      ],
    },
    {
      id: 'construction',
      title: 'Construction',
      tagline: 'Document Project Evolution from Start to Finish',
      icon: '🏗️',
      description: 'Transform construction project documentation with immersive 360° virtual tours that capture every phase of development. Our platform empowers construction managers, contractors, and developers to create detailed visual records of active construction sites, track progress systematically, and maintain comprehensive project archives. Document structural work, site conditions, and project milestones with professional virtual tours that keep teams aligned and stakeholders informed.',
      image: '/construction-site.jpg',
      features: [
        'Site progress documentation - Capture detailed visual records of construction phases and milestones',
        'Remote site monitoring - Enable stakeholders to review project status without site visits',
        'Quality control tracking - Document work quality and identify issues early in the process',
        'Project timeline archive - Create comprehensive records from groundbreaking to completion',
      ],
    },
    {
      id: 'luxury-vehicles',
      title: 'Luxury Vehicles',
      tagline: 'Premium Presentations for High-End Transportation',
      icon: '🚗',
      description: 'Showcase luxury automobiles with stunning 360° virtual tours that capture every detail of premium vehicles. Our platform enables dealerships, collectors, and luxury car brokers to present high-end vehicles with immersive experiences that highlight exquisite exteriors, refined interiors, and exceptional craftsmanship. Create sophisticated virtual showrooms that attract discerning buyers and elevate your luxury automotive brand.',
      image: '/luxury-vehicle.jpg',
      features: [
        'Exquisite vehicle presentation - Showcase luxury cars with immersive detail and premium quality',
        'Interior craftsmanship focus - Highlight fine materials, design elements, and luxury features',
        'Remote showroom experience - Enable buyers to explore vehicles from anywhere in the world',
        'Exclusive buyer engagement - Attract qualified collectors and enthusiasts with premium presentations',
      ],
    },
    {
      id: 'education',
      title: 'Education',
      tagline: 'Create Engaging Learning Experiences Beyond Classrooms',
      icon: '🎓',
      description: 'Transform education with immersive 360° virtual tours that bring learning spaces and educational environments to life. Our platform enables schools, universities, and educational institutions to create engaging virtual experiences of classrooms, laboratories, libraries, and learning facilities. Enhance student engagement through interactive exploration of educational spaces, making learning more accessible and inspiring for students worldwide.',
      image: '/education-learning.jpg',
      features: [
        'Virtual learning spaces - Showcase educational facilities and create immersive classroom experiences',
        'Interactive exploration - Enable students to explore labs, libraries, and learning environments virtually',
        'Distance learning enhancement - Provide remote students with authentic campus and facility experiences',
        'Educational accessibility - Make learning spaces available to students regardless of physical location',
      ],
    },
    {
      id: 'small-business',
      title: 'Small Business',
      tagline: 'Amplify Your Local Presence and Attract Customers',
      icon: '🏪',
      description: 'Showcase your small business with inviting 360° virtual tours that highlight your unique storefront, retail space, or service location. Our platform helps local businesses, boutiques, cafes, and shops create engaging online experiences that attract customers and build trust. Display your business atmosphere, products, and services with professional virtual tours that drive foot traffic and increase local visibility.',
      image: '/small-business.jpg',
      features: [
        'Storefront showcase - Display your business space and create inviting first impressions online',
        'Local customer attraction - Convert online browsers into walk-in customers with virtual previews',
        'Google Business integration - Enhance local search visibility and discoverability',
        'Authentic brand presence - Show customers your unique atmosphere and business personality',
      ],
    },
    {
      id: 'art-galleries',
      title: 'Art Galleries & Museums',
      tagline: 'Share Cultural Experiences with the World',
      icon: '🎨',
      description: 'Transform how art galleries and museums present exhibitions with immersive 360° virtual tours that capture the beauty of displayed artwork and curated spaces. Our platform enables cultural institutions to create engaging digital experiences that showcase paintings, sculptures, installations, and gallery environments. Share your collections with global audiences, preserve exhibitions digitally, and inspire art lovers worldwide with stunning virtual gallery experiences.',
      image: '/art-gallery.jpg',
      features: [
        'Exhibition showcase - Present artwork and gallery spaces in immersive, high-quality detail',
        'Global audience reach - Share collections with art enthusiasts worldwide instantly',
        'Digital exhibition archive - Preserve temporary shows and create permanent digital records',
        'Enhanced visitor engagement - Inspire future visits with beautiful virtual gallery experiences',
      ],
    },
    {
      id: 'universities',
      title: 'Colleges & Universities',
      tagline: 'Connect with Future Students Through Virtual Campus Experiences',
      icon: '🏫',
      description: 'Showcase your university campus with immersive 360° virtual tours that capture beautiful architecture, historic buildings, and vibrant campus environments. Our platform enables colleges and universities to create engaging virtual experiences that highlight academic facilities, student spaces, campus landmarks, and the unique character of your institution. Connect with prospective students worldwide and inspire them to envision their future on your campus.',
      image: '/university-campus.jpg',
      features: [
        'Campus beauty showcase - Display stunning architecture and historic campus buildings in detail',
        'Global student recruitment - Reach prospective students worldwide with accessible virtual tours',
        'Complete campus experience - Showcase academic buildings, student facilities, and campus atmosphere',
        '24/7 virtual access - Enable families to explore campus anytime from anywhere in the world',
      ],
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section bg-background-light">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-primary-900 mb-6">
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
                <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-lg font-semibold text-primary-700 mb-4">{service.tagline}</p>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-accent-500 flex-shrink-0 mt-0.5"
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
      <section className="section bg-background-light">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-6 text-primary-900">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-xl mb-8 text-neutral-600 max-w-2xl mx-auto">
              Join thousands of professionals creating stunning 360° virtual experiences across every industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:bg-primary-800 transition-colors">
                Start Free Trial
              </a>
              <a
                href="/explore"
                className="px-8 py-4 bg-accent-500 text-white rounded-lg font-semibold text-lg shadow-xl hover:bg-accent-600 transition-colors border-2 border-accent-600"
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
