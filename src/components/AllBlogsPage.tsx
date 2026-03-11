'use client'

import { motion } from 'motion/react'
import { useState, useEffect, useMemo } from 'react'
import { Calendar, Clock, ArrowRight, Tag, ArrowLeft, Search, Flame, BookOpen, AlertCircle, Sparkles } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { fetchBlogPosts } from '../lib/contentful'
import { BlogPost } from '../types/contentful'
import { Skeleton } from './ui/skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

interface AllBlogsPageProps {
  onReadArticle: (post: BlogPost) => void
  onBack: () => void
}

function isNewPost(dateOriginal: string): boolean {
  const postDate = new Date(dateOriginal)
  const now = new Date()
  const daysDiff = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff <= 30
}

function getPopularPosts(posts: BlogPost[], limit: number = 5): BlogPost[] {
  return [...posts]
    .sort((a, b) => new Date(b.dateOriginal).getTime() - new Date(a.dateOriginal).getTime())
    .slice(0, limit)
}

function getCategoryCounts(posts: BlogPost[]): Record<string, number> {
  const counts: Record<string, number> = {}
  posts.forEach(post => {
    counts[post.category] = (counts[post.category] || 0) + 1
  })
  return counts
}

function filterPosts(posts: BlogPost[], searchQuery: string, category: string): BlogPost[] {
  let filtered = posts
  if (category !== 'All') {
    filtered = filtered.filter(post => post.category === category)
  }
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  }
  return filtered
}

