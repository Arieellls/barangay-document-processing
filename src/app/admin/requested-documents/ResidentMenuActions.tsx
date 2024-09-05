"use client";

import {
  updateUserRequestStatusToDeclined,
  updateUserRequestStatusToPending,
  updateUserRequestStatusToReady,
  updateUserRequestStatusToReleased
} from "@/app/actions/documents/responseRequest";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function AcceptMenuItem({ request }: { request: any }) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const error = await updateUserRequestStatusToReleased(request);
          if (error) {
            toast({
              title: "Approval Failed",
              description: `There was an error while trying to approve the request. Please try again.`
            });
          } else {
            toast({
              title: "Request Approved",
              description: `The request has been successfully approved.`
            });
          }
        })
      }
    >
      Accept
    </DropdownMenuItem>
  );
}

export function DeclineMenuItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const error = await updateUserRequestStatusToDeclined(id);
          if (error) {
            toast({
              title: "Decline Failed",
              description: `There was an error while trying to decline the request. Please try again.`
            });
          } else {
            toast({
              title: "Request Declined",
              description: `The request has been successfully declined.`
            });
          }
        })
      }
    >
      Decline
    </DropdownMenuItem>
  );
}

export function PendingMenuItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const error = await updateUserRequestStatusToPending(id);
          if (error) {
            toast({
              title: "Pending Status Update Failed",
              description: `There was an error while trying to set the request as pending. Please try again.`
            });
          } else {
            toast({
              title: "Request Set to Pending",
              description: `The request has been successfully marked as pending.`
            });
          }
        })
      }
    >
      Pending
    </DropdownMenuItem>
  );
}

export function ReadyMenuItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const error = await updateUserRequestStatusToReady(id);
          if (error) {
            toast({
              title: "Ready Status Update Failed",
              description: `There was an error while trying to set the request as ready. Please try again.`
            });
          } else {
            toast({
              title: "Request Ready",
              description: `The request has been successfully marked as ready.`
            });
          }
        })
      }
    >
      Ready
    </DropdownMenuItem>
  );
}
