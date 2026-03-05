"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import { PageError } from "@/components/page-error";

import { useGetTaskTimes } from "../api/use-get-task-times";
import { TaskTime } from "../types";

export const TaskTimeDetails = () => {
  const taskId = useTaskId();
  const { data: taskTimes } = useGetTaskTimes({ taskId });

  if (taskTimes === undefined) {
    return <PageError message="Task not found" />;
  }

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Tracked Time Details
        </CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7" />
      <CardContent className="mt-7">
        <p className="text-lg font-bold">Overall Total Time</p>
        <p className="text-lg font-semibold text-muted-foreground">
          {secondsToString(
            taskTimes.reduce((n, { secondsTracked }) => n + secondsTracked, 0),
          )}
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
                  <p>Total Time: {secondsToString(taskTime.secondsTracked)}</p>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No tracking history
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
