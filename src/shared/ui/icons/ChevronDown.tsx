import { cn } from '@/shared/lib';
import React from 'react';

interface ChevronDownProps {
  className?: string;
}

export default function ChevronDown({ className }: ChevronDownProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-5 text-gray-900', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.11934 8.72063C5.28889 8.53815 5.57642 8.52571 5.76155 8.69283L10.0007 12.5196L14.2384 8.69288C14.4235 8.52573 14.711 8.53813 14.8806 8.72058C15.0502 8.90302 15.0376 9.18643 14.8525 9.35358L10.3078 13.4575C10.1341 13.6144 9.8675 13.6144 9.69374 13.4576L5.14755 9.35363C4.96242 9.18651 4.94979 8.9031 5.11934 8.72063Z"
        fill="currentColor"
      />
    </svg>
  );
}
