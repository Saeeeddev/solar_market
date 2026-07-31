'use client';

import { CompanyCard } from '@/components/company/CompanyCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sun, Users, Building2, Zap, ArrowLeft, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen space-y-16 pb-16">
      {/* Hero Section */}
      <section className="wrap pt-16 pb-8 md:pt-20 text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="p-6 rounded-hero bg-[#6D7F9F]/10 shadow-sm">
            <Sun className="h-16 w-16 md:h-20 md:w-20 text-[#6D7F9F]" />
          </div>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            دایرکتوری جامع صنعت خورشیدی ایران
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
            اطلاعات رسمی، ارزیابی شده و بروز پیمانکاران مقیاس کوچک، نیروگاه‌های مگاواتی و شرکت‌های مشاور تایید شده
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/contractors?type=small">
            <Button size="lg" className="bg-[#6D7F9F] hover:bg-[#56698a] text-white font-extrabold rounded-chip shadow-md px-6 gap-2">
              <Zap className="h-5 w-5" />
              پیمانکاران مقیاس کوچک
            </Button>
          </Link>
          <Link href="/contractors?type=megawatt">
            <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-extrabold rounded-chip px-6 gap-2">
              <Building2 className="h-5 w-5 text-emerald-600" />
              پیمانکاران مگاواتی
            </Button>
          </Link>
          <Link href="/consultants">
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-800 hover:bg-purple-50 font-extrabold rounded-chip px-6 gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              شرکت‌های مشاور
            </Button>
          </Link>
        </div>
      </section>

      {/* Dynamic Statistics Cards */}
      <section className="wrap">
        {statsLoading ? (
          <LoadingSpinner />
        ) : stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Small Scale Contractors Stats */}
            <Card className="bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover transition-shadow duration-300 rounded-card">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-[#6D7F9F]/10 rounded-chip">
                    <Zap className="h-10 w-10 text-[#6D7F9F]" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-slate-900">
                      {stats.small_scale_count.toLocaleString('fa-IR')}
                    </p>
                    <p className="text-base font-bold text-slate-600 mt-1">
                      پیمانکار مقیاس کوچک (انشعابی)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Megawatt Contractors Stats */}
            <Card className="bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover transition-shadow duration-300 rounded-card">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-emerald-100/80 rounded-chip">
                    <Building2 className="h-10 w-10 text-emerald-700" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-slate-900">
                      {stats.megawatt_count.toLocaleString('fa-IR')}
                    </p>
                    <p className="text-base font-bold text-slate-600 mt-1">
                      پیمانکار نیروگاه مگاواتی
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consultants Stats */}
            <Card className="bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover transition-shadow duration-300 rounded-card">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-purple-100/80 rounded-chip">
                    <Users className="h-10 w-10 text-purple-700" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-slate-900">
                      {stats.consultants_count.toLocaleString('fa-IR')}
                    </p>
                    <p className="text-base font-bold text-slate-600 mt-1">
                      شرکت مشاور تایید شده
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </section>

      {/* SECTION 1: Small Scale Contractors */}
      <section className="wrap py-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-[#6D7F9F]" />
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                پیمانکاران نیروگاه‌های خورشیدی مقیاس کوچک (انشعابی)
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium">
              پیمانکاران احداث سامانه خورشیدی تا سقف ۲۰۰ کیلووات
            </p>
          </div>

          {/* PROMINENT & BOLDER "SHOW ALL" BUTTON */}
          <Link href="/contractors?type=small">
            <Button className="bg-[#6D7F9F] hover:bg-[#56698a] text-white font-extrabold rounded-chip px-5 py-2.5 shadow-sm flex items-center gap-2 text-sm transition-all hover:scale-105 hover:shadow-md">
              مشاهده همه پیمانکاران مقیاس کوچک (۸۷۰ شرکت)
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {smallScaleLoading && <LoadingSpinner />}
        {smallScaleError && <ErrorMessage message="خطا در دریافت پیمانکاران مقیاس کوچک" />}

        {smallScaleData && smallScaleData.data && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {smallScaleData.data.map((company: any, index: number) => (
              <div key={company.id || index} className="h-full">
                <CompanyCard company={company} type="small" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: Megawatt Contractors */}
      <section className="wrap py-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                پیمانکاران نیروگاه‌های تجدیدپذیر مگاواتی
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium">
              شرکت‌های مجری طرح‌های احداث نیروگاه‌های خورشیدی تجاری و صنعتی
            </p>
          </div>

          {/* PROMINENT & BOLDER "SHOW ALL" BUTTON */}
          <Link href="/contractors?type=megawatt">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-chip px-5 py-2.5 shadow-sm flex items-center gap-2 text-sm transition-all hover:scale-105 hover:shadow-md">
              مشاهده همه پیمانکاران مگاواتی (۲۶۹ شرکت)
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {megawattLoading && <LoadingSpinner />}
        {megawattError && <ErrorMessage message="خطا در دریافت پیمانکاران مگاواتی" />}

        {megawattData && megawattData.data && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {megawattData.data.map((company: any, index: number) => (
              <div key={company.id || index} className="h-full">
                <CompanyCard company={company} type="megawatt" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 3: Consultants */}
      <section className="wrap py-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                شرکت‌های مشاور تایید شده
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium">
              مشاوران مجاز نظارت و طراحی سیستم‌های تجدیدپذیر
            </p>
          </div>

          {/* PROMINENT & BOLDER "SHOW ALL" BUTTON */}
          <Link href="/consultants">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-chip px-5 py-2.5 shadow-sm flex items-center gap-2 text-sm transition-all hover:scale-105 hover:shadow-md">
              مشاهده همه مشاوران (۳۸ شرکت)
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {consultantsLoading && <LoadingSpinner />}
        {consultantsError && <ErrorMessage message="خطا در دریافت مشاوران" />}

        {consultantsData && consultantsData.data && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {consultantsData.data.map((company: any, index: number) => (
              <div key={company.id || index} className="h-full">
                <CompanyCard company={company} type="consultant" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="wrap py-12">
        <div className="gradient-brand rounded-card p-12 md:p-16 text-center space-y-6 shadow-card border border-slate-200/60">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-balance">
            آیا شما هم متخصص یا شرکت فعال هستید؟
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
            برای افزودن شرکت یا مشاوره خود به این دایرکتوری، با ما تماس بگیرید
          </p>
          <div className="flex gap-4 justify-center flex-wrap pt-4">
            <Link href="/contractors">
              <Button size="lg" className="btn-primary rounded-chip font-extrabold">
                مشاهده پیمانکاران
              </Button>
            </Link>
            <Link href="/consultants">
              <Button
                size="lg"
                variant="outline"
                className="rounded-chip bg-white hover:bg-slate-100 border-slate-300 font-extrabold text-slate-800"
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
