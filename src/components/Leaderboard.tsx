import { LeaderboardEntry } from '@/types/quiz';
import { Trophy, Clock, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUser?: string;
}

export function Leaderboard({ entries, currentUser }: LeaderboardProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-medal-gold" />;
      case 2:
        return <Medal className="w-5 h-5 text-medal-silver" />;
      case 3:
        return <Medal className="w-5 h-5 text-medal-bronze" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-muted-foreground">{rank}</span>;
    }
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No entries yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, index) => {
        const isCurrentUser = currentUser && entry.username.toLowerCase() === currentUser.toLowerCase();
        
        return (
          <div 
            key={`${entry.username}-${index}`}
            className={cn(
              'flex items-center gap-4 p-3 rounded-xl transition-all',
              isCurrentUser 
                ? 'bg-primary/10 border border-primary/30' 
                : 'bg-muted/30 hover:bg-muted/50'
            )}
          >
            <div className="w-8 flex justify-center">
              {getRankIcon(index + 1)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={cn(
                'font-medium truncate',
                isCurrentUser ? 'text-primary' : 'text-foreground'
              )}>
                @{entry.username}
                {isCurrentUser && <span className="text-xs ml-2 text-primary/70">(You)</span>}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="font-display font-bold text-foreground">{entry.score}</span>
                <span className="text-muted-foreground text-sm">/15</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground min-w-[60px]">
                <Clock className="w-3.5 h-3.5" />
                {formatTime(entry.timeTakenSeconds)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
