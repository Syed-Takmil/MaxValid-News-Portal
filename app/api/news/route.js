import { NextResponse } from 'next/server';
import { initialNews } from '@/app/data/newsData';

export async function GET() {
  // Simulate network latency (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    return NextResponse.json({ success: true, data: initialNews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch news' }, { status: 500 });
  }
}