import { CompanyDetail } from '@/components/company/CompanyDetail';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

async function getBranchCompany(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/branch-companies/slug/${slug}/`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = await getBranchCompany(slug);
  
  if (!company) {
    return {
      title: 'شرکت یافت نشد | سولار مارکت',
    };
  }

  return {
    title: `${company.name} | شرکت‌های شعبه | سولار مارکت`,
    description: company.description || `اطلاعات ${company.name} - شرکت شعبه صنعت خورشیدی`,
  };
}

export default async function BranchCompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await getBranchCompany(slug);
  
  if (!company) {
    notFound();
  }
  
  // Check if company has completed detail page
  if (!company.detail_page_completed || !company.description) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Back Button */}
          <Link href="/branch-companies">
            <Button variant="ghost" size="sm">
              <ArrowRight className="ml-2 h-4 w-4" />
              بازگشت به لیست شرکت‌های شعبه
            </Button>
          </Link>

          {/* Company Basic Info */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-muted-foreground">
              شناسه ملی: {company.national_id}
            </p>
          </div>

          {/* Detail Page Not Available Message */}
          <Alert>
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="text-right">
              <p className="font-medium mb-2">
                اطلاعات تکمیلی این شرکت هنوز در دسترس نیست
              </p>
              <p className="text-sm">
                این شرکت در فهرست شرکت‌های شعبه تأیید شده قرار دارد، اما صفحه جزئیات آن هنوز توسط مدیریت تکمیل نشده است.
              </p>
            </AlertDescription>
          </Alert>

          {/* Basic Contact Info (if available) */}
          {company.phone_list && company.phone_list.length > 0 && (
            <div className="p-6 border rounded-lg space-y-3">
              <h3 className="font-semibold text-right">اطلاعات تماس:</h3>
              <div className="text-right space-y-1">
                {company.phone_list.map((phone: string, idx: number) => (
                  <a
                    key={idx}
                    href={`tel:${phone}`}
                    className="block text-primary hover:underline"
                    dir="ltr"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Render full detail page if information is available
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/branch-companies">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowRight className="ml-2 h-4 w-4" />
          بازگشت به لیست شرکت‌های شعبه
        </Button>
      </Link>
      
      <CompanyDetail company={company} type="branch" />
    </div>
  );
}
