"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import ViewEvent from "@/components/events/ViewEvent";

export type EventType = {
  author: string;
  title: string;
  id: string;
  startDate: Date;
  endDate: Date;
  description: string;
  isOngoing: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
};

export default function SeeMore({
  event,
  children,
  className
}: {
  event: EventType;
  children: ReactNode;
  className: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className} onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <ViewEvent event={event} onClose={() => setOpen(false)} />
    </Dialog>
  );
}
