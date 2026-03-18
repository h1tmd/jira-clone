"use client";

import { ClockIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TimePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
}

export const TimePicker = ({
  value,
  onChange,
  className,
  placeholder,
}: TimePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"lg"}
          className={cn(
            "w-full justify-start text-left font-normal px-3",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <ClockIcon className="size-4 mr-2" />
          {value ? value.toLocaleTimeString() : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background">
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={value?.toLocaleTimeString("en-GB").slice(0, 8)}
          onChange={(time) => {
            if (!value) return;
            const [hours, minutes, seconds] =
              time.currentTarget.value.split(":");

            const newDate = new Date(value);
            newDate.setHours(+hours, +minutes, +seconds);

            onChange(newDate);
          }}
          className="text-center border-none appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </PopoverContent>
    </Popover>
  );
};
