"use client";

import { useExpenseStore } from "@/stores/expenseStore";
import { ExpenseType } from "../display/Display.types";
import { useEffect, useState } from "react";
import { CalendarIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function RecentExpensesList() {
  const [recentExpenses, setRecentExpenses] = useState<ExpenseType[]>([]);
  const { expenses, removeExpense } = useExpenseStore();

  useEffect(() => {
    const recent = expenses.slice(-3).reverse();
    setRecentExpenses(recent);
  }, [expenses]);

  const handleDeleteClick = (id: number) => {
    removeExpense(id);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
        直近の3件の履歴
      </h3>
      <ul className="space-y-3">
        {recentExpenses.map((exp) => (
          <li
            key={exp.id}
            className="card p-4 flex justify-between items-center transition-all duration-200 hover:shadow-lg animate-fade-in"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">{exp.date}</p>
              <p className="font-medium text-[var(--card-foreground)]">{exp.selectedCategory}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{exp.note || "メモなし"}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold text-lg text-[var(--card-foreground)]">
                {exp.amount.toLocaleString()}円
              </p>
              <button
                onClick={() => handleDeleteClick(exp.id)}
                className="btn-delete"
                aria-label={`「${exp.selectedCategory} ${exp.amount}円」を削除`}
              >
                <TrashIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}