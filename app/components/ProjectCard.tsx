"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

// Custom GitHub Icon to replace the removed lucide-react brand icon
function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.6-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

type ProjectProps = {
  project: {
    id: string;
    title: string;
    description: string;
    tech: string[];
    liveUrl: string;
    githubUrl: string;
    color: string;
  };
};

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm overflow-hidden"
    >
      {/* Gradient Glow Effect on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 text-xs font-medium text-gray-300 bg-white/10 rounded-md">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href={`/projects/${project.id}`}
            className="flex-1 text-center py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
          >
            Explore System
          </Link>
          
          {project.liveUrl !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors" title="Live Demo">
              <ExternalLink size={20} />
            </a>
          )}
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors" title="GitHub">
            <GithubIcon size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}