import { client } from '@/lib/sanity';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { productId: string } }): Promise<Metadata> {
  const query = `*[_type == "template" && _id == $productId]{ name }[0]`;
  const product = await client.fetch(query, { productId: params.productId });

  return {
    title: `Confirmación de compra - ${product?.name || 'Producto'}`,
    description: `Gracias por comprar ${product?.name || 'este producto'}. Descarga tu archivo ahora.`,
  };
}

export default async function PaymentConfirmation({ params }: { params: { productId: string } }) {
  try {
    // Obtener el producto desde Sanity
    const query = `*[_type == "template" && _id == $productId]{ _id, name, file }[0]`;
    const product = await client.fetch(query, { productId: params.productId });

    if (!product) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Producto no encontrado</h1>
          <p className="mb-4">Lo sentimos, no pudimos encontrar el producto que buscas.</p>
        </div>
      );
    }

    if (!product?.file?.asset?.url) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Error</h1>
          <p className="mb-4">El archivo no está disponible para descargar.</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">¡Gracias por tu compra!</h1>
        <p className="mb-4">Tu producto está listo para descargar.</p>
        <a
          href={product.file.asset.url}
          download
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Descargar {product.name}
        </a>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p className="mb-4">Hubo un problema al cargar el producto. Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }
}