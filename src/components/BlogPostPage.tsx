'use client'

import { motion } from 'motion/react'
import { ArrowLeft, Calendar, Clock, Tag, Share2, Github, Twitter, Linkedin } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { BlogPost } from '../types/contentful'
import { RichTextRenderer } from './RichTextRenderer'

interface BlogPostPageProps {
  post: BlogPost
  onBack: () => void
}

export function BlogPostPage({ post, onBack }: BlogPostPageProps) {
  const content = post.content

  const author = post.author || {
    name: 'Ahmad Syafiq Kamil',
    avatar: 'https://github.com/ahmadsyafiqkamil.png',
    role: 'Senior Full Stack Engineer & AI Systems Builder'
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
              onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
              className="w-10 h-10 bg-gray-900 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.a
              href={`https://x.com/__syafiq`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gray-900 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all"
              title="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/ahmadsyafiqkamil"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gray-900 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* Introduction */}
        {content?.introduction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <RichTextRenderer document={content.introduction} className="text-lg" />
          </motion.div>
        )}

        {/* Main Content Body */}
        {content?.body && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <RichTextRenderer document={content.body} />
          </motion.div>
        )}

        {/* Conclusion */}
        {content?.conclusion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12 p-6 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-lg"
          >
            <h2 className="text-2xl text-white mb-4">Kesimpulan</h2>
            <RichTextRenderer document={content.conclusion} />
          </motion.div>
        )}

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
