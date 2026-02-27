"use client";

import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";

export const TimeTrackingClient = () => {
  // if (isLoading) {
  //   return <PageLoader />;
  // }

  // if (!data) {
  //   return <PageError message="Task not found" />;
  // }

  return (
    <div className="flex items-center h-full">
      Select a task first to track.
      <br />
      {/* 
        Dropdown? 
      */}
      Task Selector here
    </div>
  );
};
