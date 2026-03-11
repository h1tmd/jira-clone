"use client";

import { SettingsIcon, TimerIcon, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Time Tracking",
    href: "/time-tracking",
    icon: TimerIcon,
    activeIcon: TimerIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-y-2">
      {routes.map((item) => {
        const fullHref = `/workspaces/${workspaceId}${item.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={fullHref}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition",
                isActive &&
                  "ring-sidebar-ring bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
