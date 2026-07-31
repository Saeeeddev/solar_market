import fs from 'fs';
import path from 'path';

export interface BaseRecord {
  company_name: string;
  national_id: string[];
  expiration_date: string;
  is_expired: boolean;
  status_text: string;
  phone_numbers: string[];
  ranks: string[];
}

export interface SmallScaleRecord extends BaseRecord {
  contractor_certificate: string;
  activity_conditions: string[];
}

export interface MegawattRecord extends BaseRecord {
  organization_rank: string[];
}

export interface ConsultantRecord extends BaseRecord {
  power_rank: string[];
}

export interface JSONDataContainer<T> {
  category: string;
  category_title_fa: string;
  headers: string[];
  total_count: number;
  records: T[];
}

export interface PaginatedResult<T> {
  data: T[];
  headers: string[];
  category_title_fa: string;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// In-memory cache for server-side JSON reads
let smallScaleCache: JSONDataContainer<SmallScaleRecord> | null = null;
let megawattCache: JSONDataContainer<MegawattRecord> | null = null;
let consultantsCache: JSONDataContainer<ConsultantRecord> | null = null;

function getLibDataPath(filename: string): string {
  return path.join(process.cwd(), 'lib', 'data', filename);
}

export function getSmallScaleData(): JSONDataContainer<SmallScaleRecord> {
  if (!smallScaleCache) {
    const filePath = getLibDataPath('small_scale_contractor.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    smallScaleCache = JSON.parse(rawData);
  }
  return smallScaleCache!;
}

export function getMegawattData(): JSONDataContainer<MegawattRecord> {
  if (!megawattCache) {
    const filePath = getLibDataPath('megarwatt_contactor.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    megawattCache = JSON.parse(rawData);
  }
  return megawattCache!;
}

export function getConsultantsData(): JSONDataContainer<ConsultantRecord> {
  if (!consultantsCache) {
    const filePath = getLibDataPath('consultants.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    consultantsCache = JSON.parse(rawData);
  }
  return consultantsCache!;
}

export function querySmallScaleContractors(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string; // 'all' | 'valid' | 'expired'
  certificate?: string; // 'all' | 'has_cert' | 'no_cert'
  rank?: string;
}): PaginatedResult<SmallScaleRecord> {
  const container = getSmallScaleData();
  let records = [...container.records];

  // 1. Filter by Search
  if (params.search && params.search.trim() !== '') {
    const q = params.search.trim().toLowerCase();
    records = records.filter((r) => {
      const nameMatch = r.company_name.toLowerCase().includes(q);
      const idMatch = r.national_id && r.national_id.some((id) => id.includes(q));
      const phoneMatch = r.phone_numbers && r.phone_numbers.some((phone) => phone.includes(q));
      const ranksMatch = r.ranks && r.ranks.some((rk) => rk.toLowerCase().includes(q));
      return nameMatch || idMatch || phoneMatch || ranksMatch;
    });
  }

  // 2. Filter by Status
  if (params.status && params.status !== 'all') {
    if (params.status === 'valid') {
      records = records.filter((r) => !r.is_expired && r.status_text === 'معتبر');
    } else if (params.status === 'expired') {
      records = records.filter((r) => r.is_expired || r.status_text !== 'معتبر');
    }
  }

  // 3. Filter by Certificate (گواهینامه پیمانکاری از سازمان برنامه)
  if (params.certificate && params.certificate !== 'all') {
    if (params.certificate === 'has_cert') {
      records = records.filter((r) => r.contractor_certificate === 'دارد');
    } else if (params.certificate === 'no_cert') {
      records = records.filter((r) => r.contractor_certificate === 'ندارد');
    }
  }

  // 4. Filter by Rank
  if (params.rank && params.rank.trim() !== '') {
    const rkQuery = params.rank.trim().toLowerCase();
    records = records.filter((r) =>
      r.ranks && r.ranks.some((rk) => rk.toLowerCase().includes(rkQuery))
    );
  }

  const total = records.length;
  const page = Math.max(1, params.page || 1);
  const limit = Math.max(1, params.limit || 12);
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paginatedData = records.slice(start, start + limit);

  return {
    data: paginatedData,
    headers: container.headers,
    category_title_fa: container.category_title_fa,
    total,
    page,
    limit,
    totalPages,
  };
}

export function queryMegawattContractors(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string; // 'all' | 'valid' | 'expired'
  rank?: string;
}): PaginatedResult<MegawattRecord> {
  const container = getMegawattData();
  let records = [...container.records];

  // 1. Filter by Search
  if (params.search && params.search.trim() !== '') {
    const q = params.search.trim().toLowerCase();
    records = records.filter((r) => {
      const nameMatch = r.company_name.toLowerCase().includes(q);
      const idMatch = r.national_id && r.national_id.some((id) => id.includes(q));
      const phoneMatch = r.phone_numbers && r.phone_numbers.some((phone) => phone.includes(q));
      const ranksMatch = r.ranks && r.ranks.some((rk) => rk.toLowerCase().includes(q));
      const orgRankMatch = r.organization_rank && r.organization_rank.some((rk) => rk.toLowerCase().includes(q));
      return nameMatch || idMatch || phoneMatch || ranksMatch || orgRankMatch;
    });
  }

  // 2. Filter by Status
  if (params.status && params.status !== 'all') {
    if (params.status === 'valid') {
      records = records.filter((r) => !r.is_expired && r.status_text === 'معتبر');
    } else if (params.status === 'expired') {
      records = records.filter((r) => r.is_expired || r.status_text !== 'معتبر');
    }
  }

  // 3. Filter by Rank
  if (params.rank && params.rank.trim() !== '') {
    const rkQuery = params.rank.trim().toLowerCase();
    records = records.filter((r) =>
      (r.ranks && r.ranks.some((rk) => rk.toLowerCase().includes(rkQuery))) ||
      (r.organization_rank && r.organization_rank.some((rk) => rk.toLowerCase().includes(rkQuery)))
    );
  }

  const total = records.length;
  const page = Math.max(1, params.page || 1);
  const limit = Math.max(1, params.limit || 12);
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paginatedData = records.slice(start, start + limit);

  return {
    data: paginatedData,
    headers: container.headers,
    category_title_fa: container.category_title_fa,
    total,
    page,
    limit,
    totalPages,
  };
}

export function queryConsultants(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string; // 'all' | 'valid' | 'expired'
  rank?: string;
}): PaginatedResult<ConsultantRecord> {
  const container = getConsultantsData();
  let records = [...container.records];

  // 1. Filter by Search
  if (params.search && params.search.trim() !== '') {
    const q = params.search.trim().toLowerCase();
    records = records.filter((r) => {
      const nameMatch = r.company_name.toLowerCase().includes(q);
      const idMatch = r.national_id && r.national_id.some((id) => id.includes(q));
      const phoneMatch = r.phone_numbers && r.phone_numbers.some((phone) => phone.includes(q));
      const ranksMatch = r.ranks && r.ranks.some((rk) => rk.toLowerCase().includes(q));
      const powerRankMatch = r.power_rank && r.power_rank.some((rk) => rk.toLowerCase().includes(q));
      return nameMatch || idMatch || phoneMatch || ranksMatch || powerRankMatch;
    });
  }

  // 2. Filter by Status
  if (params.status && params.status !== 'all') {
    if (params.status === 'valid') {
      records = records.filter((r) => !r.is_expired && r.status_text === 'معتبر');
    } else if (params.status === 'expired') {
      records = records.filter((r) => r.is_expired || r.status_text !== 'معتبر');
    }
  }

  // 3. Filter by Rank
  if (params.rank && params.rank.trim() !== '') {
    const rkQuery = params.rank.trim().toLowerCase();
    records = records.filter((r) =>
      (r.ranks && r.ranks.some((rk) => rk.toLowerCase().includes(rkQuery))) ||
      (r.power_rank && r.power_rank.some((rk) => rk.toLowerCase().includes(rkQuery)))
    );
  }

  const total = records.length;
  const page = Math.max(1, params.page || 1);
  const limit = Math.max(1, params.limit || 12);
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paginatedData = records.slice(start, start + limit);

  return {
    data: paginatedData,
    headers: container.headers,
    category_title_fa: container.category_title_fa,
    total,
    page,
    limit,
    totalPages,
  };
}
