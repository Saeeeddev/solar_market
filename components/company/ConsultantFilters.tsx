'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw } from 'lucide-react';
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
    <div className="space-y-6 p-5 border border-border rounded-card bg-background shadow-card sticky top-20">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="font-semibold text-sm text-foreground">فیلترهای مشاوران</h3>

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

      {/* Rank Filter */}
      <div className="space-y-2">
        <Label htmlFor="rank-filter" className="text-xs">
          {headers[2] || 'رتبه نیرو'}
        </Label>
        <Input
          id="rank-filter"
          type="text"
          placeholder="مثلا: رتبه ۱، تولید نیرو..."
          value={filters.rank}
          onChange={(e) => onFilterChange({ ...filters, rank: e.target.value })}
          className="text-xs rounded-chip"
          dir="rtl"
        />
      </div>

      {/* Status Filter */}
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

      {totalResults !== undefined && (
        <div className="pt-2 text-center border-t border-border text-xs text-muted-foreground">
          {totalResults.toLocaleString('fa-IR')} مشاور یافت شد
        </div>
      )}
    </div>
  );
}
