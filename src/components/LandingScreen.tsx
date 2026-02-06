import { useState } from 'react';
import { Logo } from './Logo';
import { TwitterProfileCard } from './TwitterProfileCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTwitterProfile } from '@/hooks/useTwitterProfile';
import { Search, Zap, Brain, Loader2 } from 'lucide-react';

interface LandingScreenProps {
  onStart: (username: string) => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  const [inputValue, setInputValue] = useState('');
  const { profile, loading, error, fetchProfile, clearProfile } = useTwitterProfile();

  const handleFetch = async () => {
    if (inputValue.trim()) {
      await fetchProfile(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  const handleStart = () => {
    if (profile) {
      onStart(profile.screen_name);
    } else if (inputValue.trim()) {
      onStart(inputValue.replace('@', '').trim());
    }
  };

  return (
    <div className="min-h-screen neural-bg flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo size="lg" className="mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
            <span className="gradient-text">OpenGradient</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
            Quizzy
          </h2>
          <p className="text-muted-foreground text-lg">
            Test your knowledge of Open Intelligence
          </p>
        </div>

        {/* Features */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            <span>15 Questions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4 text-primary" />
            <span>AI & Web3</span>
          </div>
        </div>

        {/* Username Input */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Enter your X (Twitter) username
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
              <Input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  clearProfile();
                }}
                onKeyDown={handleKeyDown}
                placeholder="username"
                className="pl-8"
              />
            </div>
            <Button 
              onClick={handleFetch} 
              disabled={loading || !inputValue.trim()}
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </Button>
          </div>
          
          {error && (
            <p className="mt-3 text-sm text-destructive">{error}</p>
          )}
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="mb-6">
            <TwitterProfileCard profile={profile} />
          </div>
        )}

        {/* Start Button */}
        <Button 
          onClick={handleStart}
          disabled={!inputValue.trim() && !profile}
          variant="hero"
          size="xl"
          className="w-full"
        >
          Start Quiz
        </Button>

        {/* Skip Option */}
        <button
          onClick={() => onStart('Anonymous')}
          className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
}
