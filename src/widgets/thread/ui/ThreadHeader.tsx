import { KebabIcon } from '@/shared/ui';
import React from 'react';

export default function ThreadHeader() {
  return (
    <div className="flex justify-between">
      <span className="flex items-center gap-x-3">
        <span className="h-8 w-8 rounded-full bg-gray-500" />
        <span className="flex items-center gap-x-2">
          <span className="flex items-center gap-x-2 text-lg font-semiBold text-gray-900 after:h-3 after:border-l after:border-gray-200 after:content-['']">
            qimu4609
          </span>
          <span className="text-xs font-regular text-gray-400">2025.11.16 16:24:42</span>
        </span>
      </span>
      <button>
        <KebabIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
