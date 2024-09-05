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
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const pdfBuffer = await generatePDF(body);

  const mailData = {
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
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
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
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const pdfBuffer = await generatePDF(body);

  const mailData = {
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
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
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
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const pdfBuffer = await generatePDF(body);

  const mailData = {
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
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
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
