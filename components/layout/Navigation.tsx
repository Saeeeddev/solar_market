'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { href: '/', label: 'خانه' },
  { href: '/contractors', label: 'پیمانکاران' },
  { href: '/consultants', label: 'مشاوران' },
  { href: '/about', label: 'درباره ما' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isItemActive = (href: string) => {
    if (href === '/contractors' && (pathname === '/contractors' || pathname === '/vendors')) {
      return true;
    }
    return pathname === href;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-bold transition-colors hover:text-[#6D7F9F]",
              isItemActive(item.href)
                ? "text-[#6D7F9F] font-extrabold border-b-2 border-[#6D7F9F] pb-1"
                : "text-slate-700"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-[#6D7F9F]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-50 md:hidden">
          <nav className="border-b border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-bold transition-colors hover:text-[#6D7F9F] text-right",
                    isItemActive(item.href) ? "text-[#6D7F9F] font-extrabold" : "text-slate-700"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
