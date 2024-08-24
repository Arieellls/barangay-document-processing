import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResidentsList } from "./ResidentsList";

export default function Residents() {
  return (
    <Card className="mt-6 border-none rounded-lg">
      <CardContent className="p-6">
        <div className="mb-4">
          <Input className="w-80" placeholder="Search Residence" />
        </div>
        <div className="flex justify-start items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <ResidentsList />
        </div>
      </CardContent>
    </Card>
  );
}
