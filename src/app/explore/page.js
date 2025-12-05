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

  // Sample tour data with user info, stats, and categories
  const allTours = [
    // ============================================
    // FEATURED TOURS (12 tours - complete virtual tours)
    // ============================================
    {
      id: 1,
      title: 'Complete Architectural Experience',
      description: 'Multi-scene architectural tour with 5 stunning viewpoints',
      image: '/neuer_zollhof_8k_1.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Dreamtory Architect', initials: 'DA', color: 'bg-purple-700' },
      stats: { reactions: 245, views: 15858 },
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
      id: 2,
      title: 'Golden Bay Coastal Tour',
      description: 'Beautiful coastal paradise showcase',
      image: '/golden_bay_4k.jpg',
      url: '/golden_bay_4k.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Beach Realty 360', initials: 'BR', color: 'bg-sky-700' },
      stats: { reactions: 267, views: 21234 },
    },
    {
      id: 3,
      title: 'Modern Home Interior Showcase',
      description: 'Premium residential design tour',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Home Tours Pro', initials: 'HT', color: 'bg-pink-700' },
      stats: { reactions: 198, views: 14823 },
    },
    {
      id: 4,
      title: 'Downtown Urban Experience',
      description: 'City center virtual exploration',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Urban Tours', initials: 'UT', color: 'bg-indigo-700' },
      stats: { reactions: 223, views: 18945 },
    },
    {
      id: 5,
      title: 'Mountain Resort Complete Tour',
      description: 'Alpine lodge virtual experience',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Resort Tours Inc', initials: 'RT', color: 'bg-teal-700' },
      stats: { reactions: 176, views: 12567 },
    },
    {
      id: 6,
      title: 'Nature Reserve Walkthrough',
      description: 'Eco-tourism virtual journey',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Eco Tours', initials: 'ET', color: 'bg-green-700' },
      stats: { reactions: 189, views: 13456 },
    },
    {
      id: 7,
      title: 'Sunset Aurora Experience',
      description: 'Magical sunset with aurora lights',
      image: '/360-hero-sunset.jpg',
      url: '/360-hero-sunset.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Nature Wonders', initials: 'NW', color: 'bg-yellow-700' },
      stats: { reactions: 234, views: 17765 },
    },
    {
      id: 8,
      title: 'Nightlife Street Experience',
      description: 'Evening city atmosphere tour',
      image: '/360-cobblestone-night.jpg',
      url: '/360-cobblestone-night.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Night Tours', initials: 'NT', color: 'bg-violet-700' },
      stats: { reactions: 156, views: 9890 },
    },
    {
      id: 9,
      title: 'Contemporary Architectural Space',
      description: 'Modern building virtual walkthrough',
      image: '/360-neuer-zollhof.jpg',
      url: '/360-neuer-zollhof.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Urban Architecture', initials: 'UA', color: 'bg-slate-700' },
      stats: { reactions: 145, views: 9858 },
    },
    {
      id: 10,
      title: 'Aurora Night Sky Tour',
      description: 'Northern lights experience',
      image: '/360-hero-aurora.jpg',
      url: '/360-hero-aurora.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Sky Watchers', initials: 'SW', color: 'bg-purple-700' },
      stats: { reactions: 311, views: 19780 },
    },
    {
      id: 11,
      title: 'Luxury Lounge & Bar Tour',
      description: 'Premium lounge experience',
      image: '/360-lounge-bar.jpg',
      url: '/360-lounge-bar.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Luxury Venues', initials: 'LV', color: 'bg-red-700' },
      stats: { reactions: 128, views: 11234 },
    },
    {
      id: 12,
      title: 'Historic Architecture Day Tour',
      description: 'Daytime architectural heritage',
      image: '/360-neuer-zollhof-day.jpg',
      url: '/360-neuer-zollhof-day.jpg',
      type: 'tour',
      category: 'featured-tours',
      user: { name: 'Heritage Tours', initials: 'HT', color: 'bg-amber-700' },
      stats: { reactions: 192, views: 14500 },
    },

    // ============================================
    // MOST LIKED (15 tours - highest engagement content)
    // ============================================
    {
      id: 13,
      title: 'Aurora Night Sky Magic',
      description: 'Northern lights spectacular view',
      image: '/360-hero-aurora.jpg',
      url: '/360-hero-aurora.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Sky Watchers', initials: 'SW', color: 'bg-purple-600' },
      stats: { reactions: 923, views: 45678 },
    },
    {
      id: 14,
      title: 'Golden Bay Sunset Paradise',
      description: 'Perfect coastal golden hour',
      image: '/golden_bay_4k.jpg',
      url: '/golden_bay_4k.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Coastal Dreams', initials: 'CD', color: 'bg-orange-600' },
      stats: { reactions: 889, views: 40123 },
    },
    {
      id: 15,
      title: 'Sunset Aurora Experience',
      description: 'Magical twilight with colors',
      image: '/360-hero-sunset.jpg',
      url: '/360-hero-sunset.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Nature Wonders', initials: 'NW', color: 'bg-yellow-600' },
      stats: { reactions: 778, views: 38345 },
    },
    {
      id: 16,
      title: 'Tropical Ocean Paradise',
      description: 'Crystal clear ocean waters',
      image: '/360-real-ocean.jpg',
      url: '/360-real-ocean.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Island Views', initials: 'IV', color: 'bg-teal-600' },
      stats: { reactions: 756, views: 36789 },
    },
    {
      id: 17,
      title: 'Mountain Summit Vista',
      description: 'Breathtaking alpine peak view',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Peak Photographers', initials: 'PP', color: 'bg-green-600' },
      stats: { reactions: 698, views: 34234 },
    },
    {
      id: 18,
      title: 'Metropolitan City Skyline',
      description: 'Iconic urban panoramic view',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Metro Views', initials: 'MV', color: 'bg-blue-600' },
      stats: { reactions: 634, views: 32890 },
    },
    {
      id: 19,
      title: 'Luxury Interior Design',
      description: 'Modern luxury living space',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Luxury Spaces', initials: 'LS', color: 'bg-red-600' },
      stats: { reactions: 612, views: 31234 },
    },
    {
      id: 20,
      title: 'Forest Nature Sanctuary',
      description: 'Peaceful woodland retreat',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Forest Photography', initials: 'FP', color: 'bg-emerald-600' },
      stats: { reactions: 587, views: 29567 },
    },
    {
      id: 21,
      title: 'Modern Architecture Marvel',
      description: 'Contemporary architectural wonder',
      image: '/neuer_zollhof_8k_1.jpg',
      url: '/neuer_zollhof_8k_1.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Design Awards', initials: 'DA', color: 'bg-indigo-600' },
      stats: { reactions: 565, views: 28900 },
    },
    {
      id: 22,
      title: 'Luxury Lounge & Bar',
      description: 'Elegant premium bar interior',
      image: '/360-lounge-bar.jpg',
      url: '/360-lounge-bar.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Interior Luxe', initials: 'IL', color: 'bg-purple-600' },
      stats: { reactions: 543, views: 27654 },
    },
    {
      id: 23,
      title: 'Historic Cobblestone Street',
      description: 'Charming night street view',
      image: '/360-cobblestone-night.jpg',
      url: '/360-cobblestone-night.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Heritage Sites', initials: 'HS', color: 'bg-amber-600' },
      stats: { reactions: 521, views: 26234 },
    },
    {
      id: 24,
      title: 'Bright Architecture View',
      description: 'Illuminated modern building',
      image: '/360-neuer-zollhof-bright.jpg',
      url: '/360-neuer-zollhof-bright.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Twilight Photos', initials: 'TP', color: 'bg-rose-600' },
      stats: { reactions: 498, views: 25123 },
    },
    {
      id: 25,
      title: 'Contemporary Urban Space',
      description: 'Modern building at night',
      image: '/360-neuer-zollhof.jpg',
      url: '/360-neuer-zollhof.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Urban Architecture', initials: 'UA', color: 'bg-slate-600' },
      stats: { reactions: 476, views: 24567 },
    },
    {
      id: 26,
      title: 'Daytime Architecture',
      description: 'Historic building in sunlight',
      image: '/360-neuer-zollhof-day.jpg',
      url: '/360-neuer-zollhof-day.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Heritage Tours', initials: 'HT', color: 'bg-cyan-600' },
      stats: { reactions: 454, views: 23890 },
    },
    {
      id: 27,
      title: 'Classic Panoramic View',
      description: 'Beautiful 360 landscape',
      image: '/360-cobblestone-night.jpg',
      url: '/360-cobblestone-night.jpg',
      type: 'photo',
      category: 'most-liked',
      user: { name: 'Panorama Masters', initials: 'PM', color: 'bg-lime-600' },
      stats: { reactions: 432, views: 22456 },
    },

    // ============================================
    // COLLECTIONS (15 tours - curated themed collections)
    // ============================================
    {
      id: 28,
      title: 'Architectural Masterpieces',
      description: 'Modern architectural wonders',
      image: '/neuer_zollhof_8k_1.jpg',
      url: '/neuer_zollhof_8k_1.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Architecture',
      user: { name: 'Heritage Collection', initials: 'HC', color: 'bg-amber-500' },
      stats: { reactions: 434, views: 21234 },
    },
    {
      id: 29,
      title: 'Sky & Aurora Collection',
      description: 'Northern lights and sky wonders',
      image: '/360-hero-aurora.jpg',
      url: '/360-hero-aurora.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Nature',
      user: { name: 'Sky Watchers', initials: 'SW', color: 'bg-purple-500' },
      stats: { reactions: 498, views: 24890 },
    },
    {
      id: 30,
      title: 'Coastal Paradise Collection',
      description: 'Best beaches and coastlines',
      image: '/golden_bay_4k.jpg',
      url: '/golden_bay_4k.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Travel',
      user: { name: 'Beach Destinations', initials: 'BD', color: 'bg-cyan-500' },
      stats: { reactions: 478, views: 23234 },
    },
    {
      id: 31,
      title: 'Sunset Photography Series',
      description: 'Golden hour magic worldwide',
      image: '/360-hero-sunset.jpg',
      url: '/360-hero-sunset.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Photography',
      user: { name: 'Golden Moments', initials: 'GM', color: 'bg-orange-500' },
      stats: { reactions: 456, views: 22567 },
    },
    {
      id: 32,
      title: 'Mountain Adventure Collection',
      description: 'Complete mountain trail guide',
      image: '/360-real-mountain.jpg',
      url: '/360-real-mountain.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Adventure',
      user: { name: 'Trail Guides', initials: 'TG', color: 'bg-green-500' },
      stats: { reactions: 445, views: 21234 },
    },
    {
      id: 33,
      title: 'Tropical Ocean Collection',
      description: 'Crystal clear ocean paradises',
      image: '/360-real-ocean.jpg',
      url: '/360-real-ocean.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Travel',
      user: { name: 'Ocean Explorers', initials: 'OE', color: 'bg-teal-500' },
      stats: { reactions: 412, views: 20678 },
    },
    {
      id: 34,
      title: 'Urban Skyline Collection',
      description: 'World\'s best city views',
      image: '/360-real-city.jpg',
      url: '/360-real-city.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Urban',
      user: { name: 'City Explorer', initials: 'CE', color: 'bg-indigo-500' },
      stats: { reactions: 398, views: 19890 },
    },
    {
      id: 35,
      title: 'Interior Design Portfolio',
      description: 'Luxury interior inspiration',
      image: '/360-real-interior.jpg',
      url: '/360-real-interior.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Design',
      user: { name: 'Design Collective', initials: 'DC', color: 'bg-pink-500' },
      stats: { reactions: 389, views: 19567 },
    },
    {
      id: 36,
      title: 'Forest & Nature Escapes',
      description: 'Peaceful woodland retreats',
      image: '/360-real-nature.jpg',
      url: '/360-real-nature.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Nature',
      user: { name: 'Nature Wonders', initials: 'NW', color: 'bg-lime-500' },
      stats: { reactions: 367, views: 18678 },
    },
    {
      id: 37,
      title: 'Premium Lounge Collection',
      description: 'Luxury bars and lounges',
      image: '/360-lounge-bar.jpg',
      url: '/360-lounge-bar.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Real Estate',
      user: { name: 'Property Tours', initials: 'PT', color: 'bg-rose-500' },
      stats: { reactions: 356, views: 18123 },
    },
    {
      id: 38,
      title: 'Historic Streets at Night',
      description: 'Charming cobblestone views',
      image: '/360-cobblestone-night.jpg',
      url: '/360-cobblestone-night.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Photography',
      user: { name: 'Night Shots', initials: 'NS', color: 'bg-violet-500' },
      stats: { reactions: 345, views: 17456 },
    },
    {
      id: 39,
      title: 'Modern Building Showcase',
      description: 'Contemporary architecture at night',
      image: '/360-neuer-zollhof.jpg',
      url: '/360-neuer-zollhof.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Architecture',
      user: { name: 'Modern Architects', initials: 'MA', color: 'bg-slate-500' },
      stats: { reactions: 334, views: 16890 },
    },
    {
      id: 40,
      title: 'Bright Architecture Views',
      description: 'Illuminated buildings collection',
      image: '/360-neuer-zollhof-bright.jpg',
      url: '/360-neuer-zollhof-bright.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Architecture',
      user: { name: 'Twilight Views', initials: 'TV', color: 'bg-yellow-500' },
      stats: { reactions: 323, views: 16234 },
    },
    {
      id: 41,
      title: 'Daytime Heritage Buildings',
      description: 'Historic architecture in sunlight',
      image: '/360-neuer-zollhof-day.jpg',
      url: '/360-neuer-zollhof-day.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Architecture',
      user: { name: 'Heritage Tours', initials: 'HT', color: 'bg-amber-500' },
      stats: { reactions: 312, views: 15678 },
    },
    {
      id: 42,
      title: 'Classic 360 Panoramas',
      description: 'Timeless panoramic views',
      image: '/360-real-ocean.jpg',
      url: '/360-real-ocean.jpg',
      type: 'tour',
      category: 'collections',
      collection: 'Photography',
      user: { name: 'Panorama Masters', initials: 'PM', color: 'bg-blue-500' },
      stats: { reactions: 298, views: 15234 },
    },
  ]

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
                  setTimeout(() => setIsLoading(false), 300)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 sm:px-4 py-4 sm:py-5 font-medium text-sm sm:text-[15px] transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:text-neutral-900'
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
