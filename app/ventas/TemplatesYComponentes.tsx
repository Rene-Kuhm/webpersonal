import Image from 'next/image'
import { FaCode, FaPalette, FaMobile } from 'react-icons/fa'
import { MercadoPagoButton } from '@/app/components/MercadoPagoButton'

const products = [
  {
    id: 'template1',
    title: 'Template de Dashboard',
    description: 'Un dashboard moderno y responsivo con múltiples componentes y gráficos.',
    icon: FaCode,
    price: 49.99,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 'component1',
    title: 'Kit de UI Personalizable',
    description: 'Conjunto de componentes UI altamente personalizables para React.',
    icon: FaPalette,
    price: 29.99,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 'template2',
    title: 'Template de E-commerce',
    description: 'Template completo de e-commerce con carrito de compras y pasarela de pago.',
    icon: FaMobile,
    price: 79.99,
    image: '/placeholder.svg?height=200&width=300'
  },
]

export default function TemplatesYComponentes() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center">Templates y Componentes</h1>
        
        <p className="max-w-2xl mx-auto mb-12 text-center text-gray-600 dark:text-gray-300">
          Acelera tu desarrollo con nuestros templates y componentes premium. Diseñados para ser altamente personalizables y fáciles de integrar en tus proyectos.
        </p>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col p-6 bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800">
              <product.icon className="mb-4 text-4xl text-blue-600" />
              <Image
                src={process.env.NEXT_PUBLIC_STRAPI_URL + product.image}
                alt={product.title}
                width={300}
                height={200}
                className="mb-4 rounded-lg"
              />
              <h2 className="mb-2 text-xl font-semibold">{product.title}</h2>
              <p className="flex-grow mb-4 text-gray-600 dark:text-gray-300">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                <MercadoPagoButton productId={product.id} price={product.price} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

