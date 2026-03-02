"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const ManualTime = () => {
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

  const convertToSeconds = () => {
    return inputHours * 3600 + inputMinutes * 60 + inputSeconds;
  };

  return (
    <>
      <div className="flex justify-center items-center py-7 font-mono w-full text-7xl select-none">
        <Input
          value={inputHours.toString().padStart(2, "0")}
          onChange={(e) => setInputHours(+e.target.value)}
          onFocus={handleFocus}
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-20 w-[5.45rem] px-0 font-mono !text-7xl text-center"
        />
        :
        <Input
          value={inputMinutes.toString().padStart(2, "0")}
          onChange={(e) => setInputMinutes(+e.target.value)}
          onFocus={handleFocus}
          onBlur={handleMaxMinutes}
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-20 w-[5.45rem] px-0 font-mono !text-7xl text-center"
        />
        :
        <Input
          value={inputSeconds.toString().padStart(2, "0")}
          onChange={(e) => setInputSeconds(+e.target.value)}
          onFocus={handleFocus}
          onBlur={handleMaxSeconds}
          onSubmit={handleMaxSeconds}
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-20 w-[5.45rem] px-0 font-mono !text-7xl text-center"
        />
      </div>
      <div className="flex justify-center">
        <Button
          // onClick={handleEditTimer}
          disabled={convertToSeconds() == 0}
          size={"lg"}
          variant={"secondary"}
        >
          <PlusIcon className="size-16 mr-2" />
          Add to task
        </Button>
      </div>
    </>
  );
};
