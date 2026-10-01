import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  Calendar,
  Building2,
  Award,
  CheckCircle2,
  XCircle,
  FileText,
  Zap,
  ShieldCheck,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface CompanyRecord {
  id?: string | number;
  company_name?: string;
  name?: string;
  national_id?: string | string[];
  phone_numbers?: string[];
  phone_list?: string[];
  phone?: string;
  expiration_date?: string;
  is_expired?: boolean;
  status?: string;
  status_text?: string;
  website?: string;
  website_url?: string;
  site?: string;
  category?: string;
  contractor_certificate?: string;
  organization_rank?: string[];
  power_rank?: string[];
  ranks?: string[];
  activity_conditions?: string[];
}

interface CompanyCardProps {
  company: CompanyRecord;
  type?: 'small' | 'megawatt' | 'consultant' | 'vendor' | 'branch';
}

export function CompanyCard({ company, type }: CompanyCardProps) {
  if (!company) return null;

  // Extract fields from JSON records
  const companyName = company.company_name || company.name || 'شرکت بدون نام';
  const nationalId = Array.isArray(company.national_id)
    ? company.national_id.join(' / ')
    : company.national_id || '-';
  const phoneNumbers: string[] = Array.isArray(company.phone_numbers)
    ? company.phone_numbers
    : company.phone_list || (company.phone ? [company.phone] : []);
  const expirationDate = company.expiration_date || '-';
  const isExpired = company.is_expired ?? company.status === 'expired';
  const statusText = company.status_text || (isExpired ? 'منقضی شده' : 'معتبر');

  // Extract website URL
  const rawWebsite = company.website || company.website_url || company.site || '';
  const hasWebsite = typeof rawWebsite === 'string' && rawWebsite.trim().length > 0;
  const websiteUrl = hasWebsite
    ? (rawWebsite.trim().startsWith('http://') || rawWebsite.trim().startsWith('https://')
        ? rawWebsite.trim()
        : `https://${rawWebsite.trim()}`)
    : '';

  // Determine category badge
  const isSmallScale =
    type === 'small' || company.category === 'small_scale_contractor' || company.contractor_certificate !== undefined;
  const isMegawatt =
    type === 'megawatt' || company.category === 'megarwatt_contactor' || company.organization_rank !== undefined;
  const isConsultant =
    type === 'consultant' || company.category === 'consultants' || company.power_rank !== undefined;

  // Combine unique ranks
  const ranks: string[] = [
    ...(company.ranks || []),
    ...(company.organization_rank || []),
    ...(company.power_rank || []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const activityConditions: string[] = company.activity_conditions || [];
  const hasCertificate = company.contractor_certificate === 'دارد';

  return (
    <Card className="group card-hover flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-card border-0 bg-white shadow-md ring-0 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="min-w-0 space-y-2.5 p-3.5 pb-2 sm:p-5">
        {/* Category & Status Badge Row */}
        <div className="flex items-center justify-between gap-1.5 flex-wrap">
          {/* Category Tag */}
          {isSmallScale && (
            <Badge variant="secondary" className="rounded-chip bg-[#6D7F9F]/10 text-[#6D7F9F] border-0 text-[10px] sm:text-xs font-bold px-2 py-0.5">
              <Zap className="h-3 w-3 ml-1 text-[#6D7F9F]" />
              مقیاس کوچک
            </Badge>
          )}
          {isMegawatt && (
            <Badge variant="secondary" className="rounded-chip bg-emerald-100/80 text-emerald-800 border-0 text-[10px] sm:text-xs font-bold px-2 py-0.5">
              <Building2 className="h-3 w-3 ml-1 text-emerald-700" />
              پیمانکار مگاواتی
            </Badge>
          )}
          {isConsultant && (
            <Badge variant="secondary" className="rounded-chip bg-purple-100/80 text-purple-800 border-0 text-[10px] sm:text-xs font-bold px-2 py-0.5">
              <Award className="h-3 w-3 ml-1 text-purple-700" />
              شرکت مشاور
            </Badge>
          )}

          {/* Status Badge */}
          <Badge
            variant={!isExpired ? 'default' : 'destructive'}
            className={cn(
              'rounded-chip text-[10px] sm:text-xs font-bold px-2 py-0.5 border-0',
              !isExpired ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-rose-600 text-white'
            )}
          >
            {!isExpired ? (
              <CheckCircle2 className="h-3 w-3 ml-0.5 inline" />
            ) : (
              <XCircle className="h-3 w-3 ml-0.5 inline" />
            )}
            {statusText}
          </Badge>
        </div>

        {/* Company Title */}
        <h3 className="break-words text-right text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#6D7F9F] sm:text-xl">
          {companyName}
        </h3>

        {/* National ID */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 text-right">
          <FileText className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
          <span>شناسه ملی: <strong className="font-bold text-slate-800">{nationalId}</strong></span>
        </div>
      </CardHeader>

      <CardContent className="flex min-w-0 flex-1 flex-col justify-between space-y-3 p-3.5 pt-0 sm:p-5">
        <div className="min-w-0 space-y-2.5">
          {/* Certificate Info (Small Scale) */}
          {company.contractor_certificate !== undefined && (
            <div className="flex items-center justify-between text-xs text-right pt-2">
              <span className="text-slate-600 font-medium">گواهینامه پیمانکاری:</span>
              <span
                className={cn(
                  'rounded-chip text-[10px] sm:text-xs font-bold px-2.5 py-1 border-0',
                  hasCertificate
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-slate-100 text-slate-700'
                )}
              >
                {company.contractor_certificate}
              </span>
            </div>
          )}

          {/* BOLD Ranks Chips */}
          {ranks.length > 0 && (
            <div className="flex min-w-0 flex-wrap gap-1.5 pt-1">
              {ranks.map((rank, idx) => (
                <span
                  key={idx}
                  className="max-w-full break-words whitespace-normal rounded-chip bg-[#6D7F9F]/15 px-2.5 py-1 text-right text-[10px] font-extrabold leading-relaxed text-[#3a4966] sm:text-xs"
                >
                  {rank}
                </span>
              ))}
            </div>
          )}

          {/* Activity Conditions (Contrast Gray Box) */}
          {activityConditions.length > 0 && (
            <div className="pt-1">
              <p className="text-[11px] sm:text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[#6D7F9F]" />
                شرایط فعالیت:
              </p>
              <div className="min-w-0 space-y-1 rounded-xl border-0 bg-slate-100 p-2.5 text-right text-[11px] leading-relaxed text-slate-800 sm:p-3 sm:text-xs">
                {activityConditions.map((cond, idx) => (
                  <div key={idx} className="flex min-w-0 items-start gap-1 font-medium">
                    <span className="text-[#6D7F9F] font-bold">•</span>
                    <span className="min-w-0 break-words">{cond}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM ROW: Expiration Date (Right) & STACKED BUTTON-LIKE PHONE NUMBERS (Left) */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-3">
          {/* Expiration Date */}
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-600">
            <Calendar className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
            <span>انقضاء: <strong className="font-bold text-slate-800">{expirationDate}</strong></span>
          </div>

          {/* PHONE NUMBERS IN STACKED BUTTON-LIKE BOXES */}
          {phoneNumbers.length > 0 ? (
            <div className="flex flex-col gap-1.5 text-left font-mono" dir="ltr">
              {phoneNumbers.slice(0, 2).map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-start gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-[#6D7F9F] text-[#3a4966] hover:text-white text-xs font-black rounded-chip transition-all shadow-2xs group/btn border-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="h-3 w-3 text-[#6D7F9F] group-hover/btn:text-white transition-colors flex-shrink-0" />
                  <span className="tracking-tight">{phone}</span>
                </a>
              ))}
            </div>
          ) : (
            <span className="text-[10px] text-slate-400 font-bold">-</span>
          )}
        </div>

        {/* WEBSITE BUTTON (Bottom Center) - Only rendered if company.website is present */}
        {hasWebsite && (
          <div className="mt-1 pt-1 border-t border-slate-100 flex items-center justify-center">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-[#6D7F9F] hover:bg-[#56698a] text-white text-xs font-bold rounded-chip transition-all shadow-xs group/web cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="h-4.5 w-4.5 text-white/90 group-hover/web:rotate-12 transition-transform" />
              <span>مشاهده وب‌سایت</span>
              <ExternalLink className="h-4 w-4 text-white/80" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
