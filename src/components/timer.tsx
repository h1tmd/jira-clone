"use client";

import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { useTimer } from "react-timer-hook";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DottedSeparator } from "./dotted-separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Timer = ({ expiryTimestamp }: { expiryTimestamp: Date }) => {
  const {
    totalSeconds, // total seconds on the timer currently
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
    restart(time, false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Test Timer using react-timer-hook
        </CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7" />
      <CardContent className="my-2 flex justify-center">
        <div className="flex justify-center py-7 items-center w-fit gap-x-4">
          <Input
            value={hours}
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none size-16 !text-lg text-center"
          />
          :
          <Input
            value={minutes}
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none size-16 !text-lg text-center"
          />
          :
          <Input
            value={seconds}
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none size-16 !text-lg text-center"
          />
        </div>
      </CardContent>
      <DottedSeparator className="px-7" />
      <CardContent className="my-2">
        <div className="text-7xl flex justify-center font-mono py-7">
          <span>{hours.toString().padStart(2, "0")}</span>:
          <span>{minutes.toString().padStart(2, "0")}</span>:
          <span>{seconds.toString().padStart(2, "0")}</span>
        </div>

        <div className="flex justify-center gap-x-3">
          <Button
            size={"lg"}
            variant={"secondary"}
            onClick={isRunning ? pause : resume}
          >
            {isRunning ? (
              <PauseIcon className="text-muted-foreground size-16" />
            ) : (
              <PlayIcon />
            )}
          </Button>
          <Button size={"lg"} variant={"secondary"} onClick={onRestart}>
            <RotateCcwIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
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
