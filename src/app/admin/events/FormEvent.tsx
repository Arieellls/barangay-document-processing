import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
import { addNewEvent } from "@/app/actions/post/addNewEvent";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    author: z.string(),
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(255),
    startDate: z.date(),
    endDate: z.date()
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be the same day or after the start date",
    path: ["endDate"]
  });

export default function FormEvent({
  event,
  onClose
}: {
  event?: any;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      // startDate: new Date(),
      // endDate: new Date(),
      author: "Arielito Manorina (Placeholder Name)"
    }
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        let errors = await addNewEvent(data);

        if (errors) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An error occurred while creating the event."
          });
          console.log(errors);
        } else {
          toast({
            title: "Event Created",
            description: `The event "${data.title}" was created successfully.`
          });
          form.reset();
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <DialogContent className="max-w-sm sm:max-w-[600px] rounded-lg">
      <DialogHeader>
        <DialogTitle>Add Event</DialogTitle>
        <DialogDescription>
          Add a new event to implement in your barangay
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-8 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input id="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      {...field}
                      rows={8}
                      style={{ minHeight: "100px", resize: "vertical" }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      id="startDate"
                      type="date"
                      {...field}
                      value={
                        field.value
                          ? field.value.toISOString().substring(0, 10)
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      id="endDate"
                      type="date"
                      {...field}
                      value={
                        field.value
                          ? field.value.toISOString().substring(0, 10)
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      id="author"
                      type="text"
                      {...field}
                      disabled
                      value={"Arielito Manorina (Placeholder Name)"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <div className="flex justify-end w-full">
              <div className="flex gap-2">
                <Button type="button" onClick={onClose} disabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    " Save Event"
                  )}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
