import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'

interface RichTextProps {
  document: Document
}

export default function RichTextRenderer({ document }: RichTextProps) {
  return <div>{documentToReactComponents(document)}</div>
}
