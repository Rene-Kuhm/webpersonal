import { client } from '@/lib/sanity';

export default async function PaymentConfirmation({ params }: { params: { productId: string } }) {
  // Obtener el producto desde Sanity
  const query = `*[_type == "template" && _id == "${params.productId}"]{ _id, name, file }[0]`;
  const product = await client.fetch(query);

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
}