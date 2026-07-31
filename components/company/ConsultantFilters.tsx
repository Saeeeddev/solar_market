'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw, Award } from 'lucide-react';
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
  { label: 'بدون رتبه', value: 'no_rank' },
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
  const resetFilters = () => {
    onFilterChange({
      search: '',
      status: 'all',
      rank: '',
    });
  };

  const hasActiveFilters =
    filters.search !== '' || filters.status !== 'all' || filters.rank !== '';

  return (
    <div className="space-y-6 p-5 border border-slate-200/80 rounded-card bg-white shadow-card sticky top-20">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-bold text-xs text-slate-800">فیلترهای مشاوران</h3>

        {hasActiveFilters && (
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
        <Label htmlFor="search" className="text-xs font-semibold text-slate-700">
          جستجو ({headers[0] || 'نام شرکت'})
        </Label>
        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            id="search"
            type="text"
            placeholder="نام شرکت، شناسه ملی، شماره تماس..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pr-9 text-xs rounded-chip border-slate-200 bg-slate-50 focus:bg-white"
            dir="rtl"
          />
        </div>
      </div>

      {/* 7 RANK BUTTONS FILTER */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
          <Award className="h-3.5 w-3.5 text-purple-600" />
          فیلتر رتبه نیرو (۷ حالت)
        </Label>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-chip text-xs">
          {rankOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onFilterChange({ ...filters, rank: opt.value })}
              className={cn(
                'py-1.5 px-2 rounded-chip font-bold transition-all text-xs text-center',
                filters.rank === opt.value
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
        <Label className="text-xs font-semibold text-slate-700">
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

      {totalResults !== undefined && (
        <div className="pt-3 text-center border-t border-slate-100 text-xs font-bold text-purple-700">
          {totalResults.toLocaleString('fa-IR')} شرکت مشاور یافته شد
        </div>
      )}
    </div>
  );
}
