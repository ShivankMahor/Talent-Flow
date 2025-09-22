import { useState, useEffect } from "react";

/**
 * Debounce a changing value.
 * @param {*} value The value to debounce
 * @param {number} delay Delay in ms (default: 300)
 * @returns Debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}
