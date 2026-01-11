import * as React from "react"
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'
import { BlogSection } from './components/BlogSection'
import { BlogPost } from './components/BlogPost'
import { ContentfulTest } from './components/ContentfulTest'

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <div className="dark min-h-screen bg-black text-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogSection />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/test-contentful" element={<ContentfulTest />} />
          </Routes>
        </div>
      </HashRouter>
    </ErrorBoundary>
  )
}