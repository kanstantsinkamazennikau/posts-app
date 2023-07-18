import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
