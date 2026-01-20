import { useState } from 'react';

export function useLoadingError() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    setError(null);
  };
  const stopLoading = () => {
    setIsLoading(false);
  };

  const setErrorMessage = (message: string) => {
    setError(message);
    setIsLoading(false);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setErrorMessage,
    clearError,
  };
}
