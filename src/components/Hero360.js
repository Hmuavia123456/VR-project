'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'
import Link from 'next/link'
import * as THREE from 'three'

/**
 * 360 Sphere Background Component
 * Renders an inward-facing sphere with equirectangular texture
 * Auto-rotates slowly for visual interest
 */
function Hero360Sphere({ imageUrl }) {
  const meshRef = useRef()

  // Slow auto-rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005
    }
  })

  return (
    <Sphere ref={meshRef} args={[500, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial
        map={new THREE.TextureLoader().load(imageUrl)}
        side={THREE.BackSide}
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
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
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
        <div className="text-white text-xl font-light opacity-50">
          Loading immersive experience...
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
 * Hero360 Component
 * Full-viewport hero with interactive 360° background
 * Features: mouse drag, touch support, parallax overlay, CTA
 * @param {string} imageUrl - Path to 360° equirectangular image
 */
export default function Hero360({ imageUrl = '/360-hero.jpg' }) {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* 360 Background Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={<CanvasFallback />}>
          <Canvas
            camera={{ position: [0, 0, 0.1], fov: 75 }}
            gl={{ antialias: true, alpha: false }}
          >
            <Hero360Sphere imageUrl={imageUrl} />
            {/* OrbitControls for mouse/touch drag interaction */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={-0.5}
              autoRotate={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content Overlay - Single Beautiful Sentence */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight"
            style={{
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 80px rgba(0, 0, 0, 0.7), 0 0 120px rgba(0, 0, 0, 0.5)'
            }}
          >
            A Virtual Journey Around the World
          </motion.h1>
        </div>
      </div>
    </div>
  )
}
