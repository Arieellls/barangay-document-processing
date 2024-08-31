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
import { OfficialType } from "@/app/types/officialsType";
import { formatFullname } from "@/lib/formatFullname";
import { endTerm } from "@/app/actions/officials/endTerm";

export function EndTermDialog({
  official,
  onClose
}: {
  official: OfficialType;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const endTermHandler = () => {
    onClose();
    startTransition(async () => {
      try {
        let errors = await endTerm(official.id);

        if (errors) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An error occurred while ending the term."
          });
          console.log(errors);
        } else {
          toast({
            title: "Term Ended",
            description: `${formatFullname({
              firstName: official.firstName,
              middleName: official?.middleName,
              lastName: official.lastName
            })} term was ended successfully.`
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-destructive text-primary hover:text-destructive dark:text-secondary-foreground"
        >
          End Term
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:w-[500px] w-96 rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Termination of Official</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to end the term of this official? This action
            will finalize the termination.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={endTermHandler}
            disabled={isPending}
            className="bg-destructive text-primary hover:text-destructive-foreground dark:text-secondary-foreground"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
