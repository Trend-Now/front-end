import { MenuBar } from '@/widgets/header';
import { TrendBar, TrendBarMobile } from '@/widgets/sideBar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MenuBar />
      <div className="flex w-full justify-center gap-x-12 px-8">
        <div className="w-full md:max-w-[52.5rem]">{children}</div>
        <div className="hidden max-w-[22.5rem] md:flex">
          <TrendBar />
        </div>
        <div className="fixed z-10 md:hidden">
          <TrendBarMobile />
        </div>
      </div>
    </div>
  );
}
