import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
