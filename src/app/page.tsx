'use client';

import { useTheme } from '@/context/ThemeContext';
import TypingTest from '@/components/TypingTest';
import paragraphs from '../../public/paragraphs.json';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-purple-50 text-gray-900'
    }`}>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-neon-pink mb-8">Typing Speed Test</h1>
        <TypingTest paragraphs={paragraphs.paragraphs} />
      </div>
    </main>
  );
}
