'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sun, Search, Loader2 } from 'lucide-react';
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
      <div className="mx-auto flex min-h-14 w-full max-w-[1240px] items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5 lg:px-7">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
          <div className="p-1 sm:p-1.5 rounded-chip bg-[#6D7F9F]/10 group-hover:bg-[#6D7F9F]/20 transition-colors">
            <Sun className="h-6 w-6 sm:h-7 sm:w-7 text-[#6D7F9F] transition-transform group-hover:rotate-12" />
          </div>
          <span className="hidden text-base font-black text-slate-900 whitespace-nowrap sm:inline lg:text-xl">سولار مارکت</span>
        </Link>

        {/* Navigation & Mobile Hamburger Menu */}
        <Navigation />

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative mx-1 flex h-10 min-w-0 flex-1 items-center rounded-full border border-[#6D7F9F]/20 bg-slate-100/90 transition-colors focus-within:border-[#6D7F9F] focus-within:bg-white sm:max-w-[230px] lg:max-w-[310px]">
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
          className="h-9 shrink-0 rounded-chip bg-[#6D7F9F] px-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#56698a] sm:px-4 sm:text-sm"
        >
          ثبت‌نام / ورود
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
