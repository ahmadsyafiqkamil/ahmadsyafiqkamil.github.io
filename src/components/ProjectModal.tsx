'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X, Github, ExternalLink, Calendar, Code, Image as ImageIcon } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useState } from 'react'

interface Project {
  title: string
  description: string
  fullDescription?: string
  image: string
  screenshots?: string[]
  technologies: string[]
  github: string
  live: string
  category?: string
  date?: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null)

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, type: "spring", damping: 25 }}
                className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-emerald-500 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Project Image */}
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  {/* Title & Category */}
                  <div className="mb-6">
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl md:text-4xl text-white mb-3"
                    >
                      {project.title}
                    </motion.h2>
                    {project.category && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30"
                      >
                        {project.category}
                      </motion.span>
                    )}
                  </div>

                  {/* Meta Information */}
                  {project.date && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2 text-gray-400 mb-6"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{project.date}</span>
                    </motion.div>
                  )}

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <p className="text-gray-300 leading-relaxed">
                      {project.fullDescription || project.description}
                    </p>
                  </motion.div>

                  {/* Screenshots Section */}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mb-8"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <ImageIcon className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-lg text-white">Screenshot Aplikasi</h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.screenshots.map((screenshot, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedScreenshot(screenshot)}
                            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
                          >
                            <ImageWithFallback
                              src={screenshot}
                              alt={`${project.title} screenshot ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-lg text-white">Technologies Used</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          className="px-4 py-2 bg-black/50 text-gray-300 rounded-lg text-sm border border-white/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                  >
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-black border border-white/20 text-white rounded-lg hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Screenshot Lightbox */}
          <AnimatePresence>
            {selectedScreenshot && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedScreenshot(null)}
                  className="fixed inset-0 bg-black/95 backdrop-blur-md z-[60] cursor-pointer"
                />
                <div className="fixed inset-0 z-[61] flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="relative max-w-6xl w-full"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedScreenshot(null)}
                      className="absolute -top-12 right-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-emerald-500 transition-all duration-300"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                    <ImageWithFallback
                      src={selectedScreenshot}
                      alt="Screenshot preview"
                      className="w-full h-auto rounded-lg shadow-2xl border border-white/20"
                    />
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}