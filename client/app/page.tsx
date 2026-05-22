"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink, Download,
  ArrowUpRight, Award, Code2, Briefcase, BookOpen,
  Users, Zap, Terminal, Database, Brain,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const experience = [
  {
    role: "Freelance Full Stack Developer",
    company: "Green Club IOIT",
    period: "Dec 2025 – Jan 2026",
    location: "Pune, India",
    description:
      "Architected and developed a high-performance interactive website for the college's environmental initiative. Leveraged Next.js 16 and React 19, integrated immersive 3D elements using React Three Fiber, and implemented complex animations via GSAP and Framer Motion. Features include AI-powered interactions using the Google AI SDK.",
    stack: ["Next.js 16", "React 19", "Three.js", "GSAP", "Google AI SDK", "Tailwind v4"],
    link: "https://green-club-ioit.vercel.app/",
  },
];

const projects = [
  {
    title: "FinSim Pro",
    tags: ["Python", "LangGraph", "FastAPI", "Gemini"],
    description:
      "Monte Carlo financial simulation engine with 500+ stochastic paths across multi-asset Indian portfolios. Engineered a 7-node LangGraph + Gemini pipeline generating structured AI reports with Chart.js visualizations using live yfinance/Prophet market data.",
    link: "https://github.com/ChinmayNakwa/FinSim-Pro",
    icon: Brain,
  },
  {
    title: "Cerebrix",
    tags: ["AI Tutor", "Multi-modal RAG", "Socratic Method"],
    description:
      "AI-powered teaching assistant for any subject integrating PDF textbooks and YouTube lectures into a seamless RAG pipeline.",
    link: "https://github.com/ChinmayNakwa/Cerebrix",
    icon: BookOpen,
  },
  {
    title: "Google Workspace MCP",
    tags: ["Claude Desktop", "FastMCP", "Agentic AI"],
    description:
      "Model-Context-Protocol server designed to be called by external AI agents for email composition and calendar management.",
    link: "https://github.com/ChinmayNakwa/Google_Workspace_MCP",
    icon: Terminal,
  },
  {
    title: "Lung Cancer Detection",
    tags: ["EfficientNetB4", "TensorFlow", "Medical AI"],
    description:
      "Full-stack AI diagnostic system with online retraining, MLflow experiment tracking, and a human-in-the-loop learning pipeline.",
    link: "https://github.com/ChinmayNakwa/Lung_Cancer_Detection/tree/ml-pipeline",
    icon: Database,
  },
  {
    title: "GoRilla",
    tags: ["Go", "Interpreter", "PL Theory"],
    description:
      "A fully functional interpreter written in Go — exploring language theory and compiler design from the ground up.",
    link: "https://github.com/ChinmayNakwa/GoRilla",
    icon: Code2,
  },
  {
    title: "MintFlowAI",
    tags: ["Gemini", "Blockchain", "Sui"],
    description:
      "AI-Powered NFT minter on the Sui Blockchain — bridging generative AI with decentralised asset creation.",
    link: "https://github.com/ChinmayNakwa/MintFlowAI",
    icon: Zap,
  },
];

const skills = {
  Languages: ["Python", "Go", "TypeScript", "Java", "C++", "SQL"],
  "AI / ML": ["PyTorch", "TensorFlow", "LangChain", "LangGraph", "LangSmith", "Hugging Face", "MLflow"],
  "Tools & Infra": ["FastAPI", "Docker", "Next.js", "MongoDB", "PostgreSQL", "AstraDB", "Google AI SDK"],
};

const publications = [
  {
    title: "Enhancing Sugarcane Disease Classification Using Transfer Learning",
    journal: "SSRG International Journal",
    date: "March 2025",
    desc: "Comparative study of DenseNet, VGG, and ConvNeXt — achieving 96% accuracy with ConvNeXt.",
    link: "https://www.internationaljournalssrg.org/IJECE/paper-details?Id=817",
  },
  {
    title: "Deepfake Detection using ViT_B_16 Model",
    journal: "Intl. Journal of Advanced Research",
    date: "April 2025",
    desc: "Explored Vision Transformers for deepfake detection — 87.33% accuracy on 5,000 images.",
    link: "https://ijarsct.co.in/Paper24824.pdf",
  },
];

const leadership = [
  {
    role: "Director General",
    org: "IOIT MUN '25",
    period: "Jul – Oct 2025",
    desc: "Led end-to-end planning for a conference with 90+ delegates and 110+ volunteers.",
  },
  {
    role: "USG Delegate Affairs",
    org: "IOIT MUN '24",
    period: "Aug – Oct 2024",
    desc: "Managed interactions and committee agendas for over 90 delegates across multiple committees.",
  },
];

