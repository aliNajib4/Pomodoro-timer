import { memo } from "react";
import TTaskItem from "./../types/taskItem";

type TProps = {
  data: TTaskItem;
  toggleActive: (id: number) => void;
  toggleCompleted: (id: number) => void;
  taskDelete: (id: number) => void;
  editTask: (id: number) => void;
  isActive?: boolean;
};

const TaskItem = memo(
  ({
    data,
    toggleActive,
    toggleCompleted,
    taskDelete,
    editTask,
    isActive,
  }: TProps) => {
    const { content, completed, target, pomodoros, id } = data;
    console.log("render: ", id);
    return (
      <div
        className={`relative flex items-center justify-between rounded-lg p-2 text-2xl shadow-md ${isActive ? "bg-primary-100 text-secondary" : "bg-secondary"}`}
      >
        <div className="flex grow items-center gap-3">
          {/* circal */}
          <div
            onClick={() => toggleCompleted(id)}
            className={`h-5 w-5 rounded-full border ${!completed && !isActive ? "border-primary-100 bg-secondary" : completed && !isActive ? "bg-primary-100" : !completed && isActive ? "border-secondary bg-primary-100" : "bg-secondary"}`}
          />

          <p onClick={() => toggleActive(id)} className="grow">
            {content}
          </p>
        </div>
        <div className="flex select-none items-center gap-5">
          <div>
            <sup
              className={`font-bold text-primary-100 ${isActive && "text-secondary"}`}
            >
              {pomodoros}
            </sup>
            <span className="pl-1">/</span>
            <sub>{target}</sub>
          </div>
          <div>
            <button
              onClick={() => taskDelete(id)}
              title="delete"
              className="font-black text-red-600"
            >
              <sup>D</sup>
            </button>
            <span className="px-1">/</span>
            <button
              onClick={() => editTask(id)}
              title="edit"
              className="font-black text-amber-500"
            >
              <sub>E</sub>
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default TaskItem;
