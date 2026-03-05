import { ID, Query } from "node-appwrite";
import { Hono } from "hono";
import z from "zod";

import { sessionMiddleware } from "@/lib/session-middleware";
import { getMember } from "@/features/members/utils";
import { DATABASE_ID, TIMES_ID } from "@/config";
import { zValidator } from "@hono/zod-validator";

import { addTimeSchema } from "../schemas";
import { TaskTime } from "../types";

const app = new Hono()
  // Add new time
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", addTimeSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const { taskId, secondsTracked, dayTracked, workspaceId } =
        c.req.valid("json");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const time = await databases.createDocument(
        DATABASE_ID,
        TIMES_ID,
        ID.unique(),
        {
          taskId,
          workspaceId,
          dayTracked,
          secondsTracked,
        },
      );

      return c.json({ data: time });
    },
  )
  // Get all times from workspace
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string() })),
    async (c) => {
      // Get user and databases
      const user = c.get("user");
      const databases = c.get("databases");

      const { workspaceId } = c.req.valid("query");

      if (!workspaceId) {
        return c.json({ error: "Missing workspaceId" }, 400);
      }

      const times = await databases.listDocuments(DATABASE_ID, TIMES_ID, [
        Query.equal("workspaceId", workspaceId),
      ]);

      return c.json({ data: times });
    },
  )
  // Get all times in task
  .get("/:taskId", sessionMiddleware, async (c) => {
    const currentUser = c.get("user");
    const databases = c.get("databases");
    const { taskId } = c.req.param();

    const times = await databases.listDocuments<TaskTime>(
      DATABASE_ID,
      TIMES_ID,
      [Query.equal("taskId", taskId), Query.orderDesc("dayTracked")],
    );

    const currentMember = await getMember({
      databases,
      workspaceId: times.documents[0].workspaceId,
      userId: currentUser.$id,
    });

    if (!currentMember) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json({ data: times.documents });
  });

export default app;
