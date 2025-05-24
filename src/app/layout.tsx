import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-modern bg-gradient-radial min-h-screen`}>{children}</body>
    </html>
  );
}
