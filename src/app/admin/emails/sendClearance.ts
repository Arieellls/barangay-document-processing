import { compileClearanceTemplate, sendMailClearance } from "@/lib/mail";

export async function sendClearance(
  name: string,
  service: string,
  date: string
) {
  "use server";

  await sendMailClearance({
    to: "arielitorobles1525@gmail.com",
    name: "Barangay Document Processing System",
    subject: "Document Request",
    body: compileClearanceTemplate(name, service, date)
  });
}
