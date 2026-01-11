import type { Document } from '@contentful/rich-text-types';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | Document; // Can be string (markdown) or Rich text Document
  publishedAt: string;
  updatedAt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  thumbnail?: string;
  categories: string[];
  tags: string[];
  readingTime?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
