import Link from 'next/link';
import { Sun, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className=" bg-transparent mt-16">
      <div className="wrap py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sun className="h-8 w-8 text-[#6D7F9F]" />
              <span className="text-xl font-bold text-slate-900">سولار بازار</span>
            </div>
            <p className="text-sm text-slate-600 text-right leading-relaxed">
              دایرکتوری جامع صنعت خورشیدی ایران - دسترسی آسان به پیمانکاران و مشاوران تایید شده نیروگاه‌های خورشیدی
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-right text-slate-900">دسترسی سریع</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/contractors" className="text-sm text-slate-600 hover:text-[#6D7F9F] font-medium transition-colors text-right">
                پیمانکاران
              </Link>
              <Link href="/consultants" className="text-sm text-slate-600 hover:text-[#6D7F9F] font-medium transition-colors text-right">
                مشاوران
              </Link>
              <Link href="/about" className="text-sm text-slate-600 hover:text-[#6D7F9F] font-medium transition-colors text-right">
                درباره ما
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-right text-slate-900">تماس با ما</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="h-4 w-4 text-[#6D7F9F]" />
                <span dir="ltr">info@solarbazar.ir</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="h-4 w-4 text-[#6D7F9F]" />
                <span dir="ltr">021-12345678</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} سولار بازار. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
