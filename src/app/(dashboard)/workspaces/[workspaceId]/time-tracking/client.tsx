"use client";

import { TrackTaskSelector } from "@/features/times/components/track-task-selector";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCurrent } from "@/features/auth/api/use-current";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";

export const TimeTrackingClient = () => {
  const workspaceId = useWorkspaceId();
  const { data: current, isLoading: isLoadingCurrent } = useCurrent();
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
  });

  if (isLoadingCurrent || isLoadingMembers || isLoadingTasks) {
    return <PageLoader />;
  }

  if (!current || !members || !tasks) {
    return <PageError message="Error loading data" />;
  }

  return (
    <div className="flex flex-col items-start h-full gap-y-4">
      <p className="text-2xl font-bold">Select a task first to track:</p>
      <TrackTaskSelector tasks={tasks.documents} />
    </div>
  );
};
