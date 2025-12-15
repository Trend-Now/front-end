import { KebabIcon } from '@/shared/ui';
import React from 'react';

export default function ThreadReplyHeader() {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-x-2">
        <span className="h-6 w-6 rounded-full bg-gray-500" />
        <span className="flex items-center gap-x-2">
          <span className="flex items-center gap-x-2 text-md font-semiBold text-gray-900 after:h-2.5 after:border-l after:border-gray-200 after:content-['']">
            culturalexchange
          </span>
          <span className="text-2xs font-regular text-gray-400">2025.11.16 16:24:42</span>
        </span>
      </span>
      <button>
        <KebabIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
