'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw, Award, SlidersHorizontal, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ConsultantFilterState {
  search: string;
  status: 'all' | 'valid' | 'expired';
  rank: string;
}

interface ConsultantFiltersProps {
  filters: ConsultantFilterState;
  onFilterChange: (filters: ConsultantFilterState) => void;
  headers?: string[];
  totalResults?: number;
}

const rankOptions = [
  { label: 'همه', value: '' },
  { label: 'فاقد رتبه', value: 'no_rank' },
  { label: 'رتبه ۱', value: 'رتبه ۱' },
  { label: 'رتبه ۲', value: 'رتبه ۲' },
  { label: 'رتبه ۳', value: 'رتبه ۳' },
  { label: 'رتبه ۴', value: 'رتبه ۴' },
  { label: 'رتبه ۵', value: 'رتبه ۵' },
];

export function ConsultantFilters({
  filters,
  onFilterChange,
  headers = [],
  totalResults,
}: ConsultantFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const resetFilters = () => {
    onFilterChange({
      search: '',
      status: 'all',
      rank: '',
    });
  };

  const hasActiveFilters = (f: ConsultantFilterState) =>
    f.search !== '' || f.status !== 'all' || f.rank !== '';

  const handleMobileSubmit = () => {
    setMobileOpen(false);
    setTimeout(() => {
      const resultsEl = document.getElementById('results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    }, 100);
  };

  const renderFilterForm = (
    currentFilters: ConsultantFilterState,
    updateFn: (newF: ConsultantFilterState) => void,
    isMobileView: boolean = false
  ) => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-5">
          <h3 className="flex items-center gap-2 text-xl font-black text-slate-900">
            <SlidersHorizontal className="h-5 w-5 text-[#6D7F9F]" />
            فیلترها
          </h3>

          {hasActiveFilters(currentFilters) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-auto p-0 text-xs text-rose-600 hover:text-rose-700 font-semibold"
            >
              <RotateCcw className="h-3 w-3 ml-1" />
              پاک کردن
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor={isMobileView ? "mobile-search-consultant" : "search-consultant"} className="text-sm font-bold text-slate-800">
            جستجو ({headers[0] || 'نام شرکت'})
          </Label>
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              id={isMobileView ? "mobile-search-consultant" : "search-consultant"}
              type="text"
              placeholder="نام شرکت، شناسه ملی، شماره تماس..."
              value={currentFilters.search}
              onChange={(e) => updateFn({ ...currentFilters, search: e.target.value })}
              className="h-10 rounded-chip border border-slate-300 bg-white pr-9 text-sm focus:border-[#6D7F9F]"
              dir="rtl"
            />
          </div>
        </div>

        {/* 7 RANK BUTTONS FILTER */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1 text-sm font-bold text-slate-800">
            <Award className="h-3.5 w-3.5 text-purple-600" />
            فیلتر رتبه نیرو (۷ حالت)
          </Label>
          <div className="grid grid-cols-2 gap-1.5 rounded-chip bg-slate-100 p-1 ring-1 ring-slate-200">
            {rankOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateFn({ ...currentFilters, rank: opt.value })}
                className={cn(
                  'rounded-chip px-2 py-2 text-center text-sm font-bold transition-all',
                  currentFilters.rank === opt.value
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-bold text-slate-800">
            وضعیت اعتبار ({headers[4] || 'تاریخ انقضاء'})
          </Label>
          <div className="grid grid-cols-3 gap-1.5 rounded-chip bg-slate-100 p-1 text-sm ring-1 ring-slate-200">
            <button
              type="button"
              onClick={() => updateFn({ ...currentFilters, status: 'all' })}
              className={cn(
                'py-1.5 rounded-chip font-bold transition-all',
                currentFilters.status === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              )}
            >
              همه
            </button>
            <button
              type="button"
              onClick={() => updateFn({ ...currentFilters, status: 'valid' })}
              className={cn(
                'py-1.5 rounded-chip font-bold transition-all',
                currentFilters.status === 'valid' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
              )}
            >
              معتبر
            </button>
            <button
              type="button"
              onClick={() => updateFn({ ...currentFilters, status: 'expired' })}
              className={cn(
                'py-1.5 rounded-chip font-bold transition-all',
                currentFilters.status === 'expired' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600'
              )}
            >
              منقضی
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop filter panel is framed by the listing page. */}
      <div className="hidden p-6 lg:block">
        {renderFilterForm(filters, onFilterChange, false)}

      </div>

      {/* MOBILE COMPACT FILTER TRIGGER BUTTON */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setMobileOpen(true)}
          className="flex h-12 w-full items-center justify-between rounded-chip border border-[#6D7F9F]/40 bg-[#eef1f6] px-4 text-sm font-black text-slate-900 shadow-sm hover:bg-[#e6ebf3]"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-chip bg-purple-100 text-purple-700">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <span>فیلتر و جستجوی مشاوران</span>
            {hasActiveFilters(filters) && (
              <span className="px-2 py-0.5 rounded-chip bg-purple-600 text-white text-[10px] font-bold">
                فیلتر فعال
              </span>
            )}
          </div>
          {totalResults !== undefined && (
            <span className="text-xs font-bold text-purple-700">
              ({totalResults.toLocaleString('fa-IR')})
            </span>
          )}
        </Button>
      </div>

      {/* MOBILE FILTER MODAL / DRAWER */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in-0 duration-200"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="bg-white rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-purple-700" />
                <h3 className="font-black text-sm text-slate-900">فیلتر و جستجوی مشاوران</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                className="h-8 w-8 text-slate-500 rounded-chip"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto flex-1">
              {renderFilterForm(filters, onFilterChange, true)}
            </div>

            {/* Modal Footer with SUBMIT BUTTON */}
            <div className="p-4 bg-white shadow-lg space-y-2">
              <Button
                onClick={handleMobileSubmit}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded-chip shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Check className="h-5 w-5" />
                اعمال فیلتر و مشاهده نتایج
                {totalResults !== undefined && (
                  <span className="opacity-90 font-normal">({totalResults.toLocaleString('fa-IR')} مورد)</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
