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
import { OfficialType } from "../../types/officialsType";
import ImageCover from "@/components/Image";

export default async function OfficialsCard() {
  const _officials = await getAllOfficials();

  return (
    <div className="flex flex-wrap gap-4 text-sm sm:text-lg">
      {_officials.map((official) => {
        if (!official.users) {
          return null;
        }

        const officialData: OfficialType = {
          ...official.users,
          ...official.officials
        };

        return (
          <OfficialsDialog
            key={official.users.id}
            officialData={officialData}
            className="sm:w-48 w-44"
          >
            <Card className="w-full h-full overflow-hidden text-left">
              <CardHeader className="px-4">
                <div className="relative flex items-center w-full auto aspect-video">
                  {/* <Image
                    src="/Arielito Manorina.png"
                    alt="Officials Phoksto"
                    width={80}
                    height={80}
                    className="object-center border-2 border-gray-600 rounded-full"
                  /> */}
                  {!official.users.imageId ? (
                    <Image
                      src={"/Profile Default.png"}
                      width={200}
                      height={200}
                      alt="Profile Picture"
                      className="border-2 rounded-sm border-muted-foreground"
                    />
                  ) : (
                    <ImageCover
                      publicId={official.users.imageId}
                      className="absolute inset-0 object-center border-2 border-gray-600 rounded-full aspect-square"
                      size={80}
                    />
                  )}
                </div>
                <CardTitle className="p-0 m-0 text-[1rem] leading-4">
                  {formatFullname({
                    firstName: official.users.firstName,
                    middleName: official.users.middleName,
                    lastName: official.users.lastName
                  })}
                </CardTitle>
                <CardDescription className="p-0 m-0 text-sm">
                  <p>{official.users.position}</p>
                </CardDescription>
              </CardHeader>
            </Card>
          </OfficialsDialog>
        );
      })}
    </div>
  );
}
