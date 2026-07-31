'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Store, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function SoonModal({
  isOpen,
  onClose,
  title = 'بخش فروشندگان به زودی فعال می‌شود',
  description = 'سامانه جامع فروشندگان و تامین‌کنندگان تجهیزات خورشیدی در حال آماده‌سازی و بروزرسانی است. به زودی می‌توانید به لیست کامل تامین‌کنندگان دسترسی داشته باشید.',
}: SoonModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-[#6D7F9F]" />

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="بستن"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
            <Store className="h-7 w-7 text-amber-500" />
          </div>

          <div className="space-y-2 pt-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-800 text-xs font-black">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>به زودی</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="bg-[#6D7F9F] hover:bg-[#56698a] text-white px-5 h-9 rounded-chip font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            متوجه شدم
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
