"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, FileText, Globe, Cpu, Award, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Hero3D from "./components/hero/Hero3D";



const projects = [
  {
    title: "Finance AI Research",
    tags: ["LangGraph", "FastAPI"],
    description: "Financial AI Assistant implementing advanced RAG architecture (Self-RAG, Corrective RAG, Adaptive RAG) to answer complex queries from live APIs.",
    link: "https://github.com/ChinmayNakwa/Financial-AI-System",
    image: "/Fin-AI.png" 
  },
  {
    title: "Cerebrix",
    tags: ["AI Tutor", "Multi-modal RAG", "Socratic Method"],
    description: "AI-powered teaching assistant for any subject integrating PDF textbooks and YouTube lectures into a seamless RAG pipeline.",
    link: "https://github.com/ChinmayNakwa/Cerebrix",
    image: "/cerebrix.png"
  },
  {
    title: "Google Workspace MCP",
    tags: ["Claude Desktop", "FastMCP", "Agentic AI"],
    description: "Model-Context-Protocol server designed to be called by external AI agents for email composition and calendar management.",
    link: "https://github.com/ChinmayNakwa/Google_Workspace_MCP",
    image: "/mcp.png"
  },
  {
    title: "Lung Cancer Detection",
    tags: ["EfficientNetB4", "TensorFlow", "Medical AI"],
    description: "A full-stack AI-powered lung cancer detection system with online retraining, MLflow experiment tracking, and a human-in-the-loop learning pipeline.",
    link: "https://github.com/ChinmayNakwa/Lung_Cancer_Detection/tree/ml-pipeline",
    image: "/lung-cancer.jpg"
  },
  {
    title: "GoRilla",
    tags: ["Go", "Interpreter"],
    description: "An Interpreter in GO",
    link: "https://github.com/ChinmayNakwa/GoRilla",
    image: ""
  },
  {
    title: "MintFlowAI",
    tags: ["Gemini", "Blockchain"],
    description: "AI-Powered NFT Minter on the Sui Blockchain",
    link: "https://github.com/ChinmayNakwa/MintFlowAI",
    image: "/mint-flow.png"
  }
];

const articles = [
  {
    title: "Enhancing Sugarcane Disease Classification Using Transfer Learning",
    journal: "SSRG International Journal (March 2025)",
    desc: "Comparative study of DenseNet, VGG, and ConvNeXt, achieving 96% accuracy with ConvNeXt.",
    link: "https://www.internationaljournalssrg.org/IJECE/paper-details?Id=817"
  },
  {
    title: "Deepfake Detection using ViT_B_16 model",
    journal: "Intl. Journal of Advanced Research (April 2025)",
    desc: "Explored Vision Transformers for deepfake detection, achieving 87.33% accuracy on 5,000 images.",
    link: "https://ijarsct.co.in/Paper24824.pdf"
  }
];

const leadership = [
  {
    role: "Director General",
    org: "IOIT MUN'25",
    period: "July 2025 – Oct 2025",
    desc: "Led end-to-end planning for a conference with 90+ delegates and 110+ volunteers."
  },
  {
    role: "USG Delegate Affairs",
    org: "IOIT MUN'24",
    period: "Aug 2024 – Oct 2024",
    desc: "Managed interactions and committee agendas for over 90 delegates."
  }
];

const achievements = [
  {
    title: "ETH Online'25",
    result: "2nd Prize Winner",
    desc: "Participated in the ETH Online hackathon, built BugChan. It is a decentralized bug-bounty platform.",
    icon: <Award className="w-6 h-6" />
  }
];



