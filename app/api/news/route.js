import { NextResponse } from 'next/server';
import { initialNews } from '@/app/data/newsData';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return NextResponse.json({ success: true, data: initialNews }, { status: 200 });
}