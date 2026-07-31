'use client';

import { useState } from 'react';
import { CompanyGrid } from '@/components/company/CompanyGrid';
import { ConsultantFilters, ConsultantFilterState } from '@/components/company/ConsultantFilters';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { useConsultants } from '@/lib/api/queries';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function ConsultantsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ConsultantFilterState>({
    search: '',
    status: 'all',
    rank: '',
  });

  const handleFilterChange = (newFilters: ConsultantFilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  const { data, isLoading, isFetching, isError } = useConsultants({
    page,
    limit: 12,
    search: filters.search,
    status: filters.status,
    rank: filters.rank,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">مشاوران</h1>
          <p className="text-muted-foreground">
            لیست کامل مشاوران تایید شده در صنعت نیروگاه‌های خورشیدی
          </p>
          {data && (
            <p className="text-sm text-muted-foreground">
              {data.total.toLocaleString('fa-IR')} مشاور یافت شد
            </p>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <ConsultantFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              headers={data?.headers}
              totalResults={data?.total}
            />
          </aside>

          {/* Main Grid */}
          <main className="lg:col-span-3 space-y-6">
            {isError && <ErrorMessage message="خطا در بارگذاری مشاوران" />}

            {(isLoading || (isFetching && !data)) ? (
              <LoadingSpinner />
            ) : data ? (
              <>
                <CompanyGrid
                  companies={data.data}
                  isLoading={false}
                  type="consultant"
                />

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-chip"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            variant={page === pageNum ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPage(pageNum)}
                            className="rounded-chip font-bold"
                          >
                            {pageNum.toLocaleString('fa-IR')}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                      disabled={page === data.totalPages}
                      className="rounded-chip"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
