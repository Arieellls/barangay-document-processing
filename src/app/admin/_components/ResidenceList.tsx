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

const invoices = [
  {
    invoice: "Arieltito Manorina",
    paymentStatus: "09665733425",
    totalAmount: "Non-voter",
    paymentMethod: "arielitomanorina@gmail.com"
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal"
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer"
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card"
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal"
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer"
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card"
  }
];

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
