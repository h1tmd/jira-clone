"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { useTimerExpiredModal } from "../hooks/use-timer-expired-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";

export const TimerExpiredModal = () => {
  const { isOpen, setIsOpen, close } = useTimerExpiredModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader>
          <CardTitle>Times Up!</CardTitle>
        </CardHeader>
        <CardContent>
          Timer has finished.
          <DottedSeparator className="py-7" />
          <div className="flex items-center justify-end">
            <Button type="button" size={"lg"} onClick={close}>
              Okay
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );
};
