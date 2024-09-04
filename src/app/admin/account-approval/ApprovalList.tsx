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
import { Button } from "@/components/ui/button";
import ApprovalDialog from "./ApprovalDialog";
import { ApproveAccountItem, DeclineAccountItem } from "./AccountActions";
import { getAccountForApproval } from "@/app/actions/approval/approval-actions";

export async function ApprovalList() {
  const residents = await getAccountForApproval();

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
          <TableHead className="hidden sm:table-cell w-[50px] text-center">
            Actions
          </TableHead>
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
                  <ApprovalDialog
                    resident={resident}
                    className="w-full text-left"
                  >
                    <Button
                      variant="default"
                      className="relative flex items-center justify-start w-full py-1 text-sm text-left transition-colors bg-transparent rounded-sm outline-none cursor-default hover:bg-accent hover:text-accent-foreground text-accent-foreground"
                    >
                      <span className="absolute left-0 block px-2 text-left">
                        View Profile
                      </span>
                    </Button>
                  </ApprovalDialog>
                  {/* </DropdownMenuItem> */}
                  <ApproveAccountItem id={resident.id} />
                  <DeclineAccountItem id={resident.id} />
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
