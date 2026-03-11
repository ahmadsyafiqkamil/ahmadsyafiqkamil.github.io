import { Navigation } from './components/Navigation'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { BlogSection } from './components/BlogSection'
import { BlogPostPage } from './components/BlogPostPage'
import { AllBlogsPage } from './components/AllBlogsPage'
import { ContactSection } from './components/ContactSection'
import { useState } from 'react'
import { BlogPost } from './types/contentful'

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'blog-post' | 'all-blogs'>('home')
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

  const handleViewAllBlogs = () => {
    setCurrentView('all-blogs')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (currentView === 'blog-post' && selectedBlogPost) {
    return <BlogPostPage post={selectedBlogPost} onBack={handleBackToBlog} />
  }

  if (currentView === 'all-blogs') {
    return <AllBlogsPage onReadArticle={handleReadArticle} onBack={handleBackToHome} />
  }

  return (
    <div className="dark min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection onReadArticle={handleReadArticle} onViewAll={handleViewAllBlogs} limit={6} />
        <ContactSection />
      </main>
    </div>
  )
}