// hooks/useThrottle.js
import { useState, useEffect } from "react";

export default function useThrottle(value, delay = 300) {
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setThrottledValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttledValue;
}
