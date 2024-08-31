"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import ViewEvent from "@/components/events/ViewEvent";
import ViewOfficials from "./ViewOfficials";
import { OfficialType, UserType } from "@/app/types/officialsType";

export default function OfficialsDialog({
  officialData,
  children,
  className
}: {
  officialData: OfficialType;
  children: ReactNode;
  className: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className} onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <ViewOfficials
        officialData={officialData}
        onClose={() => setOpen(false)}
      />
    </Dialog>
  );
}
