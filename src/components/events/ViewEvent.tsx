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
import { DeleteEventDialog } from "./DeleteEventDialog";
import { EventType } from "./SeeMore";
import { endEvent, updateEvent } from "@/app/actions/updateEvent";
import { useTransition } from "react";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { Form } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const updateSchema = z
  .object({
    id: z.string(),
    author: z.string(),
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(255),
    startDate: z.date(),
    endDate: z.date()
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after the start date",
    path: ["endDate"]
  });

export default function ViewEvent({
  event,
  onClose
}: {
  event: EventType;
  onClose: () => void;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      id: event.id,
      author: event.author || "Arielito Manorina",
      title: event.title,
      description: event.description,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate)
    }
  });

  const handleEditClick = () => {
    setIsEdit((prevEdit) => !prevEdit);
  };

  const handleSaveClick = (data: z.infer<typeof updateSchema>) => {
    console.log(data);
    startTransition(async () => {
      try {
        await updateEvent(event.id, data);
        toast({
          title: "Event Updated",
          description: `The event "${data.title}" was updated successfully.`
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while updating the event.",
          variant: "destructive"
        });
      }
    });
    setIsEdit(false);
    onClose();
  };

  const handleEndEvent = async () => {
    onClose();
    startTransition(async () => {
      await endEvent(event.id);
      toast({
        title: "Event Ended",
        description: `The event "${event.title}" was ended successfully.`
      });
    });
  };

  return (
    <DialogContent className="max-w-sm sm:max-w-[600px] rounded-lg">
      <DialogHeader>
        <DialogTitle>Event Information</DialogTitle>
        <DialogDescription>
          Make changes to your event details here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(handleSaveClick)}
        className="grid gap-4 py-4"
      >
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="name" className="text-right">
            Event Title
          </Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                className="col-span-3"
                disabled={!isEdit}
              />
            )}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="description"
                className="col-span-3"
                rows={8}
                style={{ minHeight: "100px", resize: "vertical" }}
                disabled={!isEdit}
              />
            )}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="startDate" className="text-right">
            Start Date
          </Label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="startDate"
                type="date"
                className="col-span-3"
                disabled={!isEdit}
                value={
                  field.value
                    ? new Date(field.value).toISOString().split("T")[0]
                    : ""
                }
              />
            )}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="endDate" className="text-right">
            End Date
          </Label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="endDate"
                type="date"
                className="col-span-3"
                disabled={!isEdit}
                value={
                  field.value
                    ? new Date(field.value).toISOString().split("T")[0]
                    : ""
                }
              />
            )}
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="author" className="text-right">
            Author
          </Label>
          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="author"
                type="text"
                className="col-span-3"
                disabled={!isEdit}
              />
            )}
          />
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <DeleteEventDialog event={event} onClose={onClose} />
              <Button type="button" onClick={handleEndEvent}>
                End Event
              </Button>
            </div>
            <div className="flex gap-2">
              <Button type="button" onClick={handleEditClick}>
                {isEdit ? "Cancel" : "Edit Event"}
              </Button>
              <Button
                type="submit"
                disabled={!isEdit}
                className={isEdit ? "block" : "hidden"}
              >
                {isEdit ? "Save changes" : "Close"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
