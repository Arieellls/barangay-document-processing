import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import RequestDocuments from "./RequestDocuments";
import { getAccount } from "@/app/actions/getAccount";
import { string } from "zod";
import getSession from "@/lib/getSession";

export default async function Request() {
  const session = await getSession();
  const user = await getAccount(session?.user.id);
  return (
    <Card className="mt-6 border-none rounded-lg">
      <CardContent className="p-6">
        <div className="flex justify-start items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <RequestDocuments user={user} />
        </div>
      </CardContent>
    </Card>
  );
}
