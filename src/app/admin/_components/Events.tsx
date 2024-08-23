import { Card, CardContent } from "@/components/ui/card";
import EventCard from "./EventCard";
import EventStatus from "@/components/events/EventStatus";

type Props = {
  searchParams?: string | string[];
};

export default function Events({ searchParams }: Props) {
  return (
    <Card className="mt-6 border-none rounded-lg">
      <CardContent className="p-6">
        <div className="mb-4">
          <EventStatus />
        </div>
        <div className="flex justify-start items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <EventCard searchParams={searchParams} />
        </div>
      </CardContent>
    </Card>
  );
}
