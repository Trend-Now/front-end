import { create } from 'zustand';

interface LoginModalState {
  loginModalOpen: boolean;
  setLoginModalOpen: (flag: boolean) => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  loginModalOpen: false,
  setLoginModalOpen: (flag) => {
    set({
      loginModalOpen: flag,
    });
  },
}));
