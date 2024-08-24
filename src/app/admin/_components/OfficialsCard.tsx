import { getAllOfficials } from "@/app/actions/officials/getOfficials";
import OfficialsDialog from "@/components/barangay-officials/OfficialsDialog";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { formatFullname } from "@/lib/formatFullname";
import Image from "next/image";

export default async function OfficialsCard() {
  const _officials = await getAllOfficials();

  return (
    <div className="flex flex-wrap gap-4 text-sm sm:text-lg">
      {_officials.map((official) => (
        <OfficialsDialog
          key={official.id}
          official={official}
          className="sm:w-48 sm:h-48 w-44 h-44"
        >
          <Card className="w-full h-full text-left overflow-hidden">
            <CardHeader className="px-4">
              <div className="relative w-full auto aspect-video flex items-center">
                <Image
                  src="/Arielito Manorina.png"
                  alt="Officials Photo"
                  width={80}
                  height={80}
                  className="object-center rounded-full border-2 border-gray-600"
                />
              </div>
              <CardTitle className="p-0 m-0">
                {formatFullname({
                  firstName: official.firstName,
                  middleName: official?.middleName,
                  lastName: official.lastName
                })}
              </CardTitle>
              <CardDescription className="p-0 m-0 text-sm">
                <p>{official.position}</p>
              </CardDescription>
            </CardHeader>
          </Card>
        </OfficialsDialog>
      ))}
    </div>
  );
}
