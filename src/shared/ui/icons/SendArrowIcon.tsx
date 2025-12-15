import { cn } from '@/shared/lib';
import React from 'react';

interface SendArrowiconProps {
  className?: string;
}

export default function SendArrowIcon({ className }: SendArrowiconProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-3.5 w-3.5', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.73812 2.0587C6.88455 1.91924 7.11467 1.91924 7.2611 2.0587L11.3444 5.94759C11.4961 6.09201 11.5019 6.33201 11.3575 6.48365C11.2131 6.63529 10.9731 6.64115 10.8214 6.49673L7.37878 3.21799V11.6666C7.37878 11.876 7.20902 12.0458 6.99961 12.0458C6.7902 12.0458 6.62044 11.876 6.62044 11.6666V3.21799L3.17777 6.49673C3.02613 6.64115 2.78613 6.63529 2.64171 6.48365C2.49729 6.33201 2.50314 6.09201 2.65478 5.94759L6.73812 2.0587Z"
        fill="#9C9FA2"
      />
    </svg>
  );
}
