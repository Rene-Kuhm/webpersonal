'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Sobre Mí</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto text-center">
            Soy un desarrollador apasionado por crear soluciones web innovadoras y efectivas.
            Me especializo en el desarrollo frontend con React y Next.js, y me encanta compartir
            mi conocimiento con la comunidad.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Desarrollo Web', value: '5+ años' },
              { title: 'Proyectos Completados', value: '50+' },
              { title: 'Clientes Satisfechos', value: '30+' },
            ].map((stat) => (
              <div key={stat.title} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

