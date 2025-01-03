'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TypeWriter from '../components/TypeWriter'
import CodeBlock from './CodeBlock'
import FloatingIcons from './FloatingIcons'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen w-full overflow-hidden" aria-label="Sección de bienvenida">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" aria-hidden="true" />
      
      <FloatingIcons />
      
      <div className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-blue-600 inline-block px-8 py-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">HOLA,</h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider text-white">
                SOY <span className="font-bold">RENÉ KUHM</span>
              </h2>
              <div className="text-xl sm:text-2xl lg:text-3xl text-blue-400">
                <TypeWriter
                  words={[
                    "Desarrollador Web Full Stack",
                    "Especialista en React",
                    "Creador de Experiencias Digitales"
                  ]}
                  delay={100}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12"
          >
            <CodeBlock />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" className="animate-bounce" aria-label="Desplazarse hacia abajo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}

