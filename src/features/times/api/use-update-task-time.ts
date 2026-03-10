import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.times)[":taskTimeId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.times)[":taskTimeId"]["$patch"]
>;

export const useUpdateTaskTime = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.times[":taskTimeId"]["$patch"]({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to update task time");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task time updated");
      queryClient.invalidateQueries({ queryKey: ["task-times", data.taskId] });
      queryClient.invalidateQueries({ queryKey: ["task-time", data.$id] });
    },
    onError: () => {
      toast.error("Failed to update task time");
    },
  });

  return mutation;
};
