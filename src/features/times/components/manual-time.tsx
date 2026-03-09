"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import z from "zod";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import { DatePicker } from "@/components/date-picker";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { secondsToString } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { useAddTaskTime } from "../api/use-add-task-time";
import { addTimeSchema } from "../schemas";

export const ManualTime = () => {
  const { mutate, isPending } = useAddTaskTime();
  const taskId = useTaskId();
  const workspaceId = useWorkspaceId();

  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const [inputDate, setInputDate] = useState(new Date());

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

  const convertToSeconds = () => {
    return inputHours * 3600 + inputMinutes * 60 + inputSeconds;
  };

  const [AddDialog, confirmAdd] = useConfirm(
    "Add tracked session",
    `This will add a new session of ${secondsToString(convertToSeconds())} into the task.`,
    "primary",
  );

  const handleAddTime = async () => {
    const ok = await confirmAdd();
    if (!ok) return;

    const values: z.infer<typeof addTimeSchema> = {
      secondsTracked: convertToSeconds(),
      dayTracked: inputDate,
      taskId,
      workspaceId,
    };
    mutate(
      { json: { ...values } },
      {
        onSuccess: () => {
          setInputHours(0);
          setInputMinutes(0);
          setInputSeconds(0);
          setInputDate(new Date());
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center">
      <AddDialog />
      <DatePicker
        value={inputDate}
        onChange={(date) => setInputDate(date)}
        className="w-fit mt-7"
      />
      <div className="py-7">
        <div className="flex justify-center items-center font-mono w-full text-5xl sm:text-7xl select-none">
          <Input
            value={inputHours.toString().padStart(2, "0")}
            onChange={(e) => setInputHours(+e.target.value)}
            onFocus={handleFocus}
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-14 sm:h-20 w-[4.1rem] sm:w-[5.9rem] px-0 font-mono !text-5xl sm:!text-7xl text-center bg-muted"
          />
          :
          <Input
            value={inputMinutes.toString().padStart(2, "0")}
            onChange={(e) => setInputMinutes(+e.target.value)}
            onFocus={handleFocus}
            onBlur={handleMaxMinutes}
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-14 sm:h-20 w-[4.1rem] sm:w-[5.9rem] px-0 font-mono !text-5xl sm:!text-7xl text-center bg-muted"
          />
          :
          <Input
            value={inputSeconds.toString().padStart(2, "0")}
            onChange={(e) => setInputSeconds(+e.target.value)}
            onFocus={handleFocus}
            onBlur={handleMaxSeconds}
            onSubmit={handleMaxSeconds}
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-14 sm:h-20 w-[4.1rem] sm:w-[5.9rem] px-0 font-mono !text-5xl sm:!text-7xl text-center bg-muted"
          />
        </div>
        <div className="flex text-center justify-center gap-x-0 sm:gap-x-2 px-1 select-none text-muted-foreground">
          <span className="w-24 sm:w-32">Hours</span>
          <span className="w-24 sm:w-32">Minutes</span>
          <span className="w-24 sm:w-32">Seconds</span>
        </div>
      </div>
      <div className="flex justify-center gap-x-3">
        <Button
          onClick={handleAddTime}
          disabled={convertToSeconds() == 0 || isPending}
          size={"lg"}
        >
          <PlusIcon className="size-16 mr-2" />
          Add to task
        </Button>
      </div>
    </div>
  );
};
