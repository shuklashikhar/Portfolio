// src/components/Projects.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Code2, Trophy, BookOpen } from "lucide-react";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("projects");
  const [expandedProject, setExpandedProject] = useState(null);

  // Close modal when category changes
  useEffect(() => {
    setExpandedProject(null);
  }, [activeCategory]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && expandedProject) {
        setExpandedProject(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [expandedProject]);

  const categories = [
    { id: "projects", name: "Projects", icon: Code2 },
    { id: "achievements", name: "Achievements", icon: Trophy },
    { id: "blogs", name: "Blogs", icon: BookOpen },
  ];

  // === Replace this single placeholder entry with your real project ===
  const projects = {
    projects: [
      {
        id: "bookstackr",
        title: "BookStackr",
        intro:
          "A book-tracking app with charts, tables, and Google Sign-In built using React and Firebase.",
        cardHighlights: ["Reading Analytics", "Google Auth", "Firestore"],
        github: "https://github.com/shuklashikhar/BookStackr", // update if needed
        deployed: "https://bookledger.netlify.app/books",
        techStack: [
          "React",
          "Firebase (Firestore)",
          "Google Authentication",
          "Tailwind CSS",
        ],
        details: `• Developed a comprehensive book tracking application to log books by year, category, and format.
• Implemented dual data views — interactive charts and tables — to give users clear insights into reading trends.
• Added secure Google Sign-In authentication and persistent user storage via Firestore, while supporting mock data for fast access.
• Delivered a clean, responsive UI optimized for usability and smooth user interaction.
\n\nTimeline: July 2025 – Present`,
        coolPoint:
          "Interactive charts + tables that instantly visualize your reading habits.",
      },
    ],
    achievements: [
      // intentionally empty — add objects here later with same shape as projects if needed
    ],
    blogs: [
      // intentionally empty — add blog entries here later
    ],
  };

  const currentProjects = projects[activeCategory] || [];

  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10"
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About My Works:
        </motion.h2>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-nav-color to-accent-1 text-white shadow-lg shadow-nav-color/30"
                    : "bg-[#FFFEF9] text-[#1a1a1a] border-2 border-[rgba(99,102,241,0.1)] hover:border-nav-color/30"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon size={18} />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* If empty, show a simple empty state card */}
            {currentProjects.length === 0 && (
              <motion.div
                className="col-span-1 md:col-span-2 bg-[#FFFEF9] rounded-2xl p-8 border-2 border-[rgba(99,102,241,0.06)] text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg text-[#4a4a4a]">
                  No items yet. I will add content here soon.
                </p>
              </motion.div>
            )}

            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-[#FFFEF9] rounded-2xl p-6 sm:p-8 border-2 border-[rgba(99,102,241,0.08)] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-nav-color/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[rgba(99,102,241,0.08)] hover:bg-nav-color hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.deployed && (
                      <a
                        href={project.deployed}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[rgba(99,102,241,0.08)] hover:bg-nav-color hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-[#4a4a4a] mb-4 text-sm sm:text-base leading-relaxed">
                  {project.intro}
                </p>

                {/* Card Highlights */}
                {project.cardHighlights && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.cardHighlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-nav-color/10 to-accent-1/10 text-nav-color rounded-lg text-xs sm:text-sm font-medium border border-nav-color/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Details Button */}
                {(project.details || project.techStack || project.aiModels) && (
                  <button
                    onClick={() => setExpandedProject(project.id)}
                    className="w-full p-3 rounded-lg bg-gradient-to-r from-nav-color to-accent-1 text-white hover:shadow-lg transition-all duration-300 text-sm sm:text-base font-medium mt-4"
                  >
                    View Details
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Details Modal */}
        <AnimatePresence>
          {expandedProject &&
            (() => {
              const project = projects[activeCategory]?.find(
                (p) => p.id === expandedProject
              );
              if (!project) return null;

              return (
                <>
                  {/* Backdrop */}
                  <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000]"
                    onClick={() => setExpandedProject(null)}
                  />

                  {/* Modal Container */}
                  <div className="fixed inset-0 z-[2001] flex items-center justify-center p-4 pointer-events-none">
                    <motion.div
                      key="modal"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        damping: 25,
                      }}
                      className="w-full max-w-4xl max-h-[90vh] bg-[#FFFEF9] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Modal Header */}
                      <div className="flex items-center justify-between p-6 border-b border-[rgba(99,102,241,0.08)] bg-gradient-to-r from-nav-color/5 to-accent-1/5">
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]">
                          {project.title}
                        </h3>
                        <button
                          onClick={() => setExpandedProject(null)}
                          className="p-2 rounded-lg hover:bg-[rgba(99,102,241,0.06)] transition-colors"
                          aria-label="Close modal"
                        >
                          <X size={24} className="text-[#1a1a1a]" />
                        </button>
                      </div>

                      {/* Modal Content */}
                      <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {project.details && (
                          <div>
                            <h4 className="font-bold text-lg text-[#1a1a1a] mb-3">
                              Technical Description:
                            </h4>
                            <p className="text-[#4a4a4a] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                              {project.details}
                            </p>
                          </div>
                        )}

                        {project.techStack && (
                          <div>
                            <h4 className="font-bold text-lg text-[#1a1a1a] mb-3">
                              Tech Stack:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 bg-[rgba(99,102,241,0.06)] text-[#1a1a1a] rounded-lg text-sm font-medium border border-nav-color/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {project.coolPoint && (
                          <div className="p-4 bg-gradient-to-r from-accent-3/10 to-accent-4/10 rounded-lg border border-accent-3/20">
                            <p className="text-base text-[#1a1a1a] font-medium">
                              <span className="font-bold">Cool Point:</span>{" "}
                              {project.coolPoint}
                            </p>
                          </div>
                        )}

                        {/* Links */}
                        <div className="flex gap-4 pt-4 border-t border-[rgba(99,102,241,0.08)]">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-[rgba(99,102,241,0.06)] hover:bg-nav-color hover:text-white rounded-lg transition-all font-medium"
                            >
                              <Github size={18} />
                              <span>GitHub</span>
                            </a>
                          )}
                          {project.deployed && (
                            <a
                              href={project.deployed}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-[rgba(99,102,241,0.06)] hover:bg-nav-color hover:text-white rounded-lg transition-all font-medium"
                            >
                              <ExternalLink size={18} />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </>
              );
            })()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
