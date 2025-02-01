import { memo, useRef, useState } from "react";
import TNewTask from "./../types/newTask";
import TTaskItem from "../types/taskItem";

type TProp = {
  cancel: () => void;
  save: (data: TNewTask) => void;
  isEdit?: boolean;
  data?: null | TTaskItem;
};

const EditTask = memo(
  ({ cancel, save, isEdit = false, data = null }: TProp) => {
    const content = useRef<null | HTMLInputElement>(null);
    const [valueTarget, setValueTarget] = useState(data ? data.target : "1");
    const [valuePomodoro, setValuePomodoro] = useState(
      data ? data.pomodoros : "0",
    );
    const handleCountChange = (value: string, type: "target" | "pomodoro") => {
      const setValue = type === "target" ? setValueTarget : setValuePomodoro;
      const numberValue = +value;
      if (numberValue < 1) {
        setValue("");
      } else if (numberValue > 99) {
        setValue("99");
      } else {
        setValue(numberValue.toString());
      }
    };

    const handleSave = () => {
      const data: TNewTask = {
        content: content.current ? content.current.value : "",
        target: +valueTarget,
      };
      if (isEdit) {
        data.pomodoros = +valuePomodoro;
      }
      save(data);
    };
    const handleCancel = () => {
      cancel();
    };

    return (
      <div className="rounded-lg p-3 text-[18px] shadow-md">
        <div className="mb-5 flex items-center gap-5 md:text-xl">
          <label htmlFor="contentInput">content: </label>
          <input
            type="text"
            id="contentInput"
            className="grow rounded-md border p-1 pl-2 focus:outline-none"
            ref={content}
            defaultValue={data ? data.content : ""}
          />
        </div>
        <div className="flex items-center justify-between capitalize md:text-xl">
          <div className="">
            <label htmlFor="targetInput">target: </label>
            <input
              type="number"
              id="targetInput"
              className="w-6"
              value={valueTarget}
              onChange={(e) => handleCountChange(e.target.value, "target")}
            />
          </div>
          {isEdit && (
            <div className="">
              <label htmlFor="pomodoroInput">pomodoro: </label>
              <input
                type="number"
                id="pomodoroInput"
                className="w-6"
                value={valuePomodoro}
                onChange={(e) => handleCountChange(e.target.value, "pomodoro")}
              />
            </div>
          )}
          <div className="">
            <button
              onClick={handleSave}
              title="save"
              className="font-black text-blue-600"
            >
              <sup>S</sup>
            </button>
            <span className="px-1">/</span>
            <button
              onClick={handleCancel}
              title="cancel"
              className="font-black text-red-500"
            >
              <sub>C</sub>
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default EditTask;
