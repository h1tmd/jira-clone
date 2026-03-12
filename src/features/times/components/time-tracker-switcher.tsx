"use client";

import { parseAsString, useQueryState } from "nuqs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DottedSeparator } from "@/components/dotted-separator";

import { ManualTime } from "./manual-time";
import { Stopwatch } from "./stopwatch";
import { Timer } from "./timer";

export const TimeTrackerSwitcher = () => {
  const [trackMethod, setTrackMethod] = useQueryState(
    "track-method",
    parseAsString
      .withOptions({ clearOnDefault: true })
      .withDefault("stopwatch"),
  );

  return (
    <Tabs
      defaultValue={trackMethod}
      onValueChange={setTrackMethod}
      className="flex-1 w-full border rounded-xl h-fit bg-card text-card-foreground"
    >
      <div className="h-full flex flex-col overflow-auto p-6">
        <div className="text-xl font-bold tracking-tight">Time Tracker</div>
        <DottedSeparator className="py-6 px-1" />
        <TabsList className="w-full lg:w-fit flex justify-center place-self-center">
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
        <TabsContent value="stopwatch">
          <Stopwatch />
        </TabsContent>
        <TabsContent value="manual">
          <ManualTime />
        </TabsContent>
      </div>
    </Tabs>
  );
};
