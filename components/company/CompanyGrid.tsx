import { CompanyCard, type CompanyRecord } from './CompanyCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';

interface CompanyGridProps {
  companies: CompanyRecord[];
  isLoading?: boolean;
  type?: 'small' | 'megawatt' | 'consultant' | 'vendor' | 'branch';
}

export function CompanyGrid({ companies, isLoading, type }: CompanyGridProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!companies || companies.length === 0) {
    return (
      <EmptyState
        title="هیچ داده‌ای یافت نشد"
        description="لطفاً عبارات جستجو یا فیلترهای انتخابی خود را بررسی نمایید."
      />
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 2xl:grid-cols-3">
      {companies.map((company, index) => (
        <div key={company.id || index} className="h-full">
          <CompanyCard company={company} type={type} />
        </div>
      ))}
    </div>
  );
}
