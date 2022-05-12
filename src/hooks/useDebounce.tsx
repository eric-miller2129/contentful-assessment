import { useEffect, useState } from 'react';

export default function useDebounce<T>(val: T, delay: number = 500): T {
  const [debounceVal, setDebounceVal] = useState<T>(val);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceVal(val), delay);

    return () => {
      clearTimeout(timer);
    }
  }, [val, delay]);

  return debounceVal;
}