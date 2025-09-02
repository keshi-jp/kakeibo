import { create } from "zustand";
import { ExpenseType } from "@/components/display/Display.types";

type ExpenseStore = {
  expenses: ExpenseType[];
  expensesByDate: Record<string, ExpenseType[]>;
  addExpense: (expense: ExpenseType, dateKey: string) => void;
  removeExpense: (id: number) => void;
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  expensesByDate: {},
  addExpense: (expense, dateKey) => {
    set((state) => {
      const updatedExpenses = [...state.expenses, expense];
      const updatedByDate = {
        ...state.expensesByDate,
        [dateKey]: [...(state.expensesByDate[dateKey] || []), expense],
      }
      return { expenses: updatedExpenses, expensesByDate: updatedByDate };
    });
  },

  removeExpense: (id) =>
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),
}));
