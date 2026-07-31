'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { SoonModal } from '@/components/ui/soon-modal';

export interface NavItem {
  href: string;
  label: string;
  badge?: string;
  isSoon?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'خانه' },
  { href: '/contractors', label: 'پیمانکاران' },
  { href: '/sellers', label: 'فروشندگان', badge: 'به زودی', isSoon: true },
  { href: '/consultants', label: 'مشاوران' },
  { href: '/about', label: 'درباره ما' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soonModalOpen, setSoonModalOpen] = useState(false);
  const [soonModalTitle, setSoonModalTitle] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking anywhere outside of containerRef or pressing Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const isItemActive = (href: string) => {
    if (href === '/contractors' && pathname === '/contractors') {
      return true;
    }
    return pathname === href;
  };

  const handleSoonClick = (item: NavItem) => {
    setSoonModalTitle(`بخش ${item.label} به زودی فعال می‌شود`);
    setSoonModalOpen(true);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-5">
        {navItems.map((item) =>
          item.isSoon ? (
            <button
              key={item.href}
              type="button"
              onClick={() => handleSoonClick(item)}
              className="group relative inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-amber-700 transition-all cursor-pointer border border-amber-400/80 bg-amber-50/60 hover:bg-amber-100/80 px-2.5 py-1 rounded-full shadow-2xs hover:shadow-xs"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white shadow-2xs group-hover:bg-amber-600 transition-colors">
                  {item.badge}
                </span>
              )}
            </button>
          ) : (
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
          )
        )}
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
            <div className="flex flex-col gap-2">
              {navItems.map((item) =>
                item.isSoon ? (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSoonClick(item);
                    }}
                    className="w-full text-base font-bold text-slate-700 hover:text-amber-700 transition-all text-right py-2.5 px-3 rounded-xl hover:bg-amber-50 flex items-center justify-between cursor-pointer border border-amber-400/80 bg-amber-50/50"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white shadow-2xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ) : (
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
                )
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Coming Soon Notification Modal */}
      <SoonModal
        isOpen={soonModalOpen}
        onClose={() => setSoonModalOpen(false)}
        title={soonModalTitle}
      />
    </div>
  );
}
