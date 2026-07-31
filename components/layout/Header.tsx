'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sun, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Navigation } from './Navigation';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/contractors?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="wrap flex h-16 items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
          <div className="p-1 sm:p-1.5 rounded-chip bg-[#6D7F9F]/10 group-hover:bg-[#6D7F9F]/20 transition-colors">
            <Sun className="h-6 w-6 sm:h-7 sm:w-7 text-[#6D7F9F] transition-transform group-hover:rotate-12" />
          </div>
          <span className="text-base sm:text-xl md:text-2xl font-black text-slate-900 whitespace-nowrap">سولار بازار</span>
        </Link>

        {/* Global Search Bar (Always visible on mobile & desktop) */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5 flex-1 max-w-[200px] sm:max-w-xs md:max-w-sm mx-1">
          <div className="relative w-full">
            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-[#6D7F9F]" />
            <Input
              type="text"
              placeholder="جستجوی عمومی..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8 pl-2 h-9 w-full text-xs font-bold bg-slate-100/90 border-slate-300 focus:border-[#6D7F9F] focus:bg-white rounded-chip shadow-xs transition-all"
              dir="rtl"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="h-9 px-3 bg-[#6D7F9F] hover:bg-[#56698a] text-white text-xs font-bold rounded-chip shadow-xs transition-colors shrink-0 hidden sm:inline-flex"
          >
            جستجو
          </Button>
        </form>

        {/* Navigation & Mobile Hamburger Menu */}
        <Navigation />
      </div>
    </header>
  );
}
