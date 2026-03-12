import { Models } from "node-appwrite";

export type TaskTime = Models.Document & {
  taskId: string;
  workspaceId: string;
  secondsTracked: number;
  dayTracked: string;
};
