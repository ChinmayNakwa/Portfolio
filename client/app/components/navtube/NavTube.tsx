"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "hero",         label: "Hero" },
  { id: "about",        label: "About" },
  { id: "stack",        label: "Stack" },
  { id: "experience",   label: "Experience" },
  { id: "projects",     label: "Projects" },
  { id: "publications", label: "Papers" },
  { id: "achievements", label: "Awards" },
  { id: "contact",      label: "Contact" },
];

export default function NavTube() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [dotCenters, setDotCenters] = useState<number[]>([]);

  const measure = () => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const centers = dotRefs.current.map((btn) => {
      if (!btn) return 0;
      const r = btn.getBoundingClientRect();
      return r.top + r.height / 2 - cRect.top;
    });
    setDotCenters(centers);
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);

      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 800);

      const winH = window.innerHeight;
      let current = 0;
      SECTIONS.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= winH * 0.45) {
          current = i;
        }
      });
      setActiveIdx(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial calculation without showing UI
    const initActive = () => {
        const winH = window.innerHeight;
        let current = 0;
        SECTIONS.forEach(({ id }, i) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= winH * 0.45) current = i;
        });
        setActiveIdx(current);
    };
    initActive();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  const trackTop = dotCenters[0] || 0;
  const trackHeight = (dotCenters[dotCenters.length - 1] || 0) - trackTop;
  const fillHeight = activeIdx > 0 
    ? Math.max(0, (dotCenters[activeIdx] || 0) - trackTop - 8) 
    : 0;

  return (
    <div 
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 px-8 py-10 transition-all duration-800 ease-out
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-y-0 right-0 w-20 cursor-pointer" onMouseEnter={handleMouseEnter} />

      <div
        ref={containerRef}
        className="relative flex flex-col items-center py-5 rounded-full w-10"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        {trackHeight > 0 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[1px] pointer-events-none"
            style={{
              top: trackTop,
              height: trackHeight,
              background: "rgba(255, 255, 255, 0.1)",
            }}
          />
        )}

        {fillHeight > 0 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[1px] pointer-events-none transition-all duration-500 ease-out"
            style={{
              top: trackTop,
              height: fillHeight,
              background: "rgba(255, 255, 255, 0.9)",
            }}
          />
        )}

        {SECTIONS.map(({ id, label }, i) => {
          const isDone = i < activeIdx;
          const isActive = i === activeIdx;

          return (
            <button
              key={id}
              ref={(el) => { dotRefs.current[i] = el; }}
              onClick={() => scrollTo(id)}
              className="group relative z-10 flex items-center justify-center w-full h-10"
            >
              <span
                className={`absolute right-full mr-5 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 pointer-events-none
                  ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"}`}
                style={{ color: "white" }}
              >
                {label}
              </span>

              <div className="relative flex items-center justify-center">
                {isActive && (
                  <div className="absolute inset-0 scale-[3] rounded-full bg-white/5 blur-[4px]" />
                )}
                <span
                  className="block rounded-full aspect-square flex-shrink-0 transition-all duration-500 ease-in-out"
                  style={{
                    width: isActive ? 12 : isDone ? 6 : 8,
                    height: isActive ? 12 : isDone ? 6 : 8,
                    backgroundColor: isDone ? "white" : "transparent",
                    border: isDone 
                      ? "none" 
                      : isActive 
                        ? "2px solid white" 
                        : "1.5px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: isActive ? "0 0 12px rgba(255,255,255,0.2)" : "none",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}