'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

const blogPosts = [
  {
    title: 'Introducción a React Hooks',
    excerpt: 'Descubre cómo los Hooks de React pueden simplificar tu código y mejorar la reutilización de la lógica.',
    date: '2023-05-15',
    image: '/placeholder.svg?height=200&width=300',
    slug: 'introduccion-react-hooks',
  },
  {
    title: 'Optimización de rendimiento en Next.js',
    excerpt: 'Aprende técnicas avanzadas para mejorar el rendimiento de tus aplicaciones Next.js.',
    date: '2023-06-02',
    image: '/placeholder.svg?height=200&width=300',
    slug: 'optimizacion-rendimiento-nextjs',
  },
  {
    title: 'Diseño responsivo con Tailwind CSS',
    excerpt: 'Explora cómo crear diseños responsivos rápidamente utilizando Tailwind CSS.',
    date: '2023-06-20',
    image: '/placeholder.svg?height=200&width=300',
    slug: 'diseno-responsivo-tailwind-css',
  },
]

export default function BlogFeed() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Últimas Publicaciones del Blog</h2>
          <p className="text-gray-600 dark:text-gray-300">Explora mis artículos más recientes sobre desarrollo web</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/blog" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Ver todas las publicaciones
          </Link>
        </div>
      </div>
    </section>
  )
}

