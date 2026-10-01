'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw, Zap, Building2, Award, SlidersHorizontal, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ContractorFilterState {
  type: 'small' | 'megawatt';
  search: string;
  status: 'all' | 'valid' | 'expired';
  certificate: 'all' | 'has_cert' | 'no_cert';
  rank: string;
}

interface ContractorFiltersProps {
  filters: ContractorFilterState;
  onFilterChange: (filters: ContractorFilterState) => void;
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

export function ContractorFilters({
  filters,
  onFilterChange,
  headers = [],
  totalResults,
}: ContractorFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const resetFilters = () => {
    onFilterChange({
      type: filters.type,
      search: '',
      status: 'all',
      certificate: 'all',
      rank: '',
    });
  };

  const hasActiveFilters = (f: ContractorFilterState) =>
    f.search !== '' || f.status !== 'all' || f.certificate !== 'all' || f.rank !== '';

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
    currentFilters: ContractorFilterState,
    updateFn: (newF: ContractorFilterState) => void,
    isMobileView: boolean = false
  ) => {
    const isSmallScale = currentFilters.type === 'small';

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4 pt-2">
          <h3 className="flex items-center gap-2 text-xl font-black text-slate-900">
            <SlidersHorizontal className="h-5 w-5 text-[#6D7F9F]" />
            فیلترها
          </h3>

          {hasActiveFilters(currentFilters) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-auto p-0 text-xs text-rose-600 hover:text-rose-700 font-bold"
            >
              <RotateCcw className="h-3 w-3 ml-1" />
              پاک کردن فیلترها
            </Button>
          )}
        </div>

        {/* Type Switcher Selector */}
        <div className="space-y-2">
          <Label className="text-sm font-bold text-slate-800">انتخاب دسته پیمانکاران</Label>
          <div className="grid grid-cols-2 gap-2 rounded-chip bg-slate-100 p-1 ring-1 ring-slate-200">
            <button
              type="button"
              onClick={() => updateFn({ ...currentFilters, type: 'small', certificate: 'all', rank: '' })}
              className={cn(
                'flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-chip text-xs font-extrabold transition-all',
                isSmallScale
                  ? 'bg-[#6D7F9F] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              )}
            >
              <Zap className="h-4 w-4" />
              مقیاس کوچک
            </button>

            <button
              type="button"
              onClick={() => updateFn({ ...currentFilters, type: 'megawatt', certificate: 'all', rank: '' })}
              className={cn(
                'flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-chip text-xs font-extrabold transition-all',
                !isSmallScale
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              )}
            >
              <Building2 className="h-4 w-4" />
              مگاواتی
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="space-y-2">
          <Label htmlFor={isMobileView ? "mobile-search" : "search"} className="text-sm font-bold text-slate-800">
            جستجوی پیشرفته ({headers[0] || 'نام شرکت'})
          </Label>
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-[#6D7F9F]" />
            <Input
              id={isMobileView ? "mobile-search" : "search"}
              type="text"
              placeholder="جستجوی نام شرکت، شناسه ملی..."
              value={currentFilters.search}
              onChange={(e) => updateFn({ ...currentFilters, search: e.target.value })}
              className="h-10 rounded-chip border border-slate-300 bg-white pr-9 text-sm font-bold text-slate-900 focus:border-[#6D7F9F] placeholder:font-normal"
              dir="rtl"
            />
          </div>
        </div>

        {/* RANK FILTER */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className={cn("flex items-center gap-1 text-sm font-bold", isSmallScale ? "text-slate-500" : "text-slate-800")}>
              <Award className="h-3.5 w-3.5 text-[#6D7F9F]" />
              فیلتر رتبه (۷ حالت)
            </Label>
            {isSmallScale && (
              <span className="text-[10px] text-slate-400 font-bold">(نامربوط برای مقیاس کوچک)</span>
            )}
          </div>

          {isSmallScale ? (
            <div className="p-3 bg-slate-100 rounded-chip text-center text-xs text-slate-500 font-semibold">
              پیمانکاران مقیاس کوچک فاقد رتبه‌بندی سازمان برنامه هستند
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5 rounded-chip bg-slate-100 p-1 ring-1 ring-slate-200">
              {rankOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateFn({ ...currentFilters, rank: opt.value })}
                  className={cn(
                    'rounded-chip px-2 py-2 text-center text-sm font-bold transition-all',
                    currentFilters.rank === opt.value
                      ? 'bg-[#6D7F9F] text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/80'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
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

        {/* Certificate Filter for Small Scale */}
        {isSmallScale && (
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-800">
              {headers[2] || 'گواهینامه پیمانکاری'}
            </Label>
            <div className="grid grid-cols-3 gap-1.5 rounded-chip bg-slate-100 p-1 text-sm ring-1 ring-slate-200">
              <button
                type="button"
                onClick={() => updateFn({ ...currentFilters, certificate: 'all' })}
                className={cn(
                  'py-1.5 rounded-chip font-bold transition-all',
                  currentFilters.certificate === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                )}
              >
                همه
              </button>
              <button
                type="button"
                onClick={() => updateFn({ ...currentFilters, certificate: 'has_cert' })}
                className={cn(
                  'py-1.5 rounded-chip font-bold transition-all',
                  currentFilters.certificate === 'has_cert' ? 'bg-[#6D7F9F] text-white shadow-xs' : 'text-slate-600'
                )}
              >
                دارد
              </button>
              <button
                type="button"
                onClick={() => updateFn({ ...currentFilters, certificate: 'no_cert' })}
                className={cn(
                  'py-1.5 rounded-chip font-bold transition-all',
                  currentFilters.certificate === 'no_cert' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600'
                )}
              >
                ندارد
              </button>
            </div>
          </div>
        )}
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
            <div className="p-1.5 rounded-chip bg-[#6D7F9F]/10 text-[#6D7F9F]">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <span>فیلتر و جستجوی پیمانکاران</span>
            {hasActiveFilters(filters) && (
              <span className="px-2 py-0.5 rounded-chip bg-[#6D7F9F] text-white text-[10px] font-bold">
                فیلتر فعال
              </span>
            )}
          </div>
          {totalResults !== undefined && (
            <span className="text-xs font-bold text-[#6D7F9F]">
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
                <SlidersHorizontal className="h-4 w-4 text-[#6D7F9F]" />
                <h3 className="font-black text-sm text-slate-900">فیلتر و جستجوی پیمانکاران</h3>
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
                className="w-full h-12 bg-[#6D7F9F] hover:bg-[#56698a] text-white font-black text-sm rounded-chip shadow-md flex items-center justify-center gap-2 transition-all"
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
