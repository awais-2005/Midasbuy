// Utility to send WhatsApp message using Twilio API

export interface TwilioWhatsappOptions {
  to: string; // WhatsApp number in format 'whatsapp:+1234567890'
  body: string;
}

export async function sendTwilioWhatsapp(options: TwilioWhatsappOptions & { contentSid?: string; contentVariables?: Record<string, string> }): Promise<void> {
  // Twilio credentials from environment variables
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const from = process.env.TWILIO_WHATSAPP_FROM!; // Twilio sandbox WhatsApp number or your approved sender

  if (!accountSid || !authToken || !from) {
    throw new Error('Twilio credentials are not set in environment variables.');
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const params = new URLSearchParams();
  params.append('From', from);
  params.append('To', options.to);
  if (options.contentSid) params.append('ContentSid', options.contentSid);
  if (options.contentVariables) params.append('ContentVariables', JSON.stringify(options.contentVariables));
  if (options.body) params.append('Body', options.body); // Optional, for fallback

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Twilio API error: ${error}`);
  }
}
