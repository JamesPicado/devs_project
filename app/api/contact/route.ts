import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.GMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL ?? process.env.GMAIL_USER,
      subject: `New message from ${name}`,
      text: `Sender: ${name} (${email})

${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email error", error);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}
