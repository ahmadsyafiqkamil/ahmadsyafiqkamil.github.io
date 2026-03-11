'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Code, Coffee, Lightbulb, Users } from 'lucide-react'

export function AboutSection() {
  const features = [
    {
      icon: Code,
      title: 'AI-Powered Systems',
      description: 'Building production-ready LLM agents and AI pipelines using Google ADK, LangChain, and Claude AI for real-world government and enterprise deployments.'
    },
    {
      icon: Lightbulb,
      title: 'Cloud & DevOps',
      description: 'Containerizing and deploying mission-critical applications with Docker and Kubernetes, achieving 99.9% uptime across 7 diplomatic missions.'
    },
    {
      icon: Users,
      title: 'Cross-Institutional',
      description: 'Collaborating with government ministries, diplomatic missions, and international clients across Indonesia, Malaysia, UAE, and Germany.'
    },
    {
      icon: Coffee,
      title: 'Security & Compliance',
      description: 'ISO 27001 Lead Auditor certified with hands-on experience implementing RBAC, AES-256 encryption, and HIPAA-aligned data handling.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto"></div>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl text-white mb-4">
              Software engineer solving high-stakes problems at national scale
            </h3>
            <p className="text-gray-300 leading-relaxed">
              With 7+ years of experience, I've built and deployed AI-powered systems and scalable data infrastructure
              for Indonesian diplomatic missions, national research institutions (BRIN, BPPT), and government agencies.
              From serving 1M+ registered citizens through the Protkons consular platform to pioneering the first
              LLM-agent chatbot in Indonesian diplomatic infrastructure.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I'm a generalist who moves fluidly across the stack — Python backends, Next.js frontends, Kubernetes
              clusters, MLOps pipelines, iOS apps, and Solidity smart contracts. Currently focused on integrating
              AI-assisted development workflows and building intelligent automation for impactful real-world problems,
              with a growing interest in healthcare technology.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 mt-6"
            >
              {['ISO 27001 Certified', 'AI Systems Builder', 'Cloud Native', 'Open to Remote'].map((trait, index) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30"
                >
                  {trait}
                </span>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-black/50 border-white/10 hover:border-emerald-500/50 transition-all duration-300 group">
                  <div className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-white text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}