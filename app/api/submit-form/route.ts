import { NextResponse } from 'next/server';

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email } = body;

    // Validate the input
    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Prepare the data for GHL
    const ghlData = {
      firstName,
      lastName,
      phone,
      email,
      locationId: GHL_LOCATION_ID,
      // Add any additional fields required by GHL
    };

    // Send data to GHL
    const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GHL_API_KEY}`,
      },
      body: JSON.stringify(ghlData),
    });

    if (!ghlResponse.ok) {
      throw new Error('Failed to submit to GHL');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}