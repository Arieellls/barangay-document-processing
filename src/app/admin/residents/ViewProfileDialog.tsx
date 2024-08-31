"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import ViewProfile from "./ViewProfile";
import { UserType } from "../../types/officialsType";

export default function ViewProfileDialog({
  resident,
  children,
  className
}: {
  resident: UserType;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className} onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <ViewProfile resident={resident} onClose={() => setOpen(false)} />
    </Dialog>
  );
}
