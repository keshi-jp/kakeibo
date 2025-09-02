import { create } from "zustand";

interface DateArrStore {
  dateArr: string[];
  addDate: (date: string) => void;
}

export const useDateArrStore = create<DateArrStore>((set) => ({
  dateArr: ["全てのデータ"],
  addDate: (date) => {
    set((state) =>
      !state.dateArr.includes(date)
        ? { dateArr: [...state.dateArr, date] }
        : state
    );
  },
}));
