"use client";

import { TaskTimeDetails } from "@/features/times/components/task-time-details";
import { TaskDescription } from "@/features/tasks/components/task-description";
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrubs";
import { useGetTaskTimes } from "@/features/times/api/use-get-task-times";
import { TaskOverview } from "@/features/tasks/components/task-overview";
import { DottedSeparator } from "@/components/dotted-separator";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";

export const TaskIdClient = () => {
  const taskId = useTaskId();
  const { data: task, isLoading: isLoadingTask } = useGetTask({ taskId });
  const { data: taskTimes, isLoading: isLoadingTimes } = useGetTaskTimes({
    taskId,
  });

  const isLoading = isLoadingTask || isLoadingTimes;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!task || !taskTimes) {
    return <PageError message="Task not found" />;
  }
  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={task.project} task={task} />
      <DottedSeparator className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={task} />
        <TaskDescription task={task} />
        <TaskTimeDetails taskTimes={taskTimes} showTrackButton />
      </div>
    </div>
  );
};
