import { useState } from "react";
import useCounterdown from "../hooks/useCounterdown";

const TIMES = [25, 5, 15];
const TABS = ["task", "short break", "long break"];

const fomatTime = (time: number) =>
  `${time < 10 ? "0" : ""}${Math.floor(time)}:${(time % 1) * 60 < 10 ? "0" : ""}${((time % 1) * 60).toFixed(0)}`;

const Timer = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timeNow = useCounterdown(TIMES[currentTab], isRunning);

  const changeTab = (idx: number) => {
    setCurrentTab(idx);
    setIsRunning(false);
  };

  const handleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  const handleSkip = () => {
    setIsRunning(false);
    // if(countPomodoro === 4){
    //   changeTab(2);
    // }
    changeTab(1);
  };

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-between rounded-2xl py-4 text-lg font-medium capitalize text-secondary transition-colors ${currentTab === 0 ? "bg-primary-100" : "bg-Tertiary-100"}`}
    >
      <ul className="flex items-center justify-center">
        {TABS.map((tab, idx) => (
          <li
            key={tab}
            onClick={() => changeTab(idx)}
            className={`cursor-pointer border-b-2 p-2 ${currentTab === idx ? "border-secondary" : "border-transparent"}`}
          >
            {tab}
          </li>
        ))}
      </ul>
      <p className="text-center text-7xl font-black">{fomatTime(timeNow)}</p>
      <div>
        <button
          onClick={handleTimer}
          className={`${currentTab === 0 ? "text-primary-100" : "text-Tertiary-100"} rounded-md bg-secondary p-2 text-xl font-bold uppercase transition hover:bg-transparent hover:text-secondary`}
        >
          {isRunning ? "stop" : "start"}
        </button>
        {currentTab === 0 && (
          <button
            onClick={handleSkip}
            className="ml-2 border-b-2 border-transparent text-2xl font-black text-secondary shadow-xl transition hover:border-secondary"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
