"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";

import { TaskTime } from "../types";

interface TaskTimeDetailsProps {
  taskTimes: TaskTime[];
}

export const TaskTimeDetails = ({ taskTimes }: TaskTimeDetailsProps) => {
  const dateToString = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date,
    );
    return formattedDate;
  };

  const secondsToString = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return [
      hours != 0 && `${hours} hours`,
      minutes != 0 && `${minutes} minutes`,
      seconds != 0 && `${seconds} seconds`,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const getTotalTime = (times: TaskTime[]) => {
    const totalSeconds = times.reduce(
      (n, { secondsTracked }) => n + secondsTracked,
      0,
    );
    return secondsToString(totalSeconds);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Tracked Time Details
        </CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7" />
      {taskTimes.length !== 0 ? (
        <>
          <CardContent className="mt-7">
            <p className="text-lg font-bold">Overall Total Time</p>
            <p className="text-lg font-semibold text-muted-foreground">
              {getTotalTime(taskTimes)}
            </p>
          </CardContent>
          <DottedSeparator className="px-7" />
          <CardContent className="mt-7">
            <p className="text-lg font-bold mb-4">Session History</p>
            <ul className="flex flex-col gap-y-4">
              {taskTimes.map((taskTime) => (
                <li key={taskTime.$id}>
                  <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                    <CardContent className="p-4">
                      <p className="text-lg font-medium truncate">
                        {dateToString(new Date(taskTime.dayTracked))}
                      </p>
                      <p className="text-muted-foreground">
                        {secondsToString(taskTime.secondsTracked)}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </CardContent>
        </>
      ) : (
        <CardContent className="flex items-center justify-center p-7 text-center text-lg font-semibold text-muted-foreground">
          No tracking history. Start your first session using the time tracker.
        </CardContent>
      )}
    </Card>
  );
};
