import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from 'next/image'

async function getPost(slug: string) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      mainImage,
      body,
      publishedAt,
      "author": author->name,
      categories[]->{title}
    }
  `, { slug })
  return post
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return <div>Post no encontrado</div>
  }

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center mb-4">
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <PortableText value={post.body} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

