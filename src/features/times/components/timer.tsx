"use client";

import { useTimer } from "react-timer-hook";
import React, { useState } from "react";
import {
  CheckIcon,
  PauseIcon,
  PencilIcon,
  PlayIcon,
  RotateCcwIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useTimerExpiredModal } from "../hooks/use-timer-expired-modal";
import { DatePicker } from "@/components/date-picker";

export const Timer = ({ defaultTimer }: { defaultTimer: Date }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const [inputDate, setInputDate] = useState(new Date());

  const { open } = useTimerExpiredModal();

  const {
    totalSeconds, // total seconds on the timer currently
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: defaultTimer,
    onExpire: open,
    autoStart: false,
  });

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

  const setTimer = () => {
    // Convert to seconds
    const timeSetInSeconds =
      inputHours * 3600 + inputMinutes * 60 + inputSeconds;

    const time = new Date();
    time.setSeconds(time.getSeconds() + timeSetInSeconds);
    restart(time, false);
  };

  const handleEditTimer = () => {
    if (isEditing) {
      setTimer();
    }

    setIsEditing((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <DatePicker
        value={inputDate}
        onChange={(date) => setInputDate(date)}
        className="w-fit mt-7"
      />
      <div className="py-7">
        {isEditing ? (
          <div className="flex justify-center items-center font-mono w-full text-7xl select-none">
            <Input
              value={inputHours.toString().padStart(2, "0")}
              onChange={(e) => setInputHours(+e.target.value)}
              disabled={isRunning}
              onFocus={handleFocus}
              type="number"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-20 w-[5.9rem] px-0 font-mono !text-7xl text-center"
            />
            :
            <Input
              value={inputMinutes.toString().padStart(2, "0")}
              onChange={(e) => setInputMinutes(+e.target.value)}
              disabled={isRunning}
              onFocus={handleFocus}
              onBlur={handleMaxMinutes}
              type="number"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-20 w-[5.9rem] px-0 font-mono !text-7xl text-center"
            />
            :
            <Input
              value={inputSeconds.toString().padStart(2, "0")}
              onChange={(e) => setInputSeconds(+e.target.value)}
              disabled={isRunning}
              onFocus={handleFocus}
              onBlur={handleMaxSeconds}
              type="number"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-20 w-[5.9rem] px-0 font-mono !text-7xl text-center"
            />
          </div>
        ) : (
          <div className="text-7xl flex justify-center font-mono gap-x-1 py-1 px-1 select-none">
            <span>{(days * 24 + hours).toString().padStart(2, "0")}</span>:
            <span>{minutes.toString().padStart(2, "0")}</span>:
            <span>{seconds.toString().padStart(2, "0")}</span>
          </div>
        )}
        <div className="flex text-center justify-center gap-x-2 px-1 select-none text-muted-foreground">
          <span className="w-32">Hours</span>
          <span className="w-32">Minutes</span>
          <span className="w-32">Seconds</span>
        </div>
      </div>
      <div className="flex justify-center gap-x-3">
        <Button
          size={"lg"}
          variant={"secondary"}
          disabled={isEditing}
          onClick={setTimer}
        >
          <RotateCcwIcon />
        </Button>
        <Button
          size={"lg"}
          disabled={isEditing || totalSeconds == 0}
          onClick={isRunning ? pause : resume}
        >
          {isRunning ? <PauseIcon className="size-16" /> : <PlayIcon />}
        </Button>
        <Button
          onClick={handleEditTimer}
          size={"lg"}
          disabled={isRunning}
          variant={"secondary"}
        >
          {isEditing ? <CheckIcon className="size-16" /> : <PencilIcon />}
        </Button>
      </div>
    </div>
  );
};
