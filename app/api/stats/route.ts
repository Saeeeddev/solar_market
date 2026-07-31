import { NextResponse } from 'next/server';
import {
  getSmallScaleData,
  getMegawattData,
  getConsultantsData,
} from '@/lib/utils/data-loader';

export async function GET() {
  const smallScale = getSmallScaleData();
  const megawatt = getMegawattData();
  const consultants = getConsultantsData();

  return NextResponse.json({
    small_scale_count: smallScale.total_count,
    megawatt_count: megawatt.total_count,
    consultants_count: consultants.total_count,
    total_contractors_count: smallScale.total_count + megawatt.total_count,
    total_companies_count:
      smallScale.total_count + megawatt.total_count + consultants.total_count,
  });
}
