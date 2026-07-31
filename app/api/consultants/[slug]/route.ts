import { NextRequest, NextResponse } from 'next/server';
import { mockConsultants } from '@/lib/mocks';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await delay(200);

  const { slug } = await params;
  const consultant = mockConsultants.find(c => c.slug === slug);

  if (!consultant) {
    return NextResponse.json(
      { error: 'Consultant not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(consultant);
}
