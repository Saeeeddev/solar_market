import { Card, CardContent } from '@/components/ui/card';
import { Sun, Target, Users, TrendingUp, ShieldCheck, Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'درباره ما | سولار بازار',
  description: 'سولار بازار - دایرکتوری جامع صنعت خورشیدی ایران',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Unified Single Card for About Solar Bazar */}
        <Card className="rounded-card border-0 ring-0 bg-white shadow-card overflow-hidden">
          <CardContent className="p-8 md:p-12 space-y-12 text-right">
            {/* Header / Brand */}
            <div className="text-center space-y-4 border-0 ring-0 border-slate-100 pb-8">
              <div className="flex justify-center mb-4">
                <div className="p-5 rounded-hero bg-[#6D7F9F]/10">
                  <Sun className="h-16 w-16 text-[#6D7F9F]" />
                </div>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900">درباره سولار بازار</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                دایرکتوری جامع و مرجع تخصصی صنعت نیروگاه‌های خورشیدی ایران
              </p>
            </div>

            {/* Mission Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="h-7 w-7 text-[#6D7F9F]" />
                <h2 className="text-2xl font-bold text-slate-900">ماموریت ما</h2>
              </div>
              <p className="leading-relaxed text-slate-700 text-base">
                سولار بازار با هدف ایجاد یک پلتفرم جامع، مطمئن و به‌روز برای معرفی پیمانکاران،
                مشاوران و فعالان صنعت نیروگاه‌های خورشیدی ایران طراحی شده است.
                ما تلاش می‌کنیم تا دسترسی به اطلاعات معتبر، ارزیابی شده و طبقه‌بندی‌شده متخصصان
                این حوزه را برای تمامی سرمایه‌گذاران، متقاضیان و ذی‌نفعان آسان و شفاف سازیم.
              </p>
            </div>

            {/* Features Grid inside the same card */}
            <div className="space-y-4 border-t border-slate-100 pt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">ویژگی‌ها و ارزش‌های کلیدی</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-[#6D7F9F]" />
                    <h3 className="font-bold text-lg text-slate-900">اطلاعات تایید شده</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    تمامی پیمانکاران و مشاوران ثبت شده بر اساس مستندات رسمی و سازمان‌های ذی‌صلاح
                    ارزیابی و دسته‌بندی شده‌اند.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                    <h3 className="font-bold text-lg text-slate-900">به‌روزرسانی مستمر</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    اطلاعات شرکت‌ها و شرایط گواهینامه‌ها به صورت مستمر پایش شده تا آخرین تغییرات در
                    دسترس شما قرار گیرد.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                  <div className="flex items-center gap-3">
                    <Sun className="h-6 w-6 text-amber-500" />
                    <h3 className="font-bold text-lg text-slate-900">تخصص در انرژی خورشیدی</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    تمرکز کامل بر نیروگاه‌های تجدیدپذیر مقیاس کوچک (انشعابی) و سیستم‌های مگاواتی.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-[#6D7F9F]" />
                    <h3 className="font-bold text-lg text-slate-900">دسترسی و جستجوی آسان</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    امکان جستجو بر اساس رتبه‌بندی، تاریخ انقضاء، گواهینامه‌ها و شماره‌های تماس مستقیم.
                  </p>
                </div>
              </div>
            </div>

            {/* Services List inside the same card */}
            <div className="space-y-4 border-t border-slate-100 pt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">خدمات سولار بازار</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-slate-700 font-medium">
                  <span className="text-[#6D7F9F] font-bold">•</span>
                  <span>لیست جامع پیمانکاران احداث نیروگاه‌های خورشیدی مقیاس کوچک (انشعابی)</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 font-medium">
                  <span className="text-[#6D7F9F] font-bold">•</span>
                  <span>دایرکتوری کامل شرکت‌های پیمانکار نیروگاه‌های مگاواتی</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 font-medium">
                  <span className="text-[#6D7F9F] font-bold">•</span>
                  <span>فهرست شرکت‌های مشاور تایید شده و دارنده رتبه سازمان برنامه</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 font-medium">
                  <span className="text-[#6D7F9F] font-bold">•</span>
                  <span>فیلترهای پیشرفته بر اساس شناسه ملی، وضعیت اعتبار، رتبه و شماره تماس</span>
                </li>
              </ul>
            </div>

            {/* Contact Section inside the same card */}
            <div className="border-t border-slate-100 pt-8 text-center space-y-4 bg-slate-50/80 -mx-8 -mb-8 p-8 rounded-b-card">
              <h2 className="text-2xl font-bold text-slate-900">تماس با ما</h2>
              <p className="text-slate-600 text-sm max-w-lg mx-auto">
                برای افزودن اطلاعات شرکت یا مطرح کردن هرگونه پیشنهاد، با تیم پشتیبانی سولار بازار در ارتباط باشید.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
                <a
                  href="mailto:info@solarbazar.ir"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-chip text-sm font-bold text-[#6D7F9F] hover:bg-slate-100 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span dir="ltr">info@solarbazar.ir</span>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
