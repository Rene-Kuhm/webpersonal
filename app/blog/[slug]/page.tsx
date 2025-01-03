import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from 'next/image'
import PortableTextComponent from '@/components/PortableTextComponent'
import Comments from '@/components/Comments'
import ShareButtons from '@/components/ShareButtons'
import { PortableTextBlock } from '@portabletext/types'

interface Post {
  _id: string;
  title: string;
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  body: PortableTextBlock[];
  publishedAt: string;
  author: string;
  categories: { title: string }[];
  comments: {
    _id: string;
    name: string;
    content: string;
    createdAt: string;
  }[];
}

async function getPost(slug: string): Promise<Post | null> {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      mainImage,
      body,
      publishedAt,
      "author": author->name,
      categories[]->{title},
      "comments": *[_type == "comment" && post._ref == ^._id] | order(createdAt desc) {
        _id,
        name,
        content,
        createdAt
      }
    }
  `, { slug })
  return post
}

interface PageProps {
  params: { slug: string }
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    return <div>Post no encontrado</div>
  }

  const postUrl = `https://tudominio.com/blog/${params.slug}`

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
            <PortableTextComponent content={post.body} />
            <ShareButtons url={postUrl} title={post.title} />
          </CardContent>
        </Card>

        <Comments postId={post._id} initialComments={post.comments} />
      </div>
    </div>
  )
}

