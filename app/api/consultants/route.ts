import { NextResponse } from 'next/server';
import { queryConsultants } from '@/lib/utils/data-loader';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';
  const rank = searchParams.get('rank') || '';

  const isHome = searchParams.get('is_home') === 'true';

  const result = queryConsultants({
    page,
    limit,
    search,
    status,
    rank,
    isHome,
  });

  return NextResponse.json(result);
}
