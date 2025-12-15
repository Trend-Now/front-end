import { cn } from '@/shared/lib';
import React from 'react';

interface InputBoxPlusIconProps {
  className?: string;
}

export default function InputBoxPlusIcon({ className }: InputBoxPlusIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
    >
      <path
        d="M7.99935 2.66699L7.99935 13.3337M13.3327 8.00033L2.66602 8.00033"
        stroke="#9C9FA2"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}
