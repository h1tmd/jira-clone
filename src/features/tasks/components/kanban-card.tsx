import { MoreHorizontal } from "lucide-react";

import { MemberAvatar } from "@/features/members/components/members-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { DottedSeparator } from "@/components/dotted-separator";

import { TaskActions } from "./task-actions";
import { Task, TaskStatus } from "../types";
import { TaskDate } from "./task-date";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-card p-2.5 mb-1.5 rounded shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2 text-card-foreground">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-card-foreground hover:opacity-75 transition cursor-pointer" />
        </TaskActions>
      </div>
      <DottedSeparator />
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={task.assignee.name}
          fallbackClassName="text-[10px]"
        />
        <div className="size-1 rounded-full bg-muted-foreground" />
        <TaskDate
          value={task.dueDate}
          isDone={task.status === TaskStatus.DONE}
          className="text-xs"
        />
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          className="size-5"
          fallbackClassName="text-[10px]"
        />
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
};
