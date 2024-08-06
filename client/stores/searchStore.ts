import { create } from "zustand";

type AdvanceOptiosStore = {
  moduleName: string;
  taughtBy: string;
  department: string;
  trimester: string;
  date: string;
  paperType: "exam" | "cat" | string;
  modulesCode: string;
  containsWords: number | string;
  session: "day" | "evening" | "weekend" | string;
  setModuleName: (moduleName: string) => void;
  setTaugtBy: (taughtBy: string) => void;
  setDepartment: (department: string) => void;
  setTrimester: (trimester: string) => void;
  setDate: (date: string) => void;
  setPaperType: (paperType: "exam" | "cat") => void;
  setModulesCode: (modulesCode: string) => void;
  setContainsWords: (containsWords: string) => void;
  setSession: (session: "day" | "evening" | "weekend" | string) => void;
};

export const useAdvanceSearchStore = create<AdvanceOptiosStore>((set) => ({
  moduleName: "",
  taughtBy: "",
  department: "",
  trimester: "",
  date: "",
  modulesCode: "",
  containsWords: "",
  session: "",
  paperType: "",
  setModuleName: (moduleName) => set({ moduleName }),
  setTaugtBy: (taughtBy) => set({ taughtBy }),
  setDepartment: (department) => set({ department }),
  setTrimester: (trimester) => set({ trimester }),
  setDate: (date) => set({ date }),
  setModulesCode: (modulesCode) => set({ modulesCode }),
  setContainsWords: (containsWords) => set({ containsWords }),
  setSession: (session) => set({ session }),
  setPaperType: (paperType) => set({ paperType }),
}));
