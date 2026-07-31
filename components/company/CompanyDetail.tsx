import { Card, CardContent } from '@/components/ui/card';

export function CompanyDetail({ company, type }: { company?: any; type?: string }) {
  if (!company) return null;
  return (
    <Card className="p-6 bg-white rounded-card border border-slate-200">
      <CardContent className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">{company.name || company.company_name}</h1>
      </CardContent>
    </Card>
  );
}
