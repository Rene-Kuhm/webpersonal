import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { TypedObject } from '@portabletext/types'

interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
}

type PortableTextContent = TypedObject

const components = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      return (
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ' '}
          width={800}
          height={400}
          className="my-8 rounded-lg"
        />
      )
    },
  },
}

export default function PortableTextComponent({ content }: { content: PortableTextContent[] }) {
  return <PortableText value={content} components={components} />
}

