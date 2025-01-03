import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'E-commerce App',
    description: 'Una aplicación de comercio electrónico completa con carrito de compras, pagos y panel de administración.',
    image: '/placeholder.svg?height=300&width=400',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#'
  },
  {
    title: 'Task Manager',
    description: 'Una aplicación de gestión de tareas con autenticación de usuarios y funcionalidades en tiempo real.',
    image: '/placeholder.svg?height=300&width=400',
    technologies: ['Vue.js', 'Firebase', 'Vuex'],
    link: '#'
  },
  {
    title: 'Blog Platform',
    description: 'Una plataforma de blogs con editor de texto enriquecido y sistema de comentarios.',
    image: '/placeholder.svg?height=300&width=400',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL'],
    link: '#'
  },
  // Añade más proyectos según sea necesario
]

export default function Portfolio() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Mi Portfolio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link href={project.link} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Ver proyecto
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

