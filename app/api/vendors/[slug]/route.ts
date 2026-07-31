import { NextRequest, NextResponse } from 'next/server';
import { mockVendors } from '@/lib/mocks';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await delay(200);

  const { slug } = await params;
  const vendor = mockVendors.find(v => v.slug === slug);

  if (!vendor) {
    return NextResponse.json(
      { error: 'Vendor not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(vendor);
}
