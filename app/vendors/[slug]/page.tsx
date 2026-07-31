import { CompanyDetail } from '@/components/company/CompanyDetail';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

async function getVendor(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/vendors/slug/${slug}/`,
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
  const vendor = await getVendor(slug);
  
  if (!vendor) {
    return {
      title: 'پیمانکار یافت نشد | سولار مارکت',
    };
  }

  return {
    title: `${vendor.name} | پیمانکاران | سولار مارکت`,
    description: vendor.description || `اطلاعات ${vendor.name} - پیمانکار صنعت خورشیدی`,
  };
}

export default async function VendorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = await getVendor(slug);
  
  if (!vendor) {
    notFound();
  }
  
  // Check if vendor has completed detail page
  if (!vendor.detail_page_completed || !vendor.description) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Back Button */}
          <Link href="/vendors">
            <Button variant="ghost" size="sm">
              <ArrowRight className="ml-2 h-4 w-4" />
              بازگشت به لیست پیمانکاران
            </Button>
          </Link>

          {/* Vendor Basic Info */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">{vendor.name}</h1>
            <p className="text-muted-foreground">
              شناسه ملی: {vendor.national_id}
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
                این شرکت در فهرست پیمانکاران تأیید شده قرار دارد، اما صفحه جزئیات آن هنوز توسط مدیریت تکمیل نشده است.
              </p>
            </AlertDescription>
          </Alert>

          {/* Basic Contact Info (if available) */}
          {vendor.phone_list && vendor.phone_list.length > 0 && (
            <div className="p-6 border rounded-lg space-y-3">
              <h3 className="font-semibold text-right">اطلاعات تماس:</h3>
              <div className="text-right space-y-1">
                {vendor.phone_list.map((phone: string, idx: number) => (
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
      <Link href="/vendors">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowRight className="ml-2 h-4 w-4" />
          بازگشت به لیست پیمانکاران
        </Button>
      </Link>
      
      <CompanyDetail company={vendor} type="vendor" />
    </div>
  );
}
