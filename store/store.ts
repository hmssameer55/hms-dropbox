import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;

  fileId: string;
  setFileId: (fileId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (isDeleteModalOpen) => set({ isDeleteModalOpen }),

  fileId: "",
  setFileId: (fileId) => set({ fileId }),
}));
