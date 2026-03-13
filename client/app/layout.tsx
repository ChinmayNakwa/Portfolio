import type { Metadata } from "next";
import { DM_Mono, Syne } from "next/font/google";
import "./globals.css";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chinmay Nakwa | AI/ML Engineer",
  description:
    "Portfolio of Chinmay Nakwa — AI/ML Engineer specialising in RAG systems, LLMs, and deep learning that ships.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmMono.variable} ${syne.variable} noise`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {children}
      </body>
    </html>
  );
}