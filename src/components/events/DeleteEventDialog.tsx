import { deleteEvent } from "@/app/actions/deleteEvent";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SQLiteAsyncDialect } from "drizzle-orm/sqlite-core";
import { ReactNode, useTransition } from "react";
import { useToast } from "../ui/use-toast";

export function DeleteEventDialog({
  event,
  onClose
}: {
  event: any;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = async () => {
    onClose();
    startTransition(async () => {
      await deleteEvent(event.id);
      toast({
        title: "Event Deleted",
        description: `The event "${event.title}" was deleted successfully.`
      });
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-destructive text-primary hover:text-destructive dark:text-secondary-foreground"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:w-[500px] w-96 rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the event
            and remove all associated data from our records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
