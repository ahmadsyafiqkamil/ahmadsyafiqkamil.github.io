'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useState } from 'react'

interface BlogPost {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  slug: string
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

interface BlogSectionProps {
  onReadArticle: (post: BlogPost) => void
}

export function BlogSection({ onReadArticle }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const blogPosts: BlogPost[] = [
    {
      title: 'Building Scalable React Applications with TypeScript',
      excerpt: 'Learn best practices for structuring large-scale React applications using TypeScript, including design patterns and performance optimization techniques.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
      category: 'React',
      date: 'January 5, 2024',
      readTime: '8 min read',
      slug: 'scalable-react-typescript',
      content: {
        introduction: 'Building large-scale React applications requires careful planning and adherence to best practices. TypeScript adds an extra layer of type safety that becomes invaluable as your application grows. In this comprehensive guide, we\'ll explore proven patterns and techniques for creating maintainable, scalable React applications with TypeScript.',
        sections: [
          {
            heading: 'Project Structure and Organization',
            content: 'A well-organized project structure is the foundation of scalability. Use feature-based folder organization rather than type-based. Group related components, hooks, and utilities together. This makes it easier to locate code and understand the relationships between different parts of your application.',
            codeExample: {
              language: 'typescript',
              code: `src/
  features/
    auth/
      components/
        LoginForm.tsx
        RegisterForm.tsx
      hooks/
        useAuth.ts
      services/
        authService.ts
      types/
        auth.types.ts
    dashboard/
      components/
      hooks/
      services/`
            }
          },
          {
            heading: 'Type-Safe Component Patterns',
            content: 'TypeScript enables you to create robust, self-documenting components. Always define explicit prop types and use generics for reusable components. This catches errors early and improves the developer experience with better autocomplete.',
            codeExample: {
              language: 'typescript',
              code: `interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size = 'md', 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={\`btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`
            }
          },
          {
            heading: 'State Management and Performance',
            content: 'Choose the right state management solution for your needs. For global state, consider Zustand or Redux Toolkit with TypeScript. Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders. Always measure performance before optimizing.',
          }
        ],
        conclusion: 'Building scalable React applications with TypeScript requires discipline and adherence to best practices. By following these patterns, you\'ll create applications that are easier to maintain, test, and scale. Remember that architecture evolves with your application - stay flexible and refactor as needed.'
      },
      tags: ['React', 'TypeScript', 'Architecture', 'Best Practices']
    },
    {
      title: 'Mastering CSS Grid and Flexbox: A Complete Guide',
      excerpt: 'A comprehensive guide to modern CSS layout systems. Discover when to use Grid vs Flexbox and create responsive layouts with ease.',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
      category: 'CSS',
      date: 'December 28, 2023',
      readTime: '10 min read',
      slug: 'css-grid-flexbox-guide',
      content: {
        introduction: 'CSS Grid and Flexbox are powerful layout systems that have revolutionized web design. Understanding when and how to use each one is crucial for creating modern, responsive layouts. This guide will help you master both technologies and know exactly when to apply each one.',
        sections: [
          {
            heading: 'Understanding Flexbox',
            content: 'Flexbox is perfect for one-dimensional layouts - either in a row or column. Use it for navigation bars, card layouts, centering content, and distributing space between items. Flexbox excels at handling dynamic content and creating flexible, responsive components.',
            codeExample: {
              language: 'css',
              code: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 200px; /* grow, shrink, basis */
}`
            }
          },
          {
            heading: 'Mastering CSS Grid',
            content: 'CSS Grid is designed for two-dimensional layouts. Use it for page layouts, image galleries, and complex dashboard designs. Grid gives you precise control over both rows and columns simultaneously, making it ideal for structured layouts.',
            codeExample: {
              language: 'css',
              code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  grid-auto-rows: minmax(200px, auto);
}

.featured {
  grid-column: span 2;
  grid-row: span 2;
}`
            }
          },
          {
            heading: 'Combining Grid and Flexbox',
            content: 'The real power comes from combining both. Use Grid for the overall page structure and Flexbox for component-level layouts. This approach gives you the best of both worlds - precise control where needed and flexibility where it matters.',
          }
        ],
        conclusion: 'CSS Grid and Flexbox are complementary tools, not competing ones. By understanding the strengths of each, you can create beautiful, responsive layouts with less code and better maintainability. Practice both and you\'ll develop an intuition for which to use in any situation.'
      },
      tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design']
    },
    {
      title: 'Next.js 14: What\'s New and How to Migrate',
      excerpt: 'Explore the latest features in Next.js 14, including Server Actions, improved performance, and step-by-step migration guide from older versions.',
      image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&h=600&fit=crop',
      category: 'Next.js',
      date: 'December 20, 2023',
      readTime: '12 min read',
      slug: 'nextjs-14-migration',
      tags: ['Next.js', 'React', 'Server Actions', 'Migration']
    },
    {
      title: 'API Security Best Practices for Modern Web Apps',
      excerpt: 'Essential security practices for protecting your APIs, including authentication, rate limiting, input validation, and common vulnerabilities.',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
      category: 'Security',
      date: 'December 15, 2023',
      readTime: '15 min read',
      slug: 'api-security-best-practices',
      tags: ['Security', 'API', 'Authentication', 'Best Practices']
    },
    {
      title: 'State Management in React: Redux vs Zustand vs Context',
      excerpt: 'Compare different state management solutions for React applications. Find out which tool fits your project needs best.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      category: 'React',
      date: 'December 8, 2023',
      readTime: '11 min read',
      slug: 'react-state-management',
      tags: ['React', 'Redux', 'Zustand', 'State Management']
    },
    {
      title: 'Building RESTful APIs with Node.js and Express',
      excerpt: 'Step-by-step tutorial on creating robust RESTful APIs using Node.js and Express, with authentication and database integration.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
      category: 'Backend',
      date: 'December 1, 2023',
      readTime: '14 min read',
      slug: 'nodejs-express-api',
      tags: ['Node.js', 'Express', 'REST API', 'Backend']
    }
  ]

  const categories = ['All', 'React', 'CSS', 'Next.js', 'Security', 'Backend']

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

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
          {filteredPosts.map((post, index) => (
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
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 font-medium"
          >
            Lihat Semua Artikel
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}