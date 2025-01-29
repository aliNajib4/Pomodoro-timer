import { useState } from "react";
import { Tasks, Timer, Setting } from "./";
import TSetting from "../types/setting";

const Home = () => {
  const [currentTask, setCurrentTask] = useState("");
  const [currentPomodoro, setCurrentPomodoro] = useState(0);
  const [setting, setSetting] = useState<TSetting>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    removeSound: false,
  });
  const onSettingChange = (newSetting: TSetting) => {
    setSetting(newSetting);
  };

  return (
    <main className="my-3 grid grow grid-cols-5 grid-rows-2 gap-2">
      <div className="col-span-2">
        <Timer
          currentTask={currentTask}
          setCurrentPomodoro={setCurrentPomodoro}
          currentPomodoro={currentPomodoro}
          setting={setting}
        />
      </div>
      <div className="col-span-3 col-start-3 row-span-2 row-start-1">
        <Tasks
          setCurrentTask={setCurrentTask}
          currentPomodoro={currentPomodoro}
        />
      </div>
      <div className="col-span-2">
        <Setting onSave={onSettingChange} />
      </div>
    </main>
  );
};

export default Home;