export function AllBlogsPage({ onReadArticle, onBack }: AllBlogsPageProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 6

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        setLoading(true)
        setError(null)
        const posts = await fetchBlogPosts()
        setBlogPosts(posts)
      } catch (err) {
        console.error('Failed to load blog posts:', err)
        setError('Gagal memuat artikel blog. Silakan coba lagi nanti.')
      } finally {
        setLoading(false)
      }
    }
    loadBlogPosts()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  const filteredPosts = useMemo(
    () => filterPosts(blogPosts, searchQuery, selectedCategory),
    [blogPosts, searchQuery, selectedCategory]
  )

  const featuredPost = useMemo(() => blogPosts[0] || null, [blogPosts])

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return filteredPosts.slice(startIndex, startIndex + postsPerPage)
  }, [filteredPosts, currentPage, postsPerPage])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))]
  const categoryCounts = useMemo(() => getCategoryCounts(blogPosts), [blogPosts])
  const popularPosts = useMemo(() => getPopularPosts(blogPosts, 4), [blogPosts])

  // ── Loading State ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Top nav skeleton */}
        <div className="border-b border-white/10 px-6 py-4">
          <Skeleton className="h-5 w-40 bg-gray-800" />
        </div>
        {/* Hero skeleton */}
        <div className="bg-gradient-to-b from-gray-900 to-black px-6 py-16 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-4 bg-gray-800" />
          <Skeleton className="h-5 w-80 mx-auto bg-gray-800" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
              <Skeleton className="h-11 w-full bg-gray-800 rounded-xl" />
              <Skeleton className="h-52 w-full bg-gray-800 rounded-xl" />
              <Skeleton className="h-64 w-full bg-gray-800 rounded-xl" />
            </aside>
            <main className="flex-1 grid md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-72 w-full bg-gray-800 rounded-xl" />
              ))}
            </main>
          </div>
        </div>
      </div>
    )
  }

  // ── Error State ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <p className="text-gray-400 text-lg">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium"
        >
          Kembali ke Beranda
        </motion.button>
      </div>
    )
  }

  // ── Main Render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── Sticky Top Navigation ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Beranda</span>
          </motion.button>
          <span className="text-white/20">/</span>
          <span className="text-white text-sm">Blog</span>
        </div>
      </div>

      {/* ── Hero Header ───────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-900/50 to-black pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{blogPosts.length} Artikel Tersedia</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Blog &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                Artikel
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Berbagi pengetahuan seputar pengembangan software, AI, cloud infrastructure, dan teknologi terkini.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Featured Article ──────────────────────────────────────────────── */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && currentPage === 1 && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Featured</span>
          </div>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => onReadArticle(featuredPost)}
            className="group cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="relative h-72 md:h-96 overflow-hidden">
                <ImageWithFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {featuredPost.category}
                    </span>
                    {isNewPost(featuredPost.dateOriginal) && (
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        New
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300 max-w-2xl">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-2xl mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 text-emerald-400 font-medium text-sm group-hover:gap-2.5 transition-all duration-300">
                      <span>Baca Artikel</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      )}

      {/* ── Main Content: Sidebar + Grid ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── Sidebar ─────────────────────────────────────────────────── */}
          <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-20 space-y-6">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-gray-900 transition-all text-sm"
              />
            </div>

            {/* Categories */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Kategori
              </h2>
              <div className="space-y-1.5">
                {categories.map(category => {
                  const count = category === 'All' ? blogPosts.length : (categoryCounts[category] || 0)
                  const isActive = selectedCategory === category
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-between ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Popular Articles */}
            {popularPosts.length > 0 && (
              <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-5">
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  Artikel Terbaru
                </h2>
                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <motion.button
                      key={post.slug}
                      whileHover={{ x: 2 }}
                      onClick={() => onReadArticle(post)}
                      className="flex gap-3 w-full text-left group"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-1 left-1 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-2 mb-1 leading-snug">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* ── Article Grid ────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0">
            {/* Result count + active filter */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500 text-sm">
                {filteredPosts.length === 0
                  ? 'Tidak ada artikel ditemukan'
                  : <>Menampilkan <span className="text-white font-medium">{filteredPosts.length}</span> artikel</>
                }
              </p>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  Filter: {selectedCategory} ×
                </button>
              )}
            </div>

            {paginatedPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Search className="w-12 h-12 text-gray-700 mb-4" />
                <p className="text-gray-400 text-lg mb-1">Tidak ada artikel ditemukan</p>
                <p className="text-gray-600 text-sm">Coba kata kunci atau kategori lain</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {paginatedPosts.map((post, index) => (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      onClick={() => onReadArticle(post)}
                      className="group cursor-pointer"
                    >
                      <div className="bg-gray-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10 h-full flex flex-col">
                        {/* Thumbnail */}
                        <div className="relative overflow-hidden h-48">
                          <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="px-2.5 py-1 bg-emerald-500/90 text-white text-xs rounded-full backdrop-blur-sm flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {post.category}
                            </span>
                          </div>
                          {isNewPost(post.dateOriginal) && (
                            <div className="absolute top-3 right-3">
                              <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                New
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{post.date}</span>
                            </div>
                            <span>·</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <h3 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2 leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                            {post.excerpt}
                          </p>

                          <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-medium group-hover:gap-2.5 transition-all duration-300">
                            <span>Baca selengkapnya</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent className="gap-1">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className={`cursor-pointer bg-gray-900 border border-white/10 text-white hover:bg-gray-800 hover:border-emerald-500/50 rounded-xl transition-all ${
                              currentPage === 1 ? 'pointer-events-none opacity-40' : ''
                            }`}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                          const showPage =
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          const showEllipsis =
                            page === currentPage - 2 || page === currentPage + 2
                          if (showPage) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => setCurrentPage(page)}
                                  isActive={currentPage === page}
                                  className={`cursor-pointer rounded-xl min-w-[40px] transition-all ${
                                    currentPage === page
                                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-none shadow-lg shadow-emerald-500/30'
                                      : 'bg-gray-900 border border-white/10 text-white hover:bg-gray-800 hover:border-emerald-500/50'
                                  }`}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          }
                          if (showEllipsis) {
                            return (
                              <PaginationItem key={`ellipsis-${page}`}>
                                <span className="px-2 py-2 text-gray-600 text-sm">…</span>
                              </PaginationItem>
                            )
                          }
                          return null
                        })}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className={`cursor-pointer bg-gray-900 border border-white/10 text-white hover:bg-gray-800 hover:border-emerald-500/50 rounded-xl transition-all ${
                              currentPage === totalPages ? 'pointer-events-none opacity-40' : ''
                            }`}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
