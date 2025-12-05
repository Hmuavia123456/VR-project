'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Hotspot Component
 * Interactive marker in 3D space that shows information
 * @param {object} position - 3D position [x, y, z]
 * @param {string} title - Hotspot title
 * @param {string} description - Hotspot description
 * @param {function} onClick - Click handler
 */
function Hotspot({ position, title, description, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[2, 16, 16]} />
      <meshBasicMaterial
        color={hovered ? '#bd9354' : '#9e7540'}
        opacity={0.8}
        transparent
      />
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs -translate-x-1/2 -translate-y-full mb-4">
            <h4 className="font-bold text-sm mb-1">{title}</h4>
            <p className="text-xs text-neutral-600">{description}</p>
          </div>
        </Html>
      )}
    </mesh>
  )
}

/**
 * 360 Photo Sphere Component with Fade Transition
 * Renders equirectangular image on inward-facing sphere
 */
function PhotoSphere({ imageUrl, hotspots, onHotspotClick, opacity = 1 }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const [texture, setTexture] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!imageUrl) {
      console.warn('No image URL provided to PhotoSphere')
      setLoading(false)
      return
    }

    setLoading(true)
    setTexture(null) // Clear previous texture

    const loader = new THREE.TextureLoader()

    // Add a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      loader.load(
        imageUrl,
        (loadedTexture) => {
          // Optimize texture for better performance
          loadedTexture.minFilter = THREE.LinearFilter
          loadedTexture.magFilter = THREE.LinearFilter
          loadedTexture.generateMipmaps = false
          loadedTexture.colorSpace = THREE.SRGBColorSpace
          setTexture(loadedTexture)
          setLoading(false)
        },
        undefined,
        (error) => {
          console.error('Failed to load 360° image:', imageUrl)
          console.error('Error details:', error)
          setLoading(false)

          // Try loading a fallback image
          const fallbackUrl = '/360-real-nature.jpg'
          if (imageUrl !== fallbackUrl) {
            console.log('Attempting to load fallback image...')
            loader.load(
              fallbackUrl,
              (fallbackTexture) => {
                fallbackTexture.minFilter = THREE.LinearFilter
                fallbackTexture.magFilter = THREE.LinearFilter
                fallbackTexture.generateMipmaps = false
                fallbackTexture.colorSpace = THREE.SRGBColorSpace
                setTexture(fallbackTexture)
              },
              undefined,
              (fallbackError) => {
                console.error('Fallback image also failed to load')
              }
            )
          }
        }
      )
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      // Cleanup texture on unmount
      if (texture) {
        texture.dispose()
      }
    }
  }, [imageUrl])

  // Smooth opacity transition
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        opacity,
        0.1
      )
    }
  })

  if (!texture) return null

  return (
    <>
      <Sphere ref={meshRef} args={[500, 60, 40]} scale={[-1, 1, 1]}>
        <meshBasicMaterial
          ref={materialRef}
          map={texture}
          side={THREE.BackSide}
          transparent={true}
          opacity={opacity}
        />
      </Sphere>

      {/* Render hotspots */}
      {hotspots?.map((hotspot, index) => (
        <Hotspot
          key={index}
          position={hotspot.position}
          title={hotspot.title}
          description={hotspot.description}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
    </>
  )
}

/**
 * 360 Video Sphere Component
 * Renders 360 video on inward-facing sphere
 */
function VideoSphere({ videoUrl }) {
  const meshRef = useRef()
  const [video] = useState(() => {
    const vid = document.createElement('video')
    vid.src = videoUrl
    vid.crossOrigin = 'anonymous'
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    vid.play()
    return vid
  })

  const [texture] = useState(() => {
    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.format = THREE.RGBAFormat
    videoTexture.colorSpace = THREE.SRGBColorSpace
    return videoTexture
  })

  return (
    <Sphere ref={meshRef} args={[500, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  )
}

/**
 * Zoom Controls Component - Uses OrbitControls API directly
 */
function ZoomControls() {
  const { camera, gl } = useThree()
  const controlsRef = useRef()

  const handleZoom = (direction) => {
    const controls = gl.domElement.closest('div')?.querySelector('canvas')
    if (controls) {
      // Get the OrbitControls instance from the canvas
      const orbitControls = controls.__THREE__?.orbitControls
      if (orbitControls) {
        const zoomAmount = direction === 'in' ? 0.9 : 1.1
        orbitControls.dollyIn(zoomAmount)
        orbitControls.update()
      }
    }
  }

  return null
}

/**
 * TourViewer Component
 * Full-featured 360 viewer with multi-scene support, controls, hotspots, and VR mode
 * @param {object} tour - Tour data {
 *   title: string,
 *   description: string,
 *   scenes: [{ type: 'photo'|'video', url, thumbnail, title, hotspots }]
 * }
 * @param {function} onClose - Close handler
 * @param {function} onNext - Next tour handler (optional)
 * @param {function} onPrev - Previous tour handler (optional)
 */
export default function TourViewer({ tour, onClose, onNext, onPrev }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const containerRef = useRef()
  const controlsRef = useRef()

  // Support both old single-scene format and new multi-scene format
  const scenes = tour.scenes || [tour]
  const currentScene = scenes[currentSceneIndex]
  const hasMultipleScenes = scenes.length > 1

  // Get image URL - support both 'url' and 'image' fields
  const getSceneUrl = (scene) => {
    return scene.url || scene.image || tour.image || tour.url || '/360-real-nature.jpg'
  }

  // Keyboard navigation for scenes
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentSceneIndex > 0) {
        setCurrentSceneIndex(currentSceneIndex - 1)
      } else if (e.key === 'ArrowRight' && currentSceneIndex < scenes.length - 1) {
        setCurrentSceneIndex(currentSceneIndex + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSceneIndex, scenes.length])

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Handle VR mode (if WebXR available)
  const handleVRMode = () => {
    if ('xr' in navigator) {
      alert('VR mode would launch here if WebXR is supported by your browser and device.')
    } else {
      alert('WebXR is not supported in this browser. Try Chrome/Edge on a VR-capable device.')
    }
  }

  const handleHotspotClick = (hotspot) => {
    alert(`Hotspot clicked: ${hotspot.title}\n${hotspot.description}`)
  }

  // Zoom functions for mobile buttons
  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.2)
      controlsRef.current.update()
    }
  }

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2)
      controlsRef.current.update()
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex"
    >
      {/* 360 Canvas - Takes remaining space (not behind sidebar) */}
      <div className={`flex-1 relative ${showSidebar ? 'mr-0' : ''}`}>
        <Suspense
          fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
              <div className="text-white text-lg sm:text-xl">Loading 360° view...</div>
              <div className="text-white/60 text-sm mt-2">Please wait...</div>
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, 0.1], fov: 75 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: false,
              stencil: false,
              depth: true
            }}
            dpr={[1, 2]}
          >
            {currentScene.type === 'video' ? (
              <VideoSphere videoUrl={getSceneUrl(currentScene)} />
            ) : (
              <PhotoSphere
                imageUrl={getSceneUrl(currentScene)}
                hotspots={currentScene.hotspots}
                onHotspotClick={handleHotspotClick}
              />
            )}

            {/* Camera controls: drag to look around, scroll/pinch to zoom */}
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              enablePan={false}
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={-0.5}
              zoomSpeed={1.2}
              minDistance={10}
              maxDistance={200}
              target={[0, 0, 0]}
              touches={{
                ONE: THREE.TOUCH.ROTATE,
                TWO: THREE.TOUCH.DOLLY_PAN
              }}
            />
          </Canvas>
        </Suspense>


      {/* Top Controls Bar - Mobile Optimized */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 sm:p-4 z-10">
        <div className="flex items-center justify-between text-white gap-2">
          {/* Tour Title */}
          <div className="flex-1 min-w-0">
            {showInfo && (
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold truncate">
                  {tour.title}
                  {hasMultipleScenes && (
                    <span className="text-rose-500 ml-2 text-xs sm:text-sm">
                      ({currentSceneIndex + 1}/{scenes.length})
                    </span>
                  )}
                </h2>
                {currentScene.title && (
                  <p className="text-xs sm:text-sm text-white/90 mt-1 truncate">
                    📍 {currentScene.title}
                  </p>
                )}
                {(tour.description || currentScene.description) && (
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-2 hidden sm:block">
                    {currentScene.description || tour.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Toggle Info"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Fullscreen"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={handleVRMode}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block"
              title="VR Mode"
            >
              <span className="text-sm font-bold">VR</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Close"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Controls */}
      {(onPrev || onNext) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
          <div className="flex items-center justify-center space-x-4">
            {onPrev && (
              <button
                onClick={onPrev}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                ← Previous
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Instructions Overlay - Mobile friendly */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-center bg-black/70 px-4 sm:px-6 py-2 sm:py-3 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl max-w-[90%] sm:max-w-none">
        <p className="text-xs sm:text-sm md:text-base font-medium mb-1">
          <span className="hidden sm:inline">🖱️ Drag to look around • 🔍 Scroll to zoom</span>
          <span className="sm:hidden">👆 Drag to look • 👌 Pinch to zoom</span>
        </p>
        <p className="text-xs text-white/70 hidden sm:block">
          Use mouse wheel, trackpad, or pinch gesture
        </p>
      </div>

        {/* Zoom Buttons - Mobile Only with Proper Controls */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-3 lg:hidden z-20">
          <button
            onClick={handleZoomIn}
            className="w-14 h-14 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-bold border-2 border-white/30 shadow-lg transition-all active:scale-95"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-14 h-14 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-bold border-2 border-white/30 shadow-lg transition-all active:scale-95"
            title="Zoom Out"
          >
            −
          </button>
        </div>

        {/* Bottom Thumbnail Strip - Horizontal */}
        {hasMultipleScenes && showThumbnails && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-20 p-4 border-t border-white/10">
            <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent pb-2">
              {scenes.map((scene, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSceneIndex(index)}
                  className={`relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                    currentSceneIndex === index
                      ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105'
                      : 'border-white/20 hover:border-white/50 hover:scale-105'
                  }`}
                  title={scene.title || `Scene ${index + 1}`}
                >
                  {/* Thumbnail Image */}
                  <img
                    src={scene.thumbnail || getSceneUrl(scene)}
                    alt={scene.title || `Scene ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/360-real-nature.jpg'
                    }}
                  />

                  {/* Overlay on active */}
                  {currentSceneIndex === index && (
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent" />
                  )}

                  {/* Scene number badge */}
                  <div className={`absolute top-1 left-1 text-xs font-bold px-1.5 py-0.5 rounded ${
                    currentSceneIndex === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-black/70 text-white'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Video indicator */}
                  {scene.type === 'video' && (
                    <div className="absolute bottom-1 right-1 text-white">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Tour Info & Description (SOLID BLACK) */}
      {showSidebar && (
        <div className="w-80 md:w-96 bg-black text-white overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 border-l border-neutral-800">
          <div className="p-6">
            {/* Close Sidebar Button */}
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Hide Info Panel"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* User Info */}
            {tour.user && (
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full ${tour.user.color || 'bg-[#9e7540]'} flex items-center justify-center text-white text-sm font-bold`}>
                  {tour.user.initials || tour.user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{tour.user.name || 'Anonymous'}</h3>
                  <p className="text-xs text-neutral-400">Tour Creator</p>
                </div>
              </div>
            )}

            {/* Tour Title */}
            <h2 className="text-xl font-bold mb-3 text-white leading-tight">
              {tour.title}
            </h2>

            {/* Scene Title */}
            {currentScene.title && currentScene.title !== tour.title && (
              <p className="text-xs text-neutral-400 mb-3 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {currentScene.title}
              </p>
            )}

            {/* Scene Counter */}
            {hasMultipleScenes && (
              <p className="text-xs text-neutral-500 mb-4">
                Scene {currentSceneIndex + 1} of {scenes.length}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mb-5">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  liked
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                }`}
              >
                <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {liked ? 'Liked' : 'Like'}
              </button>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  bookmarked
                    ? 'bg-[#9e7540] hover:bg-[#85603f] text-white'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                }`}
              >
                <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Save
              </button>

              <button
                className="p-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                title="Share"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>

            {/* Stats */}
            {tour.stats && (
              <div className="flex items-center gap-6 mb-5 pb-5 border-b border-neutral-800">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-neutral-300">{tour.stats.reactions || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-neutral-300">{tour.stats.views?.toLocaleString() || 0}</span>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold mb-2 text-white">About this tour</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {currentScene.description || tour.description || 'Explore this amazing 360° virtual tour. Look around by dragging your mouse or using touch gestures on mobile devices. Zoom in and out to see details.'}
              </p>
            </div>

            {/* Additional Info */}
            {tour.category && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-neutral-500 mb-2">Category</h4>
                <span className="inline-block px-2.5 py-1 bg-neutral-800 rounded-md text-xs font-medium text-neutral-300">
                  {tour.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
            )}

            {/* Hotspots Info */}
            {currentScene.hotspots && currentScene.hotspots.length > 0 && (
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-neutral-500 mb-2">Points of Interest</h4>
                <div className="space-y-1.5">
                  {currentScene.hotspots.map((hotspot, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer">
                      <svg className="w-3.5 h-3.5 mt-0.5 text-[#9e7540] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white">{hotspot.title}</p>
                        <p className="text-xs text-neutral-500">{hotspot.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tour Type Badge */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span>{tour.type === 'tour' ? 'Virtual Tour' : '360° Photo'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Show Sidebar Toggle Button */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="absolute right-4 top-24 z-20 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-lg transition-all border border-white/20"
          title="Show Info Panel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
    </div>
  )
}
