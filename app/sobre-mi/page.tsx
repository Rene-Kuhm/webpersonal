'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaServer } from 'react-icons/fa'
import { AnimatedSkillBar } from '../components/AnimatedSkillBar'

export default function SobreMi() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.h1 
          className="mb-12 text-4xl font-bold text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sobre Mí
        </motion.h1>
        
        <div className="flex flex-col items-center mb-16 md:flex-row">
          <motion.div 
            className="mb-8 md:w-1/2 md:mb-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-64 h-64 mx-auto md:w-80 md:h-80 lg:w-96 lg:h-96">
              <Image
                src="/assest/Imagen de WhatsApp 2024-10-20 a las 10.59.48_7c1a9ec9.jpg" // Reemplaza con la ruta de tu imagen real
                alt="René Kuhm"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
              <motion.div 
                className="absolute border-4 border-blue-600 rounded-full -inset-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 md:pl-8"
            {...fadeInUp}
          >
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">¡Hola! Soy René Kuhm</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Soy un desarrollador web full-stack apasionado por crear experiencias digitales excepcionales. Con más de 5 años de experiencia en la industria, me especializo en el desarrollo de aplicaciones web modernas y escalables utilizando las últimas tecnologías.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Mi objetivo es combinar mi experiencia técnica con mi creatividad para ofrecer soluciones innovadoras que no solo cumplan, sino que superen las expectativas de mis clientes.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { icon: FaCode, title: 'Desarrollo Frontend', description: 'Creación de interfaces de usuario atractivas y responsivas utilizando React, Next.js y Tailwind CSS.' },
            { icon: FaServer, title: 'Desarrollo Backend', description: 'Construcción de APIs robustas y escalables con Node.js, Express, y bases de datos SQL/NoSQL.' },
            { icon: FaLaptopCode, title: 'Desarrollo Full Stack', description: 'Integración perfecta de frontend y backend para crear aplicaciones web completas y eficientes.' },
          ].map((service, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <service.icon className="mb-4 text-4xl text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mb-16 text-center"
          {...fadeInUp}
        >
          <h2 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">Mis Habilidades</h2>
          <div className="max-w-2xl mx-auto">
            <AnimatedSkillBar skill="React" percentage={90} />
            <AnimatedSkillBar skill="Node.js" percentage={85} />
            <AnimatedSkillBar skill="Next.js" percentage={80} />
            <AnimatedSkillBar skill="TypeScript" percentage={75} />
            <AnimatedSkillBar skill="GraphQL" percentage={70} />
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          {...fadeInUp}
        >
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Mis Valores</h2>
          <ul className="max-w-2xl mx-auto text-left text-gray-600 list-disc list-inside dark:text-gray-300">
            {[
              "Compromiso con la excelencia en cada proyecto",
              "Aprendizaje continuo y adaptación a nuevas tecnologías",
              "Comunicación clara y transparente con los clientes",
              "Enfoque en soluciones escalables y mantenibles",
              "Pasión por crear experiencias de usuario excepcionales"
            ].map((value, index) => (
              <motion.li 
                key={index}
                className="mb-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {value}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

