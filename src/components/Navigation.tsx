import * as React from "react"
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isBlogRoute = location.pathname.startsWith('/blog')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (isBlogRoute) {
      // If on blog route, navigate to home first
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'home', label: 'Home', action: () => scrollToSection('home') },
    { id: 'about', label: 'About', action: () => scrollToSection('about') },
    { id: 'skills', label: 'Skills', action: () => scrollToSection('skills') },
    { id: 'projects', label: 'Projects', action: () => scrollToSection('projects') },
    { id: 'blog', label: 'Blog', action: () => {}, isLink: true },
    { id: 'contact', label: 'Contact', action: () => scrollToSection('contact') },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-xl font-medium cursor-pointer hover:text-gray-300 transition-colors"
            >
              &lt;DevPortfolio /&gt;
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              if (item.isLink) {
                return (
                  <Link
                    key={item.id}
                    to="/blog"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`transition-colors duration-200 capitalize ${
                        location.pathname.startsWith('/blog')
                          ? 'text-white font-medium'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                )
              }
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={item.action}
                  className={`transition-colors duration-200 capitalize ${
                    location.pathname === '/' && !isBlogRoute
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-white/10"
            >
              <div className="flex flex-col space-y-4 pt-4">
                {navItems.map((item) => {
                  if (item.isLink) {
                    return (
                      <Link
                        key={item.id}
                        to="/blog"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`transition-colors duration-200 capitalize ${
                          location.pathname.startsWith('/blog')
                            ? 'text-white font-medium'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  }
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action()
                        setMobileMenuOpen(false)
                      }}
                      className="text-left text-gray-300 hover:text-white transition-colors duration-200 capitalize"
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}