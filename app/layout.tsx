import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "سولار بازار | دایرکتوری جامع صنعت خورشیدی ایران",
  description: "دسترسی به لیست کامل پیمانکاران، مشاوران و شرکت‌های فعال در صنعت نیروگاه‌های خورشیدی",
  keywords: "خورشیدی، نیروگاه، پیمانکار، مشاور، انرژی تجدیدپذیر، سولار",
  openGraph: {
    title: "سولار بازار | دایرکتوری صنعت خورشیدی",
    description: "دسترسی به لیست کامل پیمانکاران و مشاوران صنعت خورشیدی",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}

