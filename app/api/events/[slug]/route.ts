import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Event } from '@/database/event.model';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // 1. Connect to the database
    await connectToDatabase();

    // 2. Await the params (Next.js 15+ requirement)
    const { slug } = await params;

    // 3. Find the event in MongoDB
    const event = await Event.findOne({ slug });

    // 4. Handle Case: Event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }
    // 5. Return the event
    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}
