"use client";

import { TimeTrackerSwitcher } from "@/features/times/components/time-tracker-switcher";
import { TaskTimeDetails } from "@/features/times/components/task-time-details";
import { TimeBreadcrumbs } from "@/features/times/components/time-breadcrumbs";
import { useGetTaskTimes } from "@/features/times/api/use-get-task-times";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";

export const TimeTaskIdClient = () => {
  const taskId = useTaskId();
  const { data: task, isLoading: isLoadingTask } = useGetTask({ taskId });
  const { data: taskTimes, isLoading: isLoadingTimes } = useGetTaskTimes({
    taskId,
  });

  if (isLoadingTask || isLoadingTimes) {
    return <PageLoader />;
  }

  if (!task || !taskTimes) {
    return <PageError message="Task not found" />;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <TimeBreadcrumbs task={task} project={task.project} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TimeTrackerSwitcher />
        <TaskTimeDetails taskTimes={taskTimes} />
      </div>
    </div>
  );
};
