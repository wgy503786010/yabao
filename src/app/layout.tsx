import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "亚保健",
  description: "拆解东亚式教育的「毒」，每周一篇",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#FDF8F3] text-[#5D4E3A]">
        <header className="py-4 px-6">
          <div className="max-w-2xl mx-auto pl-0 pr-6">
            <img src="/header-logo.png" alt="亚保健" className="h-40 w-auto" />
          </div>
        </header>
        <main className="max-w-2xl mx-auto py-4 px-6 pb-16">
          {children}
        </main>
        <footer className="text-center py-8 text-[#C4B5A5] text-sm">
          © 2026 亚保健
        </footer>
      </body>
    </html>
  );
}