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
import { formatFullname } from "@/lib/formatFullname";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { SexOptions } from "./SexOptions";
import { StatusOptions } from "./StatusOptions";
import { formatDate } from "@/lib/formatDate";
import { UserType } from "../../types/officialsType";

export default function ViewProfile({
  resident,
  onClose
}: {
  resident: UserType;
  onClose: () => void;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleEditClick = () => {
    setIsEdit((prevEdit) => !prevEdit);
  };

  const handleSaveClick = () => {
    setIsEdit(false);
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

      {/* Primary Input */}
      <div className="flex flex-col h-auto gap-4 mb-3 sm:flex-row">
        <div className="flex flex-col items-center justify-center h-full gap-3 sm:items-start">
          <Image
            src={"/Arielito Manorina.png"}
            width={200}
            height={200}
            alt="Arielito"
            className="border-2 rounded-sm border-muted-foreground "
          />
          {/* <Input id="profile-image" type="file" disabled={!isEdit} /> */}
        </div>

        {/* <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 auto-rows-min gap-y-2">
          <div className="box-border flex flex-col items-start gap-2">
            <Label
              htmlFor="username"
              className="font-light text-right text-muted-foreground"
            >
              Username
            </Label>
            <Input
              id="username"
              defaultValue={""}
              className="w-full m-0"
              disabled={!isEdit}
            />
          </div>
          <div className="flex flex-col items-start gap-2 sm:col-start-1 sm:col-end-2">
            <Label
              htmlFor="password"
              className="font-light text-right text-muted-foreground"
            >
              Password
            </Label>
            <Input
              id="password"
              defaultValue={""}
              className="w-full"
              disabled={!isEdit}
            />
          </div>
          <div className="flex flex-col items-start gap-2 sm:col-span-2 sm:col-start-2 sm:col-end-3">
            <Label
              htmlFor="confirm-password"
              className="font-light text-right text-muted-foreground"
            >
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              defaultValue={""}
              className="w-full"
              disabled={!isEdit}
            />
          </div>
        </div> */}
      </div>

      {/* Secondary Input */}
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
            defaultValue={resident.firstName}
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
            defaultValue={resident.lastName}
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
            defaultValue={resident?.middleName || ""}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="box-border flex flex-col items-start gap-2">
          <Label
            htmlFor="sex"
            className="font-light text-right text-muted-foreground"
          >
            Sex
          </Label>
          <div className="w-full">
            {/* <SexOptions /> */}
            <Input
              id="age"
              defaultValue={resident.gender}
              className="w-full"
              disabled={!isEdit}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label
            htmlFor="age"
            className="font-light text-right text-muted-foreground"
          >
            Age
          </Label>
          <Input
            id="age"
            defaultValue={resident.age}
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
            defaultValue={resident.status}
            className="w-full m-0"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 sm:col-start-1 sm:col-end-3">
          <Label
            htmlFor="completeAddress"
            className="font-light text-right text-muted-foreground"
          >
            Complete Address
          </Label>
          <Input
            id="completeAddress"
            defaultValue={resident.completeAddress}
            className="w-full m-0"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label
            htmlFor="contactNumber"
            className="font-light text-right text-muted-foreground"
          >
            Contact No.
          </Label>
          <Input
            id="contactNumber"
            defaultValue={resident.contactNumber}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <Label
            htmlFor="birthday"
            className="font-light text-right text-muted-foreground"
          >
            Birthday
          </Label>
          <Input
            id="birthday"
            type="text"
            defaultValue={formatDate(new Date(resident.birthday))}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 sm:col-start-2 sm:col-end-4 ">
          <Label
            htmlFor="placeOfBirth"
            className="font-light text-right text-muted-foreground"
          >
            Place of Birth
          </Label>
          <Input
            id="placeOfBirth"
            defaultValue={resident.placeOfBirth}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <Label
            htmlFor="birthday"
            className="font-light text-right text-muted-foreground"
          >
            Purok
          </Label>
          <Input
            id="birthday"
            type="text"
            defaultValue={resident.purok}
            className="w-full"
            disabled={!isEdit}
          />
        </div>
      </div>

      <DialogFooter>
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <Button>Future</Button>
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={onClose} disabled={isPending}>
              Close
            </Button>
            <Button
              type="submit"
              onClick={handleSaveClick}
              disabled={isPending}
              className={isEdit ? "block" : "hidden"}
            >
              {isEdit ? "Save changes" : "Close"}
            </Button>
          </div>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
