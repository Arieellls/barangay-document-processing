import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { PDFDocument, StandardFonts } from "pdf-lib"; // Ensure you have @types/pdf-lib installed for type definitions

export async function POST(request: Request) {
  try {
    // Generate the PDF using pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 30;

    page.drawText("Content to be generated to PDF", {
      x: 50,
      y: 350,
      size: fontSize,
      font
    });

    const pdfBytes = await pdfDoc.save();

    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string
      }
    });

    await transporter.sendMail({
      from: '"Barangay Document Processing System" <barangayprocessingsystem@gmail.com>',
      to: "arielitorobles1525@gmail.com",
      subject: "Here is your PDF",
      text: "Please find the attached PDF.",
      attachments: [
        {
          filename: "page.pdf",
          content: Buffer.from(pdfBytes),
          contentType: "application/pdf"
        }
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    });
  }
}
