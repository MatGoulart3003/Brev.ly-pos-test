import { create } from "zustand";
import type { Link } from "../services/types";

interface DeleteLinkDialogState {
  link: Link | null;
  open: (link: Link) => void;
  close: () => void;
}

/** Holds which link is pending deletion; the DeleteLinkDialog renders while it is set. */
export const useDeleteLinkDialogStore = create<DeleteLinkDialogState>(
  (set) => ({
    link: null,
    open: (link) => set({ link }),
    close: () => set({ link: null }),
  }),
);
