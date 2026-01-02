import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#121212",        // Main background
        surface: "#1E1E1E",   // Slightly lighter for cards if needed
        accent: "#3D3D3D",    // Borders / Secondary backgrounds
        primary: "#FFFFFF",   // Main text
        secondary: "#A6A6A6", // Subtext
        pill: "#F5F5F5",      // The white pill buttons
      },
      fontFamily: {
        mono: ["var(--font-fira-code)", "monospace"],
        sans: ["var(--font-open-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;