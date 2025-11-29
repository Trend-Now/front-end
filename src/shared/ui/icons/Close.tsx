import { cn } from '@/shared/lib';

export default function Close({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-7 w-7 text-gray-800', className)}
      {...props}
    >
      <path
        d="M6.57507 6.57532L21.4243 21.4246"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M6.57507 21.4244L21.4243 6.5752"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
