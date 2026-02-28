"use client";

import React from "react";
import { useTimer } from "react-timer-hook";

import { Button } from "./ui/button";

export const Timer = ({ expiryTimestamp }: { expiryTimestamp: Date }) => {
  const {
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days, // add to hours
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    interval: 20,
  });

  const onRestart = () => {
    // Restarts to 5 minutes timer
    const time = new Date();
    time.setSeconds(time.getSeconds() + 300);
    restart(time);
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <h1>Test Timer using react-timer-hook</h1>
      <div className="text-8xl flex justify-center font-mono">
        <span>{hours.toString().padStart(2, "0")}</span>:
        <span>{minutes.toString().padStart(2, "0")}</span>:
        <span>{seconds.toString().padStart(2, "0")}</span>
      </div>
      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
      <div className="flex justify-center gap-x-3">
        <Button onClick={start}>Start</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
        <Button onClick={onRestart}>Restart</Button>
      </div>
    </div>
  );
};

// export default function App() {
//    const time = new Date();
//   time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
//   return (
//     <div>
//       <MyTimer expiryTimestamp={time} />
//     </div>
//   );
// }
