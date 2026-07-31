'use client';

import { useState } from 'react';
import { CompanyGrid } from '@/components/company/CompanyGrid';
import { CompanyFilters } from '@/components/company/CompanyFilters';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { useBranchCompanies } from '@/lib/api/queries';
import type { FilterState } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BranchCompaniesPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: ['active'],
    featuredOnly: false,
  });

  const { data, isLoading, isError } = useBranchCompanies({
    page,
    search: filters.search || undefined,
    status: filters.status.join(',') || undefined,
  });

  const totalPages = data ? Math.ceil(data.count / 12) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">شرکت‌های شعبه</h1>
          <p className="text-muted-foreground">
            لیست کامل شرکت‌های شعبه تایید شده در صنعت نیروگاه‌های خورشیدی
          </p>
          {data && (
            <p className="text-sm text-muted-foreground">
              {data.count} شرکت یافت شد
            </p>
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <CompanyFilters filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {isError && <ErrorMessage message="خطا در بارگذاری شرکت‌ها" />}
            
            {data && (
              <>
                <CompanyGrid
                  companies={data.results}
                  isLoading={isLoading}
                  type="branch"
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            variant={page === pageNum ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPage(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      {totalPages > 5 && (
                        <>
                          <span className="text-muted-foreground">...</span>
                          <Button
                            variant={page === totalPages ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPage(totalPages)}
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
