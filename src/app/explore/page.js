'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamically import TourViewer (contains Three.js)
const TourViewer = dynamic(() => import('@/components/TourViewer'), {
  ssr: false,
})

/**
 * Explore Page - EXACT Kuula Style
 * Browse 360° tours with tabs, grid layout, images and stats
 */
export default function ExplorePage() {
  const [selectedTour, setSelectedTour] = useState(null)
  const [activeTab, setActiveTab] = useState('featured-photos')

  // Sample tour data with user info, stats, and categories
  const allTours = [
    // FEATURED PHOTOS (8 tours - variety of best photos)
    {
      id: 1,
      title: 'Magical Mountain Castle at Sunset',
      description: 'Fantasy castle in mountain peaks',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'photo',
      category: 'featured-photos',
      user: { name: 'Sarah Hunter', initials: 'SH', color: 'bg-purple-600' },
      stats: { reactions: 156, views: 8456 },
    },
    {
      id: 2,
      title: 'Minimal 3D Architectural Design',
      description: 'Modern interior design excellence',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'photo',
      category: 'featured-photos',
      user: { name: 'Fuji Gakseran LLC', initials: 'FG', color: 'bg-blue-600' },
      stats: { reactions: 213, views: 12130 },
    },
    {
      id: 3,
      title: 'Stunning Sunrise Over City',
      description: 'Aerial city view at golden hour',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'photo',
      category: 'featured-photos',
      user: { name: 'Top Yat Hong Kong 360', initials: 'TY', color: 'bg-indigo-600' },
      stats: { reactions: 317, views: 15672 },
    },
    {
      id: 4,
      title: 'Crystal Clear Coastal Waters',
      description: 'Perfect tropical paradise',
      image: '/360-real-ocean.jpg',
      url: '/360-real-ocean.jpg',
      type: 'photo',
      category: 'featured-photos',
      user: { name: 'Coastal Photography', initials: 'CP', color: 'bg-cyan-600' },
      stats: { reactions: 278, views: 18234 },
    },
    {
      id: 5,
      title: 'Untouched Natural Beauty',
      description: 'Serene forest landscape',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'photo',
      category: 'featured-photos',
      user: { name: 'Nature Lens', initials: 'NL', color: 'bg-lime-600' },
      stats: { reactions: 234, views: 14678 },
    },
    {
      id: 6,
      title: 'Historic European Architecture',
      description: 'Timeless architectural design',
      image: '/360-neuer-zollhof-day.jpg',
      url: '/360-neuer-zollhof-day.jpg',
      type: 'photo',
      category: 'featured-photos',
      user: { name: 'Heritage Photos', initials: 'HP', color: 'bg-amber-600' },
      stats: { reactions: 189, views: 11201 },
    },
    {
      id: 7,
      title: 'Evening Cobblestone Street',
      description: 'Charming old town atmosphere',
      image: '/360-cobblestone-night.jpg',
      url: '/360-cobblestone-night.jpg',
      type: 'photo',
      category: 'featured-photos',
      user: { name: 'Street Photography', initials: 'SP', color: 'bg-violet-600' },
      stats: { reactions: 192, views: 10345 },
    },
    {
      id: 8,
      title: 'Alpine Mountain Vista',
      description: 'Breathtaking peak views',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'photo',
      category: 'featured-photos',
      user: { name: 'Mountain Explorer', initials: 'ME', color: 'bg-emerald-600' },
      stats: { reactions: 203, views: 13340 },
    },

    // FEATURED TOURS (8 tours - complete virtual tours)

    // MULTI-SCENE TOUR EXAMPLE - AirPano Style with Multiple Viewpoints
    {
      id: 9,
      title: 'Complete Neuer Zollhof Experience',
      description: 'Multi-scene architectural tour with 5 stunning viewpoints',
      image: '/360-neuer-zollhof-day.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Dreamtory Architect', initials: 'DA', color: 'bg-purple-700' },
      stats: { reactions: 245, views: 15858 },
      // Multi-scene data structure
      scenes: [
        {
          id: 'scene-1',
          title: 'Main Entrance - Daytime',
          description: 'Iconic Gehry buildings in natural daylight',
          url: '/360-neuer-zollhof-day.jpg',
          thumbnail: '/360-neuer-zollhof-day.jpg',
          type: 'photo',
          hotspots: [
            {
              position: [100, 0, 0],
              title: 'Building Details',
              description: 'Frank Gehry\'s architectural masterpiece'
            }
          ]
        },
        {
          id: 'scene-2',
          title: 'Evening View - Golden Hour',
          description: 'Warm sunset lighting on architecture',
          url: '/360-neuer-zollhof-bright.jpg',
          thumbnail: '/360-neuer-zollhof-bright.jpg',
          type: 'photo',
        },
        {
          id: 'scene-3',
          title: 'Night Scene - Illuminated',
          description: 'Stunning night lighting and reflections',
          url: '/360-neuer-zollhof.jpg',
          thumbnail: '/360-neuer-zollhof.jpg',
          type: 'photo',
        },
        {
          id: 'scene-4',
          title: 'Cobblestone Street View',
          description: 'Historic street perspective at night',
          url: '/360-cobblestone-night.jpg',
          thumbnail: '/360-cobblestone-night.jpg',
          type: 'photo',
        },
        {
          id: 'scene-5',
          title: 'Lounge Bar Interior',
          description: 'Elegant interior space',
          url: '/360-lounge-bar.jpg',
          thumbnail: '/360-lounge-bar.jpg',
          type: 'photo',
        }
      ]
    },

    {
      id: 10,
      title: 'Contemporary Architectural Space',
      description: 'Modern building walkthrough',
      image: '/360-neuer-zollhof-day.jpg',
      url: '/360-neuer-zollhof-day.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Urban Architecture', initials: 'UA', color: 'bg-slate-700' },
      stats: { reactions: 145, views: 9858 },
    },
    {
      id: 11,
      title: 'Luxury Beachfront Property Tour',
      description: 'Coastal real estate showcase',
      image: '/360-real-ocean.jpg',
      url: '/360-real-ocean.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Beach Realty 360', initials: 'BR', color: 'bg-sky-700' },
      stats: { reactions: 267, views: 21234 },
    },
    {
      id: 12,
      title: 'Modern Home Interior Showcase',
      description: 'Premium residential design',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Home Tours Pro', initials: 'HT', color: 'bg-pink-700' },
      stats: { reactions: 198, views: 14823 },
    },
    {
      id: 13,
      title: 'Downtown Urban Experience',
      description: 'City center exploration',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Urban Tours', initials: 'UT', color: 'bg-indigo-700' },
      stats: { reactions: 223, views: 18945 },
    },
    {
      id: 14,
      title: 'Mountain Resort Complete Tour',
      description: 'Alpine lodge experience',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Resort Tours Inc', initials: 'RT', color: 'bg-teal-700' },
      stats: { reactions: 176, views: 12567 },
    },
    {
      id: 15,
      title: 'Nature Reserve Walkthrough',
      description: 'Eco-tourism experience',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Eco Tours', initials: 'ET', color: 'bg-green-700' },
      stats: { reactions: 189, views: 13456 },
    },
    {
      id: 16,
      title: 'Historic District Walking Tour',
      description: 'Step back in time',
      image: '/360-neuer-zollhof-day.jpg',
      url: '/360-neuer-zollhof-day.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'History Tours', initials: 'HT', color: 'bg-yellow-700' },
      stats: { reactions: 134, views: 8765 },
    },
    {
      id: 17,
      title: 'Nightlife Street Experience',
      description: 'Evening city atmosphere',
      image: '/360-cobblestone-night.jpg',
      url: '/360-cobblestone-night.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Night Tours', initials: 'NT', color: 'bg-purple-700' },
      stats: { reactions: 156, views: 9890 },
    },

    // MOST LIKED (8 tours - highest engagement content)
    {
      id: 18,
      title: 'Tropical Beach Paradise',
      description: 'Perfect ocean escape',
      image: '/360-real-ocean.jpg',
      url: '/360-real-ocean.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Island Views', initials: 'IV', color: 'bg-teal-600' },
      stats: { reactions: 523, views: 25678 },
    },
    {
      id: 19,
      title: 'Sunset Mountain Vista',
      description: 'Golden hour perfection',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Golden Hour Photos', initials: 'GH', color: 'bg-yellow-600' },
      stats: { reactions: 489, views: 20123 },
    },
    {
      id: 20,
      title: 'Metropolitan City Skyline',
      description: 'Iconic urban view',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Metro Views', initials: 'MV', color: 'bg-blue-600' },
      stats: { reactions: 478, views: 22345 },
    },
    {
      id: 21,
      title: 'Alpine Mountain Lodge',
      description: 'Stunning mountain retreat',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Alpine Photos', initials: 'AP', color: 'bg-slate-600' },
      stats: { reactions: 445, views: 19234 },
    },
    {
      id: 22,
      title: 'Architectural Masterpiece',
      description: 'Award-winning design',
      image: '/360-neuer-zollhof-day.jpg',
      url: '/360-neuer-zollhof-day.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Design Awards', initials: 'DA', color: 'bg-orange-600' },
      stats: { reactions: 398, views: 17234 },
    },
    {
      id: 23,
      title: 'Designer Penthouse Interior',
      description: 'Ultra-modern luxury living',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Luxury Spaces', initials: 'LS', color: 'bg-red-600' },
      stats: { reactions: 356, views: 16789 },
    },
    {
      id: 24,
      title: 'Forest Nature Sanctuary',
      description: 'Peaceful natural retreat',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Forest Photography', initials: 'FP', color: 'bg-emerald-600' },
      stats: { reactions: 334, views: 14890 },
    },
    {
      id: 25,
      title: 'Historic Old Town Night',
      description: 'Preserved heritage site',
      image: '/360-cobblestone-night.jpg',
      url: '/360-cobblestone-night.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Heritage Sites', initials: 'HS', color: 'bg-amber-600' },
      stats: { reactions: 312, views: 13567 },
    },

    // COLLECTIONS (8 tours - curated themed collections)
    {
      id: 26,
      title: 'European Architecture Collection',
      description: 'Historic buildings tour',
      image: '/360-neuer-zollhof-day.jpg',
      url: '/360-neuer-zollhof-day.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Architecture',
      user: { name: 'Heritage Collection', initials: 'HC', color: 'bg-amber-500' },
      stats: { reactions: 234, views: 15234 },
    },
    {
      id: 27,
      title: 'World Cities Travel Collection',
      description: 'Urban gems worldwide',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Travel',
      user: { name: 'City Explorer', initials: 'CE', color: 'bg-indigo-500' },
      stats: { reactions: 298, views: 18890 },
    },
    {
      id: 28,
      title: 'Coastal Destinations Showcase',
      description: 'Best beaches worldwide',
      image: '/360-real-ocean.jpg',
      url: '/360-real-ocean.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Travel',
      user: { name: 'Beach Destinations', initials: 'BD', color: 'bg-cyan-500' },
      stats: { reactions: 278, views: 16234 },
    },
    {
      id: 29,
      title: 'Mountain Adventure Collection',
      description: 'Complete trail guide',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Adventure',
      user: { name: 'Trail Guides', initials: 'TG', color: 'bg-green-500' },
      stats: { reactions: 245, views: 14234 },
    },
    {
      id: 30,
      title: 'Interior Design Portfolio',
      description: 'Best of modern interiors',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Design',
      user: { name: 'Design Collective', initials: 'DC', color: 'bg-pink-500' },
      stats: { reactions: 189, views: 12567 },
    },
    {
      id: 31,
      title: 'Nature Wonders Collection',
      description: 'Earth\'s natural beauty',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Nature',
      user: { name: 'Nature Wonders', initials: 'NW', color: 'bg-lime-500' },
      stats: { reactions: 212, views: 13678 },
    },
    {
      id: 32,
      title: 'Night Photography Series',
      description: 'After dark magic',
      image: '/360-cobblestone-night.jpg',
      url: '/360-cobblestone-night.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Photography',
      user: { name: 'Night Shots', initials: 'NS', color: 'bg-violet-500' },
      stats: { reactions: 198, views: 11456 },
    },
    {
      id: 33,
      title: 'Premium Real Estate Portfolio',
      description: 'Luxury properties showcase',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Real Estate',
      user: { name: 'Property Tours', initials: 'PT', color: 'bg-rose-500' },
      stats: { reactions: 223, views: 14789 },
    },
  ]

  // Filter and sort tours based on active tab
  const getFilteredTours = () => {
    let filtered = [...allTours]

    switch (activeTab) {
      case 'featured-photos':
        // Show only photos that are featured
        filtered = filtered.filter(tour => tour.category === 'featured-photos')
        break

      case 'featured-tours':
        // Show only tours that are featured
        filtered = filtered.filter(tour => tour.category === 'featured-tours')
        break

      case 'most-liked':
        // Sort by reactions (most liked first)
        filtered = filtered.filter(tour => tour.category === 'most-liked')
        filtered.sort((a, b) => b.stats.reactions - a.stats.reactions)
        break

      case 'collections':
        // Show tours that belong to collections
        filtered = filtered.filter(tour => tour.category === 'collections')
        break

      default:
        filtered = filtered
    }

    return filtered
  }

  const tours = getFilteredTours()

  const tabs = [
    { id: 'featured-photos', label: 'Featured Photos' },
    { id: 'featured-tours', label: 'Featured Tours' },
    { id: 'most-liked', label: 'Most Liked' },
    { id: 'collections', label: 'Collections' },
  ]

  return (
    <div className="min-h-screen pt-20 bg-neutral-50 w-full max-w-full overflow-x-hidden">
      {/* Top Navigation Tabs - Kuula Style with Mobile Scroll */}
      <div className="bg-white border-b border-neutral-200 sticky top-20 z-40 w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-8 overflow-x-auto scrollbar-hide pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 sm:px-4 py-4 sm:py-5 font-medium text-sm sm:text-[15px] transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tours Grid - EXACT Kuula Style (4 columns with IMAGES) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedTour(tour)}
            >
              {/* Tour Image with 360° Badge */}
              <div className="relative w-full h-48 bg-neutral-200 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* 360° Badge */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
                  360°
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-neutral-900 text-[15px] mb-2 line-clamp-2 leading-tight">
                  {tour.title}
                </h3>

                {/* User Info */}
                <div className="flex items-center gap-2 mb-3">
                  {/* Avatar with colored background */}
                  <div className={`w-6 h-6 rounded-full ${tour.user.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {tour.user.initials}
                  </div>
                  {/* Username */}
                  <span className="text-neutral-600 text-xs truncate">
                    {tour.user.name}
                  </span>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between text-neutral-500 text-sm">
                  <div className="flex items-center gap-4">
                    {/* Reactions (Heart) */}
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-xs">{tour.stats.reactions}</span>
                    </div>
                    {/* Views (Eye) */}
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-xs">{tour.stats.views.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Bookmark */}
                    <button
                      className="hover:text-primary-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                    {/* Menu (3 dots) */}
                    <button
                      className="hover:text-neutral-900 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
