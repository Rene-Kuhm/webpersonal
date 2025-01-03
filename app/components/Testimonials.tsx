'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const testimonials = [
  {
    name: 'María García',
    role: 'CEO, TechStart',
    content: 'Trabajar con este desarrollador fue una experiencia increíble. Su atención al detalle y habilidades técnicas son excepcionales.',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'CTO, InnovateTech',
    content: 'Entregó nuestro proyecto a tiempo y superó todas nuestras expectativas. Definitivamente volveremos a trabajar juntos.',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Laura Martínez',
    role: 'Fundadora, DesignPro',
    content: 'Su capacidad para traducir nuestras ideas en una aplicación funcional y hermosa fue impresionante. Altamente recomendado.',
    avatar: '/placeholder.svg?height=100&width=100',
  },
]

export default function Testimonials() {
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
          <h2 className="text-3xl font-bold mb-4">Lo que dicen mis clientes</h2>
          <p className="text-gray-600 dark:text-gray-300">Testimonios de personas con las que he trabajado</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">&ldquo;{testimonial.content}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

