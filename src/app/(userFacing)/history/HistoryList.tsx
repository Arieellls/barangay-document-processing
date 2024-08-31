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
import { Button } from "@/components/ui/button";
import {
  getAllCompletedRequests,
  getAllRequests
} from "@/app/actions/documents/getRequests";
import { formatDate } from "@/lib/formatDate";

export async function HistoryList() {
  const requests = await getAllCompletedRequests();

  return (
    <Table>
      <TableCaption>A list of your document request</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Full Name</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Service Type</TableHead>
          <TableHead>Pick-up Date</TableHead>
          <TableHead>Claimed Date</TableHead>
          <TableHead className="text-left">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">
              {formatFullname({
                firstName: request.firstName,
                middleName: request?.middleName,
                lastName: request.lastName
              })}
            </TableCell>
            <TableCell>{request.purpose}</TableCell>
            <TableCell>{request.serviceType}</TableCell>
            <TableCell>{formatDate(new Date(request.pickupDate))}</TableCell>
            <TableCell>{formatDate(new Date(request.claimedDate))}</TableCell>
            <TableCell
              className={`text-left ${
                request.status === "Pending"
                  ? "text-yellow-600"
                  : request.status === "Ready"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {request.status}
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
