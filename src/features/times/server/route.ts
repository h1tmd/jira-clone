import { DATABASE_ID, TIMES_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import z from "zod";
import { createTimeSchema } from "../schemas";
import { getMember } from "@/features/members/utils";

const app = new Hono()
  // Add new time
  .post(
    "/",
    sessionMiddleware,
    zValidator("form", createTimeSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const { taskId, secondsTracked, dayTracked, workspaceId } =
        c.req.valid("form");

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
  );

export default app;
