'use client';

import { CompanyCard } from '@/components/company/CompanyCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sun, Users, Building2, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import {
  useSmallScaleContractors,
  useMegawattContractors,
  useFeaturedConsultants,
  useStats,
} from '@/lib/api/queries';

export default function HomePage() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const {
    data: smallScaleData,
    isLoading: smallScaleLoading,
    isError: smallScaleError,
  } = useSmallScaleContractors(6);

  const {
    data: megawattData,
    isLoading: megawattLoading,
    isError: megawattError,
  } = useMegawattContractors(6);

  const {
    data: consultantsData,
    isLoading: consultantsLoading,
    isError: consultantsError,
  } = useFeaturedConsultants(4);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Synergy-style gradient */}
      <section className="wrap py-16 md:py-24 text-center space-y-8 rise">
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-hero gradient-brand">
            <Sun className="h-16 w-16 md:h-20 md:w-20 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground text-balance">
          دایرکتوری جامع صنعت خورشیدی ایران
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
          دسترسی آسان به پیمانکاران، مشاوران و اطلاعات رسمی نیروگاه‌های خورشیدی
        </p>
      </section>

      {/* Quick Stats with Synergy-style cards */}
      {stats && (
        <section className="wrap py-8 rise" style={{ '--rise-delay': '100ms' } as React.CSSProperties}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 rounded-card">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-primary/10 rounded-chip">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">
                      {stats.small_scale_count.toLocaleString('fa-IR')}
                    </p>
                    <p className="text-base text-muted-foreground mt-1">پیمانکار مقیاس کوچک</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 rounded-card">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-secondary/10 rounded-chip">
                    <Building2 className="h-10 w-10 text-secondary" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">
                      {stats.megawatt_count.toLocaleString('fa-IR')}
                    </p>
                    <p className="text-base text-muted-foreground mt-1">پیمانکار مگاواتی</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 rounded-card">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-accent/10 rounded-chip">
                    <Users className="h-10 w-10 text-accent-foreground" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">
                      {stats.consultants_count.toLocaleString('fa-IR')}
                    </p>
                    <p className="text-base text-muted-foreground mt-1">شرکت مشاور</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* SECTION 1: Small Scale Contractors */}
      <section className="wrap py-16 space-y-8 rise" style={{ '--rise-delay': '200ms' } as React.CSSProperties}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            پیمانکاران مقیاس کوچک (انشعابی)
          </h2>
          <Link href="/contractors?type=small">
            <Button variant="outline" className="rounded-chip hover:bg-muted/50">
              مشاهده همه (۸۷۰ شرکت) ←
            </Button>
          </Link>
        </div>

        {smallScaleLoading && <LoadingSpinner />}
        {smallScaleError && <ErrorMessage message="خطا در بارگذاری پیمانکاران مقیاس کوچک" />}

        {smallScaleData && smallScaleData.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smallScaleData.data.map((company: any, index: number) => (
              <div key={company.id || index} className="rise-stagger" style={{ '--stagger-index': index } as React.CSSProperties}>
                <CompanyCard company={company} type="small" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: Megawatt Contractors */}
      <section className="wrap py-16 space-y-8 rise" style={{ '--rise-delay': '300ms' } as React.CSSProperties}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            پیمانکاران نیروگاه‌های مگاواتی
          </h2>
          <Link href="/contractors?type=megawatt">
            <Button variant="outline" className="rounded-chip hover:bg-muted/50">
              مشاهده همه (۲۶۹ شرکت) ←
            </Button>
          </Link>
        </div>

        {megawattLoading && <LoadingSpinner />}
        {megawattError && <ErrorMessage message="خطا در بارگذاری پیمانکاران مگاواتی" />}

        {megawattData && megawattData.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {megawattData.data.map((company: any, index: number) => (
              <div key={company.id || index} className="rise-stagger" style={{ '--stagger-index': index } as React.CSSProperties}>
                <CompanyCard company={company} type="megawatt" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 3: Consultants */}
      <section className="wrap py-16 space-y-8 rise" style={{ '--rise-delay': '400ms' } as React.CSSProperties}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            مشاوران ویژه
          </h2>
          <Link href="/consultants">
            <Button variant="outline" className="rounded-chip hover:bg-muted/50">
              مشاهده همه (۳۸ شرکت) ←
            </Button>
          </Link>
        </div>

        {consultantsLoading && <LoadingSpinner />}
        {consultantsError && <ErrorMessage message="خطا در بارگذاری مشاوران" />}

        {consultantsData && consultantsData.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultantsData.data.map((company: any, index: number) => (
              <div key={company.id || index} className="rise-stagger" style={{ '--stagger-index': index } as React.CSSProperties}>
                <CompanyCard company={company} type="consultant" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section with Synergy-style gradient */}
      <section className="wrap py-16 rise" style={{ '--rise-delay': '500ms' } as React.CSSProperties}>
        <div className="gradient-brand rounded-xl p-12 md:p-16 text-center space-y-6 shadow-card">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            آیا شما هم متخصص هستید؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            برای افزودن شرکت یا مشاوره خود به این دایرکتوری، با ما تماس بگیرید
          </p>
          <div className="flex gap-4 justify-center flex-wrap pt-4">
            <Link href="/contractors">
              <Button size="lg" className="btn-primary rounded-chip">
                مشاهده پیمانکاران
              </Button>
            </Link>
            <Link href="/consultants">
              <Button
                size="lg"
                variant="outline"
                className="rounded-chip bg-background/80 hover:bg-background border-border/50 backdrop-blur-sm"
              >
                مشاهده مشاوران
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
