import { createClient } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import type { BlogPost, BlogCategory, BlogTag, PaginatedResponse } from './types';

// Contentful client configuration - only create if credentials are available
let client: ReturnType<typeof createClient> | null = null;
let clientInitialized = false;

function initializeContentfulClient() {
  if (clientInitialized) {
    return client;
  }
  
  clientInitialized = true;
  
  const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  
  if (!spaceId || !accessToken || spaceId === '' || accessToken === '') {
    return null;
  }

  try {
    client = createClient({
      space: spaceId,
      accessToken: accessToken,
      environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
    });
    return client;
  } catch (error) {
    console.warn('Contentful client initialization failed:', error);
    return null;
  }
}

// Cache for API responses (simple in-memory cache)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Function to clear cache (useful for debugging)
export function clearCache() {
  cache.clear();
  console.log('Cache cleared');
}

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string | Document): number {
  let text = '';
  if (typeof content === 'string') {
    text = content;
  } else if (content && typeof content === 'object') {
    // Rich text Document
    try {
      text = documentToPlainTextString(content);
    } catch (e) {
      text = '';
    }
  }
  const words = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(words / 200);
}

// Extract plain text from Rich text for excerpt
function extractPlainText(content: string | Document, maxLength: number = 200): string {
  if (typeof content === 'string') {
    return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
  }
  if (content && typeof content === 'object') {
    try {
      const text = documentToPlainTextString(content);
      return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
    } catch (e) {
      return '';
    }
  }
  return '';
}

// Transform Contentful entry to BlogPost
function transformPost(entry: any): BlogPost {
  const fields = entry.fields;
  const content = fields.content || '';
  
  // Handle tags - could be string or array
  let tags: string[] = [];
  if (Array.isArray(fields.tags)) {
    tags = fields.tags;
  } else if (typeof fields.tags === 'string' && fields.tags) {
    // If tags is a single string, split by comma or make it an array
    tags = fields.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t);
  }
  
  return {
    id: entry.sys.id,
    slug: fields.slug || entry.sys.id,
    title: fields.title || '',
    excerpt: fields.excerpt || extractPlainText(content, 200),
    content: content, // Keep as Rich text Document or string
    publishedAt: fields.publishedDate || entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    author: fields.author ? {
      name: fields.author.fields?.name || 'Unknown',
      avatar: fields.author.fields?.avatar?.fields?.file?.url,
    } : undefined,
    thumbnail: fields.thumbnail?.fields?.file?.url,
    categories: fields.categories?.map((cat: any) => cat.fields?.name || '') || [],
    tags: tags,
    readingTime: calculateReadingTime(content),
  };
}

// Fetch all blog posts
export async function getBlogPosts(
  page: number = 1,
  pageSize: number = 10,
  filters?: { category?: string; tag?: string; search?: string }
): Promise<PaginatedResponse<BlogPost>> {
  const cacheKey = `posts_${page}_${pageSize}_${JSON.stringify(filters)}`;
  const cached = getCached<PaginatedResponse<BlogPost>>(cacheKey);
  if (cached) return cached;

  const contentfulClient = initializeContentfulClient();
  if (!contentfulClient) {
    return {
      items: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    };
  }

  try {
    const query: any = {
      content_type: 'blog', // Content type ID is 'blog', not 'blogPost'
      order: '-sys.createdAt', // Use creation date as default (more reliable)
      skip: (page - 1) * pageSize,
      limit: pageSize,
    };

    if (filters?.category) {
      query['fields.categories.sys.contentType.sys.id'] = 'category';
      query['fields.categories.fields.slug'] = filters.category;
    }

    if (filters?.tag) {
      query['fields.tags[in]'] = filters.tag;
    }

    if (filters?.search) {
      query.query = filters.search;
    }

    const response = await contentfulClient.getEntries(query);
    
    console.log('📦 Contentful API Response:', {
      total: response.total,
      items: response.items.length,
      itemIds: response.items.map((item: any) => ({
        id: item.sys.id,
        title: item.fields?.title || 'No title',
        slug: item.fields?.slug || 'No slug',
        publishedDate: item.fields?.publishedDate || 'No date',
        hasContent: !!item.fields?.content,
        isPublished: !!item.sys.publishedVersion,
      })),
    });
    
    const posts = response.items.map(transformPost);
    const result: PaginatedResponse<BlogPost> = {
      items: posts,
      total: response.total,
      page,
      pageSize,
      totalPages: Math.ceil(response.total / pageSize),
    };

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty result on error
    return {
      items: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    };
  }
}

