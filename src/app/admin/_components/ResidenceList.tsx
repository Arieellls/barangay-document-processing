import { getAllResidence } from "@/app/actions/getResidence";
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

export async function ResidenceList() {
  const residences = await getAllResidence();

  return (
    <Table>
      <TableCaption>A list of Barangay Residence</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Full Name</TableHead>
          <TableHead>Contact Number</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Age</TableHead>
          <TableHead className="text-left">Voter Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {residences.map((residence) => (
          <TableRow key={residence.id}>
            <TableCell className="font-medium">
              {formatFullname({
                firstName: residence.firstName,
                middleName: residence?.middleName,
                lastName: residence.lastName
              })}
            </TableCell>
            <TableCell>{residence.contactNumber}</TableCell>
            <TableCell>{residence.emailAddress}</TableCell>
            <TableCell>{residence.gender}</TableCell>
            <TableCell>{residence.age}</TableCell>
            <TableCell className="text-left">
              {residence.isVoter ? "Voter" : "Non-voter"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">{residences.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
