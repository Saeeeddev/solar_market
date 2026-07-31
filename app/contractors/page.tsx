'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CompanyGrid } from '@/components/company/CompanyGrid';
import { ContractorFilters, ContractorFilterState } from '@/components/company/ContractorFilters';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { useContractors } from '@/lib/api/queries';
import { ChevronLeft, ChevronRight, Zap, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

function ContractorsContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'megawatt' ? 'megawatt' : 'small';

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ContractorFilterState>({
    type: initialType,
    search: '',
    status: 'all',
    certificate: 'all',
    rank: '',
  });

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
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold">
                {data?.category_title_fa || (isSmallScale ? 'پیمانکاران مقیاس کوچک' : 'پیمانکاران مگاواتی')}
              </h1>
              <p className="text-muted-foreground">
                لیست کامل پیمانکاران تایید شده در صنعت نیروگاه‌های خورشیدی
              </p>
              {data && (
                <p className="text-sm text-muted-foreground">
                  {data.total.toLocaleString('fa-IR')} پیمانکار یافت شد
                </p>
              )}
            </div>

            {/* Quick Type Switcher Tabs */}
            <div className="flex items-center gap-2 bg-muted p-1 rounded-chip">
              <button
                type="button"
                onClick={() => handleFilterChange({ ...filters, type: 'small' })}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-chip text-xs font-bold transition-all',
                  isSmallScale
                    ? 'bg-background text-primary shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Zap className="h-4 w-4 text-primary" />
                مقیاس کوچک (۸۷۰ شرکت)
              </button>

              <button
                type="button"
                onClick={() => handleFilterChange({ ...filters, type: 'megawatt' })}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-chip text-xs font-bold transition-all',
                  !isSmallScale
                    ? 'bg-background text-secondary shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Building2 className="h-4 w-4 text-secondary" />
                مگاواتی (۲۶۹ شرکت)
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <ContractorFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              headers={data?.headers}
              totalResults={data?.total}
            />
          </aside>

          {/* Main Content Grid */}
          <main className="lg:col-span-3 space-y-6">
            {isError && <ErrorMessage message="خطا در دریافت اطلاعات پیمانکاران" />}

            {(isLoading || (isFetching && !data)) ? (
              <LoadingSpinner />
            ) : data ? (
              <>
                <CompanyGrid
                  companies={data.data}
                  isLoading={false}
                  type={filters.type}
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
                        let pageNum = page - 2 + i;
                        if (page <= 3) pageNum = i + 1;
                        if (page > data.totalPages - 2) pageNum = data.totalPages - 4 + i;
                        if (pageNum < 1 || pageNum > data.totalPages) return null;

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

export default function ContractorsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ContractorsContent />
    </Suspense>
  );
}
