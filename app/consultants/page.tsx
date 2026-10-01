'use client';

import { useState, useEffect } from 'react';
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

  // Scroll to top whenever page or filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, filters]);

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
    <div className="w-full px-3 py-8 sm:px-5 lg:py-10 lg:pl-8 lg:pr-[344px] 2xl:pl-12">
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">مشاوران</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            لیست کامل مشاوران تایید شده در صنعت نیروگاه‌های خورشیدی
          </p>
        </div>

        {/* Content Layout */}
        <div className="space-y-5">
          {/* Sidebar */}
          <aside className="lg:fixed lg:top-14 lg:bottom-0 lg:right-0 lg:z-40 lg:w-[320px] lg:overflow-y-auto lg:border-l lg:border-slate-200 lg:bg-white lg:shadow-md">
            <ConsultantFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              headers={data?.headers}
              totalResults={data?.total}
            />
          </aside>

          {/* Main Grid */}
          <main id="results-section" className="min-w-0 space-y-6 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xl font-extrabold text-slate-900">نتایج</h2>
              {data && <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#6D7F9F]">{data.total.toLocaleString('fa-IR')} مشاور</span>}
            </div>
            {isError && <ErrorMessage message="خطا در بارگذاری مشاوران" />}

            {(isLoading || isFetching) ? (
              <LoadingSpinner />
            ) : data ? (
              <>
                <CompanyGrid
                  companies={data.data}
                  isLoading={false}
                  type="consultant"
                />

                {/* Pagination Controls */}
                {data.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-6">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-chip border-slate-300 text-slate-700 hover:bg-[#6D7F9F]/10 hover:text-[#6D7F9F]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1 sm:gap-1.5">
                      {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        const isActive = page === pageNum;

                        return (
                          <Button
                            key={pageNum}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPage(pageNum)}
                            className={cn(
                              'rounded-chip font-bold transition-all text-xs px-3',
                              isActive
                                ? 'bg-[#6D7F9F] text-white hover:bg-[#56698a] shadow-xs'
                                : 'border-slate-300 text-slate-700 hover:bg-[#6D7F9F]/10 hover:text-[#6D7F9F]'
                            )}
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
                      className="rounded-chip border-slate-300 text-slate-700 hover:bg-[#6D7F9F]/10 hover:text-[#6D7F9F]"
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
