import { Card, CardContent } from '@/components/ui/card';
import { Sun, Target, Users, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'درباره ما | سولار بازار',
  description: 'سولار بازار - دایرکتوری جامع صنعت خورشیدی ایران',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Sun className="h-16 w-16 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold">درباره سولار بازار</h1>
          <p className="text-xl text-muted-foreground">
            دایرکتوری جامع صنعت خورشیدی ایران
          </p>
        </div>

        {/* Mission */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">ماموریت ما</h2>
            </div>
            <p className="text-right leading-relaxed text-muted-foreground">
              سولار بازار با هدف ایجاد یک پلتفرم جامع و قابل اعتماد برای معرفی پیمانکاران،
              مشاوران و شرکت‌های فعال در صنعت نیروگاه‌های خورشیدی ایران طراحی شده است.
              ما تلاش می‌کنیم تا دسترسی به اطلاعات معتبر و به‌روز درباره متخصصان این صنعت را
              برای تمامی ذی‌نفعان آسان‌تر کنیم.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">اطلاعات تایید شده</h3>
                  <p className="text-sm text-muted-foreground text-right">
                    تمامی پیمانکاران و مشاوران موجود در سولار بازار دارای مجوزهای معتبر
                    و تایید شده از سازمان‌های ذی‌صلاح هستند.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">به‌روزرسانی مستمر</h3>
                  <p className="text-sm text-muted-foreground text-right">
                    اطلاعات شرکت‌ها به صورت مستمر بررسی و به‌روزرسانی می‌شود تا
                    اطمینان حاصل شود که همواره به اطلاعات دقیق دسترسی دارید.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Sun className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">تخصص در انرژی خورشیدی</h3>
                  <p className="text-sm text-muted-foreground text-right">
                    تمرکز کامل بر صنعت نیروگاه‌های خورشیدی و ارائه اطلاعات تخصصی
                    در این حوزه.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">دسترسی آسان</h3>
                  <p className="text-sm text-muted-foreground text-right">
                    رابط کاربری ساده و کاربرپسند برای جستجو و دسترسی سریع به
                    اطلاعات مورد نیاز شما.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What We Offer */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-right mb-4">خدمات ما</h2>
            <ul className="space-y-3 text-right">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">
                  لیست کامل پیمانکاران دارای رتبه در ساخت نیروگاه‌های خورشیدی
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">
                  دایرکتوری مشاوران تایید شده در صنعت انرژی خورشیدی
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">
                  اطلاعات شرکت‌های شعبه فعال در این حوزه
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">
                  امکان جستجو و فیلتر بر اساس معیارهای مختلف
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">
                  دسترسی به اطلاعات تماس و جزئیات شرکت‌ها
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="pt-6 text-center space-y-4">
            <h2 className="text-2xl font-bold">تماس با ما</h2>
            <p className="text-muted-foreground">
              برای افزودن اطلاعات شرکت خود یا هرگونه سوال و پیشنهاد، با ما در تماس باشید
            </p>
            <div className="flex flex-col gap-2 items-center">
              <a
                href="mailto:info@solarbazar.ir"
                className="text-primary hover:underline"
              >
                info@solarbazar.ir
              </a>
              <a
                href="tel:02112345678"
                className="text-primary hover:underline"
                dir="ltr"
              >
                021-12345678
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
