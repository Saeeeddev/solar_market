'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
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

  // Close mobile menu on Escape key press or route change
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        aria-label="منوی اصلی"
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Mobile Dropdown Menu & Fullscreen Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden animate-in fade-in-0 duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav
            className="bg-white border-b border-slate-200 p-5 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header row with Close button inside dropdown */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black text-slate-900">منوی دسترسی سریع</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs font-bold text-slate-500 hover:text-slate-900 rounded-chip flex items-center gap-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>بستن</span>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-bold transition-colors hover:text-[#6D7F9F] text-right py-2.5 px-3 rounded-chip hover:bg-slate-50 flex items-center justify-between",
                    isItemActive(item.href) ? "text-[#6D7F9F] font-extrabold bg-[#6D7F9F]/10" : "text-slate-700"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
