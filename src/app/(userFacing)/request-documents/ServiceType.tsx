"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const statuses = [
  {
    value: "all",
    label: "All Events"
  },
  {
    value: "ongoing",
    label: "On Going"
  },
  {
    value: "completed",
    label: "Completed"
  }
];

export default function ServiceType() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("all");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);

    router.push("/events?status=");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {statuses.find((state) => state.value === value)?.label || "Status"}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((state) => (
                <CommandItem
                  key={state.value}
                  value={state.value}
                  onSelect={() => handleSelect(state.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === state.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {state.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
