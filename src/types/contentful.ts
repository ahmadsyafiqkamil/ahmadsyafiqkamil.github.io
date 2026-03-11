import { Entry, Asset, Document } from 'contentful'

export interface BlogPost {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  dateOriginal: string // ISO string of original date for calculations
  readTime: string
  slug: string
  content?: {
    introduction: Document // Rich Text Document
    body: Document // Rich Text Document for main content
    conclusion: Document // Rich Text Document
  }
  tags?: string[]
  author?: {
    name: string
    avatar: string
    role: string
  }
}

export interface ContentfulBlogPostFields {
  title: string
  slug: string
  excerpt: string
  image: Asset
  category: string
  date: string
  readTime: string
  tags?: string[]
  introduction: Document // Rich Text
  body: Document // Rich Text for main content
  conclusion: Document // Rich Text
}

export type ContentfulBlogPostEntry = Entry<ContentfulBlogPostFields>

export interface Project {
  title: string
  description: string
  fullDescription: string
  image: string
  screenshots: string[]
  technologies: string[]
  github: string
  live: string
  category: string
  date: string
  order: number
}

export interface ContentfulProjectFields {
  title: string
  description: string
  fullDescription: string
  image: Asset
  screenshots?: Asset[]
  technologies: string[]
  github?: string
  live?: string
  category: string
  date: string
  order?: number
}

export type ContentfulProjectEntry = Entry<ContentfulProjectFields>
