"use client";

import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink,
  ArrowUpRight, Award, Users, Briefcase,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
const HeroOrbit = dynamic(() => import("./components/hero/Heroorbit"), { ssr: false });

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
    title: "Finance AI Research",
    tags: ["LangGraph", "FastAPI", "RAG"],
    description:
      "Financial AI Assistant implementing advanced RAG architecture (Self-RAG, Corrective RAG, Adaptive RAG) to answer complex queries from live APIs.",
    link: "https://github.com/ChinmayNakwa/Financial-AI-System",
  },
  {
    title: "Cerebrix",
    tags: ["AI Tutor", "Multi-modal RAG", "Socratic Method"],
    description:
      "AI-powered teaching assistant for any subject integrating PDF textbooks and YouTube lectures into a seamless RAG pipeline.",
    link: "https://github.com/ChinmayNakwa/Cerebrix",
  },
  {
    title: "Google Workspace MCP",
    tags: ["Claude Desktop", "FastMCP", "Agentic AI"],
    description:
      "Model-Context-Protocol server designed to be called by external AI agents for email composition and calendar management.",
    link: "https://github.com/ChinmayNakwa/Google_Workspace_MCP",
  },
  {
    title: "Lung Cancer Detection",
    tags: ["EfficientNetB4", "TensorFlow", "Medical AI"],
    description:
      "Full-stack AI diagnostic system with online retraining, MLflow experiment tracking, and a human-in-the-loop learning pipeline.",
    link: "https://github.com/ChinmayNakwa/Lung_Cancer_Detection/tree/ml-pipeline",
  },
  {
    title: "GoRilla",
    tags: ["Go", "Interpreter", "PL Theory"],
    description:
      "A fully functional interpreter written in Go — exploring language theory and compiler design from the ground up.",
    link: "https://github.com/ChinmayNakwa/GoRilla",
  },
  {
    title: "MintFlowAI",
    tags: ["Gemini", "Blockchain", "Sui"],
    description:
      "AI-Powered NFT minter on the Sui Blockchain — bridging generative AI with decentralised asset creation.",
    link: "https://github.com/ChinmayNakwa/MintFlowAI",
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

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/** Section header — consistent label + title */
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-14">
      <p
        className="text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-3"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
      >
        <span className="inline-block w-9 h-px" style={{ background: "var(--color-accent)" }} />
        {label}
      </p>
      <h2
        className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
    </div>
  );
}

