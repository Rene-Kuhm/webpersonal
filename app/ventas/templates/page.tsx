import { client, urlFor } from '@/lib/sanity'; // Importa urlFor
import Image from 'next/image';
import { FaCode } from 'react-icons/fa';
import { MercadoPagoButton } from '@/app/components/MercadoPagoButton';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
  file: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
}

export default async function TemplatesYComponentes() {
  // Obtener los productos desde Sanity
  const query = `*[_type == "template"]{ _id, name, description, price, image, file }`;
  const products: Product[] = await client.fetch(query);

  // Verificar los datos obtenidos
  console.log('Datos de Sanity:', products);

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center">Templates y Componentes</h1>

        <p className="max-w-2xl mx-auto mb-12 text-center text-gray-600 dark:text-gray-300">
          Acelera tu desarrollo con nuestros templates y componentes premium. Diseñados para ser altamente personalizables y fáciles de integrar en tus proyectos.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product: Product, index: number) => {
            // Obtener la URL de la imagen usando urlFor
            const imageUrl = product.image ? urlFor(product.image).url() : null;
            console.log(`Imagen para ${product.name}:`, imageUrl);

            return (
              <div key={product._id} className="flex flex-col p-6 bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800">
                <FaCode className="mb-4 text-4xl text-blue-600" />
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="mb-4 rounded-lg"
                    priority={index === 0}
                  />
                ) : (
                  <div className="mb-4 h-48 flex items-center justify-center bg-gray-200 rounded-lg dark:bg-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">Imagen no disponible</p>
                  </div>
                )}
                <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
                <p className="flex-grow mb-4 text-gray-600 dark:text-gray-300">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                  <MercadoPagoButton productId={product._id} price={product.price} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}