import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";
import BackgroundToggle from "@/components/BackgroundToggle";
import { BackgroundProvider } from "@/context/BackgroundContext";
import BackgroundStars from "@/components/BackgroundStars";

const inter = Inter({ subsets: ["latin"], variable: '--font-modern' });

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description: "Test your typing speed with this Monkeytype-inspired typing test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-modern min-h-screen`}>
        <ThemeProvider>
          <BackgroundProvider>
            <ThemeToggle />
            <BackgroundToggle />
            <BackgroundStars />
            {children}
          </BackgroundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
