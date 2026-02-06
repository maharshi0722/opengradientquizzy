import { Logo } from './Logo';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { Question } from '@/types/quiz';

interface QuizScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  score: number;
  onAnswer: (index: number) => void;
}

export function QuizScreen({
  question,
  currentIndex,
  totalQuestions,
  progress,
  score,
  onAnswer,
}: QuizScreenProps) {
  return (
    <div className="min-h-screen neural-bg flex flex-col px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="font-display font-semibold text-lg gradient-text hidden sm:block">
            OpenGradient Quizzy
          </span>
        </div>
        <div className="glass-card px-4 py-2 rounded-lg">
          <span className="text-sm text-muted-foreground">Score: </span>
          <span className="font-display font-bold text-primary">{score}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto w-full mb-8">
        <ProgressBar 
          progress={progress} 
          current={currentIndex + 1} 
          total={totalQuestions} 
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-2xl glass-card rounded-2xl p-6 md:p-8">
          <QuestionCard 
            key={question.id}
            question={question} 
            onAnswer={onAnswer} 
          />
        </div>
      </div>
    </div>
  );
}
