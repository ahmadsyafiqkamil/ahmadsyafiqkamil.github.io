'use client'

import * as React from "react"
import { motion } from 'motion/react'
import { Card } from './ui/card'
import { ExternalLink, Github } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ProjectModal } from './ProjectModal'
import { useState } from 'react'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.',
      fullDescription: 'A comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, secure payment processing with Stripe, real-time inventory tracking, order management, and an admin dashboard. The application is built with modern web technologies ensuring fast performance and excellent user experience.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1687524690542-2659f268cde8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2ODAxNDgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
      ],
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
      github: '#',
      live: '#',
      category: 'Full-Stack',
      date: 'January 2024'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative project management tool with real-time updates and drag-and-drop functionality.',
      fullDescription: 'A powerful task management application designed for teams to collaborate effectively. Features include real-time synchronization using WebSocket, intuitive drag-and-drop interface for task organization, team member assignments, progress tracking, notifications, file attachments, and detailed analytics dashboards.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1758521961744-939de61d5cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjgxMDI1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop'
      ],
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Redux'],
      github: '#',
      live: '#',
      category: 'Full-Stack',
      date: 'December 2023'
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather application with location-based forecasts and interactive maps.',
      fullDescription: 'An intuitive weather dashboard that provides accurate weather forecasts based on user location or search. Features include 7-day forecasts, hourly predictions, interactive weather maps, air quality index, UV index, sunrise/sunset times, and beautiful data visualizations using Chart.js.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1759488820765-5cf0755965ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwYXBwJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2ODAxMjA0MHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop'
      ],
      technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Tailwind CSS', 'Vuex'],
      github: '#',
      live: '#',
      category: 'Frontend',
      date: 'November 2023'
    },
    {
      title: 'Social Media Analytics',
      description: 'A dashboard for social media analytics with real-time data processing and visualizations.',
      fullDescription: 'A comprehensive analytics platform for social media managers to track performance across multiple platforms. Features include real-time data processing, custom visualizations with D3.js, automated reporting, sentiment analysis, engagement metrics, follower growth tracking, and exportable reports.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBzY3JlZW58ZW58MXx8fHwxNzY4MDE5ODA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop'
      ],
      technologies: ['Python', 'Django', 'React', 'D3.js', 'PostgreSQL', 'Celery'],
      github: '#',
      live: '#',
      category: 'Full-Stack',
      date: 'October 2023'
    },
    {
      title: 'AI Chat Interface',
      description: 'An intelligent chat interface with natural language processing and multi-language support.',
      fullDescription: 'A sophisticated AI-powered chat application utilizing OpenAI\'s API for natural conversations. Features include context-aware responses, conversation history, multi-language support, code syntax highlighting, markdown rendering, voice input capability, and customizable AI personalities.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1762340277380-04c2c30d0ef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0JTIwYXBwbGljYXRpb24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY4MTAyNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop'
      ],
      technologies: ['React', 'OpenAI API', 'Node.js', 'WebSocket', 'TypeScript', 'Redis'],
      github: '#',
      live: '#',
      category: 'Full-Stack',
      date: 'September 2023'
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with smooth animations and dark theme.',
      fullDescription: 'A modern, fully responsive portfolio website showcasing projects and skills. Built with performance in mind, featuring smooth scroll animations, dark theme with accent colors, optimized images, SEO best practices, contact form integration, and a blog section for sharing knowledge.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2ODA1Mjk2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop'
      ],
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript', 'MDX'],
      github: '#',
      live: '#',
      category: 'Frontend',
      date: 'August 2023'
    }
  ]

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-6">Katalog Proyek</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Jelajahi koleksi proyek yang telah saya kerjakan. Klik pada proyek untuk melihat detail lengkap
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => handleProjectClick(project)}
              className="cursor-pointer"
            >
              <Card className="group bg-black/50 border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-emerald-500/20">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-all duration-300"></div>
                  
                  {/* Category Badge */}
                  {project.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs rounded-full backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  )}

                  {/* Quick Action Icons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.github, '_blank')
                      }}
                      className="w-9 h-9 bg-black/80 rounded-full flex items-center justify-center text-white hover:bg-emerald-500 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.live, '_blank')
                      }}
                      className="w-9 h-9 bg-black/80 rounded-full flex items-center justify-center text-white hover:bg-emerald-500 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium"
                    >
                      Lihat Detail
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs border border-emerald-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}