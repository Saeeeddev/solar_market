import { CompanyCard } from './CompanyCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';

interface CompanyGridProps {
  companies: any[];
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {companies.map((company, index) => (
        <div key={company.id || index} className="h-full">
          <CompanyCard company={company} type={type} />
        </div>
      ))}
    </div>
  );
}
