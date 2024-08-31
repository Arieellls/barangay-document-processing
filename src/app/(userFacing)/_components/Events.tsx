import { Card, CardContent } from "@/components/ui/card";
import EventCard from "./EventCard";
import EventStatus from "@/components/events/EventStatus";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddNewEventDialog from "../events/AddNewEventDialog";
import { useSession } from "next-auth/react";
import getSession from "@/lib/getSession";

type Props = {
  searchParams?: string | string[];
};

export default async function Events({ searchParams }: Props) {
  const session = await getSession();
  const isAdmin = session?.user.role === "admin";

  return (
    <Card className="mt-6 border-none rounded-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <div className="flex gap-3">
            <EventStatus />
            <Input className="md:w-80 sm:w-48" placeholder="Search Events" />
          </div>
          {isAdmin && (
            <AddNewEventDialog>
              <Button className="w-full">Add New Event</Button>
            </AddNewEventDialog>
          )}
        </div>
        <div className="flex justify-start items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <EventCard searchParams={searchParams} />
        </div>
      </CardContent>
    </Card>
  );
}
