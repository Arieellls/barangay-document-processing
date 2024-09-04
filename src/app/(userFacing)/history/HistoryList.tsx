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
import { getUserRequestHistory } from "@/app/actions/documents/getRequests";
import { formatDate } from "@/lib/formatDate";
import getSession from "@/lib/getSession";

export async function HistoryList() {
  const session = await getSession();
  const requests = await getUserRequestHistory(session?.user.id || "");

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
            <TableCell>
              {request.purpose === "Other"
                ? request.additionalDetails
                : request.purpose}
            </TableCell>
            <TableCell>{request.serviceType}</TableCell>
            <TableCell>{formatDate(new Date(request.pickupDate))}</TableCell>
            <TableCell>
              {request.claimedDate
                ? formatDate(new Date(request.claimedDate))
                : "N/A"}
            </TableCell>

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
