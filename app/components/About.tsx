'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FamilyTree } from './FamilyTree'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-8 text-3xl font-bold text-center">Sobre Mí</h2>
          <p className="max-w-3xl mx-auto mb-12 text-lg text-center text-gray-600 dark:text-gray-300">
            Soy un desarrollador apasionado por crear soluciones web innovadoras y efectivas.
            Me especializo en el desarrollo frontend con React y Next.js, y me encanta compartir
            mi conocimiento con la comunidad.
          </p>
          <FamilyTree />
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            {[
              { title: 'Desarrollo Web', value: '5+ años' },
              { title: 'Proyectos Completados', value: '50+' },
              { title: 'Clientes Satisfechos', value: '30+' },
            ].map((stat) => (
              <div key={stat.title} className="p-6 text-center rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="mb-2 text-xl font-bold">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
