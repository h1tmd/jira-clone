"use client";

import { TimerIcon } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DottedSeparator } from "@/components/dotted-separator";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import { Button } from "@/components/ui/button";

import { TaskTime } from "../types";

interface TaskTimeDetailsProps {
  taskTimes: TaskTime[];
  showTrackButton?: boolean;
}

export const TaskTimeDetails = ({
  taskTimes,
  showTrackButton,
}: TaskTimeDetailsProps) => {
  const workspaceId = useWorkspaceId();
  const taskId = useTaskId();

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
    <Card className="shadow-none">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-bold">
          Tracked Time Details
        </CardTitle>
        {showTrackButton && (
          <Button className="!m-0" size={"sm"} variant={"secondary"} asChild>
            <Link href={`/workspaces/${workspaceId}/time-tracking/${taskId}`}>
              <TimerIcon className="size-4 lg:mr-2" />
              <span className="hidden lg:block">Track Task</span>
            </Link>
          </Button>
        )}
      </CardHeader>
      <DottedSeparator className="px-7" />
      {taskTimes.length !== 0 ? (
        <>
          <CardContent className="mt-6">
            <p className="text-lg font-bold">Overall Total Time</p>
            <p className="text-lg font-semibold text-muted-foreground">
              {getTotalTime(taskTimes)}
            </p>
          </CardContent>
          <DottedSeparator className="px-7" />
          <CardContent className="mt-6">
            <p className="text-lg font-bold mb-2">Session History</p>
            <ul className="flex flex-col gap-y-2">
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
