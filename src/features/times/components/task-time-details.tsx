"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTaskTimes } from "../api/use-get-task-times";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import { PageError } from "@/components/page-error";

export const TaskTimeDetails = () => {
  const taskId = useTaskId();
  const { data: taskTimes } = useGetTaskTimes({ taskId });

  if (!taskTimes) {
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
        <CardTitle className="text-xl font-bold">Task History</CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7" />
      <CardContent className="mt-7">
        <ul className="flex flex-col gap-y-4">
          {taskTimes.documents.map((taskTime) => (
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
