import {
  querySmallScaleContractors,
  queryMegawattContractors,
  queryConsultants,
  SmallScaleRecord,
  MegawattRecord,
  ConsultantRecord,
  PaginatedResult as LoaderPaginatedResult,
} from './data-loader';

// Unified Base Interface across all 3 files
export interface ContractorRecord {
  company_name: string;
  national_id: string[];
  expiration_date: string;
  is_expired: boolean;
  status_text: string;
  phone_numbers: string[];
  ranks: string[];
}

export type { SmallScaleRecord, MegawattRecord, ConsultantRecord };

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 1. Paginated fetcher for Small Scale Contractors
export function getSmallScaleContractors(
  page: number = 1,
  pageSize: number = 10,
  searchQuery: string = ''
): PaginatedResult<SmallScaleRecord> {
  const result = querySmallScaleContractors({
    page,
    limit: pageSize,
    search: searchQuery,
  });

  return {
    data: result.data,
    total: result.total,
    page: result.page,
    pageSize: result.limit,
    totalPages: result.totalPages,
  };
}

// 2. Paginated fetcher for Consultants
export function getConsultants(
  page: number = 1,
  pageSize: number = 10,
  searchQuery: string = ''
): PaginatedResult<ConsultantRecord> {
  const result = queryConsultants({
    page,
    limit: pageSize,
    search: searchQuery,
  });

  return {
    data: result.data,
    total: result.total,
    page: result.page,
    pageSize: result.limit,
    totalPages: result.totalPages,
  };
}

// 3. Paginated fetcher for Megawatt Contractors
export function getMegawattContractors(
  page: number = 1,
  pageSize: number = 10,
  searchQuery: string = ''
): PaginatedResult<MegawattRecord> {
  const result = queryMegawattContractors({
    page,
    limit: pageSize,
    search: searchQuery,
  });

  return {
    data: result.data,
    total: result.total,
    page: result.page,
    pageSize: result.limit,
    totalPages: result.totalPages,
  };
}
