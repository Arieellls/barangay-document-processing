"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import { UserType } from "../../types/officialsType";
import ViewProfile from "../residents/ViewProfile";
import { getAccount } from "@/app/actions/getAccount";
import { DocumentType } from "@/app/types/documentRequestType";
import ViewRequest from "./ViewRequest";

export default function ViewRequestDialog({
  request,
  children,
  className
}: {
  request: DocumentType;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className} onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <ViewRequest request={request} onClose={() => setOpen(false)} />
    </Dialog>
  );
}
