import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
}

export function ErrorMessage({ 
  title = 'خطا', 
  message = 'مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.' 
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
