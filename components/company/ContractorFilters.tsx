'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw, Zap, Building2, Award } from 'lucide-react';
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
  { label: 'بدون رتبه', value: 'no_rank' },
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
  const isSmallScale = filters.type === 'small';

  const resetFilters = () => {
    onFilterChange({
      type: filters.type,
      search: '',
      status: 'all',
      certificate: 'all',
      rank: '',
    });
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.certificate !== 'all' ||
    filters.rank !== '';

  return (
    <div className="space-y-6 p-5 border border-slate-200/80 rounded-card bg-white shadow-card sticky top-20">
      {/* Type Switcher Selector (Keep only this button option here as requested) */}
      <div className="space-y-2">
        <Label className="text-xs font-black text-slate-900">انتخاب دسته پیمانکاران</Label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-chip">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, type: 'small', certificate: 'all', rank: '' })}
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
            onClick={() => onFilterChange({ ...filters, type: 'megawatt', certificate: 'all', rank: '' })}
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

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <h3 className="font-black text-xs text-slate-900">فیلترهای اختصاصی</h3>

        {hasActiveFilters && (
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

      {/* PROMINENT & BOLDER SEARCH BAR */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-xs font-extrabold text-slate-900">
          جستجوی پیشرفته ({headers[0] || 'نام شرکت'})
        </Label>
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-[#6D7F9F]" />
          <Input
            id="search"
            type="text"
            placeholder="جستجوی نام شرکت، شناسه ملی..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pr-9 h-10 text-xs font-extrabold rounded-chip border-2 border-slate-300 focus:border-[#6D7F9F] bg-slate-50 focus:bg-white text-slate-900 shadow-xs placeholder:font-normal"
            dir="rtl"
          />
        </div>
      </div>

      {/* RANK FILTER (DISABLED/HIDDEN FOR SMALL SCALE, ACTIVE FOR MEGAWATT) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className={cn("text-xs font-extrabold flex items-center gap-1", isSmallScale ? "text-slate-400" : "text-slate-900")}>
            <Award className="h-3.5 w-3.5 text-[#6D7F9F]" />
            فیلتر رتبه (۷ حالت)
          </Label>
          {isSmallScale && (
            <span className="text-[10px] text-slate-400 font-bold">(نامربوط برای مقیاس کوچک)</span>
          )}
        </div>

        {isSmallScale ? (
          <div className="p-3 bg-slate-100 rounded-chip text-center text-xs text-slate-500 font-semibold border border-slate-200">
            پیمانکاران مقیاس کوچک فاقد رتبه‌بندی سازمان برنامه هستند
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-chip text-xs">
            {rankOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onFilterChange({ ...filters, rank: opt.value })}
                className={cn(
                  'py-2 px-2 rounded-chip font-black transition-all text-xs text-center',
                  filters.rank === opt.value
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
        <Label className="text-xs font-extrabold text-slate-900">
          وضعیت اعتبار ({headers[4] || 'تاریخ انقضاء'})
        </Label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-chip text-xs">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, status: 'all' })}
            className={cn(
              'py-1.5 rounded-chip font-bold transition-all',
              filters.status === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            )}
          >
            همه
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, status: 'valid' })}
            className={cn(
              'py-1.5 rounded-chip font-bold transition-all',
              filters.status === 'valid' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
            )}
          >
            معتبر
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, status: 'expired' })}
            className={cn(
              'py-1.5 rounded-chip font-bold transition-all',
              filters.status === 'expired' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600'
            )}
          >
            منقضی
          </button>
        </div>
      </div>

      {/* Certificate Filter for Small Scale */}
      {isSmallScale && (
        <div className="space-y-2">
          <Label className="text-xs font-extrabold text-slate-900">
            {headers[2] || 'گواهینامه پیمانکاری'}
          </Label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-chip text-xs">
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, certificate: 'all' })}
              className={cn(
                'py-1.5 rounded-chip font-bold transition-all',
                filters.certificate === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              )}
            >
              همه
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, certificate: 'has_cert' })}
              className={cn(
                'py-1.5 rounded-chip font-bold transition-all',
                filters.certificate === 'has_cert' ? 'bg-[#6D7F9F] text-white shadow-xs' : 'text-slate-600'
              )}
            >
              دارد
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, certificate: 'no_cert' })}
              className={cn(
                'py-1.5 rounded-chip font-bold transition-all',
                filters.certificate === 'no_cert' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600'
              )}
            >
              ندارد
            </button>
          </div>
        </div>
      )}

      {totalResults !== undefined && (
        <div className="pt-3 text-center border-t border-slate-100 text-xs font-extrabold text-[#6D7F9F]">
          {totalResults.toLocaleString('fa-IR')} پیمانکار یافته شد
        </div>
      )}
    </div>
  );
}
