"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import FormEvent from "./FormEvent";

export default function AddNewEventDialog({
  event,
  children,
  className
}: {
  event?: any;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className={className} onClick={() => setOpen(true)}>
          {children}
        </span>
      </DialogTrigger>
      <FormEvent event={event} onClose={() => setOpen(false)} />
    </Dialog>
  );
}
