"use client";
export const instant = false;

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Layout, Cloud, Cpu, Server, Check, X } from "lucide-react";
import ReactFlow, { Background, Controls, Node } from "reactflow";
import "reactflow/dist/style.css";
import { projects } from "../../data/projects";

const nodeStyle = {
  background: "rgba(20, 20, 20, 0.9)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "12px 16px",
  width: 180,
  fontSize: "12px",
  fontWeight: "bold",
  textAlign: "center" as const,
  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
  whiteSpace: "pre-wrap" as const,
};

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const project = projects.find((p) => p.id === params.id);
  
  const [activeSection, setActiveSection] = useState("summary");
  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const details = project?.architectureDetails;

  // Refs for scroll tracking
  const summaryRef = useRef<HTMLElement>(null);
  const envRef = useRef<HTMLElement>(null);
  const decisionsRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLElement>(null);

  // Intersection Observer to highlight active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    [summaryRef, envRef, decisionsRef, codeRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  if (!project || !details) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <h1 className="text-2xl">Project details not found.</h1>
        <button onClick={() => router.push("/")} className="ml-4 text-violet-400 underline">Go Home</button>
      </div>
    );
  }

  // Default Architecture Nodes for Summary
  const summaryNodes: Node[] = [
    { id: "client", position: { x: 50, y: 100 }, data: { label: "React Client (Vercel)" }, style: { ...nodeStyle, borderColor: "#3b82f6" } },
    { id: "backend", position: { x: 300, y: 100 }, data: { label: "FastAPI Backend (Render)" }, style: { ...nodeStyle, borderColor: "#8b5cf6" } },
    { id: "db", position: { x: 300, y: 300 }, data: { label: "Neon PostgreSQL" }, style: { ...nodeStyle, borderColor: "#10b981" } },
    { id: "gemini", position: { x: 550, y: 100 }, data: { label: "Google Gemini API" }, style: { ...nodeStyle, borderColor: "#f59e0b" } },
  ];
  const summaryEdges = [
    { id: "e1", source: "client", target: "backend", animated: true, style: { stroke: "#8b5cf6" } },
    { id: "e2", source: "backend", target: "db", animated: true, style: { stroke: "#10b981" } },
    { id: "e3", source: "backend", target: "gemini", animated: true, style: { stroke: "#f59e0b" } },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50 p-4 md:p-6 flex items-center justify-between">
        <button onClick={() => router.push("/")} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-xl font-bold">{project.title}</h1>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold transition-colors text-sm">
          Live App <ExternalLink size={16} />
        </a>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* LEFT SIDE: DOCUMENTATION */}
        <div className="w-full lg:w-[45%] p-6 md:p-12 overflow-y-auto max-h-[calc(100vh-80px)] custom-scrollbar space-y-24 pb-32">
          
          {/* SUMMARY */}
          <section id="summary" ref={summaryRef} className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layout className="text-blue-400" /> System Summary
            </h2>
            <ul className="space-y-4">
              {details.summaryBullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-gray-300 leading-relaxed">
                  <span className="text-violet-500 mt-1">▹</span> {bullet}
                </li>
              ))}
            </ul>
          </section>

          {/* ENVIRONMENTS */}
          <section id="environments" ref={envRef} className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Cloud className="text-emerald-400" /> Environments
            </h2>
            <div className="space-y-8">
              {details.environments.map((env, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                  <h3 className="font-mono text-lg text-white mb-2">{env.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{env.details}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ENGINEERING DECISIONS */}
          <section id="decisions" ref={decisionsRef} className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Cpu className="text-violet-400" /> Engineering Decisions
            </h2>
            <div className="space-y-8">
              {details.decisions.map((dec, i) => (
                <div key={i} className="border-l-2 border-violet-500 pl-6">
                  <h3 className="font-bold text-lg text-white mb-2">{dec.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{dec.reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CODE HIGHLIGHTS */}
          <section id="code" ref={codeRef} className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Server className="text-orange-400" /> Code Highlights
            </h2>
            
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {details.codeSnippets.map((snippet, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCodeTab(i)}
                  className={`px-4 py-2 text-xs font-mono rounded-md whitespace-nowrap transition-colors ${
                    activeCodeTab === i ? "bg-violet-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {snippet.title}
                </button>
              ))}
            </div>

            <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden mb-4">
              <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto">
                <code>{details.codeSnippets[activeCodeTab].code}</code>
              </pre>
            </div>
            
            <div className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-lg">
              <p className="text-sm text-violet-200 leading-relaxed">
                <strong className="text-white">Why it matters:</strong> {details.codeSnippets[activeCodeTab].explanation}
              </p>
            </div>
          </section>

        </div>

        {/* RIGHT SIDE: STICKY VISUALS */}
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-[calc(100vh-80px)] bg-[#0f0f0f] relative sticky top-[80px] border-l border-white/10">
          <AnimatePresence mode="wait">
            
            {/* SUMMARY VISUAL */}
            {activeSection === "summary" && (
              <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                <ReactFlow nodes={summaryNodes} edges={summaryEdges} fitView className="bg-transparent">
                  <Background color="#222" gap={20} />
                  <Controls className="bg-white/10 border-white/10 fill-white" />
                </ReactFlow>
              </motion.div>
            )}

            {/* ENVIRONMENT VISUALS */}
            {activeSection === "environments" && (
              <motion.div key="environments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col">
                {details.environments.map((env, idx) => (
                  <div key={idx} className={`flex-1 relative border-b border-white/10 ${idx === 0 ? 'bg-blue-900/5' : 'bg-emerald-900/5'}`}>
                    <div className="absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 rounded border border-white/10 text-xs font-mono font-bold">
                      {env.name}
                    </div>
                    <ReactFlow 
                      nodes={env.diagramNodes.map(n => ({ 
                        id: n.id, 
                        position: { x: n.x, y: n.y }, 
                        data: { label: n.label }, 
                        style: { ...nodeStyle, borderColor: n.color, width: 140 } 
                      }))} 
                      edges={env.diagramEdges.map((e, i) => ({ id: `e-${i}`, source: e.source, target: e.target, label: e.label, animated: true, style: { stroke: "#fff" } }))} 
                      fitView
                      className="bg-transparent"
                    >
                      <Background color="#222" gap={20} />
                    </ReactFlow>
                  </div>
                ))}
              </motion.div>
            )}

            {/* DECISIONS VISUAL */}
            {activeSection === "decisions" && (
              <motion.div key="decisions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full h-full p-12 flex flex-col justify-center gap-8 bg-black/40">
                <h3 className="text-2xl font-bold text-center mb-4">Trade-off Analysis</h3>
                {details.decisions.map((dec, idx) => (
                  <div key={idx} className="bg-[#1a1a1a] border border-white/10 p-6 rounded-xl">
                    <h4 className="text-lg font-bold mb-4">{dec.title}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {dec.comparison.map((comp, i) => (
                        <div key={i} className="bg-black/50 p-4 rounded-lg border border-white/5">
                          <p className="font-mono text-sm mb-2">{comp.method}</p>
                          <p className="text-xs text-emerald-400 flex items-center gap-1 mb-1"><Check size={12}/> {comp.pros}</p>
                          <p className="text-xs text-red-400 flex items-center gap-1"><X size={12}/> {comp.cons}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CODE VISUAL */}
            {activeSection === "code" && (
              <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#0a0a0a]">
                 <div className="w-full max-w-2xl">
                   <div className="flex gap-2 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-500" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500" />
                     <div className="w-3 h-3 rounded-full bg-green-500" />
                   </div>
                   <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                    <pre className="p-6 text-sm font-mono text-gray-300 overflow-x-auto">
                      <code>{details.codeSnippets[activeCodeTab].code}</code>
                    </pre>
                  </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}