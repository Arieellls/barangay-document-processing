import { getAllResidents } from "@/app/actions/getResidents";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatFullname } from "@/lib/formatFullname";
import { MoreVertical } from "lucide-react";
import ViewProfileDialog from "./ViewProfileDialog";
import { Button } from "@/components/ui/button";

export async function ResidentsList() {
  const residents = await getAllResidents();

  return (
    <Table>
      <TableCaption>A list of Barangay Residents</TableCaption>
      <TableHeader>
        <TableRow>
          {/* Mobile actions */}
          <TableHead className="sm:hidden w-[50px] text-center"></TableHead>
          <TableHead className="w-[250px]">Full Name</TableHead>
          <TableHead>Contact Number</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Purok</TableHead>
          <TableHead className="text-left">Voter Status</TableHead>
          {/* Desktop actions */}
          <TableHead className="hidden sm:table-cell w-[50px] text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {residents.map((resident) => (
          <TableRow key={resident.id}>
            {/* Mobile actions */}
            <TableCell className="text-center sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>

            <TableCell className="font-medium">
              {formatFullname({
                firstName: resident.firstName,
                middleName: resident?.middleName,
                lastName: resident.lastName
              })}
            </TableCell>
            <TableCell>{resident.contactNumber}</TableCell>
            <TableCell>{resident.emailAddress}</TableCell>
            <TableCell>{resident.gender}</TableCell>
            <TableCell>{resident.age}</TableCell>
            <TableCell>{resident.purok}</TableCell>
            <TableCell className="text-left">
              {resident.isVoter ? "Voter" : "Non-voter"}
            </TableCell>

            {/* Desktop actions */}
            <TableCell className="hidden text-center sm:table-cell">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuItem> */}
                  <ViewProfileDialog resident={resident} className="w-full">
                    <Button
                      variant="default"
                      className="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground bg-transparent text-accent-foreground"
                    >
                      View Profile
                    </Button>
                  </ViewProfileDialog>
                  {/* </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">{residents.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