/** Animated SVG hero title (anime.js draw) */
function AnimatedTitle() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("animejs").then(({ animate, svg, stagger: aStagger }) => {
      if (cancelled || !ref.current) return;
      const els = ref.current.querySelectorAll(".draw-text");
      animate(svg.createDrawable(els), {
        draw: "0 1",
        duration: 2400,
        ease: "inOutQuart",
        delay: aStagger(400),
      });
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 820 190"
      className="w-full max-w-2xl h-auto overflow-visible"
      style={{ maxHeight: 220 }}
      aria-label="AI/ML Engineer"
    >
      <text
        x="0" y="90" fontSize="96"
        className="draw-text"
        style={{
          fill: "transparent",
          stroke: "var(--color-primary)",
          strokeWidth: 1.5,
          fontFamily: "var(--font-sans)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        AI/ML
      </text>
      <text
        x="0" y="182" fontSize="96"
        className="draw-text"
        style={{
          fill: "transparent",
          stroke: "var(--color-primary)",
          strokeWidth: 1.5,
          fontFamily: "var(--font-sans)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        Engineer.
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Portfolio() {
  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "var(--color-bg)", color: "var(--color-primary)" }}
    >
      {/* ── Nav ── */}
      <nav
        className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4"
        style={{
          backdropFilter: "blur(14px)",
          background: "rgba(11,11,14,0.75)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Link
          href="/"
          className="text-sm font-bold tracking-tight"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          CN<span style={{ color: "var(--color-accent)" }}>.</span>
        </Link>

        <div className="hidden md:flex gap-8">
          {["about", "skills", "experience", "projects", "publications", "contact"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="capitalize text-xs tracking-widest uppercase transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-secondary)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-secondary)")}
            >
              {s}
            </a>
          ))}
        </div>

        <a
          href="mailto:29chinmaynakwa@gmail.com"
          className="text-xs tracking-widest uppercase px-4 py-2 transition-all"
          style={{
            fontFamily: "var(--font-mono)",
            border: "1px solid var(--color-border-h)",
            color: "var(--color-primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-primary)";
            e.currentTarget.style.color = "var(--color-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--color-primary)";
          }}
        >
          Get in touch →
        </a>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-8 overflow-hidden grid-bg"
      >
        {/* Radial fade on grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 80% at 10% 50%, transparent 40%, var(--color-bg) 85%)",
          }}
        />
        {/* Accent glow top-right */}
        <div
          className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(184,212,240,0.05) 0%, transparent 65%)" }}
        />

        <div className="relative max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl space-y-6"
          >
            {/* Status pill */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase px-3 py-1.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(184,212,240,0.2)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-glow-pulse"
                  style={{ background: "var(--color-accent)" }}
                />
                Available for collaboration · Pune, IN
              </span>
            </motion.div>

            {/* Animated SVG title */}
            <motion.div variants={fadeUp}>
              <AnimatedTitle />
            </motion.div>

            {/* Descriptor */}
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--color-secondary)" }}
            >
              Building AI that ships —{" "}
              <span style={{ color: "var(--color-primary)" }}>RAG systems</span>,{" "}
              <span style={{ color: "var(--color-primary)" }}>MCP integrations</span>, and{" "}
              <span style={{ color: "var(--color-primary)" }}>production ML APIs</span>{" "}
              to make complex data processing efficient.
            </motion.p>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              {[
                { label: "GitHub",   icon: <Github size={15} />,   href: "https://github.com/ChinmayNakwa" },
                { label: "LinkedIn", icon: <Linkedin size={15} />, href: "https://www.linkedin.com/in/chinmay-nakwa-9a0836241/" },
                { label: "Email",    icon: <Mail size={15} />,     href: "mailto:29chinmaynakwa@gmail.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm transition-all"
                  style={{
                    fontFamily: "var(--font-mono)",
                    border: "1px solid var(--color-border-h)",
                    color: "var(--color-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border-h)";
                    e.currentTarget.style.color = "var(--color-secondary)";
                  }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Orbital ring animation */}
          <HeroOrbit />
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="py-28 px-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="About" title="Who I Am" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 reveal">
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--color-secondary)" }}>
              <p>
                I'm an AI/ML engineer who bridges the gap between{" "}
                <strong style={{ color: "var(--color-primary)" }}>research and production</strong>.
                Third-year B.Tech student at AISSMS IOIT (SPPU), building systems with LLMs,
                RAG architectures, and deployed ML models.
              </p>
              
              <p>
                Currently open to collaborations in GenAI, RAG systems, and applied deep learning research.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Location",     value: "Pune, Maharashtra, India" },
                { label: "Focus",        value: "RAG · LLMs · Deep Learning" },
                { label: "Degree",       value: "B.Tech, AISSMS IOIT (SPPU)" },
                { label: "Status",       value: "Open to collaborate" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center px-5 py-4 transition-colors"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-border-h)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                >
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-secondary)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-primary)" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section
        id="skills"
        className="py-28 px-8"
        style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface)" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Skills" title="Technical Stack" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 reveal">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p
                  className="text-xs tracking-[0.18em] uppercase pb-4 mb-5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {category}
                </p>
                <ul className="space-y-3">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm transition-colors cursor-default"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--color-secondary)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-secondary)")}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 transition-colors"
                        style={{ background: "var(--color-secondary)" }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section
        id="experience"
        className="py-28 px-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Experience" title="Where I've Worked" />
          <div
            className="relative reveal"
            style={{ borderLeft: "1px solid var(--color-border)" }}
          >
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative pl-10 pb-14"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-accent)",
                    boxShadow: "0 0 8px rgba(184,212,240,0.4)",
                  }}
                />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm transition-colors"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                    >
                      {exp.company} <ExternalLink size={11} />
                    </a>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-sm"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--color-primary)" }}
                    >
                      {exp.period}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--color-secondary)" }}
                    >
                      {exp.location}
                    </p>
                  </div>
                </div>

                <p
                  className="text-base leading-relaxed mb-6 max-w-3xl"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs transition-colors cursor-default"
                      style={{
                        fontFamily: "var(--font-mono)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-border-h)";
                        e.currentTarget.style.color = "var(--color-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.color = "var(--color-secondary)";
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section
        id="projects"
        className="py-28 px-8"
        style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-14">
            <SectionHeader label="Projects" title="Selected Work" />
            <span
              className="hidden md:block text-xs tracking-widest uppercase mb-14"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-secondary)" }}
            >
              {String(projects.length).padStart(2, "0")} projects
            </span>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px reveal"
            style={{ background: "var(--color-border)" }}
          >
            {projects.map((project, i) => (
              <motion.a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                className="flex flex-col p-7 group transition-colors"
                style={{ background: "var(--color-surface)", textDecoration: "none", color: "inherit" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-surface)")}
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-widest uppercase px-2 py-1"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-accent)",
                        background: "var(--color-accent-dim)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-2 leading-snug">{project.title}</h3>

                <p
                  className="text-sm leading-relaxed flex-1 mb-6"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {project.description}
                </p>

                <span
                  className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-secondary)",
                  }}
                >
                  View on GitHub
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Publications ── */}
      <section
        id="publications"
        className="py-28 px-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Research" title="Publications" />
          <div
            className="flex flex-col gap-px reveal"
            style={{ background: "var(--color-border)" }}
          >
            {publications.map((pub, i) => (
              <a
                key={i}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-8 items-center px-8 py-7 transition-colors group"
                style={{ background: "var(--color-bg)", textDecoration: "none", color: "inherit" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-bg)")}
              >
                <span
                  className="text-4xl font-light flex-shrink-0 w-12 leading-none select-none"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.08)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold mb-1 leading-snug">{pub.title}</p>
                  <p
                    className="text-xs mb-2"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
                  >
                    {pub.journal} · {pub.date}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
                    {pub.desc}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="flex-shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "var(--color-secondary)" }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Achievements + Leadership side by side ── */}
      <section
        className="py-28 px-8"
        style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Achievements */}
          <div>
            <SectionHeader label="Recognition" title="Achievements" />
            <div className="space-y-4 reveal">
              <div
                className="p-7 transition-colors"
                style={{ border: "1px solid var(--color-border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-border-h)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                <span
                  className="inline-block text-[10px] tracking-widest uppercase px-2.5 py-1 mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(184,212,240,0.2)",
                  }}
                >
                  2nd Prize Winner
                </span>
                <h3 className="text-2xl font-bold mb-2">ETH Online '25</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
                  Built BugChan — a decentralised bug-bounty platform at the ETH Online hackathon, placing 2nd.
                </p>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div id="leadership">
            <SectionHeader label="Beyond Engineering" title="Leadership" />
            <div className="space-y-8 reveal">
              {leadership.map((item, i) => (
                <div
                  key={i}
                  className="pl-5 transition-colors"
                  style={{ borderLeft: "2px solid var(--color-border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = "var(--color-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "var(--color-border)")}
                >
                  <h4 className="text-lg font-bold">{item.role}</h4>
                  <div
                    className="flex gap-4 text-xs mt-0.5 mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <span style={{ color: "var(--color-accent)" }}>{item.org}</span>
                    <span style={{ color: "var(--color-secondary)" }}>{item.period}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="py-28 px-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end reveal">
            {/* Left — big CTA */}
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-3"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
              >
                <span className="inline-block w-9 h-px" style={{ background: "var(--color-accent)" }} />
                Contact
              </p>
              <h2
                className="text-5xl md:text-7xl font-extrabold leading-none mb-8"
                style={{ letterSpacing: "-0.04em" }}
              >
                Let's build
                <br />
                <span style={{ color: "var(--color-accent)" }}>something.</span>
              </h2>
              <p
                className="text-base leading-relaxed max-w-sm"
                style={{ color: "var(--color-secondary)" }}
              >
                Open to collaborations in GenAI, RAG systems, and deep learning research.
                Whether it's a project, role, or just a conversation — reach out.
              </p>
            </div>

            {/* Right — link list */}
            <div className="space-y-2">
              {[
                { label: "Email",    value: "29chinmaynakwa@gmail.com", href: "mailto:29chinmaynakwa@gmail.com" },
                { label: "GitHub",   value: "github.com/ChinmayNakwa",  href: "https://github.com/ChinmayNakwa" },
                { label: "LinkedIn", value: "linkedin.com/in/chinmay-nakwa", href: "https://www.linkedin.com/in/chinmay-nakwa-9a0836241/" },
                { label: "Twitter",  value: "@NakwaChinm580",           href: "https://x.com/NakwaChinm580" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex justify-between items-center px-5 py-4 transition-colors group"
                  style={{
                    border: "1px solid var(--color-border)",
                    textDecoration: "none",
                    color: "var(--color-primary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.color = "var(--color-primary)";
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                    {link.value}
                  </span>
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-secondary)" }}
                  >
                    {link.label} →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="flex flex-col md:flex-row justify-between items-center px-8 py-5 gap-2"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <p
          className="text-xs"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-secondary)" }}
        >
          © 2025 Chinmay Nakwa
        </p>
        <p
          className="text-xs"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-secondary)" }}
        >
          Pune, Maharashtra · AI/ML Engineer
        </p>
      </footer>
    </div>
  );
}