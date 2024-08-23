import {
  getAllEvents,
  getCompletedEvents,
  getOnGoingEvents
} from "@/app/actions/getEvents";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import SeeMore from "@/components/events/SeeMore";

type Props = {
  searchParams?: string | string[];
};

export default async function EventCard({ searchParams }: Props) {
  let _events = await getOnGoingEvents(); // Fetch on going events as default

  if (searchParams === "all") {
    _events = await getAllEvents();
  }

  if (searchParams === "ongoing") {
    _events = await getOnGoingEvents();
  }

  if (searchParams === "completed") {
    _events = await getCompletedEvents();
  }

  if (_events.length === 0) {
    return <p className="center">No Events!</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 text-sm sm:text-lg">
      {_events.map((event) => (
        <SeeMore
          key={event.id}
          event={event}
          className="sm:w-48 sm:h-48 w-44 h-44"
        >
          <Card className="w-full h-full text-left">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription className="text-sm">
                <p>Start: {new Date(event.startDate).toLocaleDateString()}</p>
                <p>End: {new Date(event.endDate).toLocaleDateString()}</p>
              </CardDescription>
            </CardHeader>
          </Card>
        </SeeMore>
      ))}
    </div>
  );
}
