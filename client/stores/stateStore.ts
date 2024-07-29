import { create } from "zustand";




type AdvanceOptiosStore = {
  from: string;
  to: string;
  subject: string;
  hasWords: string;
  doesntHave: string;
  size: string;
  byteOption: number | string;
  dateWithin: string | number;
  hasAttachment: "yes" | "no";
  doesntIncludeChats: "yes" | "no";
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setSubject: (subject: string) => void;
  setHasWords: (hasWords: string) => void;
  setDoesntHave: (doesntHave: string) => void;
  setSize: (size: string) => void;
  setByteOption: (byteOption: string | number) => void;
  setDateWithin: (dateWith: string | number) => void;
  setHasAttachment: (hasAttachment: "yes" | "no") => void;
  setDoesntIncludeChats: (doesntIncludeChats: "yes" | "no") => void;
};



export const useAdvanceSearchStore = create<AdvanceOptiosStore>((set) => ({
  from: "",
  to: "",
  subject: "",
  hasWords: "",
  doesntHave: "",
  size: "",
  byteOption: "MB",
  dateWithin: "",
  hasAttachment: "no",
  doesntIncludeChats: "yes",
  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  setSubject: (subject) => set({ subject }),
  setHasWords: (hasWords) => set({ hasWords }),
  setDoesntHave: (doesntHave) => set({ doesntHave }),
  setSize: (size) => set({ size }),
  setByteOption: (byteOption) => set({ byteOption }),
  setDateWithin: (dateWithin) => set({ dateWithin }),
  setHasAttachment: (hasAttachment) => set({ hasAttachment }),
  setDoesntIncludeChats: (doesntIncludeChats) => set({ doesntIncludeChats }),
}));


