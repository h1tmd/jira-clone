import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetTaskTimesProps {
  taskTimeId: string;
}

export const useGetTaskTime = ({ taskTimeId }: UseGetTaskTimesProps) => {
  const query = useQuery({
    queryKey: ["task-time", taskTimeId],
    queryFn: async () => {
      const response = await client.api.times["task-time"][":taskTimeId"].$get({
        param: { taskTimeId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch task time");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
