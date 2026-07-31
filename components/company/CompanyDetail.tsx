import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MapPin, Globe, Award, Calendar } from 'lucide-react';
import Image from 'next/image';
import type { Vendor, Consultant, BranchCompany, CompanyType } from '@/types';

interface CompanyDetailProps {
  company: Vendor | Consultant | BranchCompany;
  type: CompanyType;
}

export function CompanyDetail({ company }: CompanyDetailProps) {
  const hasRating = 'rating' in company && company.rating;
  const hasSpecializations = 'specializations' in company && company.specializations;
  const hasProjectCapacity = 'project_capacity' in company && company.project_capacity;
  const hasCompletedProjects = 'completed_projects_count' in company && company.completed_projects_count;

  return (
    <div className="space-y-8">
      {/* Hero Section with Cover Image */}
      {company.cover_image && (
        <div className="relative h-64 w-full rounded-lg overflow-hidden">
          <Image
            src={company.cover_image}
            alt={company.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Header with Logo and Basic Info */}
      <div className="flex items-start gap-6 flex-col md:flex-row">
        {company.logo && (
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              fill
              className="object-contain rounded-lg border"
            />
          </div>
        )}
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            {company.is_featured && (
              <Badge variant="secondary">⭐ ویژه</Badge>
            )}
            <Badge 
              variant={
                company.status === 'active' ? 'default' : 
                company.status === 'expired' ? 'destructive' : 
                'secondary'
              }
            >
              {company.status === 'active' ? 'فعال' : 
               company.status === 'expired' ? 'منقضی شده' : 
               'غیرفعال'}
            </Badge>
          </div>
          
          <p className="text-muted-foreground">
            شناسه ملی: {company.national_id}
          </p>
          
          {hasRating && (
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-secondary" />
              <span className="font-medium">{(company as Vendor | Consultant).rating}</span>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Description */}
      {company.description && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">درباره شرکت</h2>
            <p className="text-right leading-relaxed whitespace-pre-wrap">
              {company.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Contact Information */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">اطلاعات تماس</h2>
          
          {/* Phone Numbers */}
          {company.phone_list && company.phone_list.length > 0 && (
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div className="flex flex-col gap-2">
                {company.phone_list.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone}`}
                    className="hover:text-primary transition-colors"
                    dir="ltr"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {/* Email */}
          {company.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a
                href={`mailto:${company.email}`}
                className="hover:text-primary transition-colors"
              >
                {company.email}
              </a>
            </div>
          )}
          
          {/* Address */}
          {company.address && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-right">{company.address}</p>
                {(company.city || company.province) && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {company.city}{company.city && company.province && '، '}
                    {company.province}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Website */}
          {company.website && (
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {company.website}
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Specializations & Capacity */}
      {(hasSpecializations || hasProjectCapacity || hasCompletedProjects) && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">تخصص‌ها و توانمندی‌ها</h2>
            
            {hasSpecializations && (company as Vendor | Consultant).specializations && (company as Vendor | Consultant).specializations!.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">حوزه‌های تخصصی:</h3>
                <div className="flex flex-wrap gap-2">
                  {(company as Vendor | Consultant).specializations!.map((spec, idx) => (
                    <Badge key={idx} variant="outline">{spec}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {hasProjectCapacity && (company as Vendor | Consultant).project_capacity && (
              <div>
                <h3 className="text-sm font-medium mb-2">ظرفیت پروژه:</h3>
                <p>{(company as Vendor | Consultant).project_capacity}</p>
              </div>
            )}
            
            {hasCompletedProjects && (company as Vendor | Consultant).completed_projects_count! > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">پروژه‌های انجام شده:</h3>
                <p className="text-2xl font-bold text-secondary">
                  {(company as Vendor | Consultant).completed_projects_count}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Gallery */}
      {company.gallery && company.gallery.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">گالری تصاویر</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {company.gallery.map((imageUrl, idx) => (
                <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`${company.name} - تصویر ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validity Info */}
      {company.expiration_date && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-medium">اعتبار مجوزها</h3>
                <p className="text-muted-foreground">
                  تا {company.expiration_date}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
