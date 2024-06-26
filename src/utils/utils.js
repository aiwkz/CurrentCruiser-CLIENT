export const fetchData = async ({ url, method = 'GET', body = null, timeout = 5000, callback = null, setError = null, token = null }) => {
  const controller = new AbortController();
  const abortTimeout = setTimeout(() => controller.abort(), timeout);

  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    signal: controller.signal,
  }

  if (body) fetchOptions.body = JSON.stringify(body)

  try {
    const response = await fetch(url, fetchOptions);

    clearTimeout(abortTimeout);

    const responseData = await response.json();
    callback ? callback(responseData) : responseData;
  } catch (error) {
    console.error('Request error', error.message);
    setError && setError(error);
  }
}
