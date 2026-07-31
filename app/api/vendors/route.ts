import { NextRequest, NextResponse } from 'next/server';
import { mockVendors } from '@/lib/mocks';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  // Simulate network delay
  await delay(300);

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const isFeatured = searchParams.get('is_featured') === 'true';

  // Filter vendors
  let filteredVendors = mockVendors;
  if (isFeatured) {
    filteredVendors = mockVendors.filter(v => v.is_featured);
  }

  // Paginate
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedVendors = filteredVendors.slice(startIndex, endIndex);

  return NextResponse.json({
    count: filteredVendors.length,
    next: endIndex < filteredVendors.length ? `?page=${page + 1}&limit=${limit}` : null,
    previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
    results: paginatedVendors
  });
}
