"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { DatePicker } from "@/components/date-picker";
import { TimePicker } from "@/components/time-picker";
import { cn, secondsToTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUpdateTaskTime } from "../api/use-update-task-time";
import { TaskTime } from "../types";

interface EditTaskTimeFormProps {
  onCancel?: () => void;
  initialValues: TaskTime;
}

export const EditTaskTimeForm = ({
  onCancel,
  initialValues,
}: EditTaskTimeFormProps) => {
  const { mutate, isPending } = useUpdateTaskTime();
  const { hours, minutes, seconds } = secondsToTime(
    initialValues.secondsTracked,
  );

  const [inputHours, setInputHours] = useState(hours);
  const [inputMinutes, setInputMinutes] = useState(minutes);
  const [inputSeconds, setInputSeconds] = useState(seconds);

  const [inputDate, setInputDate] = useState(
    new Date(initialValues.dayTracked),
  );

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

  const handleUpdateTime = async () => {
    mutate(
      {
        json: {
          dayTracked: inputDate,
          secondsTracked: convertToSeconds(),
        },
        param: {
          taskTimeId: initialValues.$id,
        },
      },
      {
        onSuccess: () => {
          onCancel?.();
        },
      },
    );
  };

  const convertToSeconds = () => {
    return inputHours * 3600 + inputMinutes * 60 + inputSeconds;
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Edit a session</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col items-center">
          <div className="flex flex-row border w-full md:w-fit rounded-lg gap-2 items-center justify-center p-4">
            <DatePicker
              value={inputDate}
              onChange={(date) => setInputDate(date)}
              className="w-fit"
            />
            <TimePicker
              value={inputDate}
              onChange={(date) => setInputDate(date)}
              className="w-fit"
            />
          </div>
          <div className="pt-3">
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
        </div>
        <DottedSeparator className="py-7" />
        <div className="flex items-center justify-between">
          <Button
            type="button"
            size={"lg"}
            variant={"secondary"}
            onClick={onCancel}
            disabled={isPending}
            className={cn(!onCancel && "invisible")}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateTime} size={"lg"} disabled={isPending}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
