"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { UserType } from "../../types/officialsType";
import ViewProfileApproval from "./ViewProfileApproval";

export default function ApprovalDialog({
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
      <ViewProfileApproval resident={resident} onClose={() => setOpen(false)} />
    </Dialog>
  );
}
