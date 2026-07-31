import Link from 'next/link';
import { Sun } from 'lucide-react';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass">
      <div className="wrap flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Sun className="h-8 w-8 text-secondary transition-transform group-hover:rotate-12" />
          <span className="text-2xl font-bold text-foreground">سولار بازار</span>
        </Link>
        
        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  );
}
