import Image from "next/image";
import Link from "next/link";

import { WorkspaceSwitcher } from "./workspace-switcher";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";
import { Projects } from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-full text-sidebar-foreground p-4 w-full">
      <Link href={"/"} className="flex items-center justify-start gap-1">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={28}
          height={28}
          className="dark:filter dark:invert"
        />
        <p className="text-2xl font-black">Jura</p>
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};
