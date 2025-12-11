'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [activeTab, setActiveTab] = useState('featured-tours')
  const [isLoading, setIsLoading] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [likedTours, setLikedTours] = useState({})
  const [bookmarkedTours, setBookmarkedTours] = useState({})
  const [showToast, setShowToast] = useState(null)
  const [selectedCollection, setSelectedCollection] = useState(null) // For viewing tours in a collection

  // Sample tour data with user info, stats, and categories
  const allTours = [
    // ============================================
    // FEATURED TOURS
    // ============================================
    {
      id: 1,
      title: 'Modern Evening Street',
      description: 'Stunning European office street at dusk with soft evening light, cool tones, and warm streetlamps. Experience the peaceful ambiance of modern urban architecture in this high-quality 8K 360° panorama.',
      image: '/modern_evening_street.jpg',
      url: '/modern_evening_street.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Grzegorz Wronkowski',
        initials: 'GW',
        color: 'bg-indigo-700'
      },
      stats: { reactions: 523, views: 26310 },
    },
    {
      id: 4,
      title: 'Afrikaans Church Exterior',
      description: 'Historic Dutch church in Cape Town with beautiful white architecture and soft morning light. Stunning 4K 360° panorama featuring low-contrast partly cloudy sky, asphalt foreground, and green paved walkways.',
      image: '/afrikaans_church_preview.jpg',
      url: '/afrikaans_church_exterior.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Dimitrios Savva',
        initials: 'DS',
        color: 'bg-amber-700'
      },
      stats: { reactions: 389, views: 9129 },
    },
    {
      id: 7,
      title: 'Afrikaans Church Interior',
      description: 'Stunning interior of a historic Dutch church in Cape Town featuring high wooden curved ceilings, red carpeted aisles, traditional pews, and beautiful warm morning light streaming through windows. High-contrast 4K 360° panorama.',
      image: '/afrikaans_church_interior_preview.jpg',
      url: '/afrikaans_church_interior.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Dimitrios Savva',
        initials: 'DS',
        color: 'bg-red-700'
      },
      stats: { reactions: 267, views: 3462 },
    },
    {
      id: 10,
      title: 'Cobblestone Street Night',
      description: 'Atmospheric German cobblestone street at night with warm lamp lighting, dramatic high-contrast shadows, and charming narrow alley ambiance. Experience the romantic European nighttime street scene in stunning 4K 360° panorama.',
      image: '/cobblestone_street_night_preview.jpg',
      url: '/cobblestone_street_night.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-slate-700'
      },
      stats: { reactions: 823, views: 133153 },
    },
    {
      id: 13,
      title: 'Empty Play Room',
      description: 'Spacious indoor play room with morning sunlight streaming through windows, featuring carpeted floors, table tennis area, curtains, and warm wood surfaces. Medium-contrast 4K 360° panorama combining natural and fluorescent lighting.',
      image: '/empty_play_room_preview.jpg',
      url: '/empty_play_room.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-teal-700'
      },
      stats: { reactions: 567, views: 83460 },
    },
    {
      id: 16,
      title: 'Evening Museum Courtyard',
      description: 'Beautiful museum courtyard at twilight in Czech Republic featuring modern concrete architecture, warm street and bar lights, and soft evening sky. Low-contrast urban scene with stunning 29K quality 360° panorama combining natural twilight and artificial lighting.',
      image: '/evening_museum_courtyard_preview.jpg',
      url: '/evening_museum_courtyard.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Grzegorz Wronkowski',
        initials: 'GW',
        color: 'bg-violet-700'
      },
      stats: { reactions: 456, views: 12105 },
    },
    {
      id: 19,
      title: 'Ferndale Studio 12',
      description: 'Professional indoor studio environment featuring neon tube lamps with cool blue-magenta tones and soft key lighting. Medium-contrast 360° panorama with 12 EV dynamic range, perfect for product photography and portrait renders. White-balanced at 5600K for accurate color reproduction.',
      image: '/ferndale_studio_12_preview.jpg',
      url: '/ferndale_studio_12.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Dimitrios Savva',
        initials: 'DS',
        color: 'bg-cyan-700'
      },
      stats: { reactions: 234, views: 5670 },
    },
    {
      id: 22,
      title: 'Sunny Country Road',
      description: 'Breathtaking midday country road in Czech Republic featuring bright sun with high-contrast lighting, scattered clouds, warm highlights, and crisp tree shadows on grass and asphalt. Ultra-high quality 29K unclipped 360° panorama with exceptional 27 EV dynamic range.',
      image: '/sunny_country_road_preview.jpg',
      url: '/sunny_country_road.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Grzegorz Wronkowski',
        initials: 'GW',
        color: 'bg-yellow-700'
      },
      stats: { reactions: 892, views: 39551 },
    },
    {
      id: 25,
      title: 'Outdoor Chapel',
      description: 'Airy outdoor chapel with warm morning-afternoon light and transparent roof, perfect for wedding renders. Features medium contrast natural lighting with 12 EV dynamic range. Ultra-high quality 20K unclipped 360° panorama with 5641K white balance for authentic atmosphere.',
      image: '/outdoor_chapel_preview.jpg',
      url: '/outdoor_chapel.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Dimitrios Savva',
        initials: 'DS',
        color: 'bg-pink-700'
      },
      stats: { reactions: 445, views: 8833 },
    },
    {
      id: 28,
      title: 'Victoria Sunset',
      description: 'Stunning Cape Town coastal road at sunset with warm low sun, partly cloudy sky, and ocean views. Features beautiful mountain rim lighting with medium contrast. Ultra-high quality 24K unclipped 360° panorama with exceptional 22 EV dynamic range and 5313K warm color temperature.',
      image: '/victoria_sunset_preview.jpg',
      url: '/victoria_sunset.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-orange-700'
      },
      stats: { reactions: 1234, views: 56367 },
    },
    {
      id: 31,
      title: 'Golden Bay',
      description: 'Warm high-contrast waterfront evening in Germany with golden street lamps reflecting beautifully on calm waters beneath a deep blue twilight sky. Ultra-high quality 24K unclipped 360° panorama with 18 EV dynamic range and 3600K warm white balance creating magical evening atmosphere.',
      image: '/golden_bay_preview.jpg',
      url: '/golden_bay.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-blue-700'
      },
      stats: { reactions: 1567, views: 86154 },
    },
    {
      id: 34,
      title: 'Blaubeuren Church Square',
      description: 'Enchanting snowy European church square at night in Blaubeuren, Germany featuring warm street lamps and festive Christmas lights under overcast sky. Medium-contrast artificial lighting creates magical winter atmosphere. Ultra-high quality 20K unclipped 360° panorama with 17 EV dynamic range.',
      image: '/blaubeuren_church_square_preview.jpg',
      url: '/blaubeuren_church_square.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Andreas Mischok',
        initials: 'AM',
        color: 'bg-slate-700'
      },
      stats: { reactions: 1123, views: 63854 },
    },
    {
      id: 37,
      title: 'Rathaus',
      description: 'Atmospheric overcast European square at night in Hamburg, Germany featuring warm street lamps and wet reflective paving creating moody ambiance. Medium-contrast natural lighting with 15 EV dynamic range. Ultra-high quality 16K unclipped 360° panorama capturing the essence of European nighttime urban atmosphere.',
      image: '/rathaus_preview.jpg',
      url: '/rathaus.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-stone-700'
      },
      stats: { reactions: 1345, views: 73238 },
    },
    {
      id: 40,
      title: 'Derelict Overpass',
      description: 'Bright high-contrast derelict overpass with warm directional sunlight creating long dramatic shadows, partly cloudy sky, and crisp asphalt reflections. Exceptional 21 EV dynamic range with 5400K color temperature. Ultra-high quality 16K unclipped 360° panorama perfect for urban exploration and industrial visualization.',
      image: '/derelict_overpass_preview.jpg',
      url: '/derelict_overpass.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-gray-700'
      },
      stats: { reactions: 2134, views: 125907 },
    },
    {
      id: 43,
      title: 'Park Music Stage',
      description: 'Beautiful park music stage amphitheater in Opole, Poland featuring wooden ceiling, amphitheater stairs, and lush trees. Partly cloudy morning-afternoon light with high-contrast shadows creating natural ambiance. Ultra-high quality 29K unclipped 360° panorama with exceptional 24 EV dynamic range and 5400K daylight balance.',
      image: '/park_music_stage_preview.jpg',
      url: '/park_music_stage.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Grzegorz Wronkowski',
        initials: 'GW',
        color: 'bg-emerald-700'
      },
      stats: { reactions: 456, views: 8190 },
    },
    {
      id: 46,
      title: 'Glencairn Expressway',
      description: 'Scenic overcast midday straight asphalt road in South Africa with scrubby bushes and natural landscape. Soft low-contrast natural lighting creating serene atmosphere. Ultra-high quality 24K unclipped 360° panorama with 12 EV dynamic range and 5303K white balance, perfect for automotive and outdoor visualization.',
      image: '/glencairn_expressway_preview.jpg',
      url: '/glencairn_expressway.hdr',
      type: 'tour',
      category: 'featured-tours',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-teal-700'
      },
      stats: { reactions: 523, views: 9376 },
    },

    // ============================================
    // MOST LIKED
    // ============================================
    {
      id: 2,
      title: 'Modern Evening Street - Premium',
      description: 'Award-winning 360° capture of a European street at dusk. Features stunning natural lighting, modern architecture, and atmospheric evening ambiance. Perfect for architectural visualization and urban design.',
      image: '/modern_evening_street.jpg',
      url: '/modern_evening_street.jpg',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Grzegorz Wronkowski',
        initials: 'GW',
        color: 'bg-blue-600'
      },
      stats: { reactions: 892, views: 43250 },
    },
    {
      id: 5,
      title: 'Historic Church - Cape Town',
      description: 'Premium 360° view of a magnificent white Dutch Reformed church in South Africa. Captured during golden hour with soft natural lighting, partly cloudy skies, and stunning architectural details. Perfect for historical and architectural projects.',
      image: '/afrikaans_church_preview.jpg',
      url: '/afrikaans_church_exterior.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Dimitrios Savva',
        initials: 'DS',
        color: 'bg-cyan-600'
      },
      stats: { reactions: 745, views: 15890 },
    },
    {
      id: 8,
      title: 'Sacred Church Interior - Cape Town',
      description: 'Premium 360° experience inside a magnificent Dutch Reformed church. Marvel at the high wooden curved ceiling, elegant pulpit, traditional pews with red carpet, and the warm atmospheric lighting. High-contrast interior photography at its finest.',
      image: '/afrikaans_church_interior_preview.jpg',
      url: '/afrikaans_church_interior.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Dimitrios Savva',
        initials: 'DS',
        color: 'bg-rose-600'
      },
      stats: { reactions: 623, views: 12450 },
    },
    {
      id: 11,
      title: 'Romantic Night Street - Germany',
      description: 'Award-winning 360° night photography of a historic German cobblestone alley. Features stunning warm street lamps, deep dramatic shadows, clear night sky, and authentic European charm. Perfect for cinematic and atmospheric projects with 18 EVs dynamic range.',
      image: '/cobblestone_street_night_preview.jpg',
      url: '/cobblestone_street_night.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-amber-600'
      },
      stats: { reactions: 967, views: 145230 },
    },
    {
      id: 14,
      title: 'Indoor Recreation Space - Play Room',
      description: 'Premium 360° interior of a modern recreational space perfect for architectural visualization. Features beautiful morning light, mixed natural and artificial lighting, brick accent walls, warm wood details, and spacious carpeted areas. Medium contrast with 12 EV dynamic range.',
      image: '/empty_play_room_preview.jpg',
      url: '/empty_play_room.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-green-600'
      },
      stats: { reactions: 689, views: 92340 },
    },
    {
      id: 17,
      title: 'Museum Courtyard at Dusk - Premium',
      description: 'Exceptional twilight photography of a contemporary museum courtyard in Pardubice. Features industrial modern architecture with warm ambient bar lighting against soft evening sky. Ultra high-resolution 29K capture with 12 EV dynamic range, perfect for architectural visualization and ambient lighting studies.',
      image: '/evening_museum_courtyard_preview.jpg',
      url: '/evening_museum_courtyard.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Grzegorz Wronkowski',
        initials: 'GW',
        color: 'bg-purple-600'
      },
      stats: { reactions: 578, views: 18340 },
    },
    {
      id: 20,
      title: 'Premium Studio Photography Environment',
      description: 'Award-winning professional photography studio with exceptional neon tube lighting setup in cool blue-magenta spectrum. Features soft key light with medium contrast, perfect for product renders, portrait photography, and commercial visualization. Ultra-high quality 16K resolution with precise 5600K white balance and 12 EV dynamic range.',
      image: '/ferndale_studio_12_preview.jpg',
      url: '/ferndale_studio_12.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Dimitrios Savva',
        initials: 'DS',
        color: 'bg-indigo-600'
      },
      stats: { reactions: 812, views: 19450 },
    },
    {
      id: 23,
      title: 'Pristine Country Road - Premium',
      description: 'Exceptional outdoor photography of a scenic country road at midday. Features brilliant sunshine, dramatic high-contrast shadows, lush green grass, scattered clouds, and crisp tree details. Unclipped 29K resolution with incredible 27 EV dynamic range captured in Czech Republic. Perfect for automotive renders and outdoor visualization.',
      image: '/sunny_country_road_preview.jpg',
      url: '/sunny_country_road.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Grzegorz Wronkowski',
        initials: 'GW',
        color: 'bg-lime-600'
      },
      stats: { reactions: 1245, views: 67890 },
    },
    {
      id: 26,
      title: 'Premium Wedding Chapel - Outdoor',
      description: 'Stunning outdoor chapel perfect for wedding and ceremony visualization. Features beautiful warm morning-afternoon natural lighting, transparent roof creating soft illumination, and medium contrast ambiance. Ultra-high resolution 20K unclipped capture with 12 EV dynamic range and professional 5641K white balance.',
      image: '/outdoor_chapel_preview.jpg',
      url: '/outdoor_chapel.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Dimitrios Savva',
        initials: 'DS',
        color: 'bg-rose-600'
      },
      stats: { reactions: 734, views: 15670 },
    },
    {
      id: 29,
      title: 'Cape Town Coastal Sunset - Premium',
      description: 'Award-winning coastal sunset photography from Cape Town, South Africa. Features breathtaking warm low sun angle, ocean views, mountain rim lighting, and partly cloudy sky creating dramatic atmosphere. Ultra-high quality 24K unclipped panorama with exceptional 22 EV dynamic range. Perfect for automotive, architectural, and cinematic visualization.',
      image: '/victoria_sunset_preview.jpg',
      url: '/victoria_sunset.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-amber-700'
      },
      stats: { reactions: 1678, views: 89340 },
    },
    {
      id: 32,
      title: 'Waterfront Evening - Golden Bay Premium',
      description: 'Exceptional waterfront pier photography at twilight in Germany. Features stunning golden street lamps casting warm reflections on calm water surface, high-contrast evening lighting, and deep blue twilight sky. Ultra-high quality 24K unclipped panorama with 18 EV dynamic range and 3600K warm color temperature. Perfect for architectural, cinematic, and atmospheric visualization projects.',
      image: '/golden_bay_preview.jpg',
      url: '/golden_bay.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-sky-700'
      },
      stats: { reactions: 1892, views: 112450 },
    },
    {
      id: 35,
      title: 'Winter Church Square - Premium',
      description: 'Award-winning snowy church square photography in Blaubeuren, Germany. Features magical winter night atmosphere with warm street and Christmas lights illuminating snow-covered square beneath overcast sky. Medium-contrast artificial lighting creates enchanting festive ambiance. Ultra-high quality 20K unclipped 360° panorama with 17 EV dynamic range, perfect for winter scenes and holiday visualization.',
      image: '/blaubeuren_church_square_preview.jpg',
      url: '/blaubeuren_church_square.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Andreas Mischok',
        initials: 'AM',
        color: 'bg-gray-700'
      },
      stats: { reactions: 1456, views: 78920 },
    },
    {
      id: 38,
      title: 'Hamburg Square Night - Rathaus Premium',
      description: 'Exceptional moody urban square photography in Hamburg, Germany. Features atmospheric overcast night scene with warm street lamps illuminating wet reflective paving, creating dramatic European ambiance. Medium-contrast natural lighting with 15 EV dynamic range. Ultra-high quality 16K unclipped 360° panorama, perfect for architectural, cinematic, and atmospheric urban visualization projects.',
      image: '/rathaus_preview.jpg',
      url: '/rathaus.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-zinc-700'
      },
      stats: { reactions: 1678, views: 95670 },
    },
    {
      id: 41,
      title: 'Urban Decay - Derelict Overpass Premium',
      description: 'Award-winning industrial urban photography featuring derelict overpass with dramatic bright high-contrast sunlight. Exceptional warm directional light casting long shadows on crisp asphalt with beautiful reflections beneath partly cloudy sky. Ultra-high quality 16K unclipped 360° panorama with incredible 21 EV dynamic range and 5400K color temperature. Perfect for urban exploration, industrial, and architectural visualization projects.',
      image: '/derelict_overpass_preview.jpg',
      url: '/derelict_overpass.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-neutral-700'
      },
      stats: { reactions: 2456, views: 145230 },
    },
    {
      id: 44,
      title: 'Outdoor Amphitheater - Park Music Stage Premium',
      description: 'Award-winning outdoor concert venue photography in Opole, Poland. Features stunning wooden ceiling amphitheater with theatre stairs surrounded by lush botanical trees. Partly cloudy natural daylight with high-contrast shadows creating perfect ambiance. Ultra-high quality 29K unclipped 360° panorama with exceptional 24 EV dynamic range and 5400K daylight balance. Perfect for concert venues, event planning, and outdoor architecture visualization.',
      image: '/park_music_stage_preview.jpg',
      url: '/park_music_stage.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Grzegorz Wronkowski',
        initials: 'GW',
        color: 'bg-green-700'
      },
      stats: { reactions: 678, views: 14230 },
    },
    {
      id: 47,
      title: 'South African Road - Glencairn Expressway Premium',
      description: 'Exceptional scenic road photography in South Africa. Features serene straight asphalt expressway with scrubby bushes and natural landscape under soft overcast sky. Low-contrast natural midday lighting creating peaceful atmosphere. Ultra-high quality 24K unclipped 360° panorama with 12 EV dynamic range and 5303K white balance. Perfect for automotive, road trip, and outdoor scene visualization.',
      image: '/glencairn_expressway_preview.jpg',
      url: '/glencairn_expressway.hdr',
      type: 'photo',
      category: 'most-liked',
      user: {
        name: 'Greg Zaal',
        initials: 'GZ',
        color: 'bg-cyan-700'
      },
      stats: { reactions: 789, views: 16450 },
    },

    // ============================================
    // COLLECTIONS
    // ============================================
    {
      id: 3,
      title: 'Urban Evening Collection - Street Scene',
      description: 'Part of the Urban Architecture collection. Explore this beautiful European office district during golden hour. Low-contrast partly cloudy sky with cool evening tones and warm ambient street lighting.',
      image: '/modern_evening_street.jpg',
      url: '/modern_evening_street.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Urban Architecture',
      user: {
        name: 'Poly Haven Studio',
        initials: 'PH',
        color: 'bg-purple-500'
      },
      stats: { reactions: 456, views: 22180 },
    },
    {
      id: 6,
      title: 'Religious Architecture Collection - Dutch Church',
      description: 'Part of the Historical Buildings collection. Explore this beautiful white Afrikaans church in Cape Town, South Africa. Features traditional Dutch Reformed architecture with low-contrast natural lighting and peaceful morning ambiance.',
      image: '/afrikaans_church_preview.jpg',
      url: '/afrikaans_church_exterior.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Historical Buildings',
      user: {
        name: 'Poly Haven Heritage',
        initials: 'PH',
        color: 'bg-emerald-500'
      },
      stats: { reactions: 412, views: 11340 },
    },
    {
      id: 9,
      title: 'Religious Interiors Collection - Church Sanctuary',
      description: 'Part of the Sacred Spaces collection. Immerse yourself in the serene atmosphere of this historic Afrikaans church interior. Features stunning wooden architecture, warm natural lighting, traditional altar setup, and authentic period details.',
      image: '/afrikaans_church_interior_preview.jpg',
      url: '/afrikaans_church_interior.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Sacred Spaces',
      user: {
        name: 'Poly Haven Heritage',
        initials: 'PH',
        color: 'bg-orange-500'
      },
      stats: { reactions: 389, views: 8920 },
    },
    {
      id: 12,
      title: 'European Night Streets Collection',
      description: 'Part of the Night Photography collection. Explore this stunning narrow German cobblestone street in Greifswald at night. Features atmospheric lamp-lit ambiance, high-contrast lighting, car reflections, and authentic old-world European architecture captured in ultra-high dynamic range.',
      image: '/cobblestone_street_night_preview.jpg',
      url: '/cobblestone_street_night.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Night Photography',
      user: {
        name: 'Poly Haven Nights',
        initials: 'PN',
        color: 'bg-indigo-500'
      },
      stats: { reactions: 734, views: 98750 },
    },
    {
      id: 15,
      title: 'Interior Spaces Collection - Recreation Room',
      description: 'Part of the Indoor Environments collection. Explore this versatile empty play room with authentic morning lighting, perfect for product visualization and interior design projects. Features mixed lighting setup, carpeted flooring, brick walls, table tennis area, and warm wood accents.',
      image: '/empty_play_room_preview.jpg',
      url: '/empty_play_room.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Indoor Environments',
      user: {
        name: 'Poly Haven Interiors',
        initials: 'PI',
        color: 'bg-lime-500'
      },
      stats: { reactions: 523, views: 71890 },
    },
    {
      id: 18,
      title: 'Cultural Architecture Collection - Museum Courtyard',
      description: 'Part of the Urban Twilight collection. Explore this stunning museum courtyard in the Czech Republic during golden hour. Features contemporary concrete facades, industrial architecture, warm street lights, and subtle cloudy sky. Perfect for cultural and architectural projects with authentic evening ambiance.',
      image: '/evening_museum_courtyard_preview.jpg',
      url: '/evening_museum_courtyard.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Urban Twilight',
      user: {
        name: 'Poly Haven Architecture',
        initials: 'PA',
        color: 'bg-sky-500'
      },
      stats: { reactions: 467, views: 14220 },
    },
    {
      id: 21,
      title: 'Studio Lighting Collection - Ferndale Studio',
      description: 'Part of the Professional Studios collection. Immerse yourself in this premium photography studio featuring neon tube lighting with cool blue-magenta color palette. Perfect for product visualization, portrait renders, and commercial photography projects. Features authentic studio environment with soft key lighting, medium contrast, and professional-grade color accuracy at 5600K.',
      image: '/ferndale_studio_12_preview.jpg',
      url: '/ferndale_studio_12.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Professional Studios',
      user: {
        name: 'Poly Haven Studios',
        initials: 'PS',
        color: 'bg-fuchsia-500'
      },
      stats: { reactions: 345, views: 8930 },
    },
    {
      id: 24,
      title: 'Natural Outdoor Collection - Country Road',
      description: 'Part of the Outdoor Landscapes collection. Experience this stunning sunny country road in Czech Republic during midday. Features brilliant natural sunlight, authentic tree shadows on grass and asphalt, scattered clouds, and warm highlights. Exceptional 29K unclipped capture with 27 EV dynamic range, perfect for automotive visualization and outdoor CGI projects.',
      image: '/sunny_country_road_preview.jpg',
      url: '/sunny_country_road.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Outdoor Landscapes',
      user: {
        name: 'Poly Haven Landscapes',
        initials: 'PL',
        color: 'bg-green-500'
      },
      stats: { reactions: 678, views: 45230 },
    },
    {
      id: 27,
      title: 'Wedding Venues Collection - Outdoor Chapel',
      description: 'Part of the Sacred Ceremonies collection. Explore this beautiful airy outdoor chapel with transparent roof and warm natural lighting. Perfect for wedding visualization, ceremony renders, and event planning projects. Features authentic morning-afternoon light with medium contrast and 12 EV dynamic range. Ultra-high quality 20K unclipped 360° panorama.',
      image: '/outdoor_chapel_preview.jpg',
      url: '/outdoor_chapel.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Sacred Ceremonies',
      user: {
        name: 'Poly Haven Events',
        initials: 'PE',
        color: 'bg-pink-500'
      },
      stats: { reactions: 523, views: 12450 },
    },
    {
      id: 30,
      title: 'Coastal Sunsets Collection - Victoria Sunset',
      description: 'Part of the Golden Hour collection. Experience this breathtaking Cape Town coastal road at sunset with warm low sun, ocean horizon, and mountain rim lighting. Features partly cloudy sky creating dramatic atmosphere with medium contrast. Exceptional 24K unclipped capture with 22 EV dynamic range, perfect for automotive, architectural, and cinematic projects.',
      image: '/victoria_sunset_preview.jpg',
      url: '/victoria_sunset.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Golden Hour',
      user: {
        name: 'Poly Haven Sunsets',
        initials: 'PS',
        color: 'bg-orange-500'
      },
      stats: { reactions: 945, views: 67120 },
    },
    {
      id: 33,
      title: 'Urban Waterfront Collection - Golden Bay',
      description: 'Part of the Evening Cityscapes collection. Explore this magical waterfront pier in Germany at twilight with golden street lamps creating beautiful reflections on calm water. Features high-contrast evening lighting beneath deep blue twilight sky. Ultra-high quality 24K unclipped 360° panorama with 18 EV dynamic range and 3600K warm atmosphere, perfect for architectural and cinematic visualization.',
      image: '/golden_bay_preview.jpg',
      url: '/golden_bay.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Evening Cityscapes',
      user: {
        name: 'Poly Haven Waterfronts',
        initials: 'PW',
        color: 'bg-teal-500'
      },
      stats: { reactions: 1234, views: 98560 },
    },
    {
      id: 36,
      title: 'Winter Scenes Collection - Church Square',
      description: 'Part of the Festive Winter collection. Explore this enchanting snowy church square in Blaubeuren, Germany at night with warm street and festive Christmas lights creating magical winter atmosphere. Features medium-contrast artificial lighting under overcast sky. Ultra-high quality 20K unclipped 360° panorama with 17 EV dynamic range, perfect for holiday and winter visualization projects.',
      image: '/blaubeuren_church_square_preview.jpg',
      url: '/blaubeuren_church_square.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Festive Winter',
      user: {
        name: 'Poly Haven Winters',
        initials: 'PW',
        color: 'bg-cyan-500'
      },
      stats: { reactions: 892, views: 54320 },
    },
    {
      id: 39,
      title: 'Urban Night Squares Collection - Rathaus',
      description: 'Part of the Moody European Nights collection. Explore this atmospheric Hamburg square at night with wet reflective paving and warm street lamps under overcast sky. Features medium-contrast natural lighting creating dramatic urban ambiance. Ultra-high quality 16K unclipped 360° panorama with 15 EV dynamic range, perfect for architectural and cinematic urban visualization projects.',
      image: '/rathaus_preview.jpg',
      url: '/rathaus.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Moody European Nights',
      user: {
        name: 'Poly Haven Urban',
        initials: 'PU',
        color: 'bg-neutral-500'
      },
      stats: { reactions: 1123, views: 82450 },
    },
    {
      id: 42,
      title: 'Industrial Exploration Collection - Derelict Overpass',
      description: 'Part of the Urban Decay collection. Explore this dramatic derelict overpass with bright high-contrast sunlight creating long shadows on crisp asphalt. Features exceptional warm directional lighting with beautiful reflections and partly cloudy sky. Ultra-high quality 16K unclipped 360° panorama with incredible 21 EV dynamic range and 5400K color temperature, perfect for urban exploration and industrial visualization.',
      image: '/derelict_overpass_preview.jpg',
      url: '/derelict_overpass.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Urban Decay',
      user: {
        name: 'Poly Haven Industrial',
        initials: 'PI',
        color: 'bg-slate-500'
      },
      stats: { reactions: 1789, views: 112340 },
    },
    {
      id: 45,
      title: 'Outdoor Concert Venues Collection - Park Music Stage',
      description: 'Part of the Natural Venues collection. Explore this beautiful outdoor amphitheater in Opole, Poland with wooden ceiling and theatre stairs surrounded by botanical greenery. Features partly cloudy morning-afternoon natural daylight with high-contrast shadows. Ultra-high quality 29K unclipped 360° panorama with exceptional 24 EV dynamic range and 5400K daylight balance, perfect for event planning and outdoor venue visualization.',
      image: '/park_music_stage_preview.jpg',
      url: '/park_music_stage.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Natural Venues',
      user: {
        name: 'Poly Haven Venues',
        initials: 'PV',
        color: 'bg-lime-500'
      },
      stats: { reactions: 534, views: 9870 },
    },
    {
      id: 48,
      title: 'Scenic Roads Collection - Glencairn Expressway',
      description: 'Part of the Open Roads collection. Explore this serene South African expressway with straight asphalt road, scrubby bushes, and natural landscape under soft overcast sky. Features low-contrast natural midday lighting creating peaceful driving atmosphere. Ultra-high quality 24K unclipped 360° panorama with 12 EV dynamic range and 5303K white balance, perfect for automotive and road trip visualization.',
      image: '/glencairn_expressway_preview.jpg',
      url: '/glencairn_expressway.hdr',
      type: 'tour',
      category: 'collections',
      collection: 'Open Roads',
      user: {
        name: 'Poly Haven Roads',
        initials: 'PR',
        color: 'bg-sky-500'
      },
      stats: { reactions: 612, views: 11240 },
    },
  ]

  // Get unique collections with tour counts (Kuula style)
  const getCollections = () => {
    const collectionsMap = {}

    allTours
      .filter(tour => tour.category === 'collections' && tour.collection)
      .forEach(tour => {
        if (!collectionsMap[tour.collection]) {
          collectionsMap[tour.collection] = {
            name: tour.collection,
            tours: [],
            coverImage: tour.image,
            user: tour.user
          }
        }
        collectionsMap[tour.collection].tours.push(tour)
      })

    return Object.values(collectionsMap)
  }

  // Filter and sort tours based on active tab
  const getFilteredTours = () => {
    let filtered = [...allTours]

    switch (activeTab) {
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
        // If a collection is selected, show its tours
        if (selectedCollection) {
          filtered = allTours.filter(tour =>
            tour.category === 'collections' && tour.collection === selectedCollection
          )
        } else {
          // Show collection cards (handled separately in UI)
          filtered = []
        }
        break

      default:
        filtered = filtered
    }

    return filtered
  }

  const tours = getFilteredTours()
  const collections = getCollections()

  const tabs = [
    { id: 'featured-tours', label: 'Featured Tours' },
    { id: 'most-liked', label: 'Most Liked' },
    { id: 'collections', label: 'Collections' },
  ]

  // Load saved likes and bookmarks from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLikes = localStorage.getItem('virtulee_liked_tours')
      const savedBookmarks = localStorage.getItem('virtulee_bookmarks')
      if (savedLikes) setLikedTours(JSON.parse(savedLikes))
      if (savedBookmarks) setBookmarkedTours(JSON.parse(savedBookmarks))
    }
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if click is outside the menu
      if (openMenuId !== null && !e.target.closest('.share-menu-button') && !e.target.closest('.share-menu-dropdown')) {
        setOpenMenuId(null)
      }
    }

    if (openMenuId !== null) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [openMenuId])

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  // Show toast notification
  const showNotification = (message, type = 'success') => {
    setShowToast({ message, type })
  }

  // Like/Unlike functionality
  const handleLike = (e, tourId) => {
    e.stopPropagation()
    const newLikedTours = { ...likedTours }

    if (newLikedTours[tourId]) {
      delete newLikedTours[tourId]
      showNotification('Removed from favorites', 'info')
    } else {
      newLikedTours[tourId] = true
      showNotification('Added to favorites!', 'success')
    }

    setLikedTours(newLikedTours)
    localStorage.setItem('virtulee_liked_tours', JSON.stringify(newLikedTours))
  }

  // Bookmark functionality
  const handleBookmark = (e, tourId) => {
    e.stopPropagation()
    const newBookmarkedTours = { ...bookmarkedTours }

    if (newBookmarkedTours[tourId]) {
      delete newBookmarkedTours[tourId]
      showNotification('Removed from bookmarks', 'info')
    } else {
      newBookmarkedTours[tourId] = true
      showNotification('Bookmarked!', 'success')
    }

    setBookmarkedTours(newBookmarkedTours)
    localStorage.setItem('virtulee_bookmarks', JSON.stringify(newBookmarkedTours))
  }

  // Share functionality
  const handleShare = async (tour, method) => {
    const shareUrl = `${window.location.origin}/tour/${tour.id}`
    const shareText = `Check out this 360° tour: ${tour.title}`

    try {
      if (method === 'copy') {
        await navigator.clipboard.writeText(shareUrl)
        showNotification('Link copied to clipboard!', 'success')
      } else if (method === 'native' && navigator.share) {
        await navigator.share({
          title: tour.title,
          text: shareText,
          url: shareUrl,
        })
      } else if (method === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400')
        showNotification('Opening Facebook...', 'info')
      } else if (method === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank', 'width=600,height=400')
        showNotification('Opening Twitter...', 'info')
      } else if (method === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')
        showNotification('Opening WhatsApp...', 'info')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      showNotification('Failed to share', 'error')
    }
    setOpenMenuId(null)
  }

  return (
    <div className="min-h-screen bg-neutral-50 w-full max-w-full overflow-x-hidden" suppressHydrationWarning>
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Top Navigation Tabs - Kuula Style with Mobile Scroll - FIXED STICKY */}
      <div className="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-16 z-40 w-full max-w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-8 overflow-x-auto scrollbar-hide pb-px">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setIsLoading(true)
                  setActiveTab(tab.id)
                  setSelectedCollection(null) // Reset collection when switching tabs
                  setTimeout(() => setIsLoading(false), 300)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 sm:px-4 py-4 sm:py-5 font-medium text-sm sm:text-[15px] transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Tours Grid - EXACT Kuula Style (4 columns with IMAGES) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Breadcrumb / Back Button (when viewing collection tours) */}
        {activeTab === 'collections' && selectedCollection && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => setSelectedCollection(null)}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Collections</span>
            </button>
            <h2 className="text-2xl font-bold text-neutral-900 mt-3">{selectedCollection}</h2>
            <p className="text-neutral-600 text-sm mt-1">
              {collections.find(c => c.name === selectedCollection)?.tours.length || 0} tours
            </p>
          </motion.div>
        )}

        {/* Collections Tab: Show Collection Cards OR Tours based on selection */}
        {activeTab === 'collections' && !selectedCollection ? (
          // ============================================
          // COLLECTION CARDS (Kuula Style)
          // ============================================
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.03,
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="group bg-white shadow-md cursor-pointer relative overflow-hidden rounded-lg hover:shadow-xl transition-shadow duration-300"
                onClick={() => setSelectedCollection(collection.name)}
              >
                {/* Collection Cover Image with Overlay */}
                <div className="relative w-full h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
                  <img
                    src={collection.coverImage}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/360-real-nature.jpg'
                    }}
                  />
                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {/* Collection Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-xl mb-1 drop-shadow-lg">
                      {collection.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium drop-shadow-md">
                        {collection.tours.length} {collection.tours.length === 1 ? 'tour' : 'tours'}
                      </span>
                      <span className="text-sm opacity-75">•</span>
                      <span className="text-sm opacity-90 drop-shadow-md">
                        {collection.user.name}
                      </span>
                    </div>
                  </div>

                  {/* Hover Arrow Icon */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // ============================================
          // TOUR CARDS (Default - for all other tabs and selected collection)
          // ============================================
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" style={{ overflow: 'visible' }}>
            {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.03,
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="group bg-white shadow-md cursor-pointer relative"
              style={{ overflow: 'visible' }}
              onClick={() => setSelectedTour(tour)}
            >
              {/* Tour Image with 360° Badge */}
              <div className="relative w-full h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
                <div className="w-full h-full">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/360-real-nature.jpg'
                    }}
                  />
                </div>
                {/* 360° Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-lg"
                >
                  360°
                </motion.div>

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
                  <div className={`w-6 h-6 rounded-full ${tour.user.color} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
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
                    {/* Reactions (Heart) - Interactive */}
                    <button
                      className={`flex items-center gap-1 transition-colors ${
                        likedTours[tour.id] ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                      onClick={(e) => handleLike(e, tour.id)}
                      title="Like this tour"
                    >
                      <svg className="w-4 h-4" fill={likedTours[tour.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-xs font-medium">
                        {likedTours[tour.id] ? tour.stats.reactions + 1 : tour.stats.reactions}
                      </span>
                    </button>
                    {/* Views (Eye) */}
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-xs font-medium">{tour.stats.views.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Like Button */}
                    <button
                      className={`transition-all ${
                        likedTours[tour.id]
                          ? 'text-red-500 scale-110'
                          : 'text-neutral-500 hover:text-red-500'
                      }`}
                      onClick={(e) => handleLike(e, tour.id)}
                      title={likedTours[tour.id] ? 'Unlike' : 'Like'}
                    >
                      <svg className="w-4 h-4" fill={likedTours[tour.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Bookmark */}
                    <button
                      className={`transition-all ${
                        bookmarkedTours[tour.id]
                          ? 'text-primary-600 scale-110'
                          : 'text-neutral-500 hover:text-primary-600'
                      }`}
                      onClick={(e) => handleBookmark(e, tour.id)}
                      title={bookmarkedTours[tour.id] ? 'Remove bookmark' : 'Bookmark'}
                    >
                      <svg className="w-4 h-4" fill={bookmarkedTours[tour.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>

                    {/* Menu (3 dots) with Share Dropdown */}
                    <div className="relative share-menu-container">
                      <button
                        className="share-menu-button text-neutral-500 hover:text-neutral-700 transition-colors p-2 hover:bg-neutral-100 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('3-dot clicked, tour.id:', tour.id, 'openMenuId:', openMenuId)
                          setOpenMenuId(openMenuId === tour.id ? null : tour.id)
                        }}
                        title="Share options"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </button>

                      {/* Share Menu Dropdown - FIXED FOR MOBILE */}
                      <AnimatePresence>
                        {openMenuId === tour.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="share-menu-dropdown fixed sm:absolute right-4 sm:right-0 bottom-20 sm:bottom-auto sm:top-full sm:mt-2 w-56 sm:w-48 bg-white rounded-lg shadow-2xl border border-neutral-200 py-1 z-[100] max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                          <div className="px-3 py-2 border-b border-neutral-100">
                            <p className="text-xs font-semibold text-neutral-700">Share Tour</p>
                          </div>

                          {/* Copy Link */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(tour, 'copy')
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy Link
                          </button>

                          {/* WhatsApp */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(tour, 'whatsapp')
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            WhatsApp
                          </button>

                          {/* Facebook */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(tour, 'facebook')
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                          </button>

                          {/* Twitter */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(tour, 'twitter')
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            Twitter
                          </button>
                        </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-4 z-[60] max-w-sm"
        >
          <div className={`rounded-lg shadow-2xl border-2 px-6 py-4 flex items-center gap-3 ${
            showToast.type === 'success'
              ? 'bg-green-50 border-green-500 text-green-800'
              : showToast.type === 'error'
              ? 'bg-red-50 border-red-500 text-red-800'
              : 'bg-blue-50 border-blue-500 text-blue-800'
          }`}>
            {/* Icon */}
            <div className="flex-shrink-0">
              {showToast.type === 'success' && (
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {showToast.type === 'error' && (
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {showToast.type === 'info' && (
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            {/* Message */}
            <p className="font-medium">{showToast.message}</p>

            {/* Close button */}
            <button
              onClick={() => setShowToast(null)}
              className="ml-auto flex-shrink-0 hover:opacity-70 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

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
