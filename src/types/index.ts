export interface TypingStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  timeElapsed: number;
}

export interface CharacterStatus {
  char: string;
  status: 'correct' | 'incorrect' | 'pending';
}

export interface Theme {
  name: 'light' | 'dark';
  background: string;
  text: string;
  correct: string;
  incorrect: string;
  pending: string;
} 