"use client";

import { motion } from "framer-motion";
import ProjectCard from "./components/ProjectCard";
import HackerGrid from "./components/HackerGrid";
import { projects } from "./data/projects";

// Importing official brand logos from react-icons (Simple Icons)
import {
  SiPython, SiJavascript, SiJava, SiCplusplus, SiMysql, SiHtml5,
  SiFastapi, SiReact, SiJetpackcompose, SiSqlalchemy, SiPydantic,
  SiNodedotjs, SiAuth0, SiApachetomcat, SiAmazonaws, SiDocker,
  SiPostgresql, SiGit, SiGithub, SiRender, SiVercel, SiMicrosoftexcel
} from "react-icons/si";

// Data mapping the icons and their specific brand colors
const skillsData = [
  { name: "Python", icon: <SiPython />, color: "text-[#3776AB]" },
  { name: "JavaScript", icon: <SiJavascript />, color: "text-[#F7DF1E]" },
  { name: "Java", icon: <SiJava />, color: "text-[#007396]" },
  { name: "C++", icon: <SiCplusplus />, color: "text-[#00599C]" },
  { name: "SQL", icon: <SiMysql />, color: "text-[#4479A1]" },
  { name: "HTML/CSS", icon: <SiHtml5 />, color: "text-[#E34F26]" },
  { name: "FastAPI", icon: <SiFastapi />, color: "text-[#009688]" },
  { name: "React", icon: <SiReact />, color: "text-[#61DAFB]" },
  { name: "Jetpack Compose", icon: <SiJetpackcompose />, color: "text-[#4285F4]" },
  { name: "SQLAlchemy", icon: <SiSqlalchemy />, color: "text-[#D71F00]" },
  { name: "Pydantic", icon: <SiPydantic />, color: "text-[#E92063]" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "text-[#339933]" },
  { name: "OAuth 2.0", icon: <SiAuth0 />, color: "text-[#EB5424]" },
  { name: "Apache Tomcat", icon: <SiApachetomcat />, color: "text-[#F8DC75]" },
  { name: "AWS EC2", icon: <SiAmazonaws />, color: "text-[#FF9900]" },
  { name: "Docker", icon: <SiDocker />, color: "text-[#2496ED]" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-[#4169E1]" },
  { name: "Git", icon: <SiGit />, color: "text-[#F05032]" },
  { name: "GitHub", icon: <SiGithub />, color: "text-white" },
  { name: "Render", icon: <SiRender />, color: "text-[#46E3B7]" },
  { name: "Vercel", icon: <SiVercel />, color: "text-white" },
  { name: "Microsoft Excel", icon: <SiMicrosoftexcel />, color: "text-[#217346]" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-violet-500/30 overflow-x-hidden relative">
      
      {/* THE HACKER GRID - Top Right Corner */}
      <div className="fixed top-0 right-0 z-0 opacity-50 pointer-events-auto">
        <HackerGrid />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pointer-events-none">
        
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-center pt-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[150px] rounded-full -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none"
          >
            <p className="text-violet-400 font-mono mb-4 tracking-widest text-sm">HELLO WORLD, I AM</p>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 whitespace-nowrap">
              Thasneem Mohamed
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10">
              Full-stack developer building fast, secure, and user-focused applications.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
              <a href="#projects" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-200">
                View My Work
              </a>
              <a href="/ThasneemMohamedResume.pdf" target="_blank" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-200">
                Download Resume
              </a>
            </div>
          </motion.div>
        </section>

        {/* ABOUT & SKILLS SECTION */}
        <section className="w-full py-20 pointer-events-auto relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-16 text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
            <p>
              I have built and deployed three production-grade applications — a full-stack AI fitness platform, a native Android app, and a multi-API orchestration engine — using FastAPI, React, and PostgreSQL. Seeking a software engineering role to bring that same end-to-end ownership to a real team.
            </p>
          </motion.div>

          {/* Skills Icon Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg cursor-default hover:bg-[#222] hover:border-white/30 transition-all duration-200 shadow-sm"
                >
                  {/* The Icon wrapper uses the specific brand color */}
                  <span className={`text-xl transition-transform duration-200 group-hover:scale-125 ${skill.color}`}>
                    {skill.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="pb-32 pt-10 pointer-events-auto">
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
          <p>© 2024 Thasneem Mohamed.</p>
        </footer>
      </div>
    </main>
  );
}
