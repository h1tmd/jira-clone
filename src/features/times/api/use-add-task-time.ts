import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.times)["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.times)["$post"]>;

export const useAddTaskTime = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.times["$post"]({ json });

      if (!response.ok) {
        throw new Error("Failed to add time");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task time added");

      queryClient.invalidateQueries({ queryKey: ["task-times", data.$id] });
    },
    onError: () => {
      toast.error("Failed to add time");
    },
  });

  return mutation;
};
