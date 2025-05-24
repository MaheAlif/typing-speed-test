'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TypingStats, CharacterStatus } from '@/types';
import { calculateStats, getRandomParagraph } from '@/utils/typingUtils';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TypingTestProps {
  paragraphs: string[];
}

export default function TypingTest({ paragraphs }: TypingTestProps) {
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    timeElapsed: 0,
  });
  const [characterStatuses, setCharacterStatuses] = useState<CharacterStatus[]>([]);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalStats, setFinalStats] = useState<TypingStats | null>(null);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetTest = useCallback((sameParagraph = false) => {
    setCurrentParagraph((prev) => sameParagraph && prev ? prev : getRandomParagraph(paragraphs));
    setUserInput('');
    setStartTime(null);
    setStats({
      wpm: 0,
      cpm: 0,
      accuracy: 0,
      timeElapsed: 0,
    });
    setCharacterStatuses([]);
    setIsTestActive(false);
    setIsCompleted(false);
    setFinalStats(null);
    setWpmHistory([]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [paragraphs]);

  useEffect(() => {
    resetTest();
  }, [resetTest]);

  useEffect(() => {
    if (startTime && isTestActive && !isCompleted) {
      const timer = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = Math.floor((currentTime - startTime) / 1000);
        const correctChars = characterStatuses.filter(
          (char) => char.status === 'correct'
        ).length;
        const newStats = calculateStats(correctChars, userInput.length, timeElapsed);
        setStats(newStats);
        setWpmHistory((prev) => [...prev, newStats.wpm]);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, isTestActive, characterStatuses, userInput.length, isCompleted]);

  useEffect(() => {
    if (!isCompleted) {
      inputRef.current?.focus();
    }
  }, [isCompleted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setUserInput(newInput);
    if (!isTestActive) {
      setIsTestActive(true);
      setStartTime(Date.now());
    }
    const newCharacterStatuses: CharacterStatus[] = [];
    for (let i = 0; i < currentParagraph.length; i++) {
      if (i < newInput.length) {
        newCharacterStatuses.push({
          char: currentParagraph[i],
          status: newInput[i] === currentParagraph[i] ? 'correct' : 'incorrect',
        });
      } else {
        newCharacterStatuses.push({
          char: currentParagraph[i],
          status: 'pending',
        });
      }
    }
    setCharacterStatuses(newCharacterStatuses);
    // Check if the paragraph is completed
    if (newInput.length === currentParagraph.length) {
      setIsCompleted(true);
      const correctChars = newCharacterStatuses.filter(
        (char) => char.status === 'correct'
      ).length;
      const timeElapsed = Math.floor((Date.now() - (startTime || Date.now())) / 1000);
      setFinalStats(calculateStats(correctChars, newInput.length, timeElapsed));
    }
  };

  const handleNext = () => {
    resetTest(false);
  };

  const handleRetake = () => {
    resetTest(true);
  };

  // Focus input when clicking on the paragraph area
  const handleParagraphClick = () => {
    inputRef.current?.focus();
  };

  // Calculate cumulative average WPM for each second
  const avgWpmHistory = wpmHistory.map((_, i, arr) => {
    const sum = arr.slice(0, i + 1).reduce((a, b) => a + b, 0);
    return Math.round(sum / (i + 1));
  });

  // Chart data for WPM over time (raw and average)
  const chartData = {
    labels: wpmHistory.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Raw WPM',
        data: wpmHistory,
        borderColor: '#facc15',
        backgroundColor: 'rgba(250,204,21,0.2)',
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: 'Average WPM',
        data: avgWpmHistory,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,0.2)',
        borderDash: [5, 5],
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: '#aaa' } },
      title: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: 'Time (s)', color: '#aaa' },
        grid: { color: '#444' },
        ticks: { color: '#aaa' },
      },
      y: {
        title: { display: true, text: 'WPM', color: '#aaa' },
        grid: { color: '#444' },
        ticks: { color: '#aaa' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center">
      <div className="mb-8 w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="glass-card p-6 flex flex-col items-center">
          <div className="text-3xl font-extrabold text-accent drop-shadow">{isCompleted ? finalStats?.wpm : stats.wpm}</div>
          <div className="text-sm text-neon-blue mt-1 tracking-widest uppercase">WPM</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <div className="text-3xl font-extrabold text-accent drop-shadow">{isCompleted ? finalStats?.cpm : stats.cpm}</div>
          <div className="text-sm text-neon-blue mt-1 tracking-widest uppercase">CPM</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <div className="text-3xl font-extrabold text-accent drop-shadow">{isCompleted ? finalStats?.accuracy : stats.accuracy}%</div>
          <div className="text-sm text-neon-blue mt-1 tracking-widest uppercase">Accuracy</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <div className="text-3xl font-extrabold text-accent drop-shadow">{isCompleted ? finalStats?.timeElapsed : stats.timeElapsed}s</div>
          <div className="text-sm text-neon-blue mt-1 tracking-widest uppercase">Time</div>
        </div>
      </div>

      <div className="mb-8 w-full">
        <div
          className="glass-card text-xl leading-relaxed mb-4 min-h-[100px] cursor-text select-none font-mono whitespace-pre-wrap px-6 py-8 transition-all duration-200 border-2 border-transparent focus-within:border-accent"
          tabIndex={0}
          onClick={handleParagraphClick}
        >
          {currentParagraph.split('').map((char, index) => {
            let style = '';
            if (index < userInput.length) {
              style = characterStatuses[index]?.status === 'correct'
                ? 'text-neon-blue'
                : 'text-neon-pink';
            } else if (index === userInput.length && !isCompleted) {
              style = 'bg-accent text-white animate-pulse'; // cursor
            } else {
              style = 'text-neon-purple/60';
            }
            return (
              <span
                key={index}
                className={
                  style +
                  (index === userInput.length && !isCompleted
                    ? ' border-b-2 border-accent' // cursor underline
                    : '')
                }
              >
                {char}
              </span>
            );
          })}
        </div>
        {/* Visually hidden input for capturing typing */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="absolute opacity-0 pointer-events-none h-0 w-0"
          tabIndex={-1}
          autoFocus
          disabled={isCompleted}
        />
      </div>

      {isCompleted && (
        <div className="mb-8 w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-accent drop-shadow">WPM Over Time</h2>
          <div className="glass-card w-full h-[400px] flex items-center justify-center border-2 border-accent/30">
            <div className="w-full h-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-6 justify-center mt-4">
        {isCompleted ? (
          <>
            <button
              onClick={handleRetake}
              className="neon-btn px-8 py-3 text-lg"
            >
              Retake
            </button>
            <button
              onClick={handleNext}
              className="neon-btn px-8 py-3 text-lg"
            >
              Next Paragraph
            </button>
          </>
        ) : (
          <button
            onClick={() => resetTest(false)}
            className="neon-btn px-8 py-3 text-lg"
          >
            Reset Test
          </button>
        )}
      </div>
    </div>
  );
} 