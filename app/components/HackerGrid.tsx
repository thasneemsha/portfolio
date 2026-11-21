"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Pattern0 = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full opacity-50" preserveAspectRatio="none">
    <rect x="10" y="20" width="80" height="10" fill="white" />
    <rect x="30" y="50" width="50" height="10" fill="white" />
    <rect x="10" y="70" width="40" height="10" fill="white" />
  </svg>
);
const Pattern1 = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full opacity-50" preserveAspectRatio="none">
    <rect x="20" y="20" width="30" height="30" fill="white" />
    <rect x="60" y="50" width="20" height="20" fill="white" />
    <rect x="30" y="70" width="10" height="10" fill="white" />
  </svg>
);
const Pattern2 = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full opacity-50" preserveAspectRatio="none">
    <rect x="20" y="30" width="60" height="15" fill="white" />
    <rect x="40" y="60" width="40" height="10" fill="white" />
  </svg>
);

// 6x6 Grid (36 boxes). 
// We keep the empty boxes (color: "none") so it looks like a full system dashboard.
const tiles = [
  // Row 1
  { color: "purple", pattern: 0, text: "Python" }, { color: "green", pattern: 1, text: "React" }, { color: "none", pattern: 3, text: "" }, { color: "purple", pattern: 2, text: "JavaScript" }, { color: "none", pattern: 3, text: "" }, { color: "green", pattern: 0, text: "SQL" },
  // Row 2
  { color: "none", pattern: 3, text: "" }, { color: "purple", pattern: 1, text: "FastAPI" }, { color: "green", pattern: 2, text: "Docker" }, { color: "none", pattern: 3, text: "" }, { color: "purple", pattern: 0, text: "Java" }, { color: "green", pattern: 1, text: "C++" },
  // Row 3
  { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "green", pattern: 0, text: "Node.js" }, { color: "purple", pattern: 2, text: "PostgreSQL" }, { color: "none", pattern: 3, text: "" }, { color: "green", pattern: 1, text: "AWS EC2" },
  // Row 4
  { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "green", pattern: 1, text: "Git/GitHub" }, { color: "none", pattern: 3, text: "" }, { color: "purple", pattern: 0, text: "MongoDB" },
  // Row 5
  { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "purple", pattern: 1, text: "OAuth 2.0" }, { color: "green", pattern: 2, text: "Vercel" },
  // Row 6
  { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "none", pattern: 3, text: "" }, { color: "purple", pattern: 0, text: "Render" },
];

export default function HackerGrid() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredCell(null);
  };

  return (
    <div 
      className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-auto"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        style={{ rotateX, rotateY }}
        className="w-full h-full grid grid-cols-6 gap-1 md:gap-2 transform-gpu"
      >
        {tiles.map((tile, i) => {
          const isHovered = hoveredCell === i;
          const isPurple = tile.color === "purple";
          const isGreen = tile.color === "green";
          const Pattern = tile.pattern === 0 ? Pattern0 : tile.pattern === 1 ? Pattern1 : tile.pattern === 2 ? Pattern2 : null;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredCell(i)}
              className={`relative flex items-center justify-center rounded-md border transition-all duration-300
                ${isHovered 
                  ? "bg-white scale-110 z-30 border-white shadow-[0_0_25px_rgba(255,255,255,0.8)]" 
                  : isPurple ? "bg-violet-600/30 border-violet-500/40" 
                  : isGreen ? "bg-emerald-500/30 border-emerald-500/40" 
                  : "bg-transparent border-white/5"
                }
              `}
            >
              {/* Show pattern if colored and not hovered */}
              {Pattern && !isHovered && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Pattern />
                </div>
              )}
              
              {/* Show text ALWAYS */}
              {tile.text && (
                <span className={`relative z-10 font-mono text-[10px] md:text-xs font-bold tracking-tight text-center leading-tight px-1 transition-colors duration-300 ${isHovered ? "text-black" : "text-white/80"}`}>
                  {tile.text}
                </span>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}