import { useState } from 'react';
import { Question } from '@/types/quiz';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  onAnswer: (index: number) => void;
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    
    setSelected(index);
    setRevealed(true);
    
    setTimeout(() => {
      onAnswer(index);
      setSelected(null);
      setRevealed(false);
    }, 1500);
  };

  const isCorrect = selected === question.answer;

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-6 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isAnswer = question.answer === index;
          
          let stateClasses = '';
          if (revealed) {
            if (isAnswer) {
              stateClasses = 'border-success bg-success/10 ring-2 ring-success/30';
            } else if (isSelected && !isAnswer) {
              stateClasses = 'border-destructive bg-destructive/10 ring-2 ring-destructive/30';
            } else {
              stateClasses = 'opacity-50';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={revealed}
              className={cn(
                'w-full p-4 rounded-xl border text-left transition-all duration-300',
                'flex items-center justify-between gap-4',
                'bg-card hover:bg-card/80 border-border',
                'hover:border-primary/50 hover:glow-effect-sm',
                'disabled:cursor-not-allowed',
                stateClasses
              )}
            >
              <div className="flex items-center gap-4">
                <span className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0',
                  'bg-muted text-muted-foreground',
                  revealed && isAnswer && 'bg-success text-success-foreground',
                  revealed && isSelected && !isAnswer && 'bg-destructive text-destructive-foreground'
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium text-foreground">{option}</span>
              </div>
              
              {revealed && isAnswer && (
                <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
              )}
              {revealed && isSelected && !isAnswer && (
                <XCircle className="w-6 h-6 text-destructive shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className={cn(
          'mt-6 p-4 rounded-xl animate-scale-in',
          isCorrect ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'
        )}>
          <p className={cn(
            'font-semibold mb-1',
            isCorrect ? 'text-success' : 'text-destructive'
          )}>
            {isCorrect ? '✨ Correct!' : '❌ Incorrect'}
          </p>
          <p className="text-sm text-muted-foreground">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
