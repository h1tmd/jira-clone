import { ChevronRightIcon, ShuffleIcon } from "lucide-react";
import Link from "next/link";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";
import { Button } from "@/components/ui/button";
import { Task } from "@/features/tasks/types";

interface TaskBreadcrumbsProps {
  project: Project;
  task: Task;
}

export const TimeBreadcrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex items-center gap-x-2">
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground flex-grow hover:opacity-75 transition">
          {project.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
      <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition text-ellipsis line-clamp-2 md:line-clamp-1 max-w-32 lg:max-w-lg">
          {task.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
      <p className="text-sm lg:text-lg font-semibold">Time Tracking</p>
      <Button onClick={() => {}} className="ml-auto" size={"sm"}>
        <ShuffleIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Change Task</span>
      </Button>
    </div>
  );
};
