import { useCallback, useEffect, useRef, useState } from "react";
import { TaskItem, EditTask } from "./";
import TTaskItem from "../types/taskItem";
import TNewTask from "../types/newTask";

const Dots = () => (
  <div className="flex flex-col gap-1">
    {Array(3)
      .fill(0)
      .map((_, idx) => (
        <div key={idx} className="h-1 w-1 rounded-full bg-black" />
      ))}
  </div>
);

type TProps = {
  setCurrentTask: React.Dispatch<React.SetStateAction<string>>;
  currentPomodoro: number;
};

const Tasks = ({ setCurrentTask, currentPomodoro }: TProps) => {
  const [activeTask, setActiveTask] = useState<null | number>(null);
  const [tasks, setTasks] = useState<{ [key: number]: TTaskItem }>(
    JSON.parse(localStorage.getItem("tasks") || "{}"),
  );
  const [showEditTask, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState<null | number>(null);
  const [showMemu, setShowMenu] = useState(false);
  const menuRef = useRef<null | HTMLUListElement>(null);
  const dotsRef = useRef<null | HTMLButtonElement>(null);

  const isActive = (id: number) => activeTask === id;

  const toggleActive = useCallback(
    (id: number) => {
      setActiveTask(id);
      setCurrentTask(tasks[id].content);
    },
    [tasks, setCurrentTask],
  );

  const taskDelete = useCallback((id: number) => {
    setTasks((prev) => {
      const copyTasks = { ...prev };
      delete copyTasks[id];
      return copyTasks;
    });
    setActiveTask(null);
  }, []);

  const toggleCompleted = useCallback((id: number) => {
    setTasks((prev) => ({
      ...prev,
      [id]: { ...prev[id], completed: !prev[id].completed },
    }));
  }, []);

  const toggleShowMenu = () => {
    setShowEdit((prev) => !prev);
  };

  const cancelAdd = useCallback(() => {
    setShowEdit(false);
  }, []);

  const handleNewAdd = useCallback((data: TNewTask) => {
    setShowEdit(false);
    const timeNow = Date.now();
    const newTask: TTaskItem = {
      ...data,
      id: timeNow,
      completed: false,
      pomodoros: 0,
      createAt: timeNow,
    };
    setTasks((prev) => ({ ...prev, [timeNow]: newTask }));
  }, []);

  const handleEdit = useCallback((id: number) => {
    setEditItem(id);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditItem(null);
  }, []);

  const handleSaveEdit = useCallback(
    (data: TNewTask) => {
      if (!editItem) {
        setEditItem(null);
        return;
      }
      setTasks((prev) => ({
        ...prev,
        [editItem]: { ...prev[editItem], ...data },
      }));
      setEditItem(null);
    },
    [editItem],
  );

  const ShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const clearAll = () => {
    setTasks({});
    setShowMenu(false);
  };

  const clearCompleted = () => {
    setTasks((prev) => {
      const copyTasks = { ...prev };
      Object.values(copyTasks).forEach((task) => {
        if (task.completed) {
          delete copyTasks[task.id];
        }
      });
      return copyTasks;
    });
    setShowMenu(false);
  };

  const clearPomodoros = () => {
    setTasks((prev) => {
      const copyTasks = JSON.parse(JSON.stringify(prev));
      Object.keys(copyTasks).forEach((key) => {
        copyTasks[+key].pomodoros = 0;
      });
      return copyTasks;
    });
    setShowMenu(false);
  };

  //handle click outside menu
  useEffect(() => {
    const closeOpenMenus = (e: MouseEvent) => {
      if (
        showMemu &&
        !menuRef.current?.contains(e.target as Node) &&
        !dotsRef.current?.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mouseup", closeOpenMenus);

    return () => {
      document.removeEventListener("mouseup", closeOpenMenus);
    };
  }, [showMemu]);

  //update pomodoros
  useEffect(() => {
    if (activeTask === null) return;

    setTasks((prev) => ({
      ...prev,
      [activeTask]: {
        ...prev[activeTask],
        pomodoros: prev[activeTask].pomodoros + 1,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPomodoro]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="h-full w-full rounded-xl bg-secondary">
      <div className="relative flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-xl font-bold">Tasks</h3>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleShowMenu}
            className="rounded-md border bg-white p-1 px-2 text-sm uppercase md:text-lg"
          >
            {!showEditTask ? "add" : "cancel"}
          </button>
          <button onClick={ShowMenu} className="px-2" ref={dotsRef}>
            <Dots />
          </button>
        </div>
        {showMemu && (
          <ul
            ref={menuRef}
            className="absolute right-8 top-6 z-10 divide-y-2 overflow-hidden rounded-md border bg-white shadow-lg"
          >
            <li className="p-2 hover:bg-primary-100 hover:text-white">
              <button onClick={clearAll} className="w-full">
                clear all
              </button>
            </li>
            <li className="p-2 hover:bg-primary-100 hover:text-white">
              <button onClick={clearCompleted} className="w-full">
                clear completed
              </button>
            </li>
            <li className="p-2 hover:bg-primary-100 hover:text-white">
              <button onClick={clearPomodoros} className="w-full">
                clear pomodoros
              </button>
            </li>
          </ul>
        )}
      </div>
      <ul className="flex flex-col gap-3 px-5 py-3">
        {showEditTask && (
          <li>
            <EditTask cancel={cancelAdd} save={handleNewAdd} />
          </li>
        )}
        {Object.keys(tasks)
          .sort((a, b) => +b - +a)
          .map((idTask) => (
            <li key={idTask}>
              {editItem === +idTask ? (
                <EditTask
                  cancel={handleCancelEdit}
                  save={handleSaveEdit}
                  isEdit={true}
                  data={tasks[+idTask]}
                />
              ) : (
                <TaskItem
                  data={tasks[+idTask]}
                  isActive={isActive(+idTask)}
                  toggleActive={toggleActive}
                  toggleCompleted={toggleCompleted}
                  taskDelete={taskDelete}
                  editTask={handleEdit}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Tasks;
