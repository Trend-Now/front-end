import { MenuBar } from '@/widgets/header';
import { AdvCarousel } from '@/widgets/hotBoards';
import { TrendBar, TrendBarMobile } from '@/widgets/sideBar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ads = [
    {
      img: '/images/ads/ad2.png',
      link: 'https://chromewebstore.google.com/detail/jldghaigppememfjflbfibnmlpbdplch?utm_source=item-share-cb',
    },
  ];

  return (
    <div>
      <MenuBar />
      <div className="flex w-full justify-center gap-x-12 px-4">
        <div className="w-full md:max-w-[52.5rem]">{children}</div>
        <div className="hidden max-w-[22.5rem] md:sticky md:top-[104px] md:flex md:h-fit md:flex-col md:items-center md:gap-y-3">
          <TrendBar />
          <AdvCarousel ads={ads} className="hidden h-[260px] w-full rounded-[1.25rem] md:block" />
        </div>
        <div className="fixed z-10 md:hidden">
          <TrendBarMobile />
        </div>
      </div>
    </div>
  );
}
