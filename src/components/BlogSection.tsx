'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Calendar, Clock, ArrowRight, Tag, AlertCircle, Sparkles } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useState, useEffect } from 'react'
import { fetchBlogPosts } from '../lib/contentful'
import { BlogPost } from '../types/contentful'
import { Skeleton } from './ui/skeleton'

interface BlogSectionProps {
  onReadArticle: (post: BlogPost) => void
  onViewAll?: () => void
  limit?: number
}

/**
 * Check if a blog post is new (published within the last 30 days)
 */
function isNewPost(dateOriginal: string): boolean {
  const postDate = new Date(dateOriginal)
  const now = new Date()
  const daysDiff = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff <= 30
}

export function BlogSection({ onReadArticle, onViewAll, limit = 6 }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  // Loading skeleton
  if (loading) {
    return (
      <section id="blog" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">Blog & Artikel</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Berbagi pengetahuan dan pengalaman seputar pengembangan web, teknologi terkini, dan best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="bg-gray-900 border-white/10 overflow-hidden h-full">
                <Skeleton className="h-56 w-full bg-gray-800" />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <Skeleton className="h-3 w-20 bg-gray-800" />
                    <Skeleton className="h-3 w-16 bg-gray-800" />
                  </div>
                  <Skeleton className="h-6 w-full mb-3 bg-gray-800" />
                  <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
                  <Skeleton className="h-4 w-3/4 mb-4 bg-gray-800" />
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section id="blog" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">Blog & Artikel</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Berbagi pengetahuan dan pengalaman seputar pengembangan web, teknologi terkini, dan best practices
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 font-medium"
            >
              Coba Lagi
            </motion.button>
          </motion.div>
        </div>
      </section>
    )
  }

  // Empty state
  if (blogPosts.length === 0) {
    return (
      <section id="blog" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">Blog & Artikel</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Berbagi pengetahuan dan pengalaman seputar pengembangan web, teknologi terkini, dan best practices
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">Belum ada artikel yang tersedia.</p>
          </motion.div>
        </div>
      </section>
    )
  }

  // Extract unique categories from blog posts
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))]

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const displayedPosts = filteredPosts.slice(0, limit)

  return (
    <section id="blog" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-6">Blog & Artikel</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Berbagi pengetahuan dan pengalaman seputar pengembangan web, teknologi terkini, dan best practices
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-white/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => onReadArticle(post)}
              className="group cursor-pointer"
            >
              <Card className="bg-gray-900 border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-emerald-500/20">
                {/* Image */}
                <div className="relative overflow-hidden h-56">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs rounded-full backdrop-blur-sm flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                  </div>

                  {/* New Badge */}
                  {isNewPost(post.dateOriginal) && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1 shadow-lg shadow-emerald-500/50">
                        <Sparkles className="w-3 h-3" />
                        New
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium flex items-center gap-2"
                    >
                      Baca Artikel
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <motion.div
                    className="flex items-center gap-2 text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewAll}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 font-medium"
            >
              Lihat Semua Artikel
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}