import { redirect } from "next/navigation";

import { UserButton } from "@/features/auth/components/user-button";
import { getCurrent } from "@/features/auth/actions";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div className="p-4 h-full bg-neutral-200">
      <CreateWorkspaceForm />
    </div>
  );
}
