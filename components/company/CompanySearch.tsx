'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface CompanySearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function CompanySearch({ onSearch, placeholder = "جستجوی شرکت..." }: CompanySearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10"
          dir="rtl"
        />
      </div>
      <Button type="submit">
        جستجو
      </Button>
    </form>
  );
}
