'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import TourCard from '@/components/TourCard'

// Dynamically import TourViewer (contains Three.js)
const TourViewer = dynamic(() => import('@/components/TourViewer'), {
  ssr: false,
})

/**
 * Explore Page
 * Browse and view 360° tours with filtering and search
 */
export default function ExplorePage() {
  const [selectedTour, setSelectedTour] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Sample 360° VR tour data (Mock data - replace with real tours later)
  const tours = [
    {
      id: 1,
      title: 'Ocean Paradise 360°',
      description: 'Immerse yourself in crystal-clear ocean waters with stunning coral reefs and marine life.',
      image: '/360-real-ocean.jpg',
      url: '/360-real-ocean.jpg',
      type: 'photo',
      category: 'travel',
      tags: ['Ocean', 'Beach', 'Paradise', 'Nature'],
      hotspots: [
        {
          position: [100, 0, 0],
          title: 'Coral Reef',
          description: 'Vibrant coral formations teeming with tropical fish',
        },
        {
          position: [-100, 20, 50],
          title: 'Horizon View',
          description: 'Endless ocean meeting the sky',
        },
        {
          position: [0, -50, 100],
          title: 'Sandy Beach',
          description: 'Pristine white sand beach shore',
        },
      ],
    },
    {
      id: 2,
      title: 'Mountain Summit 360°',
      description: 'Stand atop majestic mountain peaks and experience breathtaking panoramic views.',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'photo',
      category: 'travel',
      tags: ['Mountains', 'Adventure', 'Nature', 'Hiking'],
      hotspots: [
        {
          position: [80, 0, -80],
          title: 'North Peak',
          description: 'Snow-capped peak at 4000m elevation',
        },
        {
          position: [-80, 30, 0],
          title: 'Valley Below',
          description: 'Lush green valley stretching for miles',
        },
      ],
    },
    {
      id: 3,
      title: 'Modern City Skyline 360°',
      description: 'Explore stunning urban architecture and city lights from a rooftop perspective.',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'photo',
      category: 'realestate',
      tags: ['City', 'Architecture', 'Urban', 'Skyline'],
      hotspots: [
        {
          position: [120, 10, 0],
          title: 'Downtown District',
          description: 'Modern skyscrapers and business centers',
        },
        {
          position: [-90, 0, 60],
          title: 'Harbor View',
          description: 'City harbor with boats and waterfront',
        },
      ],
    },
    {
      id: 4,
      title: 'Nature Trail 360°',
      description: 'Walk through serene forest paths with stunning natural beauty all around.',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'photo',
      category: 'travel',
      tags: ['Nature', 'Forest', 'Trail', 'Hiking'],
      hotspots: [
        {
          position: [100, 0, 0],
          title: 'Forest Path',
          description: 'Lush green forest trail ahead',
        },
        {
          position: [-80, 20, 60],
          title: 'Mountain View',
          description: 'Distant peaks visible through the trees',
        },
      ],
    },
    {
      id: 5,
      title: 'Luxury Apartment Interior 360°',
      description: 'Tour a premium penthouse with modern design and city views.',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'photo',
      category: 'realestate',
      tags: ['Apartment', 'Luxury', 'Interior', 'Real Estate'],
      hotspots: [
        {
          position: [80, 0, -80],
          title: 'Living Room',
          description: 'Spacious living area with panoramic windows',
        },
        {
          position: [-70, 0, 50],
          title: 'Kitchen',
          description: 'State-of-the-art modern kitchen',
        },
      ],
    },
    {
      id: 6,
      title: 'Tropical Resort 360°',
      description: 'Experience paradise at a luxury beach resort with infinity pools.',
      image: '/360-real-ocean.jpg',
      url: '/360-real-ocean.jpg',
      type: 'photo',
      category: 'travel',
      tags: ['Resort', 'Luxury', 'Beach', 'Vacation'],
      hotspots: [
        {
          position: [100, -20, 0],
          title: 'Infinity Pool',
          description: 'Stunning pool overlooking the ocean',
        },
      ],
    },
    {
      id: 7,
      title: 'Art Gallery Exhibition 360°',
      description: 'Explore world-class art collections in an immersive gallery setting.',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'photo',
      category: 'culture',
      tags: ['Art', 'Gallery', 'Museum', 'Exhibition'],
      hotspots: [
        {
          position: [90, 0, 0],
          title: 'Modern Art Section',
          description: 'Contemporary artworks and installations',
        },
        {
          position: [-90, 0, 60],
          title: 'Classical Paintings',
          description: 'Historic masterpieces collection',
        },
      ],
    },
    {
      id: 8,
      title: 'Historic Museum Tour 360°',
      description: 'Discover ancient artifacts and cultural heritage in this museum experience.',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'photo',
      category: 'culture',
      tags: ['Museum', 'History', 'Culture', 'Heritage'],
      hotspots: [
        {
          position: [80, 10, -70],
          title: 'Ancient Artifacts',
          description: 'Historical relics from various civilizations',
        },
        {
          position: [-70, 0, 80],
          title: 'Cultural Exhibits',
          description: 'Traditional art and cultural displays',
        },
      ],
    },
    {
      id: 9,
      title: 'Luxury Spa & Wellness 360°',
      description: 'Step into tranquility with this premium spa and wellness center tour.',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'photo',
      category: 'lifestyle',
      tags: ['Spa', 'Wellness', 'Luxury', 'Relaxation'],
      hotspots: [
        {
          position: [100, 0, 0],
          title: 'Treatment Rooms',
          description: 'Private spa treatment areas',
        },
        {
          position: [-80, -10, 60],
          title: 'Relaxation Lounge',
          description: 'Peaceful relaxation spaces',
        },
      ],
    },
    {
      id: 10,
      title: 'Modern Fitness Center 360°',
      description: 'Tour a state-of-the-art fitness facility with premium equipment.',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'photo',
      category: 'lifestyle',
      tags: ['Fitness', 'Gym', 'Health', 'Lifestyle'],
      hotspots: [
        {
          position: [90, 0, -60],
          title: 'Cardio Zone',
          description: 'Modern cardio equipment area',
        },
        {
          position: [-90, 10, 70],
          title: 'Weight Training',
          description: 'Free weights and strength equipment',
        },
      ],
    },
    {
      id: 11,
      title: 'Gourmet Restaurant 360°',
      description: 'Experience fine dining ambiance in this upscale restaurant setting.',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'photo',
      category: 'lifestyle',
      tags: ['Restaurant', 'Fine Dining', 'Gourmet', 'Food'],
      hotspots: [
        {
          position: [80, 0, 0],
          title: 'Main Dining Area',
          description: 'Elegant dining space with premium seating',
        },
        {
          position: [-70, 20, 50],
          title: 'Private Dining',
          description: 'Exclusive private dining rooms',
        },
      ],
    },
    {
      id: 12,
      title: 'Countryside Villa 360°',
      description: 'Explore a peaceful countryside retreat with scenic mountain views.',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'photo',
      category: 'travel',
      tags: ['Villa', 'Countryside', 'Retreat', 'Nature'],
      hotspots: [
        {
          position: [100, 0, 0],
          title: 'Mountain Panorama',
          description: 'Breathtaking views of surrounding peaks',
        },
        {
          position: [-90, -20, 80],
          title: 'Garden Terrace',
          description: 'Beautiful landscaped outdoor spaces',
        },
      ],
    },
    {
      id: 13,
      title: 'Downtown Penthouse 360°',
      description: 'Luxury high-rise living with panoramic city views.',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'photo',
      category: 'realestate',
      tags: ['Penthouse', 'Luxury', 'City', 'Apartment'],
      hotspots: [
        {
          position: [100, 20, 0],
          title: 'Floor-to-Ceiling Windows',
          description: 'Stunning city skyline views',
        },
        {
          position: [-80, 0, 70],
          title: 'Modern Interiors',
          description: 'Contemporary design and finishes',
        },
      ],
    },
    {
      id: 14,
      title: 'Cultural Heritage Site 360°',
      description: 'Journey through ancient architecture and historical landmarks.',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'photo',
      category: 'culture',
      tags: ['Heritage', 'History', 'Architecture', 'Landmarks'],
      hotspots: [
        {
          position: [90, 0, -60],
          title: 'Ancient Structure',
          description: 'Historic architectural marvel',
        },
        {
          position: [-90, 20, 50],
          title: 'Heritage Courtyard',
          description: 'Traditional architectural elements',
        },
      ],
    },
    {
      id: 15,
      title: 'Cozy Coffee Shop 360°',
      description: 'Immerse yourself in the warm atmosphere of a charming café.',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'photo',
      category: 'lifestyle',
      tags: ['Café', 'Coffee', 'Cozy', 'Social'],
      hotspots: [
        {
          position: [80, 0, 0],
          title: 'Seating Area',
          description: 'Comfortable café seating with warm ambiance',
        },
        {
          position: [-70, 10, 60],
          title: 'Barista Counter',
          description: 'Coffee preparation and service area',
        },
      ],
    },
  ]

  const categories = [
    { id: 'all', label: 'All Tours' },
    { id: 'travel', label: 'Travel' },
    { id: 'realestate', label: 'Real Estate' },
    { id: 'culture', label: 'Culture' },
    { id: 'lifestyle', label: 'Lifestyle' },
  ]

  // Filter tours based on search and category
  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === 'all' || tour.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleTourClick = (tour) => {
    setSelectedTour(tour)
  }

  const handleCloseTour = () => {
    setSelectedTour(null)
  }

  const handleNextTour = () => {
    const currentIndex = tours.findIndex((t) => t.id === selectedTour.id)
    const nextIndex = (currentIndex + 1) % tours.length
    setSelectedTour(tours[nextIndex])
  }

  const handlePrevTour = () => {
    const currentIndex = tours.findIndex((t) => t.id === selectedTour.id)
    const prevIndex = currentIndex === 0 ? tours.length - 1 : currentIndex - 1
    setSelectedTour(tours[prevIndex])
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Explore Virtual Tours
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover immersive 360° experiences from around the world.
              Click any tour to start exploring.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section pt-8">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search tours, locations, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input text-lg"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-neutral-600">
            Showing <span className="font-bold">{filteredTours.length}</span> tour
            {filteredTours.length !== 1 ? 's' : ''}
          </div>

          {/* Tours Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onClick={() => handleTourClick(tour)}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredTours.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                No tours found
              </h3>
              <p className="text-neutral-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tour Viewer Modal */}
      {selectedTour && (
        <TourViewer
          tour={selectedTour}
          onClose={handleCloseTour}
          onNext={handleNextTour}
          onPrev={handlePrevTour}
        />
      )}
    </div>
  )
}
