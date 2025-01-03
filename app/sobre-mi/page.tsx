import Image from 'next/image'
import { FaCode, FaLaptopCode, FaServer } from 'react-icons/fa'

export default function SobreMi() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre Mí</h1>
        
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Tu Nombre"
              width={400}
              height={400}
              className="rounded-full mx-auto"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold mb-4">¡Hola! Soy [Tu Nombre]</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Soy un desarrollador web full-stack apasionado por crear experiencias digitales excepcionales. Con más de [X] años de experiencia en la industria, me especializo en el desarrollo de aplicaciones web modernas y escalables utilizando las últimas tecnologías.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Mi objetivo es combinar mi experiencia técnica con mi creatividad para ofrecer soluciones innovadoras que no solo cumplan, sino que superen las expectativas de mis clientes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: FaCode, title: 'Desarrollo Frontend', description: 'Creación de interfaces de usuario atractivas y responsivas utilizando React, Next.js y Tailwind CSS.' },
            { icon: FaServer, title: 'Desarrollo Backend', description: 'Construcción de APIs robustas y escalables con Node.js, Express, y bases de datos SQL/NoSQL.' },
            { icon: FaLaptopCode, title: 'Desarrollo Full Stack', description: 'Integración perfecta de frontend y backend para crear aplicaciones web completas y eficientes.' },
          ].map((service, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <service.icon className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Mis Valores</h2>
          <ul className="list-disc list-inside text-left max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            <li className="mb-2">Compromiso con la excelencia en cada proyecto</li>
            <li className="mb-2">Aprendizaje continuo y adaptación a nuevas tecnologías</li>
            <li className="mb-2">Comunicación clara y transparente con los clientes</li>
            <li className="mb-2">Enfoque en soluciones escalables y mantenibles</li>
            <li>Pasión por crear experiencias de usuario excepcionales</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

