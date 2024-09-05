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
import { getAllRequests } from "@/app/actions/documents/getRequests";
import { formatDate } from "@/lib/formatDate";
import ViewRequest from "./ViewRequestDialog";
import ViewRequestDialog from "./ViewRequestDialog";
import { Separator } from "@/components/ui/separator";
import {
  AcceptMenuItem,
  DeclineMenuItem,
  PendingMenuItem,
  ReadyMenuItem
} from "./ResidentMenuActions";
import { DeclineAccountItem } from "../account-approval/AccountActions";

export async function RequestList() {
  const requests = await getAllRequests();

  return (
    <Table>
      <TableCaption>A list of Barangay Documents Request</TableCaption>
      <TableHeader>
        <TableRow>
          {/* Mobile actions */}
          <TableHead className="sm:hidden w-[50px] text-center"></TableHead>
          <TableHead className="w-[250px]">Full Name</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Pick-up Date</TableHead>
          <TableHead>Service Type</TableHead>
          <TableHead className="text-left">Status</TableHead>
          {/* Desktop actions */}
          <TableHead className="hidden sm:table-cell w-[50px] text-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
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
                firstName: request.firstName,
                middleName: request?.middleName,
                lastName: request.lastName
              })}
            </TableCell>
            <TableCell>{request.purpose}</TableCell>
            <TableCell>{formatDate(new Date(request.pickupDate))}</TableCell>
            <TableCell>{request.serviceType}</TableCell>
            <TableCell
              className={`text-left ${
                request.status === "Pending"
                  ? "text-yellow-600"
                  : request.status === "Ready"
                  ? "text-green-600"
                  : request.status === "Declined"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {request.status}
            </TableCell>

            {/* Desktop actions */}
            <TableCell className="hidden text-center sm:table-cell">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <ViewRequestDialog request={request} className="w-full">
                    <Button
                      variant="default"
                      className="relative flex items-center justify-start w-full py-1 text-sm text-left transition-colors bg-transparent rounded-sm outline-none cursor-default hover:bg-accent hover:text-accent-foreground text-accent-foreground"
                    >
                      <span className="absolute left-0 block px-2 text-left">
                        View Request
                      </span>
                    </Button>
                  </ViewRequestDialog>

                  <AcceptMenuItem request={request} />
                  <ReadyMenuItem id={request.id} />
                  <PendingMenuItem id={request.id} />
                  <Separator />
                  <DeclineMenuItem id={request.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">{requests.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
