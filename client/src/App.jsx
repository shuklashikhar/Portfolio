import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Grid Background */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
        }}
      />
      
      {/* Cursor Glow */}
      <div 
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-[1] transition-opacity duration-300 mix-blend-multiply motion-reduce:hidden"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        }}
      />
      
      <Navigation />
      <Hero />
      <Projects />
      <Skills/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
