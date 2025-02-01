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
    return (
      <div
        className={`relative flex items-center justify-between rounded-lg p-2 text-2xl shadow-md ${isActive ? "bg-primary-100 text-secondary" : "bg-secondary"}`}
      >
        <div className="flex grow items-center gap-1">
          {/* circal */}
          <div
            onClick={() => toggleCompleted(id)}
            className={`h-4 w-4 rounded-full border ${!completed && !isActive ? "border-primary-100 bg-secondary" : completed && !isActive ? "bg-primary-100" : !completed && isActive ? "border-secondary bg-primary-100" : "bg-secondary"}`}
          />

          <p
            onClick={() => toggleActive(id)}
            className="line-clamp-1 shrink text-[16px] md:text-lg"
            title={content}
          >
            {content}
          </p>
        </div>
        <div className="flex select-none items-center gap-2 text-[14px] font-bold md:text-lg">
          <div className="flex items-center">
            <sup className={`text-primary-100 ${isActive && "text-secondary"}`}>
              {pomodoros}
            </sup>
            <span className="pl-1">/</span>
            <sub>{target}</sub>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => taskDelete(id)}
              title="delete"
              className="font-black text-red-600"
            >
              D
            </button>
            <span className="px-1">/</span>
            <button
              onClick={() => editTask(id)}
              title="edit"
              className="font-black text-amber-500"
            >
              E
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default TaskItem;
