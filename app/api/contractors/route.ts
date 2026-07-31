import { NextResponse } from 'next/server';
import {
  querySmallScaleContractors,
  queryMegawattContractors,
} from '@/lib/utils/data-loader';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'small'; // 'small' | 'megawatt'
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all'; // 'all' | 'valid' | 'expired'
  const certificate = searchParams.get('certificate') || 'all'; // 'all' | 'has_cert' | 'no_cert'
  const rank = searchParams.get('rank') || '';

  const isHome = searchParams.get('is_home') === 'true';

  if (type === 'megawatt') {
    const result = queryMegawattContractors({
      page,
      limit,
      search,
      status,
      rank,
      isHome,
    });
    return NextResponse.json(result);
  } else {
    const result = querySmallScaleContractors({
      page,
      limit,
      search,
      status,
      certificate,
      rank,
      isHome,
    });
    return NextResponse.json(result);
  }
}
