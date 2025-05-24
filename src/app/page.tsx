import TypingTest from '@/components/TypingTest';
import paragraphs from '../../public/paragraphs.json';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Typing Speed Test</h1>
        <TypingTest paragraphs={paragraphs.paragraphs} />
      </div>
    </main>
  );
}
