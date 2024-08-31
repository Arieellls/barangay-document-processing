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
import { Textarea } from "../ui/textarea";
import { useState, useTransition } from "react";
import { OfficialType, UserType } from "@/app/types/officialsType";
import { formatFullname } from "@/lib/formatFullname";
import { addNewEvent } from "@/app/actions/post/addNewEvent";
import { useToast } from "../ui/use-toast";
import { endTerm } from "@/app/actions/officials/endTerm";
import { Loader2 } from "lucide-react";
import { EndTermDialog } from "./EndTermDialog";
import { formatDate } from "@/lib/formatDate";
import { useSession } from "next-auth/react";

export default function ViewOfficials({
  officialData,
  onClose
}: {
  officialData: OfficialType;

  onClose: () => void;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === " admin";

  const handleEditClick = () => {
    setIsEdit((prevEdit) => !prevEdit);
  };

  const handleSaveClick = () => {
    setIsEdit(false);
  };

  return (
    <DialogContent className="max-w-sm sm:max-w-[600px] rounded-lg">
      <DialogHeader>
        <DialogTitle>Event Information</DialogTitle>
        <DialogDescription>
          Make changes to your officials' details here. Click save when you are
          done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="name" className="text-right">
            Official Name
          </Label>
          <Input
            id="name"
            defaultValue={formatFullname({
              firstName: officialData.firstName,
              middleName: officialData?.middleName,
              lastName: officialData.lastName
            })}
            className="col-span-3"
            disabled={!isEdit}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="description" className="text-right">
            Position
          </Label>
          <Input
            id="position"
            defaultValue={officialData.position}
            className="col-span-3"
            disabled={!isEdit}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="startDate" className="text-right">
            Start Term
          </Label>
          <Input
            id="startDate"
            type="text"
            defaultValue={formatDate(new Date(officialData.startTerm))}
            className="col-span-3"
            disabled={!isEdit}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="endDate" className="text-right">
            End Term
          </Label>
          <Input
            id="endDate"
            type="text"
            defaultValue={formatDate(new Date(officialData.endTerm))}
            className="col-span-3"
            disabled={!isEdit}
          />
        </div>
      </div>
      {isAdmin && (
        <DialogFooter>
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <EndTermDialog official={officialData} onClose={onClose} />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleEditClick}
                disabled={isPending}
              >
                {isEdit ? "Cancel" : "Edit"}
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
      )}
    </DialogContent>
  );
}
