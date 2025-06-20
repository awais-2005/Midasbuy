// Utility to send email using Resend API
// import fetch from 'node-fetch'; // Not needed in Next.js/Node 18+

export interface ResendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendResendEmail(options: ResendEmailOptions): Promise<void> {
  // Use provided API key directly
  const apiKey = 're_PxAm8SST_uCoN4rtss5C3yZDRbWbDBvQc';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev', // You can set up your own sender in Resend dashboard
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }
}
