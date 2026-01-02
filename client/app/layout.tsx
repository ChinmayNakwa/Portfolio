import type { Metadata } from "next";
import { Fira_Code, Open_Sans } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chinmay Nakwa | AI/ML Engineer",
  description: "Portfolio of Chinmay Nakwa - AI/ML Engineer specializing in RAG, LLMs, and Deep Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${firaCode.variable} ${openSans.variable} font-sans bg-bg text-primary antialiased selection:bg-white selection:text-black`}>
        {children}
      </body>
    </html>
  );
}