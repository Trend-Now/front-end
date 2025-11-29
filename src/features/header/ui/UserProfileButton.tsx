import Link from 'next/link';
import React from 'react';
import { cn } from '@/shared/lib';
import { UserIcon } from '@/shared/ui';

interface UserProfileButtonProps {
  name: string;
  maskId: string;
  iconClassName: string;
  containerClassName?: string;
  textClassName?: string;
}

export default function UserProfileButton({
  name,
  maskId,
  containerClassName,
  iconClassName,
  textClassName,
}: UserProfileButtonProps) {
  return (
    <Link
      href={'/mypage'}
      className={cn(
        'flex h-10 w-fit items-center gap-x-2 rounded-full bg-gray-100 pl-2.5 pr-3.5',
        containerClassName
      )}
    >
      <UserIcon className={iconClassName} maskId={maskId} />
      <span className={cn('text-nowrap text-md font-medium text-gray-800', textClassName)}>
        {name}
      </span>
    </Link>
  );
}
