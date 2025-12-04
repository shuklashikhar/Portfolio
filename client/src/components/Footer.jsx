import { Mail, FileText, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
const RESUME_URL = 'https://drive.google.com/file/d/1qUYeAqRVQfwQMUvfCSEIfmZDFKBw5Oyz/view'
const Footer = () => {
  return (
    <footer className="bg-[#FFFEF9] border-t border-[rgba(99,102,241,0.1)] mt-16 py-10 px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <h3 className="text-2xl font-bold text-[#1a1a1a]">Shikhar Shukla</h3>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[#4a4a4a]">
          <a
            href="mailto:shuklashikhar2004@gmail.com"
            className="flex items-center gap-2 hover:text-nav-color transition-colors"
          >
            <Mail size={16} />
            <span>shuklashikhar2004@gmail.com</span>
          </a>

          <span className="hidden sm:block">•</span>

          <a
            href={`${RESUME_URL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-nav-color transition-colors"
          >
            <FileText size={16} />
            <span>View Resume</span>
          </a>
        </div>

        <p className="text-[#4a4a4a] text-base">
          Thank you for visiting my portfolio! I truly appreciate your time and interest.
        </p>

        <div className="border-t border-[rgba(99,102,241,0.15)] pt-4 text-sm text-[#6b7280]">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart size={14} className="text-red-500" /> by <span className="font-semibold text-nav-color">shikhar</span>
          </p>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
