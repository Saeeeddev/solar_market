'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SoonModal } from '@/components/ui/soon-modal';
import { Navigation } from './Navigation';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      router.push(`/contractors?search=${encodeURIComponent(searchQuery.trim())}`);
      setTimeout(() => setIsSearching(false), 800);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex min-h-14 w-full max-w-[1240px] flex-wrap items-center justify-between gap-2 px-3 py-2 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-0 lg:px-7">
        {/* Logo */}
        <Link href="/" aria-label="سولار مارکت - صفحه اصلی" className="group order-1 flex shrink-0 items-center gap-1.5 sm:order-none sm:gap-2">
          <Image src="/images/solarmarketLOGO.webp" width={2087} height={753} alt="سولار مارکت" className="h-10 w-auto transition-transform group-hover:scale-105 sm:h-11" priority />
        </Link>

        {/* Navigation & Mobile Hamburger Menu */}
        <Navigation />

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative order-4 mx-1 flex h-10 min-w-0 basis-full items-center rounded-full border border-[#6D7F9F]/20 bg-slate-100/90 transition-colors focus-within:border-[#6D7F9F] focus-within:bg-white sm:order-none sm:max-w-[230px] sm:flex-1 sm:basis-auto lg:max-w-[310px]">
          <Input
            type="search"
            aria-label="جستجو"
            placeholder="جستجوی عمومی..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-full min-w-0 flex-1 rounded-full border-0 bg-transparent pr-4 pl-11 text-xs font-bold shadow-none focus-visible:ring-0"
            dir="rtl"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isSearching}
            className="absolute left-1 h-8 w-8 rounded-full bg-[#6D7F9F] text-white shadow-xs hover:bg-[#56698a]"
            aria-label="اجرای جستجو"
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </form>

        <Button
          type="button"
          onClick={() => setLoginModalOpen(true)}
          className="order-3 h-9 shrink-0 rounded-chip bg-[#6D7F9F] px-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#56698a] sm:order-none sm:px-4 sm:text-sm"
        >
          <span className="sm:hidden">ورود</span>
          <span className="hidden sm:inline">ثبت‌نام / ورود</span>
        </Button>
      </div>
      <SoonModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title="ثبت‌نام و ورود به زودی فعال می‌شود"
        description="امکان ساخت حساب کاربری و ورود در حال آماده‌سازی است."
      />
    </header>
  );
}
