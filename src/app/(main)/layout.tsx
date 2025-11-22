import { Footer } from '@/widgets/footer';
import { AppBar } from '@/widgets/header';
import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppBar />
      <main className="mt-[60px] flex-1 md:mt-20">{children}</main>
      <div className="pt-10 md:pt-[6.25rem]">
        <Footer />
      </div>
    </div>
  );
}
