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
  const { name, email, phone, country, message, recaptchaToken } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (secret) {
      if (!recaptchaToken) {
        return NextResponse.json({ error: "Missing reCAPTCHA token" }, { status: 400 });
      }
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${recaptchaToken}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.score < 0.5) {
        return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
      }
    }

    const plainCountry = country ? `Country: ${country}` : "";
    const plainPhone = phone ? `Phone: ${phone}` : "";
    const plainText = `New message from ${name}\n${plainCountry}\n${plainPhone}\nEmail: ${email}\n\n${message}`;

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#0e0f12; color:#f1f5f9; padding:24px; border-radius:16px; max-width:520px; margin:0 auto; border:1px solid rgba(255,255,255,0.1);">
        <div style="text-align:center; margin-bottom:20px;">
          <div style="font-size:28px; font-weight:700; letter-spacing:0.3em; text-transform:uppercase; color:#60a5fa;">Nuevo mensaje</div>
          <p style="margin:8px 0 0; color:rgba(241,245,249,0.7);">Formulario del portafolio</p>
        </div>
        <div style="background:rgba(15,23,42,0.8); border-radius:12px; padding:18px; border:1px solid rgba(255,255,255,0.05);">
          <p style="margin:0 0 6px; font-size:14px; text-transform:uppercase; letter-spacing:0.3em; color:rgba(96,165,250,0.8);">Nombre</p>
          <p style="margin:0 0 16px; font-size:18px; font-weight:600;">${name}</p>

          <p style="margin:0 0 6px; font-size:14px; text-transform:uppercase; letter-spacing:0.3em; color:rgba(96,165,250,0.8);">Email</p>
          <p style="margin:0 0 16px; font-size:18px; font-weight:600;">${email}</p>

          ${country ? `
            <p style="margin:0 0 6px; font-size:14px; text-transform:uppercase; letter-spacing:0.3em; color:rgba(96,165,250,0.8);">País</p>
            <p style="margin:0 0 16px; font-size:18px; font-weight:600;">${country}</p>
          ` : ""}

          ${phone ? `
            <p style="margin:0 0 6px; font-size:14px; text-transform:uppercase; letter-spacing:0.3em; color:rgba(96,165,250,0.8);">Teléfono</p>
            <p style="margin:0 0 16px; font-size:18px; font-weight:600;">${phone}</p>
          ` : ""}

          <p style="margin:0 0 6px; font-size:14px; text-transform:uppercase; letter-spacing:0.3em; color:rgba(96,165,250,0.8);">Mensaje</p>
          <p style="margin:0; font-size:16px; line-height:1.6;">${message.replace(/\n/g, "<br>")}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.GMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL ?? process.env.GMAIL_USER,
      subject: `New message from ${name}`,
      text: plainText,
      html: htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email error", error);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}
