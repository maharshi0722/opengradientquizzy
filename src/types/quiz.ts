export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuizData {
  title: string;
  totalQuestions: number;
  shareTemplate: string;
  questions: Question[];
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  timeTakenSeconds: number;
  avatar?: string;
  rank?: number;
}

export interface TwitterProfile {
  name: string;
  screen_name: string;
  avatar: string;
  banner?: string;
  description?: string;
  followers: number;
  following: number;
}

export type QuizState = 'landing' | 'quiz' | 'results';
