'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { FilterState } from '@/types';

interface CompanyFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function CompanyFilters({ filters, onFilterChange }: CompanyFiltersProps) {
  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, status]
      : filters.status.filter((s) => s !== status);
    
    onFilterChange({ ...filters, status: newStatus });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      status: ['active'],
      featuredOnly: false,
    });
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-background sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-right">فیلترها</h3>
        {(filters.search || filters.status.length > 1 || filters.featuredOnly) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-0 text-xs"
          >
            پاک کردن همه
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">جستجو</Label>
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="نام شرکت..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pr-10"
            dir="rtl"
          />
        </div>
      </div>
      
      {/* Status Filter */}
      <div className="space-y-3">
        <Label>وضعیت</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="active"
              checked={filters.status.includes('active')}
              onCheckedChange={(checked) => handleStatusChange('active', !!checked)}
            />
            <label htmlFor="active" className="text-sm cursor-pointer">
              فعال
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="inactive"
              checked={filters.status.includes('inactive')}
              onCheckedChange={(checked) => handleStatusChange('inactive', !!checked)}
            />
            <label htmlFor="inactive" className="text-sm cursor-pointer">
              غیرفعال
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="expired"
              checked={filters.status.includes('expired')}
              onCheckedChange={(checked) => handleStatusChange('expired', !!checked)}
            />
            <label htmlFor="expired" className="text-sm cursor-pointer">
              منقضی شده
            </label>
          </div>
        </div>
      </div>
      
      {/* Featured Only */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="featured"
          checked={filters.featuredOnly}
          onCheckedChange={(checked) => 
            onFilterChange({ ...filters, featuredOnly: !!checked })
          }
        />
        <label htmlFor="featured" className="text-sm cursor-pointer">
          فقط ویژه‌ها
        </label>
      </div>
    </div>
  );
}
