import { useQuery } from '@tanstack/react-query';
import type { PaginatedResult } from '@/lib/utils/data-loader';

export interface ContractorQueryParams {
  type?: 'small' | 'megawatt';
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  certificate?: string;
  rank?: string;
}

export interface ConsultantQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  rank?: string;
}

export interface StatsData {
  small_scale_count: number;
  megawatt_count: number;
  consultants_count: number;
  total_contractors_count: number;
  total_companies_count: number;
}

// 1. Unified Contractors Query Hook
export function useContractors(params: ContractorQueryParams = {}) {
  const {
    type = 'small',
    page = 1,
    limit = 12,
    search = '',
    status = 'all',
    certificate = 'all',
    rank = '',
  } = params;

  return useQuery<PaginatedResult<any>>({
    queryKey: ['contractors', type, page, limit, search, status, certificate, rank],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        type,
        page: String(page),
        limit: String(limit),
        ...(search && { search }),
        ...(status !== 'all' && { status }),
        ...(certificate !== 'all' && { certificate }),
        ...(rank && { rank }),
      });

      const response = await fetch(`/api/contractors?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('خطا در دریافت اطلاعات پیمانکاران');
      }
      return response.json();
    },
    placeholderData: (previousData) => previousData,
  });
}

// Legacy alias for useVendors
export function useVendors(params: any = {}) {
  return useContractors({
    type: 'small',
    page: params.page,
    search: params.search,
    status: params.status,
  });
}

// 2. Small Scale Contractors Hook for Home Page
export function useSmallScaleContractors(limit = 6) {
  return useQuery<PaginatedResult<any>>({
    queryKey: ['contractors', 'small', 'home', limit],
    queryFn: async () => {
      const response = await fetch(`/api/contractors?type=small&page=1&limit=${limit}`);
      if (!response.ok) {
        throw new Error('خطا در دریافت پیمانکاران مقیاس کوچک');
      }
      return response.json();
    },
  });
}

// 3. Megawatt Contractors Hook for Home Page
export function useMegawattContractors(limit = 6) {
  return useQuery<PaginatedResult<any>>({
    queryKey: ['contractors', 'megawatt', 'home', limit],
    queryFn: async () => {
      const response = await fetch(`/api/contractors?type=megawatt&page=1&limit=${limit}`);
      if (!response.ok) {
        throw new Error('خطا در دریافت پیمانکاران مگاواتی');
      }
      return response.json();
    },
  });
}

// 4. Consultants Query Hook
export function useConsultants(params: ConsultantQueryParams = {}) {
  const {
    page = 1,
    limit = 12,
    search = '',
    status = 'all',
    rank = '',
  } = params;

  return useQuery<PaginatedResult<any>>({
    queryKey: ['consultants', page, limit, search, status, rank],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search && { search }),
        ...(status !== 'all' && { status }),
        ...(rank && { rank }),
      });

      const response = await fetch(`/api/consultants?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('خطا در دریافت اطلاعات مشاوران');
      }
      return response.json();
    },
    placeholderData: (previousData) => previousData,
  });
}

// 5. Featured Consultants Hook for Home Page
export function useFeaturedConsultants(limit = 4) {
  return useQuery<PaginatedResult<any>>({
    queryKey: ['consultants', 'featured', limit],
    queryFn: async () => {
      const response = await fetch(`/api/consultants?page=1&limit=${limit}`);
      if (!response.ok) {
        throw new Error('خطا در دریافت مشاوران');
      }
      return response.json();
    },
  });
}

// 6. Branch Companies Query Hook (for branch-companies page)
export function useBranchCompanies(params: any = {}) {
  return useQuery({
    queryKey: ['branch-companies', params],
    queryFn: async () => {
      const response = await fetch('/api/branch-companies');
      if (!response.ok) throw new Error('خطا در دریافت شرکت‌های شعبه');
      return response.json();
    },
  });
}

// 7. Stats Hook
export function useStats() {
  return useQuery<StatsData>({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats');
      if (!response.ok) {
        throw new Error('خطا در دریافت آمار');
      }
      return response.json();
    },
  });
}
