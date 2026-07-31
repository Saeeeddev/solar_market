'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw, Zap, Building2 } from 'lucide-react';
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
    <div className="space-y-6 p-5 border border-border rounded-card bg-background shadow-card sticky top-20">
      {/* Type Switcher */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground">نوع پیمانکار</Label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-chip">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, type: 'small', certificate: 'all', rank: '' })}
            className={cn(
              'flex items-center justify-center gap-1.5 py-2 px-3 rounded-chip text-xs font-bold transition-all',
              isSmallScale
                ? 'bg-background text-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Zap className="h-4 w-4 text-primary" />
            مقیاس کوچک
          </button>

          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, type: 'megawatt', certificate: 'all', rank: '' })}
            className={cn(
              'flex items-center justify-center gap-1.5 py-2 px-3 rounded-chip text-xs font-bold transition-all',
              !isSmallScale
                ? 'bg-background text-secondary shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Building2 className="h-4 w-4 text-secondary" />
            مگاواتی
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <h3 className="font-semibold text-sm text-foreground">فیلترها</h3>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="h-3 w-3 ml-1" />
            پاک کردن
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-xs">
          جستجو ({headers[0] || 'نام شرکت'})
        </Label>
        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            type="text"
            placeholder="نام شرکت، شناسه ملی..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pr-9 text-xs rounded-chip"
            dir="rtl"
          />
        </div>
      </div>

      {/* Expiration Status */}
      <div className="space-y-2">
        <Label className="text-xs">وضعیت اعتبار ({headers[4] || 'تاریخ انقضاء'})</Label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-muted rounded-chip text-xs">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, status: 'all' })}
            className={cn(
              'py-1.5 rounded-chip font-medium transition-all',
              filters.status === 'all' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground'
            )}
          >
            همه
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, status: 'valid' })}
            className={cn(
              'py-1.5 rounded-chip font-medium transition-all',
              filters.status === 'valid' ? 'bg-secondary text-secondary-foreground shadow-xs font-bold' : 'text-muted-foreground'
            )}
          >
            معتبر
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, status: 'expired' })}
            className={cn(
              'py-1.5 rounded-chip font-medium transition-all',
              filters.status === 'expired' ? 'bg-destructive text-destructive-foreground shadow-xs font-bold' : 'text-muted-foreground'
            )}
          >
            منقضی
          </button>
        </div>
      </div>

      {/* Certificate Filter for Small Scale */}
      {isSmallScale && (
        <div className="space-y-2">
          <Label className="text-xs">{headers[2] || 'گواهینامه پیمانکاری'}</Label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-muted rounded-chip text-xs">
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, certificate: 'all' })}
              className={cn(
                'py-1.5 rounded-chip font-medium transition-all',
                filters.certificate === 'all' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground'
              )}
            >
              همه
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, certificate: 'has_cert' })}
              className={cn(
                'py-1.5 rounded-chip font-medium transition-all',
                filters.certificate === 'has_cert' ? 'bg-primary text-primary-foreground shadow-xs font-bold' : 'text-muted-foreground'
              )}
            >
              دارد
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, certificate: 'no_cert' })}
              className={cn(
                'py-1.5 rounded-chip font-medium transition-all',
                filters.certificate === 'no_cert' ? 'bg-background text-foreground shadow-xs font-bold' : 'text-muted-foreground'
              )}
            >
              ندارد
            </button>
          </div>
        </div>
      )}

      {/* Rank Filter for Megawatt */}
      {!isSmallScale && (
        <div className="space-y-2">
          <Label htmlFor="rank-filter" className="text-xs">
            {headers[2] || 'رتبه سازمان برنامه'}
          </Label>
          <Input
            id="rank-filter"
            type="text"
            placeholder="مثلا: رتبه ۱، رتبه ۲..."
            value={filters.rank}
            onChange={(e) => onFilterChange({ ...filters, rank: e.target.value })}
            className="text-xs rounded-chip"
            dir="rtl"
          />
        </div>
      )}

      {totalResults !== undefined && (
        <div className="pt-2 text-center border-t border-border text-xs text-muted-foreground">
          {totalResults.toLocaleString('fa-IR')} پیمانکار یافت شد
        </div>
      )}
    </div>
  );
}
