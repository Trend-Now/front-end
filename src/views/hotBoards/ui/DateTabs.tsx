// 'use client';

// import { getFormattedDate } from '@/shared/lib';
// import { PrimaryButton, SecondaryButton } from '@/shared/ui';
// import React from 'react';

// interface DateTabsProps {
//   /**@param {Date[]} dates 탭에 표시될 날짜 배열 */
//   dates?: Date[];
// }

// export default function DateTabs({ dates = [new Date()] }: DateTabsProps) {
//   const [currentTab, setCurrentTab] = React.useState(0);
//   const today = new Date();

//   return (
//     <div className="flex items-center gap-x-2">
//       {dates.map((item, idx) =>
//         idx === currentTab ? (
//           <PrimaryButton
//             key={idx}
//             variant="black"
//             size="s"
//             onClick={() => setCurrentTab(idx)}
//             className="rounded-full"
//           >
//             {`${item.getFullYear()}${item.getMonth()}${item.getDate()}` ===
//             `${today.getFullYear()}${today.getMonth()}${today.getDate()}`
//               ? '오늘'
//               : getFormattedDate(item, 'KR')}
//           </PrimaryButton>
//         ) : (
//           <SecondaryButton
//             key={idx}
//             variant="gray"
//             size="s"
//             onClick={() => setCurrentTab(idx)}
//             className="rounded-full"
//           >
//             {`${item.getFullYear()}${item.getMonth()}${item.getDate()}` ===
//             `${today.getFullYear()}${today.getMonth()}${today.getDate()}`
//               ? '오늘'
//               : getFormattedDate(item, 'KR')}
//           </SecondaryButton>
//         )
//       )}
//     </div>
//   );
// }
