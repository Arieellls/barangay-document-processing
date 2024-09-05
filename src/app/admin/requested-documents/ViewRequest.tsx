import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { DocumentType } from "@/app/types/documentRequestType";
import { formatDate } from "@/lib/formatDate";
import { Textarea } from "@/components/ui/textarea";
import {
  updateUserRequestStatusToDeclined,
  updateUserRequestStatusToPending,
  updateUserRequestStatusToReady,
  updateUserRequestStatusToReleased
} from "@/app/actions/documents/responseRequest";
import { toast } from "@/components/ui/use-toast";
import { title } from "process";
import { Loader2 } from "lucide-react";

export default function ViewRequest({
  request,
  onClose
}: {
  request: any;
  onClose: () => void;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAccept = () => {
    try {
      startTransition(async () => {
        const errors = await updateUserRequestStatusToReleased(request);
        if (errors) {
          console.log(errors);
        } else {
          toast({
            title: "Request Approved",
            description: `The request for "${request.serviceType}" was approved successfully.`
          });
          onClose();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReady = () => {
    try {
      startTransition(async () => {
        const errors = await updateUserRequestStatusToReady(request.id);
        if (errors) {
          console.log(errors);
        } else {
          toast({
            title: "Request Reeady",
            description: `The request for "${request.serviceType}" was successfully set to "Ready".`
          });
          onClose();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePending = () => {
    try {
      startTransition(async () => {
        const errors = await updateUserRequestStatusToPending(request.id);
        if (errors) {
          console.log(errors);
        } else {
          toast({
            title: "Request Pending",
            description: `The request for "${request.serviceType}" was successfully set to "Pending".`
          });
          onClose();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!request) {
    return null;
  }

  const handleDecline = () => {
    try {
      startTransition(async () => {
        const errors = await updateUserRequestStatusToDeclined(request.id);
        if (errors) {
          console.log(errors);
        } else {
          toast({
            title: "Request Declined",
            description: `The request for "${request.serviceType}" was successfully set to "Declined".`
          });
          onClose();
        }
      });
    } catch (error) {}
  };

  return (
    <DialogContent className="max-w-sm my-5 sm:m-0 sm:max-w-[900px] rounded-lg sm:overflow-hidden overflow-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle>Event Information</DialogTitle>
        <DialogDescription>
          Make changes to your residents' details here. Click save when you are
          done.
        </DialogDescription>
      </DialogHeader>

      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 auto-rows-min gap-y-6">
        <div className="box-border flex flex-col items-start gap-2">
          <Label
            htmlFor="username"
            className="font-light text-right text-muted-foreground"
          >
            First Name
          </Label>
          <Input
            id="firstName"
            defaultValue={request.firstName}
            className="w-full m-0"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label
            htmlFor="password"
            className="font-light text-right text-muted-foreground"
          >
            Last Name
          </Label>
          <Input
            id="lastName"
            defaultValue={request.lastName}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <Label
            htmlFor="confirm-password"
            className="font-light text-right text-muted-foreground"
          >
            Middle Name
          </Label>
          <Input
            id="middleName"
            defaultValue={request?.middleName || ""}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <Label
            htmlFor="purpose"
            className="font-light text-right text-muted-foreground"
          >
            Purpose
          </Label>
          <Input
            id="purpose"
            defaultValue={request?.purpose || ""}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <Label
            htmlFor="pickup-date"
            className="font-light text-right text-muted-foreground"
          >
            Pick-up Date
          </Label>
          <Input
            id="pickup-date"
            defaultValue={formatDate(request?.pickupDate)}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <Label
            htmlFor="service-type"
            className="font-light text-right text-muted-foreground"
          >
            Service Type
          </Label>
          <Input
            id="service-type"
            defaultValue={request?.serviceType}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <Label
            htmlFor="status"
            className="font-light text-right text-muted-foreground"
          >
            Status
          </Label>
          <Input
            id="status"
            defaultValue={request?.status || ""}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <Label
            htmlFor="additional-details"
            className="font-light text-right text-muted-foreground"
          >
            Additional Details
          </Label>
          <Textarea
            id="additional-details"
            defaultValue={request?.serviceType}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
      </div>

      <DialogFooter>
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <Button
              variant="destructive"
              type="button"
              disabled={isPending}
              onClick={handleDecline}
            >
              Decline
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              disabled={isPending || request.status === "Pending"}
              onClick={handlePending}
            >
              Pending
            </Button>
            <Button
              type="button"
              disabled={isPending || request.status === "Ready"}
              onClick={handleReady}
            >
              Ready
            </Button>
            <Button type="button" onClick={handleAccept} disabled={isPending}>
              Accept
            </Button>
          </div>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
