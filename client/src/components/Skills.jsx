import { motion } from 'framer-motion'
import { Code2, Palette, Server, Database, Wrench, Cloud, Brain, Cpu } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'C', 'HTML5', 'CSS3']
    },
    {
      icon: Palette,
      title: 'Frontend',
      skills: ['React.js',, 'Tailwind CSS', 'Shadcn UI', ]
    },
    {
      icon: Server,
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'FastAPI', 'Socket.io', 'JWT', 'REST APIs']
    },
    {
      icon: Database,
      title: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'Redis']
    },
    {
      icon: Cpu,
      title: 'AI/ML',
      skills: ['LLM Integration', 'RAG Systems', 'Gemini API', 'OpenAI', 'Vector Search']
    },
    {
      icon: Wrench,
      title: 'Tools',
      skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Docker', 'Linux', 'Vercel']
    },
    
    
  ]

  return (
    <section id="skills" className="py-20 px-6 lg:px-12 relative">
      <div className="max-w-[1300px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Technical Skills
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#FFFEF9] rounded-3xl p-10 border border-[rgba(99,102,241,0.1)] shadow-xl backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nav-color to-accent-1 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Icon size={16} className="text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-[#1a1a1a]">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[rgba(99,102,241,0.07)] hover:bg-[rgba(99,102,241,0.12)] transition-colors text-[#1a1a1a] rounded-md text-xs sm:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
