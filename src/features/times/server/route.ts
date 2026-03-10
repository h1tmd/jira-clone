import { ID, Query } from "node-appwrite";
import { Hono } from "hono";
import z from "zod";

import { sessionMiddleware } from "@/lib/session-middleware";
import { getMember } from "@/features/members/utils";
import { DATABASE_ID, TASKS_ID, TIMES_ID } from "@/config";
import { zValidator } from "@hono/zod-validator";

import { addTimeSchema } from "../schemas";
import { TaskTime } from "../types";
import { Task } from "@/features/tasks/types";

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

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
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

    const task = await databases.getDocument<Task>(
      DATABASE_ID,
      TASKS_ID,
      taskId,
    );

    const currentMember = await getMember({
      databases,
      workspaceId: task.workspaceId,
      userId: currentUser.$id,
    });

    if (!currentMember) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const times = await databases.listDocuments<TaskTime>(
      DATABASE_ID,
      TIMES_ID,
      [Query.equal("taskId", taskId), Query.orderDesc("dayTracked")],
    );

    return c.json({ data: times.documents });
  })
  .get("/task-time/:taskTimeId", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");
    const { taskTimeId } = c.req.param();

    const taskTime = await databases.getDocument<TaskTime>(
      DATABASE_ID,
      TIMES_ID,
      taskTimeId,
    );

    const member = await getMember({
      databases,
      workspaceId: taskTime.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json({ data: taskTime });
  })
  .patch(
    "/:taskTimeId",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        secondsTracked: z.number().int().positive().min(0),
        dayTracked: z.coerce.date(),
      }),
    ),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const { secondsTracked, dayTracked } = c.req.valid("json");
      const { taskTimeId } = c.req.param();

      const taskTimeToUpdate = await databases.getDocument<TaskTime>(
        DATABASE_ID,
        TIMES_ID,
        taskTimeId,
      );

      const member = await getMember({
        databases,
        workspaceId: taskTimeToUpdate.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const taskTime = await databases.updateDocument(
        DATABASE_ID,
        TIMES_ID,
        taskTimeId,
        {
          secondsTracked,
          dayTracked,
        },
      );

      return c.json({ data: taskTime });
    },
  );

export default app;
