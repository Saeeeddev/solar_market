'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CompanyGrid } from '@/components/company/CompanyGrid';
import { ContractorFilters, ContractorFilterState } from '@/components/company/ContractorFilters';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { useContractors } from '@/lib/api/queries';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

function ContractorsContent({ initialType, initialSearch }: { initialType: 'small' | 'megawatt'; initialSearch: string }) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ContractorFilterState>({
    type: initialType,
    search: initialSearch,
    status: 'all',
    certificate: 'all',
    rank: '',
  });

  // Scroll to top whenever page or filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, filters]);

  const handleFilterChange = (newFilters: ContractorFilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  const { data, isLoading, isFetching, isError } = useContractors({
    type: filters.type,
    page,
    limit: 12,
    search: filters.search,
    status: filters.status,
    certificate: filters.certificate,
    rank: filters.rank,
  });

  const isSmallScale = filters.type === 'small';

  return (
    <div className="w-full px-3 py-8 sm:px-5 lg:py-10 lg:pl-8 lg:pr-[344px] 2xl:pl-12">
      <div className="space-y-6 md:space-y-8">
        {/* Clean Header (Duplicate top switcher buttons removed as requested) */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            {data?.category_title_fa || (isSmallScale ? 'پیمانکاران مقیاس کوچک' : 'پیمانکاران مگاواتی')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            لیست کامل پیمانکاران تایید شده نیروگاه‌های خورشیدی ایران
          </p>
        </div>

        {/* Content Layout */}
        <div className="space-y-5">
          {/* Filters Sidebar (Contains the category switcher buttons) */}
          <aside className="lg:fixed lg:top-14 lg:bottom-0 lg:right-0 lg:z-40 lg:w-[320px] lg:overflow-y-auto lg:border-l lg:border-slate-200 lg:bg-white lg:shadow-md">
            <ContractorFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              headers={data?.headers}
              totalResults={data?.total}
            />
          </aside>

          {/* Main Content Grid (1 card per row on mobile) */}
          <main id="results-section" className="min-w-0 space-y-6 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xl font-extrabold text-slate-900">نتایج</h2>
              {data && <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#6D7F9F]">{data.total.toLocaleString('fa-IR')} شرکت</span>}
            </div>
            {isError && <ErrorMessage message="خطا در دریافت اطلاعات پیمانکاران" />}

            {(isLoading || isFetching) ? (
              <LoadingSpinner />
            ) : data ? (
              <>
                <CompanyGrid
                  companies={data.data}
                  isLoading={false}
                  type={filters.type}
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
                        let pageNum = page - 2 + i;
                        if (page <= 3) pageNum = i + 1;
                        if (page > data.totalPages - 2) pageNum = data.totalPages - 4 + i;
                        if (pageNum < 1 || pageNum > data.totalPages) return null;

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

function ContractorsRoute() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'megawatt' ? 'megawatt' : 'small';
  const initialSearch = searchParams.get('search') || '';

  return <ContractorsContent key={searchParams.toString()} initialType={initialType} initialSearch={initialSearch} />;
}

export default function ContractorsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ContractorsRoute />
    </Suspense>
  );
}
