import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useGetTaskTime } from "../api/use-get-task-time";
import { EditTaskTimeForm } from "./edit-task-time-form";

interface EditTaskTimeFormWrapperProps {
  onCancel: () => void;
  id: string;
}

export const EditTaskTimeFormWrapper = ({
  onCancel,
  id,
}: EditTaskTimeFormWrapperProps) => {
  const { data: initialValues, isLoading } = useGetTaskTime({
    taskTimeId: id,
  });

  if (isLoading) {
    return (
      <Card className="w-full h-[420px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) {
    return null;
  }

  return <EditTaskTimeForm onCancel={onCancel} initialValues={initialValues} />;
};