const achievements = [
  {
    title: "Pragyantra",
    category: "1st Prize Winner",
    description: "Developed a sophisticated AI-driven financial decision simulation engine for the Fintech category during this intensive 8-hour hackathon.",
  },
  {
    title: "HackByte 4.0 (MLH)",
    category: "Track Winner",
    description: "Won the GitHub Track at HackByte 4.0, a Major League Hacking sanctioned hackathon.",
  },
  {
    title: "ETH Online '25",
    category: "2nd Prize Winner",
    description: "Built BugChan — a decentralised bug-bounty platform at the ETH Online hackathon, placing 2nd.",
  },
];

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
      }}
    />
  );
}

function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      
      // Add trail point
      setTrail(prev => [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }].slice(-8));
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsMoving(false), 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>
      
      {/* Glow effect */}
      <div
        className="fixed pointer-events-none z-40 mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          width: "600px",
          height: "600px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />
      
      {/* Trail effect */}
      {trail.map((point, index) => {
        const opacity = (index + 1) / trail.length;
        const scale = 0.3 + (opacity * 0.7);
        return (
          <div
            key={point.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: point.x - 6,
              top: point.y - 6,
              width: "12px",
              height: "12px",
              background: "white",
              borderRadius: "50%",
              opacity: opacity * 0.4,
              transform: `scale(${scale})`,
              transition: "opacity 0.2s, transform 0.2s",
            }}
          />
        );
      })}
      
      {/* Expanding circle while moving */}
      <div
        className="fixed pointer-events-none z-50 transition-opacity duration-150"
        style={{
          left: position.x - 30,
          top: position.y - 30,
          width: "60px",
          height: "60px",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: "50%",
          opacity: isMoving ? 1 : 0,
        }}
      />
      
      {/* Custom cursor dot */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          width: "12px",
          height: "12px",
          border: "2px solid white",
          borderRadius: "50%",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.7]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      <GrainOverlay />
      <MouseFollower />

      {/* Fixed Nav */}
      <motion.nav
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-30 px-6 py-8 mix-blend-difference"
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            CN
          </Link>
          <a
            href="mailto:29chinmaynakwa@gmail.com"
            className="text-sm tracking-wider uppercase hover:opacity-60 transition-opacity"
          >
            Contact
          </a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background geometric shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 border border-white rotate-45" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rotate-12" />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-3 border border-white/20 px-5 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs tracking-[0.3em] uppercase">Available for Collaboration</span>
            </div>

            {/* Main title */}
            <h1 className="text-[12vw] md:text-[140px] font-black leading-[0.9] tracking-tighter">
              AI/ML
              <br />
              ENGINEER
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed text-white/60">
              Building production-grade AI systems —{" "}
              <span className="text-white">RAG architectures</span>,{" "}
              <span className="text-white">LLM integrations</span>, and{" "}
              <span className="text-white">deployed ML APIs</span>.
            </p>

            {/* Location + Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-white/40">
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                Pune, India
              </div>
              <a
                href="https://github.com/ChinmayNakwa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm border-b border-white/0 hover:border-white/60 transition-colors pb-0.5"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/chinmay-nakwa-9a0836241/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm border-b border-white/0 hover:border-white/60 transition-colors pb-0.5"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="mailto:29chinmaynakwa@gmail.com"
                className="flex items-center gap-2 text-sm border-b border-white/0 hover:border-white/60 transition-colors pb-0.5"
              >
                <Mail size={16} />
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-6xl font-black tracking-tighter mb-6">WHO I AM</h2>
              <div className="w-20 h-1 bg-white" />
            </div>

            <div className="lg:col-span-8 space-y-8">
              <p className="text-2xl leading-relaxed text-white/80">
                I'm an AI/ML engineer who bridges the gap between{" "}
                <span className="text-white font-semibold">research and production</span>.
                Third-year B.Tech student at AISSMS IOIT (SPPU), building systems with LLMs,
                RAG architectures, and deployed ML models.
              </p>

              <p className="text-xl leading-relaxed text-white/60">
                Currently open to collaborations in GenAI, RAG systems, and applied deep learning research.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-8">
                {[
                  { label: "Location", value: "Pune, Maharashtra" },
                  { label: "Focus", value: "RAG · LLMs · Deep Learning" },
                  { label: "Education", value: "B.Tech, AISSMS IOIT" },
                  { label: "Status", value: "Open to collaborate" },
                ].map((item) => (
                  <div key={item.label} className="border border-white/10 p-6 hover:border-white/30 transition-colors">
                    <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-2">{item.label}</div>
                    <div className="text-lg font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#0f0f0f]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-6xl font-black tracking-tighter mb-20">TECHNICAL STACK</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-[#0f0f0f] p-10">
                <h3 className="text-sm tracking-[0.3em] uppercase mb-8 text-white/40 font-bold">
                  {category}
                </h3>
                <ul className="space-y-4">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="text-lg font-medium hover:text-white/60 transition-colors cursor-default flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-6xl font-black tracking-tighter mb-20">EXPERIENCE</h2>

          {experience.map((exp, i) => (
            <div key={i} className="border-l-4 border-white pl-12 pb-20 relative">
              <div className="absolute left-[-9px] top-0 w-3.5 h-3.5 bg-white rounded-full" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{exp.role}</h3>
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lg text-white/60 hover:text-white transition-colors"
                  >
                    {exp.company}
                    <ExternalLink size={16} />
                  </a>
                </div>

                <div className="text-right">
                  <div className="text-sm tracking-wider uppercase text-white/80">{exp.period}</div>
                  <div className="text-sm text-white/40">{exp.location}</div>
                </div>
              </div>

              <p className="text-lg leading-relaxed text-white/70 mb-8 max-w-4xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm border border-white/20 hover:border-white/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#0f0f0f]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-6xl font-black tracking-tighter">SELECTED WORK</h2>
            <div className="text-sm tracking-[0.3em] uppercase text-white/40">
              {String(projects.length).padStart(2, "0")} Projects
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <a
                  key={i}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0a0a0a] p-8 hover:bg-[#0f0f0f] transition-colors group relative overflow-hidden"
                >
                  {/* Number overlay */}
                  <div className="absolute top-4 right-4 text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10">
                    <Icon size={32} className="mb-6 opacity-60" />

                    <h3 className="text-2xl font-bold mb-3 leading-tight">{project.title}</h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs tracking-wider uppercase text-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm leading-relaxed text-white/60 mb-6">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/40 group-hover:text-white/80 transition-colors">
                      View Project
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-6xl font-black tracking-tighter mb-20">PUBLICATIONS</h2>

          <div className="space-y-px bg-white/10">
            {publications.map((pub, i) => (
              <a
                key={i}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-8 items-start p-10 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors group"
              >
                <div className="text-7xl font-black text-white/5 group-hover:text-white/10 transition-colors flex-shrink-0 w-24">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 leading-tight">{pub.title}</h3>

                  <div className="flex gap-4 text-sm text-white/40 mb-4">
                    <span>{pub.journal}</span>
                    <span>·</span>
                    <span>{pub.date}</span>
                  </div>

                  <p className="text-base text-white/60">{pub.desc}</p>
                </div>

                <ArrowUpRight size={24} className="flex-shrink-0 text-white/20 group-hover:text-white/60 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements + Leadership */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#0f0f0f]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Achievements */}
          <div>
            <h2 className="text-5xl font-black tracking-tighter mb-16">ACHIEVEMENTS</h2>

            <div className="space-y-px bg-white/10">
              {achievements.map((achievement, i) => (
                <div key={i} className="bg-[#0f0f0f] p-8 hover:bg-[#0a0a0a] transition-colors">
                  <div className="inline-block px-3 py-1 text-xs tracking-[0.3em] uppercase border border-white/30 mb-6">
                    {achievement.category}
                  </div>

                  <h3 className="text-3xl font-bold mb-4">{achievement.title}</h3>
                  <p className="text-base text-white/60 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <h2 className="text-5xl font-black tracking-tighter mb-16">LEADERSHIP</h2>

            <div className="space-y-px bg-white/10">
              {leadership.map((item, i) => (
                <div key={i} className="bg-[#0f0f0f] p-8 hover:bg-[#0a0a0a] transition-colors">
                  <h3 className="text-3xl font-bold mb-3">{item.role}</h3>

                  <div className="flex gap-4 text-sm mb-4">
                    <span className="text-white/80">{item.org}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/40">{item.period}</span>
                  </div>

                  <p className="text-base text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
            <div>
              <h2 className="text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 max-w-md">
                LET'S
                <br />
                BUILD
              </h2>

              <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-md">
                Open to collaborations in GenAI, RAG systems, and deep learning research.
                Whether it's a project, role, or just a conversation — reach out.
              </p>
            </div>

            <div className="space-y-px bg-white/10">
              {[
                { label: "Email", value: "29chinmaynakwa@gmail.com", href: "mailto:29chinmaynakwa@gmail.com" },
                { label: "GitHub", value: "github.com/ChinmayNakwa", href: "https://github.com/ChinmayNakwa" },
                { label: "LinkedIn", value: "linkedin.com/in/chinmay-nakwa", href: "https://www.linkedin.com/in/chinmay-nakwa-9a0836241/" },
                { label: "Twitter", value: "@NakwaChinm580", href: "https://x.com/NakwaChinm580" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-6 sm:p-8 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors group"
                >
                  <span className="text-base sm:text-lg font-medium break-all">{link.value}</span>
                  <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/40 group-hover:text-white/80 transition-colors flex items-center gap-2 flex-shrink-0">
                    {link.label}
                    <ArrowUpRight size={14} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/40">© 2025 Chinmay Nakwa</div>
          <div className="text-sm text-white/40">Pune, Maharashtra · AI/ML Engineer</div>
        </div>
      </footer>
    </div>
  );
}