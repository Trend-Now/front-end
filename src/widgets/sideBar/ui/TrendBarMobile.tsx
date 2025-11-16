import React from 'react';

export default function TrendBarMobile() {
  return (
    <label className="fixed bottom-6 right-5">
      <input type="checkbox" className="hidden" />
      <span className="flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-800 md:hidden" />
    </label>
  );
}
