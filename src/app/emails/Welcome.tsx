import { Button, Html } from "@react-email/components";
import * as React from "react";

export default function Email() {
  return (
    <Html>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
        onClick={async () => {
          await fetch("/api/emails", {
            method: "POST",
            body: JSON.stringify({
              fullName: "Arelito",
              purpose: "Arelito",
              service: "Barangay Indigency",
              start: "Arelito",
              end: "Arelito"
            })
          });
        }}
      >
        Click me
      </Button>
    </Html>
  );
}
