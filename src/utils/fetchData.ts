import { useAuthStore } from '@/stores/authStore';

export interface FetchDataParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  timeout?: number;
  token?: string | null;
  autoLogoutOnAuthError?: boolean;
}

export class HttpError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
}

const safeJson = async (res: Response): Promise<unknown> => {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const shouldAutoLogout = (err: HttpError): boolean => {
  if (err.status === 401) return true;

  // 403 can be "invalid token" OR "forbidden"
  // logout only if it looks like auth/token failure
  const msg = err.message.toLowerCase();
  if (
    err.status === 403 &&
    (msg.includes('invalid token') || msg.includes('token'))
  )
    return true;

  return false;
};

export const fetchData = async <T>({
  url,
  method = 'GET',
  body,
  timeout = 5000,
  token = null,
  autoLogoutOnAuthError = true,
}: FetchDataParams): Promise<T> => {
  const controller = new AbortController();
  const abortTimeout = setTimeout(() => controller.abort(), timeout);
  const authTokenRaw = token ?? useAuthStore.getState().token;
  const authToken = typeof authTokenRaw === 'string' ? authTokenRaw : null;

  try {
    const res = await fetch(url, {
      method,
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await safeJson(res);
    const hasMessage = (value: unknown): value is { message: string } =>
      typeof value === 'object' &&
      value !== null &&
      'message' in value &&
      typeof (value as Record<string, unknown>).message === 'string';

    if (res.status === 304) {
      throw new HttpError(
        'Cached response (304). Disable caching for API calls.',
        304,
        null
      );
    }

    if (!res.ok) {
      const message = hasMessage(data)
        ? data.message
        : `Request failed with status ${res.status}`;

      const err = new HttpError(message, res.status, data);

      if (autoLogoutOnAuthError && shouldAutoLogout(err)) {
        useAuthStore.getState().logout();
      }

      throw err;
    }

    return data as T;
  } finally {
    clearTimeout(abortTimeout);
  }
};
