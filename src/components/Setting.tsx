import { useRef, useState } from "react";
import TSetting from "../types/setting";

type TProps = {
  onSave: (settings: TSetting) => void;
};

const Settings = ({ onSave }: TProps) => {
  const pomodoroRef = useRef<HTMLInputElement>(null);
  const shortBreakRef = useRef<HTMLInputElement>(null);
  const longBreakRef = useRef<HTMLInputElement>(null);
  const longBreakIntervalRef = useRef<HTMLInputElement>(null);
  const removeSoundRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const validate = () => {
    const newErrors: { [key: string]: boolean } = {};
    const pomodoro = Number(pomodoroRef.current?.value);
    const shortBreak = Number(shortBreakRef.current?.value);
    const longBreak = Number(longBreakRef.current?.value);
    const longBreakInterval = Number(longBreakIntervalRef.current?.value);

    if (pomodoro <= 0 || pomodoro >= 300) newErrors.pomodoro = true;
    if (shortBreak <= 0 || shortBreak >= 60) newErrors.shortBreak = true;
    if (longBreak <= 0 || longBreak >= 120) newErrors.longBreak = true;
    if (longBreakInterval <= 0 || longBreakInterval >= 40)
      newErrors.longBreakInterval = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave({
        pomodoro: Number(pomodoroRef.current?.value),
        shortBreak: Number(shortBreakRef.current?.value),
        longBreak: Number(longBreakRef.current?.value),
        longBreakInterval: Number(longBreakIntervalRef.current?.value),
        removeSound: removeSoundRef.current?.checked || false,
      });
    }
  };

  const handleReset = () => {
    if (pomodoroRef.current) pomodoroRef.current.value = "25";
    if (shortBreakRef.current) shortBreakRef.current.value = "5";
    if (longBreakRef.current) longBreakRef.current.value = "15";
    if (longBreakIntervalRef.current) longBreakIntervalRef.current.value = "4";
    if (removeSoundRef.current) removeSoundRef.current.checked = false;
    setErrors({});
    handleSave();
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-neutral-900 p-6 text-white">
      <h2 className="mb-4 text-xl font-bold">Timer Settings</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div>
          <label className="mb-1 block">Pomodoro (min):</label>
          <input
            type="number"
            defaultValue="25"
            ref={pomodoroRef}
            className={`w-full rounded border-2 p-2 text-black ${errors.pomodoro ? "border-2 border-red-500" : ""}`}
          />
        </div>
        <div>
          <label className="mb-1 block">Short Break (min):</label>
          <input
            type="number"
            defaultValue="5"
            ref={shortBreakRef}
            className={`w-full rounded border-2 p-2 text-black ${errors.shortBreak ? "border-2 border-red-500" : ""}`}
            placeholder="Short Break (min)"
          />
        </div>
        <div>
          <label className="mb-1 block">Long Break (min):</label>
          <input
            type="number"
            defaultValue="15"
            ref={longBreakRef}
            className={`w-full rounded border-2 p-2 text-black ${errors.longBreak ? "border-2 border-red-500" : ""}`}
            placeholder="Long Break (min)"
          />
        </div>
        <div>
          <label className="mb-1 block">Long Break Interval:</label>
          <input
            type="number"
            defaultValue="4"
            ref={longBreakIntervalRef}
            className={`w-full rounded border-2 p-2 text-black ${errors.longBreakInterval ? "border-2 border-red-500" : ""}`}
            placeholder="Long Break Interval"
          />
        </div>
      </div>

      <label className="mt-4 flex items-center">
        <input
          type="checkbox"
          defaultChecked={false}
          ref={removeSoundRef}
          className="mr-2"
        />
        Remove Sound
      </label>

      <div className="mt-auto flex gap-2">
        <button
          onClick={handleSave}
          className="w-full rounded bg-secondary p-3 font-bold text-neutral-900 transition hover:bg-slate-100"
        >
          Save Settings
        </button>
        <button
          onClick={handleReset}
          className="w-full rounded bg-red-500 p-3 font-bold text-white transition hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Settings;
