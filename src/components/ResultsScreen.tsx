import { Logo } from './Logo';
import { Leaderboard } from './Leaderboard';
import { Button } from '@/components/ui/button';
import { LeaderboardEntry } from '@/types/quiz';
import { Share2, RotateCcw, Trophy, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  username: string;
  leaderboard: LeaderboardEntry[];
  shareText: string;
  onRestart: () => void;
}

export function ResultsScreen({
  score,
  totalQuestions,
  timeTaken,
  username,
  leaderboard,
  shareText,
  onRestart,
}: ResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = () => {
    if (percentage === 100) return "🏆 Perfect Score! You're an OpenGradient Expert!";
    if (percentage >= 80) return "🌟 Excellent! You really know OpenGradient!";
    if (percentage >= 60) return "👍 Good job! Keep learning!";
    if (percentage >= 40) return "📚 Not bad! Room for improvement.";
    return "🔄 Keep studying and try again!";
  };

  const handleShare = async () => {
    const text = `${shareText}\n\nhttps://opengradient.ai`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch (err) {
        // If user cancels or native share fails, fall back to tweet intent.
      }
    }

    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen neural-bg flex flex-col px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Logo size="sm" />
        <span className="font-display font-semibold text-xl gradient-text">
          Quiz Complete!
        </span>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full space-y-6">
        {/* Score Card */}
        <div className="glass-card rounded-2xl p-6 md:p-8 text-center animate-scale-in">
          <div className={cn(
            'w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-4',
            'bg-gradient-to-br from-primary/20 to-accent/20 border-4',
            percentage >= 60 ? 'border-primary' : 'border-muted'
          )}>
            <div>
              <span className="text-4xl font-display font-bold text-foreground">{score}</span>
              <span className="text-lg text-muted-foreground">/{totalQuestions}</span>
            </div>
          </div>
          
          <p className="text-xl font-display font-semibold text-foreground mb-2">
            {getScoreMessage()}
          </p>
          
          <p className="text-muted-foreground">
            @{username}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">{percentage}%</span>
              <span className="text-muted-foreground text-sm">Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">{formatTime(timeTaken)}</span>
              <span className="text-muted-foreground text-sm">Time</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleShare} variant="hero" size="lg" className="flex-1">
            <Share2 className="w-5 h-5" />
            Share on X
          </Button>
          <Button onClick={onRestart} variant="outline" size="lg" className="flex-1">
            <RotateCcw className="w-5 h-5" />
            Try Again
          </Button>
        </div>

        {/* Leaderboard */}
        <div className="glass-card rounded-2xl p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-lg text-foreground">Leaderboard</h3>
          </div>
          <Leaderboard entries={leaderboard} currentUser={username} />
        </div>
      </div>
    </div>
  );
}
