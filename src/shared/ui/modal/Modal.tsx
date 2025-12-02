'use client';

import { cn } from '@/shared/lib';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function Modal({ children, onClose, className }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  // 모달 루트 노드(#modal-root) 참조 설정
  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  // 모달 열리면 스크롤 잠그고, 닫힐 때 원복
  useEffect(() => {
    // 모달이 열릴 때
    document.body.style.overflow = 'hidden';

    return () => {
      // 모달이 닫힐 때
      document.body.style.overflow = '';
    };
  }, []);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!modalRoot) return null; // SSR/초기 렌더 차단

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/[28%]',
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      {children}
    </div>,
    modalRoot
  );
}
