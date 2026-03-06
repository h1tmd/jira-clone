"use client";

import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { useStopwatch } from "react-timer-hook";
import React, { useState } from "react";

import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";

export const Stopwatch = () => {
  const [inputDate, setInputDate] = useState(new Date());

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  return (
    <div className="flex flex-col items-center">
      <DatePicker
        value={inputDate}
        onChange={(date) => setInputDate(date)}
        className="w-fit mt-7"
      />
      <div className="py-7">
        <div className="text-5xl sm:text-7xl flex justify-center font-mono gap-x-1 py-1 px-1 select-none">
          <span>{(days * 24 + hours).toString().padStart(2, "0")}</span>:
          <span>{minutes.toString().padStart(2, "0")}</span>:
          <span>{seconds.toString().padStart(2, "0")}</span>
        </div>

        <div className="flex text-center justify-center gap-x-0 sm:gap-x-2 px-1 select-none text-muted-foreground">
          <span className="w-24 sm:w-32">Hours</span>
          <span className="w-24 sm:w-32">Minutes</span>
          <span className="w-24 sm:w-32">Seconds</span>
        </div>
      </div>
      <div className="flex justify-center gap-x-3">
        <Button
          size={"lg"}
          variant={"secondary"}
          disabled={isRunning}
          onClick={() => {
            reset(undefined, false);
          }}
        >
          <RotateCcwIcon />
        </Button>
        <Button size={"lg"} onClick={isRunning ? pause : start}>
          {isRunning ? <PauseIcon className="size-16" /> : <PlayIcon />}
        </Button>
      </div>
    </div>
  );
};
