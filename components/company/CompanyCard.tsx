import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Calendar,
  Building2,
  Award,
  CheckCircle2,
  XCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Zap,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CompanyCardProps {
  company: any;
  type?: 'small' | 'megawatt' | 'consultant' | 'vendor' | 'branch';
}

export function CompanyCard({ company, type }: CompanyCardProps) {
  const [showDetails, setShowDetails] = useState(false);

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

  // Determine category badge text
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
    <Card className="group card-hover h-full flex flex-col justify-between rounded-card border-line-soft bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader className="space-y-3 pb-3">
        {/* Top Badge Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Category Tag */}
          {isSmallScale && (
            <Badge variant="secondary" className="rounded-chip bg-primary-soft text-primary-deep border-none text-xs font-medium">
              <Zap className="h-3.5 w-3.5 ml-1 text-primary-brand" />
              پیمانکار مقیاس کوچک
            </Badge>
          )}
          {isMegawatt && (
            <Badge variant="secondary" className="rounded-chip bg-secondary/10 text-secondary border-none text-xs font-medium">
              <Building2 className="h-3.5 w-3.5 ml-1" />
              پیمانکار مگاواتی
            </Badge>
          )}
          {isConsultant && (
            <Badge variant="secondary" className="rounded-chip bg-accent/10 text-accent-foreground border-none text-xs font-medium">
              <Award className="h-3.5 w-3.5 ml-1" />
              شرکت مشاور
            </Badge>
          )}

          {/* Status Badge */}
          <Badge
            variant={!isExpired ? 'default' : 'destructive'}
            className={cn(
              'rounded-chip text-xs font-semibold',
              !isExpired ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : ''
            )}
          >
            {!isExpired ? (
              <CheckCircle2 className="h-3.5 w-3.5 ml-1 inline" />
            ) : (
              <XCircle className="h-3.5 w-3.5 ml-1 inline" />
            )}
            {statusText}
          </Badge>
        </div>

        {/* Company Title */}
        <h3 className="text-xl font-bold text-right leading-relaxed text-ink group-hover:text-primary transition-colors">
          {companyName}
        </h3>

        {/* National ID */}
        <div className="flex items-center gap-2 text-sm text-muted-brand text-right">
          <FileText className="h-4 w-4 text-subtle flex-shrink-0" />
          <span>شناسه ملی: {nationalId}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {/* Certificate Info (Small Scale) */}
        {company.contractor_certificate !== undefined && (
          <div className="flex items-center justify-between text-sm text-right pt-2 border-t border-line-soft">
            <span className="text-muted-brand">گواهینامه پیمانکاری:</span>
            <Badge
              variant="outline"
              className={cn(
                'rounded-chip text-xs border-line',
                hasCertificate ? 'bg-primary-soft text-primary-deep' : 'bg-muted text-muted-foreground'
              )}
            >
              {company.contractor_certificate}
            </Badge>
          </div>
        )}

        {/* Expiration Date */}
        {expirationDate !== '-' && (
          <div className="flex items-center gap-2 text-sm text-muted-brand text-right pt-1">
            <Calendar className="h-4 w-4 text-subtle flex-shrink-0" />
            <span>تاریخ انقضاء: {expirationDate}</span>
          </div>
        )}

        {/* Phone Numbers */}
        {phoneNumbers.length > 0 && (
          <div className="flex items-start gap-2 text-sm text-right pt-2 border-t border-line-soft">
            <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
            <div className="flex flex-wrap gap-2" dir="ltr">
              {phoneNumbers.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone}`}
                  className="text-sm font-sans hover:text-primary transition-colors text-ink"
                  onClick={(e) => e.stopPropagation()}
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Ranks Chips */}
        {ranks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {ranks.slice(0, 3).map((rank, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs rounded-chip bg-primary-soft text-primary-deep border-none font-normal"
              >
                {rank}
              </Badge>
            ))}
            {ranks.length > 3 && (
              <Badge variant="outline" className="text-xs rounded-chip border-line text-subtle">
                +{ranks.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Activity Conditions Expandable */}
        {activityConditions.length > 0 && (
          <div className="pt-2 border-t border-line-soft">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full text-xs h-8 justify-between text-primary font-medium hover:bg-primary-soft/50 rounded-chip px-2"
            >
              <span className="flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                شرایط فعالیت ({activityConditions.length} مورد)
              </span>
              {showDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </Button>

            {showDetails && (
              <div className="mt-2 p-3 bg-surface-2 rounded-card text-xs space-y-1.5 text-ink-2 border border-line-soft text-right">
                {activityConditions.map((cond, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-primary font-bold">•</span>
                    <span>{cond}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
