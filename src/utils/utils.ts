export interface FetchDataParams<T> {
  url: string;
  method?: string;
  body?: unknown;
  timeout?: number;
  callback?: (response: T) => void;
  setError?: (error: unknown) => void;
  token?: string | null;
}

export const fetchData = async <T>({
  url,
  method = 'GET',
  body = null,
  timeout = 5000,
  callback,
  setError,
  token = null,
}: FetchDataParams<T>): Promise<void> => {
  const controller = new AbortController();
  const abortTimeout = setTimeout(() => controller.abort(), timeout);

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': token } : {}),
    },
    signal: controller.signal,
  };

  if (body) fetchOptions.body = JSON.stringify(body);

  try {
    const response = await fetch(url, fetchOptions);

    clearTimeout(abortTimeout);

    const responseData: T = await response.json();
    if (callback) callback(responseData);
  } catch (error) {
    console.error('Request error', (error as Error).message);
    if (setError) setError(error);
  }
};
