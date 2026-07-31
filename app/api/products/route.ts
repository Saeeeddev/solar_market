import { NextResponse } from 'next/server';
import { products } from '@/mock/products';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: Request) {
  // Simulate network delay
  await delay(300);

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const manufacturer = searchParams.get('manufacturer');
  const inStock = searchParams.get('inStock');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  let filtered = [...products];

  // Apply filters
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  if (manufacturer) {
    filtered = filtered.filter(p => p.manufacturer === manufacturer);
  }
  if (inStock) {
    filtered = filtered.filter(p => p.inStock === (inStock === 'true'));
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return NextResponse.json({
    data: paginated,
    meta: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit)
    }
  });
}
