import { Card, CardContent } from "@/components/ui/card";
import EventCard from "./EventCard";
import EventStatus from "@/components/events/EventStatus";
import OfficialsCard from "./OfficialsCard";
import { Input } from "@/components/ui/input";

export default function Officials() {
  return (
    <Card className="mt-6 border-none rounded-lg">
      <CardContent className="p-6">
        <div className="mb-4">
          <Input className="w-80" placeholder="Search Officials" />
        </div>
        <div className="flex justify-start items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <OfficialsCard />
        </div>
      </CardContent>
    </Card>
  );
}
