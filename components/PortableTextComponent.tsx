import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'

interface PortableTextProps {
  value: Document
}

export default function PortableText({ value }: PortableTextProps) {
  return <>{documentToReactComponents(value)}</>
}

