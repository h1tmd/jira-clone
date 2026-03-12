import { getCurrent } from "@/features/auth/queries";

import { redirect } from "next/navigation";
import { TimeTaskIdClient } from "./client";

const TimeTaskIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <TimeTaskIdClient />;
};

export default TimeTaskIdPage;
