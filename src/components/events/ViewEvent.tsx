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
import { useState } from "react";

export default function ViewEvent({
  event,
  onClose
}: {
  event: any;
  onClose: () => void;
}) {
  const [isEdit, setIsEdit] = useState(false);

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
          Make changes to your event details here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="name" className="text-right">
            Event Title
          </Label>
          <Input
            id="name"
            defaultValue={event.title}
            className="col-span-3"
            disabled={!isEdit}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            defaultValue={event.description}
            className="col-span-3"
            rows={8}
            style={{ minHeight: "100px", resize: "vertical" }}
            disabled={!isEdit}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="startDate" className="text-right">
            Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            defaultValue={new Date(event.startDate).toISOString().split("T")[0]}
            className="col-span-3"
            disabled={!isEdit}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="endDate" className="text-right">
            End Date
          </Label>
          <Input
            id="endDate"
            type="date"
            defaultValue={new Date(event.endDate).toISOString().split("T")[0]}
            className="col-span-3"
            disabled={!isEdit}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="endDate" className="text-right">
            Author
          </Label>
          <Input
            id="author"
            type="text"
            defaultValue={"Arielito Manorina"}
            className="col-span-3"
            disabled={!isEdit}
          />
        </div>
      </div>
      <DialogFooter>
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <Button className="bg-destructive text-primary hover:text-destructive dark:text-secondary-foreground">
              Delete
            </Button>
            <Button type="button">Archive</Button>
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={handleEditClick}>
              {isEdit ? "Cancel" : "Edit Event"}
            </Button>
            <Button
              type="submit"
              onClick={handleSaveClick}
              disabled={!isEdit}
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
