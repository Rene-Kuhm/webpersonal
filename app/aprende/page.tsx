import Link from 'next/link'
import { FaBook, FaVideo, FaCode } from 'react-icons/fa'

const resources = [
  {
    title: 'Fundamentos de JavaScript',
    description: 'Aprende los conceptos básicos de JavaScript, desde variables hasta funciones y objetos.',
    icon: FaBook,
    link: '#'
  },
  {
    title: 'React para principiantes',
    description: 'Curso en video que te guía a través de los conceptos fundamentales de React.',
    icon: FaVideo,
    link: '#'
  },
  {
    title: 'Proyectos prácticos de Node.js',
    description: 'Una serie de proyectos paso a paso para aprender Node.js en la práctica.',
    icon: FaCode,
    link: '#'
  },
  // Añade más recursos según sea necesario
]

export default function AprendeProgramacion() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Aprende Programación</h1>
        
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Explora estos recursos gratuitos para mejorar tus habilidades de programación. Desde tutoriales básicos hasta proyectos avanzados, hay algo para cada nivel de experiencia.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <resource.icon className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
              <Link 
                href={resource.link}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Explorar recurso
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

