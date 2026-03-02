"use client";

import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { useTimer } from "react-timer-hook";
import React, { useState } from "react";

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

  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.currentTarget.select();
  };

  const handleMaxSeconds = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    let numSeconds = +e.target.value;
    if (numSeconds > 59) {
      numSeconds = 59;
    }
    setInputSeconds(numSeconds);
  };

  const handleMaxMinutes = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    let numMinutes = +e.target.value;
    if (numMinutes > 59) {
      numMinutes = 59;
    }
    setInputMinutes(numMinutes);
  };

  const onSetTimer = () => {
    // Convert to seconds
    const timeSetInSeconds =
      inputHours * 3600 + inputMinutes * 60 + inputSeconds;

    const time = new Date();
    time.setSeconds(time.getSeconds() + timeSetInSeconds);
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
      <CardContent className="py-4 flex flex-col items-center justify-center">
        <div className="flex justify-center pb-4 items-center w-fit gap-x-4">
          <Input
            value={inputHours.toString().padStart(2, "0")}
            onChange={(e) => setInputHours(+e.target.value)}
            disabled={isRunning}
            onFocus={handleFocus}
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none size-16 !text-lg text-center"
          />
          :
          <Input
            value={inputMinutes.toString().padStart(2, "0")}
            onChange={(e) => setInputMinutes(+e.target.value)}
            disabled={isRunning}
            onFocus={handleFocus}
            onBlur={handleMaxMinutes}
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none size-16 !text-lg text-center"
          />
          :
          <Input
            value={inputSeconds.toString().padStart(2, "0")}
            onChange={(e) => setInputSeconds(+e.target.value)}
            disabled={isRunning}
            onFocus={handleFocus}
            onBlur={handleMaxSeconds}
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none size-16 !text-lg text-center"
          />
        </div>
        <Button variant={"secondary"} disabled={isRunning} onClick={onSetTimer}>
          Set
        </Button>
      </CardContent>
      <DottedSeparator className="px-7" />
      <CardContent className="my-2">
        <div className="text-7xl flex justify-center font-mono py-7">
          <span>{(days * 24 + hours).toString().padStart(2, "0")}</span>:
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
          <Button size={"lg"} variant={"secondary"} onClick={onSetTimer}>
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
