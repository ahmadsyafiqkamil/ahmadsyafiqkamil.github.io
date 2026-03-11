import { createClient, Entry, EntryCollection } from 'contentful'
import { BlogPost, ContentfulBlogPostEntry } from '../types/contentful'

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'

if (!spaceId || !accessToken) {
  console.warn(
    'Contentful credentials are missing. Please set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN environment variables.'
  )
}

const client = createClient({
  space: spaceId || '',
  accessToken: accessToken || '',
  environment: environment,
})

/**
 * Transform Contentful entry to BlogPost format
 */
function transformContentfulEntry(entry: ContentfulBlogPostEntry): BlogPost {
  const fields = entry.fields

  // Get image URL from Contentful asset
  const imageUrl = fields.image?.fields?.file?.url
    ? `https:${fields.image.fields.file.url}`
    : 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop'

  // Format date
  const dateOriginal = new Date(fields.date).toISOString()
  const date = new Date(fields.date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return {
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt,
    image: imageUrl,
    category: fields.category,
    date: date,
    dateOriginal: dateOriginal,
    readTime: fields.readTime,
    tags: fields.tags || [],
    content: {
      introduction: fields.introduction,
      body: fields.body,
      conclusion: fields.conclusion,
    },
  }
}

/**
 * Fetch all blog posts from Contentful
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!spaceId || !accessToken) {
      console.warn('Contentful credentials missing, returning empty array')
      return []
    }

    const response: EntryCollection<ContentfulBlogPostEntry['fields']> =
      await client.getEntries({
        content_type: 'blogPost',
        order: '-fields.date', // Order by date descending (newest first)
      })

    return response.items.map((item) =>
      transformContentfulEntry(item as ContentfulBlogPostEntry)
    )
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error)
    throw error
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    if (!spaceId || !accessToken) {
      console.warn('Contentful credentials missing, returning null')
      return null
    }

    const response: EntryCollection<ContentfulBlogPostEntry['fields']> =
      await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1,
      })

    if (response.items.length === 0) {
      return null
    }

    return transformContentfulEntry(response.items[0] as ContentfulBlogPostEntry)
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}" from Contentful:`, error)
    throw error
  }
}
