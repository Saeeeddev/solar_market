import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center space-y-6 min-h-[50vh]">
        <FileQuestion className="h-24 w-24 text-muted-foreground" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">صفحه یافت نشد</h1>
          <p className="text-muted-foreground text-lg">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد
          </p>
        </div>
        <Link href="/">
          <Button size="lg">
            <Home className="ml-2 h-5 w-5" />
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </div>
    </div>
  );
}
