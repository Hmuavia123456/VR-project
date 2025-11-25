'use client'

import { Suspense, useRef } from 'react'
import * as React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'
import Link from 'next/link'
import * as THREE from 'three'

/**
 * 360 Sphere Background Component
 * Renders an inward-facing sphere with equirectangular texture (image or video)
 * Auto-rotates slowly for visual interest
 */
function Hero360Sphere({ mediaUrl, isVideo = false }) {
  const meshRef = useRef()
  const videoRef = useRef()
  const [textureLoaded, setTextureLoaded] = React.useState(false)

  // Ultra-smooth auto-rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003
    }
  })

  // Load texture with useMemo to prevent memory leaks
  const texture = React.useMemo(() => {
    if (isVideo) {
      // Create video element with HIGH QUALITY settings
      const video = document.createElement('video')
      video.src = mediaUrl
      video.crossOrigin = 'anonymous'
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.autoplay = true
      video.preload = 'auto'

      // Set video to highest quality
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')

      // Ensure video renders at full resolution
      video.style.objectFit = 'cover'

      // Start playback and handle loading
      video.addEventListener('loadeddata', () => setTextureLoaded(true))
      video.play().catch(err => console.log('Video autoplay failed:', err))

      videoRef.current = video

      // Create HIGH QUALITY video texture
      const videoTexture = new THREE.VideoTexture(video)

      // Use LINEAR_MIPMAP_LINEAR for best quality
      videoTexture.minFilter = THREE.LinearMipmapLinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.format = THREE.RGBAFormat
      videoTexture.generateMipmaps = true
      videoTexture.anisotropy = 16 // Maximum anisotropic filtering for sharpness
      videoTexture.colorSpace = THREE.SRGBColorSpace // Correct color space for modern Three.js
      videoTexture.needsUpdate = true

      return videoTexture
    } else {
      // Load image texture with HIGH QUALITY settings for 8K images
      const loader = new THREE.TextureLoader()
      const imageTexture = loader.load(
        mediaUrl,
        // onLoad callback
        () => setTextureLoaded(true),
        // onProgress callback
        undefined,
        // onError callback
        (err) => {
          console.error('Error loading texture:', err)
          setTextureLoaded(true) // Still set to true to prevent infinite loading
        }
      )

      // Apply highest quality settings for crisp 8K rendering
      imageTexture.minFilter = THREE.LinearMipmapLinearFilter
      imageTexture.magFilter = THREE.LinearFilter
      imageTexture.anisotropy = 16 // Maximum anisotropic filtering for ultra-sharp details
      imageTexture.colorSpace = THREE.SRGBColorSpace // Accurate colors
      imageTexture.generateMipmaps = true
      imageTexture.needsUpdate = true

      return imageTexture
    }
  }, [mediaUrl, isVideo])

  // Cleanup video on unmount
  React.useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ''
      }
    }
  }, [])

  return (
    <Sphere ref={meshRef} args={[500, 256, 128]} scale={[-1, 1, 1]}>
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </Sphere>
  )
}

/**
 * Canvas Fallback Component
 * Beautiful gradient background while 3D scene loads
 */
function CanvasFallback() {
  return (
    <div className="absolute inset-0">
      {/* Theme-based gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#236476] via-[#173142] to-[#1a5060]"
        style={{
          animation: 'gradientShift 8s ease infinite',
        }}
      />

      {/* Overlay pattern for depth */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}
      />

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div className="text-white text-xl font-light opacity-80">
            Loading immersive experience...
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(30deg);
          }
        }
      `}</style>
    </div>
  )
}

/**
 * Hero360 Component - Kuula Style
 * Full-viewport hero with stunning 360° background
 * Features: mouse drag, touch support, bottom info card with CTA buttons
 * @param {string} imageUrl - Path to 360° equirectangular image
 * @param {string} videoUrl - Path to 360° equirectangular video
 */
export default function Hero360({ imageUrl = '/360-hero.jpg', videoUrl = null }) {
  const mediaUrl = videoUrl || imageUrl
  const isVideo = !!videoUrl

  // Preload image/video for faster loading
  React.useEffect(() => {
    if (!isVideo && mediaUrl) {
      const img = new Image()
      img.src = mediaUrl
    }
  }, [mediaUrl, isVideo])

  return (
    <div className="relative min-h-[100vh] sm:h-[90vh] md:h-[85vh] w-full max-w-full overflow-hidden">
      {/* 360 Background Canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#236476] via-[#173142] to-[#1a5060] w-full max-w-full">
        <Suspense fallback={<CanvasFallback />}>
          <Canvas
            camera={{ position: [0, 0, 0.1], fov: 75 }}
            gl={{
              antialias: true,
              alpha: false,
              preserveDrawingBuffer: true
            }}
            onCreated={({ gl, scene }) => {
              gl.setClearColor('#236476')
              scene.background = new THREE.Color('#236476')
            }}
          >
            <Hero360Sphere mediaUrl={mediaUrl} isVideo={isVideo} />
            {/* OrbitControls for ultra-smooth 360° interaction */}
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableDamping={true}
              dampingFactor={0.03}
              rotateSpeed={-0.4}
              autoRotate={true}
              autoRotateSpeed={0.3}
              zoomSpeed={0.6}
              minDistance={1}
              maxDistance={1000}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              enableRotate={true}
              makeDefault={true}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Dark Overlay for better text visibility - pointer-events-none to allow mouse interaction */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 pointer-events-none" />

      {/* Modern Professional Hero Content - Center Aligned with Safe Area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-20 sm:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center max-w-4xl mx-auto px-4 sm:px-6 pointer-events-auto"
        >
          {/* Main Heading without Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl leading-tight" style={{textShadow: '0 4px 20px rgba(0,0,0,0.8)'}}>
              IMMERSIVE VIRTUAL TOURS
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-light drop-shadow-lg" style={{textShadow: '0 2px 10px rgba(0,0,0,0.8)'}}>
              Create, Share & Explore in 360°
            </p>
          </motion.div>

          {/* Modern CTA Buttons with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto"
          >
            <Link
              href="/register"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/95 backdrop-blur-xl text-neutral-900 rounded-2xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-3xl hover:bg-white transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Free Trial
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/explore"
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-semibold text-base sm:text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Tours
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Feature Pills with Better Contrast */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 sm:mt-12 flex flex-wrap gap-2 sm:gap-3 justify-center px-4"
          >
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/60 backdrop-blur-md text-white font-medium rounded-full text-xs sm:text-sm border border-white/30 shadow-lg whitespace-nowrap">
              ✓ No Credit Card Required
            </span>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/60 backdrop-blur-md text-white font-medium rounded-full text-xs sm:text-sm border border-white/30 shadow-lg whitespace-nowrap">
              ✓ 14-Day Free Trial
            </span>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/60 backdrop-blur-md text-white font-medium rounded-full text-xs sm:text-sm border border-white/30 shadow-lg whitespace-nowrap">
              ✓ Unlimited Tours
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
