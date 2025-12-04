import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: import.meta.env.VITE_RESUME_URL },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[1000] bg-[rgba(250,249,246,0.8)] backdrop-blur-[10px] border-b border-[rgba(99,102,241,0.1)] py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
        <motion.div
          className="font-mono font-bold text-2xl cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="bg-gradient-to-br from-nav-color to-accent-1 bg-clip-text text-transparent">
            SS
          </span>
        </motion.div>

        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-[#1a1a1a] font-medium text-[0.95rem] relative transition-colors duration-300 hover:text-nav-color group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -2 }}
            >
              {item.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-nav-color to-accent-1 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <button
          className="md:hidden bg-transparent border-none text-[#1a1a1a] cursor-pointer p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <motion.div
        className="md:hidden flex flex-col bg-[rgba(250,249,246,0.95)] backdrop-blur-[10px] overflow-hidden"
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="py-4 px-8 text-[#1a1a1a] font-medium border-t border-[rgba(99,102,241,0.1)] transition-colors duration-300 hover:bg-[rgba(99,102,241,0.05)]"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </a>
        ))}
      </motion.div>
    </motion.nav>
  )
}

export default Navigation
