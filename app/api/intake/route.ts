import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Save to Firebase (Mocked for now)
    console.log('Saving to Firebase:', data);

    // 2. Trigger n8n webhook (Mocked for now)
    console.log('Triggering n8n webhook');

    // 3. Send WhatsApp notification (Mocked for now)
    console.log('Sending WhatsApp notification');

    return NextResponse.json({ success: true, message: 'Intake received successfully.' });
  } catch (error) {
    console.error('Intake error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process intake.' }, { status: 500 });
  }
}
