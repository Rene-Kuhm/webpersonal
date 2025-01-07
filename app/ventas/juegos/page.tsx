import { client } from '@/lib/sanity';
import Image from 'next/image';

interface Game {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
  platform: string;
  downloadLink: string;
}

export default async function GamesPage() {
  const query = `*[_type == "game"]{ _id, name, slug, description, price, image, platform, downloadLink }`;
  const games = await client.fetch(query);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Juegos Digitales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game: Game) => (
          <div key={game._id} className="border rounded-lg p-4 shadow-md">
            <Image
              src={game.image.asset.url}
              alt={game.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{game.description}</p>
            <p className="text-lg font-bold mt-4">${game.price}</p>
            <a
              href={game.downloadLink}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Comprar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}