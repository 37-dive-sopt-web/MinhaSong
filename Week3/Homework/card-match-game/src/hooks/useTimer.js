import { useState, useEffect, useRef } from 'react';

export function useTimer(timeLimit) {
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(45000);

  const displayTime = (timeLeft / 1000).toFixed(2);

  const resetTimer = () => {
    setTimeLeft(timeLimit);
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  return { timerRef, timeLeft, setTimeLeft, displayTime, resetTimer };
};