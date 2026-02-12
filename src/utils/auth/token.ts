import { User } from '@/types';

export type LoginResponse = {
  status: string;
  user: User;
  token?: string;
  accessToken?: string;
};

export const extractToken = (data: LoginResponse): string | null => {
  const token = data.token;

  if (typeof token !== 'string') return null;

  const t = token.trim();
  if (!t || t === 'undefined' || t === 'null') return null;

  // basic JWT shape check
  if (t.split('.').length !== 3) return null;

  return t;
};
