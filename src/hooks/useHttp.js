import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options) => {
    setLoading(true);
    try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}`);
    }
    setLoading(false);
    console.log(data);
    return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      console.log(e.message);
      throw e;
    }

  }, []);

  const clearError = useCallback(() => setError(null));

  return { request, clearError,loading, error };

}