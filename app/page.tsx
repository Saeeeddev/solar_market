'use client';

import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Card, CardContent } from '@/components/ui/card';
import { ExploreCategories } from '@/components/home/ExploreCategories';
import { Phone, Users, Building2, Zap, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { useStats } from '@/lib/api/queries';

export default function HomePage() {
  const { data: stats, isLoading: statsLoading } = useStats();

  return (
    <div className="min-h-screen space-y-8 pb-16 md:space-y-12">
      {/* Hero Section */}
      <section className="mx-auto w-full max-w-[1400px] px-3 pt-5 pb-8 text-center sm:px-6 md:pt-7 lg:px-8">
        <div className="relative isolate flex min-h-[760px] flex-col items-center justify-end overflow-hidden rounded-card bg-cover bg-center px-4 py-8 shadow-md sm:min-h-[740px] sm:px-8 md:min-h-[780px] md:py-10 lg:px-10" style={{ backgroundImage: "url('/images/Golden%20Sunset%20Over%20Solar%20Fields.webp')" }}>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-gradient-to-t from-white/75 via-white/30 to-transparent" aria-hidden="true" />
          <div className="mx-auto max-w-3xl space-y-4 rounded-card bg-white/70 px-4 py-4 sm:px-7 sm:py-5">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              پرتال جامع  کسب کارهای خورشیدی ایران
            </h1>
            <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed">
              اطلاعات رسمی، ارزیابی شده و بروز پیمانکاران مقیاس کوچک، نیروگاه‌های مگاواتی و شرکت‌های مشاور تایید شده
            </p>
          </div>

          {/* Dynamic Statistics Cards */}
          <div className="mt-8 w-full">
        {statsLoading ? (
          <LoadingSpinner />
        ) : stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Small Scale Contractors Stats */}
            <Card className="bg-white border-0 ring-0 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-card">
              <CardContent className="flex h-full flex-col justify-between gap-6 pt-8 pb-7">
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
                <Link href="/contractors?type=small" className="inline-flex w-fit items-center gap-2 self-start rounded-chip bg-[#6D7F9F] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#56698a]">
                  مشاهده همه
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Megawatt Contractors Stats */}
            <Card className="bg-white border-0 ring-0 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-card">
              <CardContent className="flex h-full flex-col justify-between gap-6 pt-8 pb-7">
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
                <Link href="/contractors?type=megawatt" className="inline-flex w-fit items-center gap-2 self-start rounded-chip border border-emerald-600 px-4 py-2 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-50">
                  مشاهده همه
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Consultants Stats */}
            <Card className="bg-white border-0 ring-0 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-card">
              <CardContent className="flex h-full flex-col justify-between gap-6 pt-8 pb-7">
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
                <Link href="/consultants" className="inline-flex w-fit items-center gap-2 self-start rounded-chip border border-purple-600 px-4 py-2 text-sm font-bold text-purple-800 transition-colors hover:bg-purple-50">
                  مشاهده همه
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : null}
          </div>
        </div>
      </section>

      <ExploreCategories />

      {/* CTA Section */}
      <section className="wrap py-12">
        <div className="gradient-brand rounded-card p-12 md:p-16 text-center space-y-6 shadow-md border-0 ring-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-balance">
            آیا شما هم متخصص یا شرکت فعال هستید؟
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
            برای افزودن شرکت یا مشاوره خود به این دایرکتوری، با ما تماس بگیرید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
                <a
                  href="mailto:info@solarmarket.ir"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-chip text-sm font-bold text-[#6D7F9F] hover:bg-slate-100 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span dir="ltr">info@solarmarket.ir</span>
                </a>
                <a
                  href="tel:02112345678"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-chip text-sm font-bold text-[#6D7F9F] hover:bg-slate-100 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">021-12345678</span>
                </a>
              </div>
        </div>
      </section>
    </div>
  );
}
