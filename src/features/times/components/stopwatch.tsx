"use client";

import { PauseIcon, PlayIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { useStopwatch } from "react-timer-hook";
import React, { useState } from "react";
import z from "zod";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";

import { useAddTaskTime } from "../api/use-add-task-time";
import { addTimeSchema } from "../schemas";

export const Stopwatch = () => {
  const { mutate, isPending } = useAddTaskTime();
  const taskId = useTaskId();
  const workspaceId = useWorkspaceId();

  const [inputDate, setInputDate] = useState(new Date());

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
    totalSeconds,
  } = useStopwatch({ autoStart: false });

  const handleAddTime = () => {
    const values: z.infer<typeof addTimeSchema> = {
      secondsTracked: totalSeconds,
      dayTracked: inputDate,
      taskId,
      workspaceId,
    };
    mutate(
      { json: { ...values } },
      {
        onSuccess: () => {
          reset(undefined, false);
          setInputDate(new Date());
        },
      },
    );
  };

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
      <div className="flex justify-center gap-x-3 mt-3">
        <Button
          onClick={handleAddTime}
          disabled={totalSeconds == 0 || isPending || isRunning}
          size={"lg"}
        >
          <PlusIcon className="size-16 mr-2" />
          Add to task
        </Button>
      </div>
    </div>
  );
};
