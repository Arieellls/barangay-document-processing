import { compileIndigencyTemplate, sendMailIndigency } from "@/lib/mail";

export async function sendIndigency(
  name: string,
  service: string,
  start: string,
  end: string
) {
  "use server";

  await sendMailIndigency({
    to: "arielitorobles1525@gmail.com",
    name: "Barangay Document Processing System",
    subject: "Document Request",
    body: compileIndigencyTemplate(name, service, start, end)
  });
}
