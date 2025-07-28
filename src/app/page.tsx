'use client';

import { useTheme } from '@/context/ThemeContext';
import { useBackground } from '@/context/BackgroundContext';
import TypingTest from '@/components/TypingTest';
import paragraphs from '../../public/paragraphs.json';

export default function Home() {
  const { theme } = useTheme();
  const { backgroundType } = useBackground();

  return (
    <main className={`min-h-screen transition-all duration-500 ${
      backgroundType === 'stars'
        ? 'bg-transparent'
        : theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-purple-100 text-gray-900'
    }`}>
      <div className="container mx-auto py-4 mt-4">
        <h1 className={`text-4xl font-bold text-center mb-2 transition-all duration-500 ${
          backgroundType === 'stars' 
            ? 'text-white drop-shadow-lg' 
            : 'text-neon-pink'
        }`}>
          GorillaType
        </h1>
        <p className={`text-center mb-8 ml-28 transition-all duration-500 ${
          backgroundType === 'stars' 
            ? 'text-white/80' 
            : 'text-gray-400'
        }`}>
          A typing speed tester online!
        </p>
        <TypingTest paragraphs={paragraphs.paragraphs} />
      </div>
    </main>
  );
}
