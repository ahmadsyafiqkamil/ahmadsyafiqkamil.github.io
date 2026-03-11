'use client'

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
      title: 'AI-Powered Consular Chatbot — KJRI Dubai',
      description: 'Production-ready LLM agent for consular services — one of the first AI-powered citizen services in Indonesian diplomatic infrastructure.',
      fullDescription: 'Building a production-ready AI agent for consular services at KJRI Dubai using Google Agent Development Kit (ADK), Python, FastAPI, and PostgreSQL. One of the first LLM-agent deployments in Indonesian government diplomatic infrastructure, enabling 24/7 automated citizen services for WNI in UAE. The system handles common consular queries, document guidance, and service routing with context-aware responses.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
      ],
      technologies: ['Google ADK', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
      github: '#',
      live: '#',
      category: 'AI / Backend',
      date: 'In Development, 2025–2026'
    },
    {
      title: 'Protkons — National Consular Protection Platform',
      description: 'Multi-mission consular protection system serving 1M+ registered WNI across 6 Indonesian missions in Malaysia.',
      fullDescription: 'Multi-mission consular protection system deployed across 6 Indonesian missions in Malaysia, serving over one million registered WNI. Handles citizen registration, legal protection, welfare tracking, and case escalation. Built with PHP, CodeIgniter, and MySQL, containerized with Docker across dedicated on-premise servers maintaining 99.9% uptime.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop'
      ],
      technologies: ['PHP', 'CodeIgniter', 'MySQL', 'Docker'],
      github: '#',
      live: '#',
      category: 'Full-Stack',
      date: '2022–Present'
    },
    {
      title: 'MLOps Infrastructure for National Research',
      description: 'Shared machine learning infrastructure using Kubernetes and Kubeflow, adopted by multiple BPPT research centers for deploying computer vision models at scale.',
      fullDescription: 'Architected end-to-end MLOps infrastructure from server setup to CI/CD pipelines using Kubernetes and Kubeflow at Badan Pengkajian dan Penerapan Teknologi (BPPT). Enabled automated model training, versioning, and deployment. The face recognition system built on this infrastructure achieved 92% accuracy and is currently in active use by a government ministry for attendance management. Conducted hands-on training for 20+ research engineers.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop'
      ],
      technologies: ['Kubernetes', 'Docker', 'Python', 'TensorFlow', 'MLflow'],
      github: '#',
      live: '#',
      category: 'MLOps / AI',
      date: '2022'
    },
    {
      title: 'AI-Powered Data Pipeline Automation',
      description: 'Intelligent data processing workflows using Claude AI API and n8n — exploring AI-driven validation and automated reporting for research datasets.',
      fullDescription: 'Built a working prototype of intelligent data processing workflows using the Claude AI API and n8n automation platform. The system explores AI-driven data validation, automated reporting, and research dataset enrichment. Demonstrates integration patterns for embedding LLMs into existing data pipelines using Python, Docker, and PostgreSQL.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop'
      ],
      technologies: ['Python', 'Claude AI', 'n8n', 'Docker', 'PostgreSQL'],
      github: '#',
      live: '#',
      category: 'AI / Automation',
      date: '2025'
    },
    {
      title: 'BetterFuture & E-Voting DApps',
      description: 'Decentralized applications using Solidity smart contracts with secure on-chain voting mechanisms and tokenized incentive systems.',
      fullDescription: 'Developed two decentralized applications on Ethereum using Solidity smart contracts and Vite.js frontends. BetterFuture features tokenized incentive systems for positive social impact. The E-Voting DApp implements secure on-chain voting mechanisms with cryptographic verification, tamper-proof ballot recording, and transparent result tallying via Hardhat and Web3.js integration.',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop'
      ],
      technologies: ['Solidity', 'Ethereum', 'Vite.js', 'Web3.js', 'Hardhat'],
      github: '#',
      live: '#',
      category: 'Web3 / Blockchain',
      date: '2025'
    },
    {
      title: 'Parvata & FOCO iOS Apps',
      description: 'Native iOS productivity and focus management tools with CoreData, background notifications, and Apple HIG-compliant interfaces.',
      fullDescription: 'Two native iOS applications built with Swift and SwiftUI during the Apple Academy Developer program. Parvata is a productivity tool featuring CoreData integration for offline-first data persistence and CloudKit sync. FOCO is a focus management app with Pomodoro-style sessions, background notifications, and progress analytics. Both apps follow Apple Human Interface Guidelines for a polished, native feel.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop'
      ],
      technologies: ['Swift', 'SwiftUI', 'CoreData', 'CloudKit'],
      github: '#',
      live: '#',
      category: 'iOS / Mobile',
      date: '2024'
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