"use client";

import { motion } from "framer-motion";
import ProjectCard from "./components/ProjectCard";
import HackerGrid from "./components/HackerGrid";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-violet-500/30 overflow-x-hidden relative">
      
      {/* THE HACKER GRID - Top Right Corner, fully visible and interactive */}
      <div className="fixed top-0 right-0 z-0 opacity-50 pointer-events-auto">
        <HackerGrid />
      </div>

      {/* MAIN CONTENT WRAPPER - pointer-events-none lets mouse pass through empty spaces */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pointer-events-none">
        
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[150px] rounded-full -z-10" />
          
          {/* Text container has pointer-events-none so mouse passes through the text itself */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none"
          >
            <p className="text-violet-400 font-mono mb-4 tracking-widest text-sm">HELLO WORLD, I AM</p>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              Thasneem Mohamed
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10">
              Full-stack developer building fast, secure, and user-focused applications.
            </p>
            
            {/* Buttons container has pointer-events-auto so they are clickable */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
              <a href="#projects" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-200">
                View My Work
              </a>
              <a href="/ThasneemMohamed_Resume.pdf" target="_blank" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-200">
                Download Resume
              </a>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION - pointer-events-auto so cards can be clicked */}
        <section id="projects" className="pb-32 pt-20 pointer-events-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Systems</h2>
            <p className="text-gray-400">Click "Explore System" to see the architecture, code, and live demo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center pb-12 text-gray-600 text-sm relative z-10 border-t border-white/10 pt-8 pointer-events-auto">
          <p>© 2024 Thasneem Mohamed. Built with Next.js & Tailwind.</p>
        </footer>
      </div>
    </main>
  );
}