import { motion } from "framer-motion";
import { Linkedin, Github, Twitter, Code, Sparkles } from "lucide-react";
import RedditIcon from "./RedditIcon";
import CPStats from "./CPStats";

const Hero = () => {
  const socialLinks = [
    {
      icon: Twitter,
      href: "https://x.com/shikhar_73",
      color: "#1DA1F2",
      name: "X (Twitter)",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/shikharshukla07",
      color: "#0A66C2",
      name: "LinkedIn",
    },
    {
      icon: RedditIcon,
      href: "https://reddit.com/u/",
      color: "#FF4500",
      name: "Reddit",
    },
  ];

  const careerProfiles = [
    {
      icon: Github,
      href: "https://github.com/shuklashikhar",
      color: "#24292e",
      name: "GitHub",
    },
    {
      icon: Code,
      href: "https://leetcode.com/shikharshukla07",
      color: "#FFA116",
      name: "LeetCode",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-32 pb-16 px-8 z-10"
    >
      <div className="max-w-[1300px] w-full relative z-[2]">
        {/* Mobile Layout: Single column with custom order, Desktop: Grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-16 items-start">
          {/* Left Column - All content properly contained */}
          <div className="flex flex-col w-full space-y-8">
            {/* Introduction Section - Mobile: order-1 */}
            <motion.div
              className="text-center lg:text-left relative z-[3] order-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                className="text-[clamp(1.5rem,3vw,2rem)] font-normal text-[#4a4a4a] mb-4 font-sans"
                variants={itemVariants}
              >
                Hello, Nice to meet you.
              </motion.h2>

              <motion.h1
                className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold mb-6 leading-tight tracking-[-0.02em]"
                variants={itemVariants}
              >
                I am{" "}
                <span className="bg-gradient-to-br from-nav-color via-accent-1 to-accent-2 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift">
                  Shikhar Shukla
                </span>
              </motion.h1>

              <motion.p
                className="text-[clamp(1.2rem,2.5vw,1.8rem)] text-[#1a1a1a] leading-relaxed mb-12 font-normal"
                variants={itemVariants}
              >
                I love to find enjoyment in my work.
              </motion.p>
            </motion.div>

            {/* Social Links - Mobile: order-2, Desktop: order preserved */}
            <motion.div
              className="order-2"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-base text-[#4a4a4a] mb-4 font-semibold uppercase tracking-wider font-mono text-center lg:text-left">
                My Social Presence
              </h3>
              <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                {socialLinks.map(({ icon: Icon, href, color, name }, index) => (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-[65px] h-[65px] rounded-2xl flex items-center justify-center bg-[#FFFEF9] shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#1a1a1a] no-underline transition-all duration-300 cursor-pointer border-2 border-[rgba(99,102,241,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[currentColor] hover:-translate-y-0.5 group"
                    style={{ color: color }}
                    whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Icon size={28} color={color} />
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300 font-medium z-[1000] group-hover:opacity-100">
                      {name}
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-[#1a1a1a]" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Career Profiles - Mobile: order-3, Desktop: order preserved */}
            <motion.div
              className="order-3"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-base text-[#4a4a4a] mb-4 font-semibold uppercase tracking-wider font-mono text-center lg:text-left">
                My Career Profiles
              </h3>
              <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                {careerProfiles.map(
                  ({ icon: Icon, href, color, name }, index) => (
                    <motion.a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-[65px] h-[65px] rounded-2xl flex items-center justify-center bg-[#FFFEF9] shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#1a1a1a] no-underline transition-all duration-300 cursor-pointer border-2 border-[rgba(99,102,241,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[currentColor] hover:-translate-y-0.5 group"
                      style={{ color: color }}
                      whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <Icon size={28} color={color} />
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300 font-medium z-[1000] group-hover:opacity-100">
                        {name}
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-[#1a1a1a]" />
                      </span>
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* CP Stats - Right column on desktop, appears between intro and social on mobile */}
          <motion.div
            className="relative h-full flex items-start justify-center w-full lg:order-none order-2"
            variants={rightVariants}
            initial="hidden"
            animate="visible"
          >
            <CPStats />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
