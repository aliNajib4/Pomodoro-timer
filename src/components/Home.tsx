import { useState } from "react";
import { Tasks, Timer, Setting } from "./";

const Home = () => {
  const [currentTask, setCurrentTask] = useState("");
  const [currentPomodoro, setCurrentPomodoro] = useState(0);
  return (
    <main className="my-3 grid grow grid-cols-5 grid-rows-2 gap-2">
      <div className="col-span-2">
        <Timer
          currentTask={currentTask}
          setCurrentPomodoro={setCurrentPomodoro}
          currentPomodoro={currentPomodoro}
        />
      </div>
      <div className="col-span-3 col-start-3 row-span-2 row-start-1">
        <Tasks
          setCurrentTask={setCurrentTask}
          currentPomodoro={currentPomodoro}
        />
      </div>
      <div className="col-span-2">
        <Setting />
      </div>
    </main>
  );
};

export default Home;
