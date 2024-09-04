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

const purposes = [
  {
    value: "Job Hunting",
    label: "Job Hunting"
  },
  {
    value: "Educational Assistance",
    label: "Educational Assistance"
  },
  {
    value: "Financial Assistance",
    label: "Financial Assistance"
  },
  {
    value: "Other",
    label: "Other"
  }
];
export function PurposeOptions({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full font-light"
        >
          {value
            ? purposes.find((purpose) => purpose.value === value)?.label
            : "Select Purpose"}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] left-0 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {purposes.map((purpose) => (
                <CommandItem
                  key={purpose.value}
                  value={purpose.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === purpose.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {purpose.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
