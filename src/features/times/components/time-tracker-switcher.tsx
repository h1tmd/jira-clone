"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DottedSeparator } from "@/components/dotted-separator";
import { Timer } from "./timer";
import { useQueryState } from "nuqs";

export const TimeTrackerSwitcher = () => {
  const [trackMethod, setTrackMethod] = useQueryState("track-method", {
    defaultValue: "timer",
  });

  return (
    <Tabs
      defaultValue={trackMethod}
      onValueChange={setTrackMethod}
      className="flex-1 border rounded-lg min-w-64"
    >
      <div className="h-full flex flex-col overflow-auto p-7">
        <h1 className="text-xl font-bold">Time Tracker</h1>
        <DottedSeparator className="my-4" />
        <TabsList className="w-full lg:w-auto flex justify-center">
          <TabsTrigger className="h-8 w-full lg:w-auto" value="timer">
            Timer
          </TabsTrigger>
          <TabsTrigger className="h-8 w-full lg:w-auto" value="stopwatch">
            Stopwatch
          </TabsTrigger>
          <TabsTrigger className="h-8 w-full lg:w-auto" value="manual">
            Manual
          </TabsTrigger>
        </TabsList>
        <TabsContent value="timer">
          <Timer defaultTimer={new Date()} />
        </TabsContent>
        <TabsContent value="stopwatch">Stopwatch</TabsContent>
        <TabsContent value="manual">Manual Time Entry</TabsContent>
      </div>
    </Tabs>
  );
};
