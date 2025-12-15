import { cn } from '@/shared/lib';
import React from 'react';

interface ReplyArrowIconProps {
  className?: string;
}

export default function ReplyArrowIcon({ className }: ReplyArrowIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-5', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.77713 4.16699C3.53167 4.16699 3.33268 4.35354 3.33268 4.58366V8.94893C3.33268 10.7132 4.85823 12.1434 6.74009 12.1434H15.1486L11.971 15.1224C11.7974 15.2851 11.7974 15.5489 11.971 15.7116C12.1446 15.8743 12.426 15.8743 12.5995 15.7116L16.5358 12.0213C16.7094 11.8586 16.7094 11.5948 16.5358 11.4321L12.5995 7.74179C12.426 7.57908 12.1446 7.57908 11.971 7.74179C11.7974 7.90451 11.7974 8.16833 11.971 8.33105L15.1486 11.31H6.74009C5.34915 11.31 4.22157 10.2529 4.22157 8.94893V4.58366C4.22157 4.35354 4.02259 4.16699 3.77713 4.16699Z"
        fill="#9C9FA2"
      />
    </svg>
  );
}
