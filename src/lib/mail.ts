import nodemailer from "nodemailer";
import * as handlerbars from "handlebars";
import puppeteer from "puppeteer";
import { Indigency } from "../app/admin/emails/template/Indigency";
import { Clearance } from "@/app/admin/emails/template/Clearance";

async function generatePDF(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfArray = await page.pdf({ format: "A4" });
  await browser.close();
  return Buffer.from(pdfArray);
}

export async function sendMailIndigency({
  to,
  name,
  subject,
  body
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const pdfBuffer = await generatePDF(body);

    const sendResult = await transport.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      attachments: [
        {
          filename: "Barangay Indigency.pdf",
          content: pdfBuffer
        }
      ],
      html: body
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export function compileIndigencyTemplate(
  name: string,
  service: string,
  start: string,
  end: string
) {
  const template = handlerbars.compile(Indigency);
  const htmlBody = template({
    name: name,
    service: service,
    start: start,
    end: end
  });

  return htmlBody;
}

//************************************** CLEARNACE
export async function sendMailClearance({
  to,
  name,
  subject,
  body
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const pdfBuffer = await generatePDF(body);

    const sendResult = await transport.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      attachments: [
        {
          filename: "Barangay Clearance.pdf",
          content: pdfBuffer
        }
      ],
      html: body
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export function compileClearanceTemplate(
  name: string,
  service: string,
  date: string
) {
  const template = handlerbars.compile(Clearance);
  const htmlBody = template({
    name: name,
    service: service,
    date: date
  });

  return htmlBody;
}

//************************************** RESIDENCY
export async function sendMailResidency({
  to,
  name,
  subject,
  body
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const pdfBuffer = await generatePDF(body);

    const sendResult = await transport.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      attachments: [
        {
          filename: "Barangay Clearance.pdf",
          content: pdfBuffer
        }
      ],
      html: body
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export function compileResidencyTemplate(
  name: string,
  service: string,
  date: string
) {
  const template = handlerbars.compile(Clearance);
  const htmlBody = template({
    name: name,
    service: service,
    date: date
  });

  return htmlBody;
}
