'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * TourCard Component
 * Displays tour thumbnail with hover effects
 * @param {object} tour - Tour data { id, title, description, image, tags, type }
 * @param {function} onClick - Click handler to open tour
 */
export default function TourCard({ tour, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl shadow-medium hover:shadow-strong transition-shadow duration-300">
        {/* Tour Thumbnail */}
        <div className="relative h-64 bg-neutral-200">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Type Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {tour.type === 'video' ? '📹 360° Video' : '📷 360° Photo'}
          </div>

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <button className="w-full btn-primary">
                View Tour
              </button>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="bg-white p-5">
          <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
            {tour.title}
          </h3>
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
            {tour.description}
          </p>

          {/* Tags */}
          {tour.tags && tour.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tour.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
