"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { cn } from "@/lib/utils";

export const Projects = () => {
  const { open } = useCreateProjectModal();
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-sidebar-foreground/70">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-sidebar-foreground/70 hover:text-sidebar-accent-foreground cursor-pointer transition"
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-full ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition cursor-pointer",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
