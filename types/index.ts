// TypeScript types for Solar Bazar

export interface Vendor {
  id: number;
  name: string;
  slug: string;
  national_id?: string;
  rating?: string | number;
  phone?: string;
  phone_numbers?: string;
  phone_list?: string[];
  expiration_date?: string;
  status?: 'active' | 'inactive' | 'expired';
  is_featured: boolean;
  priority?: number;
  detail_page_completed?: boolean;
  
  // Detail page fields
  description?: string;
  email?: string;
  address?: string;
  city?: string;
  province?: string;
  website?: string;
  logo?: string | null;
  cover_image?: string | null;
  specializations?: string[];
  services?: string[];
  certifications?: string[];
  established_year?: number;
  employees_count?: number;
  project_capacity?: string;
  completed_projects_count?: number;
  projects_count?: number;
  total_capacity?: string;
  reviewCount?: number;
  specialties?: string[];
  completedProjects?: number;
  experience?: number;
  gallery?: string[];
  
  created_at: string;
  updated_at: string;
}

export interface Consultant {
  id: number;
  name: string;
  slug: string;
  national_id?: string;
  title?: string;
  rating?: string | number;
  phone?: string;
  phone_numbers?: string;
  phone_list?: string[];
  expiration_date?: string;
  status?: 'active' | 'inactive' | 'expired';
  is_featured: boolean;
  priority?: number;
  detail_page_completed?: boolean;
  
  // Detail page fields
  description?: string;
  email?: string;
  address?: string;
  city?: string;
  province?: string;
  website?: string;
  logo?: string | null;
  avatar?: string | null;
  cover_image?: string | null;
  specializations?: string[];
  education?: string[];
  certifications?: string[];
  years_of_experience?: number;
  project_capacity?: string;
  completed_projects_count?: number;
  projects_completed?: number;
  reviewCount?: number;
  specialties?: string[];
  completedProjects?: number;
  experience?: number;
  gallery?: string[];
  
  created_at: string;
  updated_at: string;
}

export interface BranchCompany {
  id: number;
  name: string;
  slug: string;
  national_id?: string;
  has_certificate?: boolean;
  activity_conditions?: string;
  expiration_date?: string;
  status?: 'active' | 'inactive' | 'expired';
  is_featured?: boolean;
  priority?: number;
  detail_page_completed?: boolean;
  phone_numbers?: string;
  phone?: string;
  phone_list?: string[];
  rating?: string | number;
  reviewCount?: number;
  specialties?: string[];
  completedProjects?: number;
  experience?: number;
  
  // Detail page fields
  description?: string;
  email?: string;
  address?: string;
  city?: string;
  province?: string;
  website?: string;
  logo?: string | null;
  cover_image?: string | null;
  services_provided?: string[];
  working_hours?: string;
  contact_info?: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  gallery?: string[];
  
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type CompanyType = 'vendor' | 'consultant' | 'branch';

export interface FilterState {
  search: string;
  status: string[];
  featuredOnly: boolean;
}
