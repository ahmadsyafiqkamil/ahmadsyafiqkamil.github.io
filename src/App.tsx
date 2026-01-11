import { Navigation } from './components/Navigation'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { BlogSection } from './components/BlogSection'
import { BlogPostPage } from './components/BlogPostPage'
import { ContactSection } from './components/ContactSection'
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

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'blog-post'>('home')
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)

  const handleReadArticle = (post: BlogPost) => {
    setSelectedBlogPost(post)
    setCurrentView('blog-post')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToBlog = () => {
    setCurrentView('home')
    setSelectedBlogPost(null)
    // Scroll to blog section
    setTimeout(() => {
      const blogSection = document.getElementById('blog')
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  if (currentView === 'blog-post' && selectedBlogPost) {
    return <BlogPostPage post={selectedBlogPost} onBack={handleBackToBlog} />
  }

  return (
    <div className="dark min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection onReadArticle={handleReadArticle} />
        <ContactSection />
      </main>
    </div>
  )
}