'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

interface AdvCarouselProps {
  ads: { img: string; link: string }[];
  className?: string;
}

export default function AdvCarousel({ ads, className }: AdvCarouselProps) {
  return (
    <Swiper
      className={className}
      autoplay={{ delay: 4000 }}
      loop
      pagination={{
        type: 'fraction',
      }}
      navigation={true}
      modules={[Pagination, Autoplay]}
    >
      {ads.map((item, idx) => (
        <SwiperSlide key={idx}>
          <Link href={item.link} target="_blank">
            <Image
              src={item.img}
              alt="배너 이미지"
              fill
              sizes="100%"
              priority
              unoptimized
              className="object-cover"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
