'use client';

import { PrimaryButton, SecondaryButton } from '@/shared/ui';
import React from 'react';
import { searchTypes } from '../const';

export default function SearchTypeTabs() {
  const [currentTab, setCurrentTab] = React.useState(0); // 각 탭을 나타내는 key를 폴더명과 일치 시키기
  // 각 탭을 눌렀을 때 주소가 .../search/hotBoards 등으로 바뀌게 수정하기

  return (
    <div className="flex gap-x-2">
      {searchTypes.map((item, idx) =>
        idx === currentTab ? (
          <PrimaryButton
            key={idx}
            variant="black"
            size="s"
            className="rounded-full"
            onClick={() => setCurrentTab(idx)}
          >
            {item}
          </PrimaryButton>
        ) : (
          <SecondaryButton
            key={idx}
            variant="gray"
            size="s"
            className="rounded-full"
            onClick={() => setCurrentTab(idx)}
          >
            {item}
          </SecondaryButton>
        )
      )}
    </div>
  );
}
