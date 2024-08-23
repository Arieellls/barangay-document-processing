"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import ViewEvent from "@/components/events/ViewEvent";

export default function SeeMore({
  event,
  children,
  className
}: {
  event: any;
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
