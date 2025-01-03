'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const timelineEvents = [
  {
    year: '2018',
    title: 'Inicio en Desarrollo Web',
    description: 'Comencé mi viaje en el desarrollo web, aprendiendo HTML, CSS y JavaScript.',
  },
  {
    year: '2019',
    title: 'Primer Trabajo como Desarrollador Junior',
    description: 'Obtuve mi primer trabajo como desarrollador web junior en una startup local.',
  },
  {
    year: '2020',
    title: 'Especialización en React',
    description: 'Me especialicé en React y comencé a trabajar en proyectos más complejos.',
  },
  {
    year: '2021',
    title: 'Lanzamiento de Proyecto Freelance',
    description: 'Lancé mi carrera como freelance y trabajé en varios proyectos internacionales.',
  },
  {
    year: '2022',
    title: 'Contribuciones Open Source',
    description: 'Comencé a contribuir activamente a proyectos de código abierto.',
  },
  {
    year: '2023',
    title: 'Liderazgo Técnico',
    description: 'Asumí el rol de líder técnico en un proyecto de gran escala.',
  },
]

export default function Timeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Mi Trayectoria</h2>
          <p className="text-gray-600 dark:text-gray-300">Un vistazo a mi carrera como desarrollador</p>
        </motion.div>
        
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"></div>
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : ''}`}>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
              </div>
              <div className="w-2/12 flex justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{event.year}</span>
                </div>
              </div>
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

