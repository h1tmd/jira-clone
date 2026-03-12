import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.times)["task-time"][":taskTimeId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.times)["task-time"][":taskTimeId"]["$delete"]
>;

export const useDeleteTaskTime = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.times["task-time"][":taskTimeId"][
        "$delete"
      ]({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to delete task time");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task time deleted");

      queryClient.invalidateQueries({ queryKey: ["task-times", data.taskId] });
      queryClient.invalidateQueries({ queryKey: ["task-time", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete task time");
    },
  });

  return mutation;
};
