import { useEffect, useState } from "react";

const useCounterdown = (
  time: number,
  isRunning: boolean,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [timeNow, setTimeNow] = useState(time * 60);

  useEffect(() => {
    setTimeNow(time * 60);
  }, [time]);

  useEffect(() => {
    let interval: undefined | number = undefined;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTimeNow((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time, isRunning]);
  useEffect(() => {
    if (timeNow <= 0) {
      setIsRunning(false);
    }
  }, [timeNow, setIsRunning]);
  return timeNow / 60;
};

export default useCounterdown;
