import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              {['Inicio', 'Sobre Mí', 'Portfolio', 'Blog', 'Contacto'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p>Email: tu@email.com</p>
            <p>Teléfono: +34 123 456 789</p>
            <p>Eduardo Castex (LP), Argentina</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Sígueme</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} René Kuhm. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

