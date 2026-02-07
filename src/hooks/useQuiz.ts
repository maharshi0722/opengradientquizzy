import { useState, useCallback, useEffect } from 'react';
import { Question, QuizState, LeaderboardEntry, TwitterProfile } from '@/types/quiz';
import { quizData } from '@/data/quizData';

export function useQuiz() {
  const [state, setState] = useState<QuizState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [twitterProfile, setTwitterProfile] = useState<TwitterProfile | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const currentQuestion: Question | null =
    state === 'quiz' ? quizData.questions[currentQuestionIndex] : null;

  const progress = ((currentQuestionIndex + 1) / quizData.totalQuestions) * 100;

  const timeTaken = startTime && endTime ? Math.floor((endTime - startTime) / 1000) : 0;

  useEffect(() => {
    const saved = localStorage.getItem('og-quiz-leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  const startQuiz = useCallback((user: string, profile?: TwitterProfile | null) => {
    setUsername(user);
    setTwitterProfile(profile ?? null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setStartTime(Date.now());
    setEndTime(null);
    setState('quiz');
  }, []);

  const answerQuestion = useCallback((answerIndex: number) => {
    const question = quizData.questions[currentQuestionIndex];
    const isCorrect = answerIndex === question.answer;

    setAnswers(prev => [...prev, answerIndex]);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizData.totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        const end = Date.now();
        setEndTime(end);
        const finalScore = isCorrect ? score + 1 : score;
        const time = Math.floor((end - (startTime || end)) / 1000);

        const newEntry: LeaderboardEntry = {
          username,
          score: finalScore,
          timeTakenSeconds: time,
          avatar: twitterProfile?.avatar,
        };

        const updated = [...leaderboard, newEntry]
          .sort((a, b) => b.score - a.score || a.timeTakenSeconds - b.timeTakenSeconds)
          .slice(0, 10);

        setLeaderboard(updated);
        localStorage.setItem('og-quiz-leaderboard', JSON.stringify(updated));
        setState('results');
      }
    }, 1500);
  }, [currentQuestionIndex, score, startTime, username, leaderboard, twitterProfile]);

  const resetQuiz = useCallback(() => {
    setState('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setStartTime(null);
    setEndTime(null);
    setTwitterProfile(null);
  }, []);

  const getShareText = useCallback(() => {
    return quizData.shareTemplate.replace('{{score}}', score.toString());
  }, [score]);

  return {
    state,
    currentQuestion,
    currentQuestionIndex,
    progress,
    score,
    timeTaken,
    username,
    twitterProfile,
    leaderboard,
    answers,
    totalQuestions: quizData.totalQuestions,
    startQuiz,
    answerQuestion,
    resetQuiz,
    getShareText,
  };
}

