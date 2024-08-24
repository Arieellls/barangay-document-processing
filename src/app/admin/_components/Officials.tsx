import { Card, CardContent } from "@/components/ui/card";
import OfficialsCard from "./OfficialsCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Officials() {
  return (
    <Card className="mt-6 border-none rounded-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <div className="mb-4">
            <Input className="w-80" placeholder="Search Officials" />
          </div>
        </div>
        <div className="flex justify-start items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <OfficialsCard />
        </div>
      </CardContent>
    </Card>
  );
}
