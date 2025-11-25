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
        color={hovered ? '#f43f5e' : '#6366f1'}
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
    setLoading(true)
    const loader = new THREE.TextureLoader()
    loader.load(
      imageUrl,
      (loadedTexture) => {
        setTexture(loadedTexture)
        setLoading(false)
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error)
        setLoading(false)
      }
    )
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
    vid.play()
    return vid
  })

  const [texture] = useState(() => new THREE.VideoTexture(video))

  return (
    <Sphere ref={meshRef} args={[500, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  )
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
  const containerRef = useRef()

  // Support both old single-scene format and new multi-scene format
  const scenes = tour.scenes || [tour]
  const currentScene = scenes[currentSceneIndex]
  const hasMultipleScenes = scenes.length > 1

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

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black"
    >
      {/* 360 Canvas */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
            <div className="text-white text-xl">Loading 360° view...</div>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 0.1], fov: 75 }}
          gl={{ antialias: true }}
        >
          {currentScene.type === 'video' ? (
            <VideoSphere videoUrl={currentScene.url} />
          ) : (
            <PhotoSphere
              imageUrl={currentScene.url}
              hotspots={currentScene.hotspots}
              onHotspotClick={handleHotspotClick}
            />
          )}

          {/* Camera controls: drag to look around, scroll to zoom */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            rotateSpeed={-0.5}
            zoomSpeed={1.2}
            minDistance={10}
            maxDistance={200}
            target={[0, 0, 0]}
          />
        </Canvas>
      </Suspense>

      {/* Thumbnail Sidebar - AirPano Style */}
      {hasMultipleScenes && showThumbnails && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50 pr-1">
          {scenes.map((scene, index) => (
            <button
              key={index}
              onClick={() => setCurrentSceneIndex(index)}
              className={`relative w-24 h-20 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                currentSceneIndex === index
                  ? 'border-rose-500 ring-2 ring-rose-500/50 scale-105'
                  : 'border-white/30 hover:border-white/60 hover:scale-105'
              }`}
              title={scene.title || `Scene ${index + 1}`}
            >
              {/* Thumbnail Image */}
              <img
                src={scene.thumbnail || scene.url}
                alt={scene.title || `Scene ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay on active */}
              {currentSceneIndex === index && (
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/30 to-transparent" />
              )}

              {/* Scene number badge */}
              <div className={`absolute top-1 left-1 text-xs font-bold px-1.5 py-0.5 rounded ${
                currentSceneIndex === index
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/70 text-white'
              }`}>
                {index + 1}
              </div>

              {/* Video indicator */}
              {scene.type === 'video' && (
                <div className="absolute bottom-1 right-1 text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Toggle Thumbnails Button */}
      {hasMultipleScenes && (
        <button
          onClick={() => setShowThumbnails(!showThumbnails)}
          className="absolute right-4 top-20 z-20 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-lg transition-all border border-white/20"
          title={showThumbnails ? 'Hide Thumbnails' : 'Show Thumbnails'}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        </button>
      )}

      {/* Top Controls Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10">
        <div className="flex items-center justify-between text-white">
          {/* Tour Title */}
          <div className="flex-1">
            {showInfo && (
              <div>
                <h2 className="text-xl font-bold">
                  {tour.title}
                  {hasMultipleScenes && (
                    <span className="text-rose-500 ml-2 text-sm">
                      ({currentSceneIndex + 1}/{scenes.length})
                    </span>
                  )}
                </h2>
                {currentScene.title && (
                  <p className="text-sm text-white/90 mt-1">
                    📍 {currentScene.title}
                  </p>
                )}
                {(tour.description || currentScene.description) && (
                  <p className="text-xs text-neutral-300 mt-1">
                    {currentScene.description || tour.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Toggle Info"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Fullscreen"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Close"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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

      {/* Instructions Overlay - Always visible */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-center bg-black/70 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl">
        <p className="text-sm md:text-base font-medium mb-1">
          🖱️ Drag to look around • 🔍 Scroll to zoom in/out
        </p>
        <p className="text-xs text-white/70">
          Use mouse wheel or trackpad to zoom
        </p>
      </div>

      {/* Zoom Buttons - Mobile friendly */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:hidden">
        <button
          onClick={() => {
            // Zoom in functionality for mobile
            const event = new WheelEvent('wheel', { deltaY: -100 })
            document.querySelector('canvas')?.dispatchEvent(event)
          }}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl border border-white/30 shadow-lg"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => {
            // Zoom out functionality for mobile
            const event = new WheelEvent('wheel', { deltaY: 100 })
            document.querySelector('canvas')?.dispatchEvent(event)
          }}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl border border-white/30 shadow-lg"
          title="Zoom Out"
        >
          −
        </button>
      </div>
    </div>
  )
}
