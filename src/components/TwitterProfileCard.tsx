import { TwitterProfile } from '@/types/quiz';
import { Users, UserPlus } from 'lucide-react';

interface TwitterProfileCardProps {
  profile: TwitterProfile;
}

export function TwitterProfileCard({ profile }: TwitterProfileCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="glass-card rounded-xl p-4 animate-scale-in">
      <div className="flex items-center gap-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-14 h-14 rounded-full ring-2 ring-primary/50"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground truncate">
            {profile.name}
          </h3>
          <p className="text-sm text-muted-foreground">@{profile.screen_name}</p>
        </div>
      </div>
      
      {profile.description && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {profile.description}
        </p>
      )}
      
      <div className="flex gap-4 mt-3 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <UserPlus className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">{formatNumber(profile.following)}</span>
          <span>Following</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">{formatNumber(profile.followers)}</span>
          <span>Followers</span>
        </div>
      </div>
    </div>
  );
}
