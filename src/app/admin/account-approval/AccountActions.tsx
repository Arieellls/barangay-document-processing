"use client";

import {
  acceptAccount,
  deleteAccount
} from "@/app/actions/approval/approval-actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ApproveAccountItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await acceptAccount(id);
          router.refresh();
        })
      }
    >
      Accept
    </DropdownMenuItem>
  );
}

export function DeclineAccountItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      className="text-red-500"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteAccount(id);
          router.refresh();
        })
      }
    >
      Decline
    </DropdownMenuItem>
  );
}
