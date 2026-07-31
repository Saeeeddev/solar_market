// App constants

export const APP_NAME = 'سولار مارکت';
export const APP_DESCRIPTION = 'دایرکتوری جامع صنعت خورشیدی ایران';

export const ITEMS_PER_PAGE = 12;

export const STATUS_LABELS = {
  active: 'فعال',
  inactive: 'غیرفعال',
  expired: 'منقضی شده',
} as const;

export const COMPANY_TYPE_LABELS = {
  vendor: 'پیمانکار',
  consultant: 'مشاور',
  branch: 'شرکت شعبه',
} as const;

export const ROUTES = {
  home: '/',
  vendors: '/vendors',
  consultants: '/consultants',
  branchCompanies: '/branch-companies',
  about: '/about',
} as const;
