"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "6+", label: "Projects", pos: "top" },
  { value: "2",  label: "Papers",   pos: "right" },
  { value: "RAG", label: "Focus",   pos: "bottom" },
  { value: "LLMs", label: "Domain", pos: "left" },
];

const posStyle: Record<string, React.CSSProperties> = {
  top:    { top: 0, left: "50%", transform: "translateX(-50%) translateY(-135%)", textAlign: "center" },
  right:  { right: 0, top: "50%", transform: "translateX(135%) translateY(-50%)", textAlign: "center" },
  bottom: { bottom: 0, left: "50%", transform: "translateX(-50%) translateY(135%)", textAlign: "center" },
  left:   { left: 0, top: "50%", transform: "translateX(-135%) translateY(-50%)", textAlign: "center" },
};

export default function HeroOrbit() {
  return (
    <motion.div
      className="hidden md:flex items-center justify-end absolute right-0 top-0 h-full w-1/2 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Soft radial glow */}
      <div
        className="absolute right-24 top-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(184,212,240,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative w-[340px] h-[340px] mr-24">
        {/* Ring 1 */}
        <div
          className="animate-spin-slow absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(184,212,240,0.12)" }}
        >
          <div
            className="absolute animate-glow-pulse rounded-full"
            style={{ width: 8, height: 8, background: "var(--color-accent)", top: -4, left: "50%", transform: "translateX(-50%)" }}
          />
        </div>

        {/* Ring 2 */}
        <div
          className="animate-spin-slow-ccw absolute rounded-full"
          style={{ inset: "13%", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div
            className="absolute rounded-full bg-white/60"
            style={{ width: 5, height: 5, top: -2.5, left: "50%", transform: "translateX(-50%)" }}
          />
        </div>

        {/* Ring 3 */}
        <div
          className="animate-spin-slow absolute rounded-full"
          style={{ inset: "26%", border: "1px solid rgba(184,212,240,0.08)", animationDuration: "10s" }}
        >
          <div
            className="absolute rounded-full"
            style={{ width: 5, height: 5, background: "var(--color-accent)", opacity: 0.5, top: -2.5, left: "50%", transform: "translateX(-50%)" }}
          />
        </div>

        {/* Ring 4 — static inner */}
        <div
          className="absolute rounded-full"
          style={{ inset: "38%", border: "1px solid rgba(255,255,255,0.04)" }}
        />

        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span
            className="text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.04em" }}
          >
            AI
          </span>
          <span
            className="text-[10px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-secondary)" }}
          >
            Research &amp; Eng.
          </span>
        </div>

        {/* Stats */}
        {stats.map((s) => (
          <div key={s.pos} className="absolute" style={posStyle[s.pos]}>
            <p
              className="text-base font-semibold leading-none"
              style={{ fontFamily: "var(--font-sans)", color: "var(--color-primary)" }}
            >
              {s.value}
            </p>
            <p
              className="text-[10px] tracking-widest uppercase mt-1"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-secondary)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}