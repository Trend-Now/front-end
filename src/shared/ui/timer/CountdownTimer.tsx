'use client';
import { cva } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib';
import GrayTimer from '../icons/timer/GrayTimer';
import OrangeTimer from '../icons/timer/OrangeTimer';
import BlueTimer from '../icons/timer/BlueTimer';
import { useQueryClient } from '@tanstack/react-query';

const timerVariants = cva('font-bold', {
  variants: {
    variant: {
      blue: 'text-brand-500',
      orange: 'text-point-500',
      gray: 'text-gray-400',
    },
  },
});

interface CountdownTimerProps {
  /** 초기 시간 (초 단위) */
  initialSeconds: number;

  /** 아이콘 크기 (기본값: 28) */
  iconSize?: string;

  /** 텍스트 크기 클래스 (Tailwind 등에서 사용, 기본값: "text-lg") */
  textSize?: string;

  /** 타이머 컨테이너 크기 */
  boxSize?: 'w-fit' | 'w-[120px]' | 'w-[88px]';

  /** 타이머 종료 시 호출되는 콜백 함수 */
  onTimeUp?: () => void;
}

const CountdownTimer = ({
  initialSeconds,
  iconSize = 'h-7 w-7',
  textSize = 'text-lg',
  boxSize = 'w-fit',
  onTimeUp,
}: CountdownTimerProps) => {
  const queryClient = useQueryClient();

  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // 초 단위를 "MM:SS" 형식 문자열로 변환
  const formatTime = (totalSeconds: number) => {
    const min = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const sec = String(totalSeconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  // 컴포넌트 마운트 시 1초마다 timeLeft 감소, 0이 되면 타이머 종료
  useEffect(() => {
    const timerId = setInterval(
      () =>
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            queryClient.invalidateQueries({ queryKey: ['hotBoardList'] });
            setIsTimeUp(true);

            return 0;
          }

          return prev - 1;
        }),
      1000
    );

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (isTimeUp) {
      onTimeUp?.(); // 이제 렌더 완료 후 안전하게 호출됨
    }
  }, [isTimeUp]);

  // 남은 시간에 따라 타이머 색상 및 아이콘 선택
  const getTimerStyle = (time: number, size: string) => {
    if (time === 0) return { variant: 'gray' as const, icon: <GrayTimer className={size} /> };
    if (time < 600) return { variant: 'orange' as const, icon: <OrangeTimer className={size} /> };
    return { variant: 'blue' as const, icon: <BlueTimer className={size} /> };
  };
  const { variant, icon } = getTimerStyle(timeLeft, iconSize);

  return (
    <div className={cn('flex items-center justify-end gap-1', boxSize)}>
      {icon}
      <div className={cn(timerVariants({ variant }), textSize)}>{formatTime(timeLeft)}</div>
    </div>
  );
};

export default CountdownTimer;
