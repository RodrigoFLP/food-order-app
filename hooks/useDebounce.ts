import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebounceLoading, setIsDebounceLoading] = useState(false);

  useEffect(() => {
    setIsDebounceLoading(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebounceLoading(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return [debouncedValue, isDebounceLoading];
};

export default useDebounce;
