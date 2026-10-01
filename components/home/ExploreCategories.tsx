'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { SoonModal } from '@/components/ui/soon-modal';

type Category = {
  name: string;
  href?: string;
};

const services: Category[] = [
  { name: 'مشاوره', href: '/consultants' },
  { name: 'پیمانکار مگاواتی', href: '/contractors?type=megawatt' },
  { name: 'پیمانکار انشعابی', href: '/contractors?type=small' },
  { name: 'اتصال به شبکه' },
];

const sellers: Category[] = [
  { name: 'پنل' },
  { name: 'اینورتر' },
  { name: 'سیم و کابل' },
  { name: 'سازه' },
  { name: 'تابلو برق' },
  { name: 'سیستم‌های مانیتورینگ' },
];

const categoryClass = 'group flex h-40 w-full flex-col justify-between rounded-card border-2 px-5 py-5 text-right shadow-sm transition-all duration-200 sm:h-44 sm:px-6 sm:py-6';

export function ExploreCategories() {
  const [comingSoon, setComingSoon] = useState<string | null>(null);
  const [sellerIndex, setSellerIndex] = useState(0);
  const sellerTrack = useRef<HTMLDivElement>(null);

  const moveSeller = (direction: -1 | 1) => {
    const next = Math.max(0, Math.min(sellers.length - 1, sellerIndex + direction));
    setSellerIndex(next);
    sellerTrack.current?.children[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const categoryCard = (item: Category, index: number, kind: 'service' | 'seller') => {
    const content = (
      <>
        <span className="text-sm font-bold text-[#6D7F9F]">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-xl font-extrabold leading-snug text-slate-900 sm:text-[22px]">{item.name}</span>
        <span className="flex items-center gap-1.5 text-sm font-bold text-[#56698a]">
          {item.href ? <>مشاهده دسته <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /></> : 'به زودی'}
        </span>
      </>
    );
    const className = `${categoryClass} ${kind === 'seller' ? 'border-[#93afb1]/55 bg-[#eaf1f1] hover:border-[#6f9092]' : 'border-[#6D7F9F]/35 bg-[#eef1f6] hover:border-[#6D7F9F]'} ${item.href ? 'hover:-translate-y-1 hover:shadow-md' : 'cursor-pointer hover:shadow-md'}`;

    return item.href ? (
      <Link key={`${kind}-${item.name}`} href={item.href} className={className}>
        {content}
      </Link>
    ) : (
      <button key={`${kind}-${item.name}`} type="button" onClick={() => setComingSoon(item.name)} className={className}>
        {content}
      </button>
    );
  };

  return (
    <section className="wrap space-y-5" aria-label="دسته‌بندی خدمات و فروشندگان">
      <div className="rounded-card border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex items-center gap-4 border-b border-slate-200 pb-4">
          <span className="h-7 w-1 rounded-full bg-[#6D7F9F]" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold text-slate-900">خدمات</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {services.map((item, index) => categoryCard(item, index, 'service'))}
        </div>
      </div>

      <div className="rounded-card border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-4">
            <span className="h-7 w-1 rounded-full bg-[#6D7F9F]" aria-hidden="true" />
            <h2 className="text-3xl font-extrabold text-slate-900">فروشندگان</h2>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => moveSeller(-1)} disabled={sellerIndex === 0} aria-label="دسته قبلی فروشندگان" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[#6D7F9F] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronRight className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => moveSeller(1)} disabled={sellerIndex === sellers.length - 1} aria-label="دسته بعدی فروشندگان" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[#6D7F9F] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div ref={sellerTrack} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-4">
          {sellers.map((item, index) => (
            <div key={item.name} className="w-[75%] shrink-0 snap-start sm:w-[42%] md:w-[30%] lg:w-[calc((100%-4rem)/5)]">
              {categoryCard(item, index, 'seller')}
            </div>
          ))}
        </div>
      </div>

      <SoonModal
        isOpen={comingSoon !== null}
        onClose={() => setComingSoon(null)}
        title={`${comingSoon ?? ''} به زودی فعال می‌شود`}
        description="این بخش در حال آماده‌سازی است."
      />
    </section>
  );
}
