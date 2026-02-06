import { useState, useCallback } from 'react';
import { TwitterProfile } from '@/types/quiz';

export function useTwitterProfile() {
  const [profile, setProfile] = useState<TwitterProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (username: string) => {
    if (!username.trim()) {
      setError('Please enter a username');
      return false;
    }

    const cleanUsername = username.replace('@', '').trim();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.fxtwitter.com/${cleanUsername}`);
      
      if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();
      
      if (data.code === 404 || !data.user) {
        throw new Error('User not found');
      }

      const user = data.user;
      setProfile({
        name: user.name || cleanUsername,
        screen_name: user.screen_name || cleanUsername,
        avatar: user.avatar_url || '',
        banner: user.banner_url,
        description: user.description,
        followers: user.followers || 0,
        following: user.following || 0,
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      setProfile(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearProfile = useCallback(() => {
    setProfile(null);
    setError(null);
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    clearProfile,
  };
}
