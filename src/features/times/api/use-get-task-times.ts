import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetTaskTimesProps {
  taskId: string;
}

export const useGetTaskTimes = ({ taskId }: UseGetTaskTimesProps) => {
  const query = useQuery({
    queryKey: ["task-times", taskId],
    queryFn: async () => {
      const response = await client.api.times[":taskId"].$get({
        param: { taskId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch task times");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
