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
  let _events = await getOnGoingEvents();

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
    <div className="flex flex-wrap justify-around gap-4 text-sm sm:text-lg sm:justify-start">
      {_events.map((event) => (
        <SeeMore
          key={event.id}
          event={event}
          className="w-36 h-36 sm:w-48 sm:h-48"
        >
          <Card className="w-full h-full text-left">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription className="text-[11px] sm:text-sm">
                <span className="leading-none">
                  Start: {new Date(event.startDate).toLocaleDateString()}
                  <br />
                  End: {new Date(event.endDate).toLocaleDateString()}
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
        </SeeMore>
      ))}
    </div>
  );
}