// --- Animations ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-bg text-primary selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-bg/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-mono text-xl font-bold tracking-tighter">
            Chinmay Nakwa
          </Link>
          <div className="hidden md:flex gap-8 font-mono text-sm text-secondary">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#articles" className="hover:text-white transition-colors">Articles</a>
            <a href="#leadership" className="hover:text-white transition-colors">Leadership</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="font-mono text-sm border border-white/20 rounded-full px-3 py-1">
            EN
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p variants={fadeInUp} className="font-mono text-secondary text-lg">
              Based in Pune, Maharashtra
            </motion.p>
            
            <motion.h1 variants={fadeInUp} className="font-mono text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              AI/ML <br />
              <span className="text-white">Engineer</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="max-w-2xl mt-8">
              <p className="font-sans text-xl md:text-2xl text-secondary leading-relaxed">
                Building AI that ships<span className="text-white italic"> RAG systems, MCP integrations,</span> and <span className="text-white italic">production ML APIs</span> to make complex data processing efficient.
              </p>
            </motion.div>

            {/* Social Pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-12">
              {[
                { name: "Github", icon: <Github size={18} />, href: "https://github.com/ChinmayNakwa" },
                { name: "LinkedIn", icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/chinmay-nakwa-9a0836241/" },
                { name: "Email", icon: <Mail size={18} />, href: "mailto:29chinmaynakwa@gmail.com" },
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.href}
                  className="flex items-center gap-2 px-6 py-3 border border-accent font-mono text-sm hover:bg-white hover:text-black transition-colors"
                >
                  {social.icon} {social.name}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <Hero3D />
         </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 border-t border-accent/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-mono text-4xl mb-8">About Me</h2>
            <div className="space-y-6 font-sans text-lg text-secondary">
              <p>
                Third year B.Tech student at AISSMS IOIT (SPPU) building production AI systems with LLMs, RAG architectures, and deployed ML models. Published researcher in medical and agricultural AI, now focused on making AI agents and retrieval systems that solve real-world problems
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="font-mono text-2xl mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {["Python", "TensorFlow", "PyTorch", "LangChain", "LangGraph", "LangSmith", "Docker", "FastAPI", "Java", "MLflow", "MongoDB", "AstraDB", "C++", "Go", "PostgreSQL"].map(skill => (
                <span key={skill} className="px-4 py-2 bg-surface border border-accent rounded-lg font-mono text-sm text-secondary hover:text-white transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-mono text-5xl md:text-7xl">Projects</h2>
            <div className="hidden md:block px-6 py-2 bg-pill text-white rounded-full font-mono font-bold">
              {projects.length} Works
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-surface border border-accent overflow-hidden hover:border-white/50 transition-colors duration-500"
              >
                {/* Image Container with Fallback Logic */}
                <div className="h-64 relative overflow-hidden bg-[#1a1a1a] border-b border-accent/50">
                  {project.image ? (
                    <>
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Dark Overlay that vanishes on hover */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
                    </>
                  ) : (
                    // Fallback UI if image is missing or empty string
                    <div className="relative w-full h-64 flex flex-col items-center justify-center gap-6 bg-[#1a1a1a] border-b border-accent/50 overflow-hidden">
                      {/* Rotating dashed ring */}
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 animate-spin-slow" />
                        <div className="absolute inset-2 rounded-full border border-white/10 animate-pulse" />
                      </div>

                      {/* Text */}
                      <p className="font-mono text-xs tracking-[0.35em] text-secondary uppercase">
                        Working on it
                      </p>

                      {/* Subtle scanline */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan" />
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-secondary border border-white/10 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-mono text-2xl font-bold mb-3 group-hover:underline decoration-1 underline-offset-4">
                    {project.title}
                  </h3>
                  <p className="font-sans text-secondary mb-6 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <a href={project.link} target="_blank" className="inline-flex items-center gap-2 font-mono text-sm bg-white text-black px-5 py-2 hover:bg-[#A6A6A6] transition-colors">
                    View Project <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements (Eth Online) */}
      <section id="achievements" className="py-20 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
           <h2 className="font-mono text-4xl mb-12 flex items-center gap-4">
            <Award className="text-white" /> Achievements
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((item, idx) => (
                 <div key={idx} className="p-8 border border-accent bg-bg flex flex-col justify-between hover:border-white transition-colors">
                    <div>
                      <h3 className="font-mono text-2xl text-white mb-2">{item.title}</h3>
                      <span className="inline-block bg-white/10 text-white text-xs font-mono px-2 py-1 rounded mb-4">{item.result}</span>
                      <p className="text-secondary font-sans">{item.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Articles / Publications */}
      <section id="articles" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-5xl mb-12">Publications</h2>
          <div className="space-y-6">
            {articles.map((article, index) => (
              <a 
                key={index} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block"
              >
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="p-8 border border-accent bg-surface hover:bg-[#252525] transition-all cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <h3 className="font-mono text-xl md:text-2xl text-white">{article.title}</h3>
                    <span className="font-mono text-xs text-secondary border border-white/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {article.journal}
                    </span>
                  </div>
                  <p className="font-sans text-secondary max-w-3xl">
                    {article.desc}
                  </p>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 px-6 border-t border-accent/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-4xl mb-12 flex items-center gap-3">
             <Users /> Leadership & Extracurricular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((item, index) => (
              <div key={index} className="pl-6 border-l-2 border-accent hover:border-white transition-colors duration-300">
                 <h3 className="font-mono text-2xl text-white mb-1">{item.role}</h3>
                 <div className="flex justify-between items-center mb-4">
                   <span className="font-sans text-white/80">{item.org}</span>
                   <span className="font-mono text-xs text-secondary">{item.period}</span>
                 </div>
                 <p className="font-sans text-secondary text-sm leading-relaxed">
                   {item.desc}
                 </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-6 px-6 border-t border-accent/30 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="font-mono text-2xl md:text-4xl font-bold mb-4">Let's build something.</h2>
              <p className="text-secondary font-sans text-base mb-6 max-w-md">
                Open to collaborations in GenAI, RAG systems, and Deep Learning research.
              </p>
              <a href="mailto:29chinmaynakwa@gmail.com" className="inline-block bg-white text-black font-mono text-sm px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                Get in touch
              </a>
            </div>
            <div className="md:text-right space-y-2">
              <p className="font-mono text-sm text-secondary">Pune, Maharashtra</p>
              <div className="flex justify-center md:justify-end gap-6 pt-2">
                <a href="https://www.linkedin.com/in/chinmay-nakwa-9a0836241/" className="text-secondary hover:text-white text-sm transition-colors">LinkedIn</a>
                <a href="https://github.com/ChinmayNakwa" className="text-secondary hover:text-white text-sm transition-colors">GitHub</a>
                <a href="https://x.com/NakwaChinm580" className="text-secondary hover:text-white text-sm transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 flex items-center justify-center text-xs font-mono text-secondary/50 pt-4">
            <p>© 2025 Chinmay Nakwa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}