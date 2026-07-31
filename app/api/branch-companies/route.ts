import { NextRequest, NextResponse } from 'next/server';
import { mockBranchCompanies } from '@/lib/mocks';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  // Simulate network delay
  await delay(300);

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  // Paginate
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCompanies = mockBranchCompanies.slice(startIndex, endIndex);

  return NextResponse.json({
    count: mockBranchCompanies.length,
    next: endIndex < mockBranchCompanies.length ? `?page=${page + 1}&limit=${limit}` : null,
    previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
    results: paginatedCompanies
  });
}
