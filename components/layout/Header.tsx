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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md shadow-xs">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-chip bg-[#6D7F9F]/10 group-hover:bg-[#6D7F9F]/20 transition-colors">
              <Sun className="h-7 w-7 text-[#6D7F9F] transition-transform group-hover:rotate-12" />
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-900">سولار بازار</span>
          </Link>

          <Navigation />
        </div>

        {/* Global Search Bar in Header */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center gap-1.5">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-[#6D7F9F]" />
            <Input
              type="text"
              placeholder="جستجوی عمومی پیمانکاران..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-9 pl-3 h-9 w-48 lg:w-64 text-xs font-bold bg-slate-100/90 border-slate-300 focus:border-[#6D7F9F] focus:bg-white rounded-chip shadow-xs transition-all"
              dir="rtl"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="h-9 px-3.5 bg-[#6D7F9F] hover:bg-[#56698a] text-white text-xs font-bold rounded-chip shadow-xs transition-colors"
          >
            جستجو
          </Button>
        </form>
      </div>
    </header>
  );
}
