import { compileResidencyTemplate, sendMailResidency } from "@/lib/mail";

export async function sendResidency(
  name: string,
  service: string,
  date: string
) {
  "use server";

  await sendMailResidency({
    to: "arielitorobles1525@gmail.com",
    name: "Barangay Document Processing System",
    subject: "Document Request",
    body: compileResidencyTemplate(name, service, date)
  });
}
