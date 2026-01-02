"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
});

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay by one frame to avoid hydration pop
    requestAnimationFrame(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="hidden md:block absolute right-0 top-0 h-full w-1/2 pointer-events-none"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <HeroScene />
    </motion.div>
  );
}
