import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import Image from 'next/image'
import Link from 'next/link'
import BlogSearch from '@/components/BlogSearch'
import { Post, Category } from '../types/blog'

const POSTS_PER_PAGE = 6

async function getPosts(page = 1, search = '', category = 'all') {
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  let query = '*[_type == "post"'
  if (search) {
    query += ` && title match "*${search}*"`
  }
  if (category !== 'all') {
    query += ` && $category in categories[]._ref`
  }
  query += `] | order(publishedAt desc) [${start}...${end}] {
    title,
    slug,
    mainImage,
    publishedAt,
    categories[]->{title, _id},
    "excerpt": array::join(string::split((pt::text(body)), "")[0..255], "") + "..."
  }`

  const posts: Post[] = await client.fetch(query, { category })

  const totalPostsQuery = `count(*[_type == "post"${search ? ` && title match "*${search}*"` : ''}${category !== 'all' ? ` && $category in categories[]._ref` : ''}])`
  const totalPosts: number = await client.fetch(totalPostsQuery, { category })

  return { posts, totalPosts }
}

async function getCategories() {
  const categories: Category[] = await client.fetch(`
    *[_type == "category"] {
      title,
      _id
    }
  `)
  return categories
}

export default async function Blog({ searchParams }: { searchParams: { page?: string, search?: string, category?: string } }) {
  const page = parseInt(searchParams.page || '1')
  const search = searchParams.search || ''
  const category = searchParams.category || 'all'
  const { posts, totalPosts } = await getPosts(page, search, category)
  const categories = await getCategories()
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-2/3">
            <BlogSearch categories={categories} initialSearch={search} initialCategory={category} />
            
            <div className="grid grid-cols-1 gap-6">
              {posts.map((post: Post) => (
                <Card key={post.slug.current}>
                  <CardHeader>
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">{post.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">
                        {post.categories[0]?.title || 'Sin categoría'}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link 
                      href={`/blog/${post.slug.current}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Leer más
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Pagination className="mt-8">
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`/blog?page=${page - 1}&search=${search}&category=${category}`} />
                  </PaginationItem>
                )}
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink href={`/blog?page=${i + 1}&search=${search}&category=${category}`} isActive={page === i + 1}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/blog?page=${page + 1}&search=${search}&category=${category}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
          
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Posts Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {posts.slice(0, 3).map((post: Post) => (
                    <li key={post.slug.current}>
                      <Link 
                        href={`/blog/${post.slug.current}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categories.map((category: Category) => (
                    <li key={category._id}>
                      <Link 
                        href={`/blog?category=${category._id}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

