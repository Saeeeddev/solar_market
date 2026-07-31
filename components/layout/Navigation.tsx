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
  { href: '/branch-companies', label: 'شرکت‌های شعبه' },
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
              "text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400",
              isItemActive(item.href) ? "text-amber-600 dark:text-amber-400 font-bold" : "text-slate-700 dark:text-slate-200"
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
        className="md:hidden"
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
          <nav className="border-b bg-background p-6 shadow-lg">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-amber-600 text-right",
                    isItemActive(item.href) ? "text-amber-600 font-bold" : "text-foreground"
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
