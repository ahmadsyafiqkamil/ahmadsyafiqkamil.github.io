import * as React from "react"
import { useLocation } from 'react-router-dom'
import { HeroSection } from '../components/HeroSection'
import { AboutSection } from '../components/AboutSection'
import { SkillsSection } from '../components/SkillsSection'
import { ProjectsSection } from '../components/ProjectsSection'
import { ContactSection } from '../components/ContactSection'

export function Home() {
  const location = useLocation()

  React.useEffect(() => {
    // Handle hash navigation when coming from blog or external links
    const hash = location.hash.replace('#', '')
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Scroll to top when navigating to home without hash
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.hash])

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
