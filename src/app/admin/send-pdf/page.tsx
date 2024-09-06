"use client";

import { Button } from "@/components/ui/button";

export default function hahaha() {
  return (
    <Button
      onClick={async () => {
        await fetch("api/emails", { method: "POST" });
      }}
    >
      Click Me
    </Button>
  );
}
