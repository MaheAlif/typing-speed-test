import { TypingStats } from '@/types';

export const calculateWPM = (correctChars: number, timeInMinutes: number): number => {
  // Average word length is considered to be 5 characters
  return Math.round((correctChars / 5) / timeInMinutes);
};

export const calculateCPM = (correctChars: number, timeInMinutes: number): number => {
  return Math.round(correctChars / timeInMinutes);
};

export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  return Math.round((correctChars / totalChars) * 100);
};

export const calculateStats = (
  correctChars: number,
  totalChars: number,
  timeInSeconds: number
): TypingStats => {
  const timeInMinutes = timeInSeconds / 60;
  
  return {
    wpm: calculateWPM(correctChars, timeInMinutes),
    cpm: calculateCPM(correctChars, timeInMinutes),
    accuracy: calculateAccuracy(correctChars, totalChars),
    timeElapsed: timeInSeconds,
  };
};

export const getRandomParagraph = (paragraphs: string[]): string => {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[randomIndex];
}; 