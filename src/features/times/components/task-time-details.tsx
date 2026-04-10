"use client";

import { PencilIcon, TimerIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DottedSeparator } from "@/components/dotted-separator";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { secondsToString } from "@/lib/utils";

import { useEditTaskTimeModal } from "../hooks/use-edit-task-time-modal";
import { useDeleteTaskTime } from "../api/use-delete-task-time";
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

  const { open } = useEditTaskTimeModal();
  const { mutate, isPending } = useDeleteTaskTime();
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete tracked session",
    "This will permanently delete the tracked session. Are you sure?",
    "destructive",
  );

  // Group tracked sessions by date
  const timesByDate = Object.values(
    taskTimes.reduce<Record<string, Array<TaskTime>>>((result, time) => {
      const date = new Date(time.dayTracked).toDateString();
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(time);
      return result;
    }, {}),
  );
  console.log(timesByDate);

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

  const getTotalTime = (times: TaskTime[]) => {
    const totalSeconds = times.reduce(
      (n, { secondsTracked }) => n + secondsTracked,
      0,
    );
    return secondsToString(totalSeconds);
  };

  const handleDelete = async (taskTimeId: string) => {
    const ok = await confirmDelete();
    if (!ok) return;

    mutate({
      param: {
        taskTimeId,
      },
    });
  };

  return (
    <Card className="shadow-none h-fit">
      <DeleteDialog />
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
          {/* <DottedSeparator className="px-7" /> */}
          <CardContent className="mt-6">
            <p className="text-lg font-bold mb-2">Session History</p>
            <ul className="flex flex-col gap-y-2">
              {timesByDate.map((taskTimesInDate) => (
                <li>
                  <p className="text-lg font-medium mb-3 px-2">
                    {dateToString(new Date(taskTimesInDate[0].dayTracked))}
                  </p>
                  <ul className="flex flex-col gap-y-2">
                    {taskTimesInDate.map((taskTime) => (
                      <Card className="shadow-none rounded-sm">
                        <CardContent className="flex items-center justify-center p-3">
                          <div className="flex flex-col">
                            <p className="text-lg font-medium truncate">
                              {new Date(taskTime.dayTracked).toLocaleString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                },
                              )}
                            </p>
                            <p className="text-muted-foreground">
                              {secondsToString(taskTime.secondsTracked)}
                            </p>
                          </div>
                          <div className="ml-auto flex gap-x-2 w-fit">
                            <Button
                              onClick={() => open(taskTime.$id)}
                              size={"icon"}
                              variant={"secondary"}
                              disabled={isPending}
                            >
                              <PencilIcon className="size-4" />
                            </Button>

                            <Button
                              onClick={() => handleDelete(taskTime.$id)}
                              size={"icon"}
                              variant={"destructive"}
                              disabled={isPending}
                            >
                              <TrashIcon className="size-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </ul>
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
