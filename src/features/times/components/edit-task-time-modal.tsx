"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { useEditTaskTimeModal } from "../hooks/use-edit-task-time-modal";
import { EditTaskTimeFormWrapper } from "./edit-task-time-form-wrapper";

export const EditTaskTimeModal = () => {
  const { taskTimeId, close } = useEditTaskTimeModal();

  return (
    <ResponsiveModal open={!!taskTimeId} onOpenChange={close}>
      {taskTimeId && (
        <EditTaskTimeFormWrapper id={taskTimeId} onCancel={close} />
      )}
    </ResponsiveModal>
  );
};
