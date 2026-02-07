import { useState, useCallback } from 'react';
import { z } from 'zod';
import { TwitterProfile } from '@/types/quiz';

const usernameSchema = z
  .string()
  .trim()
  .min(1, 'Please enter a username')
  .max(30, 'Username is too long')
  .regex(/^[A-Za-z0-9_]+$/, 'Invalid username');

export function useTwitterProfile() {
  const [profile, setProfile] = useState<TwitterProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (username: string) => {
    const cleaned = username.replace('@', '').trim();
    const parsed = usernameSchema.safeParse(cleaned);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid username');
      setProfile(null);
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.fxtwitter.com/${encodeURIComponent(parsed.data)}`);

      if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();

      if (data.code === 404 || !data.user) {
        throw new Error('User not found');
      }

      const user = data.user;
      setProfile({
        name: user.name || parsed.data,
        screen_name: user.screen_name || parsed.data,
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

