import { z } from "zod";

export const addTimeSchema = z.object({
  secondsTracked: z.number().int().positive().min(0),
  dayTracked: z.coerce.date(),
  taskId: z.string().trim().min(1, "Required"),
  workspaceId: z.string().trim().min(1, "Required"),
});
