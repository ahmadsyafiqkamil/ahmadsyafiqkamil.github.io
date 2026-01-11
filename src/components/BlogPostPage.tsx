'use client'

import { motion } from 'motion/react'
import { ArrowLeft, Calendar, Clock, Tag, Share2, Github, Twitter, Linkedin } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface BlogPost {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  slug: string
  author?: {
    name: string
    avatar: string
    role: string
  }
  content?: {
    introduction: string
    sections: {
      heading: string
      content: string
      codeExample?: {
        language: string
        code: string
      }
      image?: string
    }[]
    conclusion: string
  }
  tags?: string[]
}

interface BlogPostPageProps {
  post: BlogPost
  onBack: () => void
}

export function BlogPostPage({ post, onBack }: BlogPostPageProps) {
  // Default content structure if not provided
  const defaultContent = {
    introduction: post.excerpt,
    sections: [
      {
        heading: 'Overview',
        content: 'This article explores key concepts and best practices in modern web development. We\'ll dive deep into practical examples and real-world scenarios.'
      },
      {
        heading: 'Key Concepts',
        content: 'Understanding the fundamentals is crucial for building robust applications. Let\'s explore the core principles that make this technology powerful.',
        codeExample: {
          language: 'typescript',
          code: `// Example implementation
const example = () => {
  return "Hello World";
}`
        }
      },
      {
        heading: 'Best Practices',
        content: 'Following industry standards and best practices ensures your code is maintainable, scalable, and performant. Here are some key recommendations to keep in mind.'
      }
    ],
    conclusion: 'By implementing these patterns and practices, you\'ll be well-equipped to build modern, efficient web applications. Keep learning and experimenting!'
  }

  const content = post.content || defaultContent

  const author = post.author || {
    name: 'John Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'Full Stack Developer'
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button - Fixed */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onBack}
        className="fixed top-24 left-6 z-40 flex items-center gap-2 px-4 py-2 bg-gray-900 border border-white/10 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white hover:border-emerald-500/50 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Kembali ke Blog</span>
        <span className="sm:hidden">Kembali</span>
      </motion.button>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      >
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-500/90 text-white text-sm rounded-full backdrop-blur-sm flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 mb-12 pb-8 border-b border-white/10"
        >
          <ImageWithFallback
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
          />
          <div>
            <h3 className="text-white font-medium">{author.name}</h3>
            <p className="text-gray-400 text-sm">{author.role}</p>
          </div>
          
          {/* Share Buttons */}
          <div className="ml-auto flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gray-900 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gray-900 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all"
            >
              <Twitter className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gray-900 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            {content.introduction}
          </p>
        </motion.div>

        {/* Content Sections */}
        {content.sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-white mb-6 border-l-4 border-emerald-500 pl-4">
              {section.heading}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {section.content}
            </p>

            {/* Code Example */}
            {section.codeExample && (
              <div className="my-8 rounded-lg overflow-hidden border border-white/10">
                <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-white/10">
                  <span className="text-emerald-400 text-sm font-mono">
                    {section.codeExample.language}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white text-xs transition-colors"
                  >
                    Copy
                  </motion.button>
                </div>
                <pre className="bg-gray-950 p-6 overflow-x-auto">
                  <code className="text-gray-300 text-sm font-mono">
                    {section.codeExample.code}
                  </code>
                </pre>
              </div>
            )}

            {/* Section Image */}
            {section.image && (
              <div className="my-8 rounded-lg overflow-hidden border border-white/10">
                <ImageWithFallback
                  src={section.image}
                  alt={section.heading}
                  className="w-full h-auto"
                />
              </div>
            )}
          </motion.div>
        ))}

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12 p-6 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-lg"
        >
          <h2 className="text-2xl text-white mb-4">Kesimpulan</h2>
          <p className="text-gray-300 leading-relaxed">
            {content.conclusion}
          </p>
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-12"
          >
            <h3 className="text-white mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-900 border border-white/10 text-gray-300 rounded-full text-sm hover:border-emerald-500/50 hover:text-emerald-400 transition-all cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center py-12 border-t border-white/10"
        >
          <h3 className="text-2xl text-white mb-4">Enjoyed this article?</h3>
          <p className="text-gray-400 mb-6">Share it with your network or explore more articles</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="px-6 py-3 bg-gray-900 border border-white/20 text-white rounded-lg hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
            >
              Lihat Artikel Lainnya
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
            >
              Subscribe Newsletter
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
