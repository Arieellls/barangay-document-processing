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
import { OfficialType } from "@/app/admin/types/officialsType";
import { formatFullname } from "@/lib/formatFullname";
import { addNewEvent } from "@/app/actions/post/addNewEvent";
import { useToast } from "../ui/use-toast";
import { endTerm } from "@/app/actions/officials/endTerm";
import { Loader2 } from "lucide-react";
import { EndTermDialog } from "./EndTermDialog";

export default function ViewOfficials({
  official,
  onClose
}: {
  official: OfficialType;
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
              firstName: official.firstName,
              middleName: official?.middleName,
              lastName: official.lastName
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
            defaultValue={official.position}
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
            type="date"
            defaultValue={
              official?.startTerm
                ? official.startTerm.toISOString().slice(0, 10)
                : ""
            }
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
            type="date"
            defaultValue={
              official?.endTerm
                ? official.endTerm.toISOString().slice(0, 10)
                : ""
            }
            className="col-span-3"
            disabled={!isEdit}
          />
        </div>
      </div>
      <DialogFooter>
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <EndTermDialog official={official} onClose={onClose} />
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
    </DialogContent>
  );
}
