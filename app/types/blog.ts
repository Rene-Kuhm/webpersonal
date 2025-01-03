import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface Category {
  title: string
  _id: string
}

export interface Post {
  title: string
  slug: {
    current: string
  }
  mainImage: SanityImageSource
  publishedAt: string
  categories: Category[]
  excerpt: string
}

