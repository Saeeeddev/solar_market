import Link from 'next/link';
import { Sun, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-16">
      <div className="wrap py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sun className="h-8 w-8 text-secondary" />
              <span className="text-xl font-bold text-foreground">سولار بازار</span>
            </div>
            <p className="text-sm text-muted-foreground text-right leading-relaxed">
              دایرکتوری جامع صنعت خورشیدی ایران - دسترسی آسان به پیمانکاران، مشاوران و شرکت‌های فعال در حوزه نیروگاه‌های خورشیدی
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-right text-foreground">دسترسی سریع</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/vendors" className="text-sm text-muted-foreground hover:text-primary transition-colors text-right">
                پیمانکاران
              </Link>
              <Link href="/consultants" className="text-sm text-muted-foreground hover:text-primary transition-colors text-right">
                مشاوران
              </Link>
              <Link href="/branch-companies" className="text-sm text-muted-foreground hover:text-primary transition-colors text-right">
                شرکت‌های شعبه
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors text-right">
                درباره ما
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-right text-foreground">تماس با ما</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span dir="ltr">info@solarbazar.ir</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span dir="ltr">021-12345678</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} سولار بازار. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
