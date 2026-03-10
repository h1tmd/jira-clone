import { useQueryState, parseAsString } from "nuqs";

export const useEditTaskTimeModal = () => {
  const [taskTimeId, setTaskTimeId] = useQueryState(
    "edit-task-time",
    parseAsString,
  );

  const open = (id: string) => setTaskTimeId(id);
  const close = () => setTaskTimeId(null);

  return {
    taskTimeId,
    open,
    close,
    setTaskId: setTaskTimeId,
  };
};