// Fetch single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const cacheKey = `post_${slug}`;
  const cached = getCached<BlogPost>(cacheKey);
  if (cached) return cached;

  const contentfulClient = initializeContentfulClient();
  if (!contentfulClient) {
    return null;
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blog', // Content type ID is 'blog', not 'blogPost'
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const post = transformPost(response.items[0]);
    setCache(cacheKey, post);
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch all categories
export async function getCategories(): Promise<BlogCategory[]> {
  const cacheKey = 'categories';
  const cached = getCached<BlogCategory[]>(cacheKey);
  if (cached) return cached;

  const contentfulClient = initializeContentfulClient();
  if (!contentfulClient) {
    return [];
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'category',
      order: 'fields.name',
    });

    const categories: BlogCategory[] = response.items.map((entry: any) => ({
      id: entry.sys.id,
      name: entry.fields.name || '',
      slug: entry.fields.slug || entry.sys.id,
      description: entry.fields.description,
    }));

    setCache(cacheKey, categories);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch all tags
export async function getTags(): Promise<BlogTag[]> {
  const cacheKey = 'tags';
  const cached = getCached<BlogTag[]>(cacheKey);
  if (cached) return cached;

  const contentfulClient = initializeContentfulClient();
  if (!contentfulClient) {
    return [];
  }

  try {
    // Tags might be stored as an array field in posts
    // For now, we'll extract unique tags from all posts
    const response = await contentfulClient.getEntries({
      content_type: 'blog', // Content type ID is 'blog', not 'blogPost'
      select: 'fields.tags',
    });

    const tagSet = new Set<string>();
    response.items.forEach((entry: any) => {
      const tags = entry.fields.tags || [];
      tags.forEach((tag: string) => tagSet.add(tag));
    });

    const tags: BlogTag[] = Array.from(tagSet).map((tag, index) => ({
      id: `tag-${index}`,
      name: tag,
      slug: tag.toLowerCase().replace(/\s+/g, '-'),
    }));

    setCache(cacheKey, tags);
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// Search blog posts
export async function searchBlogPosts(query: string, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<BlogPost>> {
  return getBlogPosts(page, pageSize, { search: query });
}

// Debug function to check all content types and entries
export async function debugContentful() {
  const contentfulClient = initializeContentfulClient();
  if (!contentfulClient) {
    return { error: 'Contentful client not initialized' };
  }

  try {
    // Get all content types
    const contentTypes = await contentfulClient.getContentTypes();
    
    // Get all entries (without content type filter)
    const allEntries = await contentfulClient.getEntries({ limit: 100 });
    
    // Try to get blog entries specifically
    let blogPostEntries: any = null;
    try {
      blogPostEntries = await contentfulClient.getEntries({
        content_type: 'blog', // Content type ID is 'blog', not 'blogPost'
        limit: 100,
      });
    } catch (e: any) {
      blogPostEntries = { error: e.message };
    }

    // Try to get entry by ID
    let entryById: any = null;
    try {
      entryById = await contentfulClient.getEntry('1c5WU37PqOMF9pcIPV3ybU');
    } catch (e: any) {
      entryById = { error: e.message };
    }

    return {
      contentTypes: contentTypes.items.map((ct: any) => ({
        id: ct.sys.id,
        name: ct.name,
        fields: ct.fields.map((f: any) => ({
          id: f.id,
          name: f.name,
          type: f.type,
        })),
      })),
      allEntries: {
        total: allEntries.total,
        items: allEntries.items.map((entry: any) => ({
          id: entry.sys.id,
          contentType: entry.sys.contentType.sys.id,
          title: entry.fields?.title || entry.fields?.name || 'No title',
          publishedAt: entry.sys.publishedVersion ? entry.sys.publishedAt || entry.sys.updatedAt : 'Not published',
          updatedAt: entry.sys.updatedAt,
        })),
      },
      blogPostEntries,
      entryById,
    };
  } catch (error: any) {
    return { error: error.message, stack: error.stack };
  }
}
