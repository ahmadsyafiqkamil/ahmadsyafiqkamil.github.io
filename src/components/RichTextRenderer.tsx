import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document, BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface RichTextRendererProps {
  document: Document | null | undefined
  className?: string
}

export function RichTextRenderer({ document, className = '' }: RichTextRendererProps) {
  if (!document) {
    return null
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-white">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-gray-900 px-2 py-1 rounded text-emerald-400 font-mono text-sm">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
        <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_node: any, children: React.ReactNode) => (
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-6 mt-8">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-4 mt-8 border-l-4 border-emerald-500 pl-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: React.ReactNode) => (
        <h3 className="text-xl md:text-2xl text-white font-semibold mb-3 mt-6">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node: any, children: React.ReactNode) => (
        <h4 className="text-lg md:text-xl text-white font-semibold mb-2 mt-4">{children}</h4>
      ),
      [BLOCKS.UL_LIST]: (_node: any, children: React.ReactNode) => (
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: any, children: React.ReactNode) => (
        <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2 ml-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: any, children: React.ReactNode) => (
        <li className="text-gray-300">{children}</li>
      ),
      [BLOCKS.QUOTE]: (_node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-400 my-6">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="border-white/10 my-8" />,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, file } = node.data.target.fields
        const imageUrl = file?.url ? `https:${file.url}` : ''
        return (
          <div className="my-8 rounded-lg overflow-hidden border border-white/10">
            <ImageWithFallback
              src={imageUrl}
              alt={title || 'Blog image'}
              className="w-full h-auto"
            />
          </div>
        )
      },
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 underline"
        >
          {children}
        </a>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (_node: any, children: React.ReactNode) => (
        <div className="my-4">{children}</div>
      ),
    },
  }

  return (
    <div className={`rich-text-content ${className}`}>
      {documentToReactComponents(document, options)}
    </div>
  )
}
