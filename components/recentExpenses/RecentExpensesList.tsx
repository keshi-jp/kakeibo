"use client";
import { useExpenseStore } from "@/stores/expenseStore";
import { ExpenseType } from "../display/Display.types";
import { useEffect, useState } from "react";

export default function RecentExpensesList() {
  const [recentExpenses, setRecentExpenses] = useState<ExpenseType[]>([]);
  const expenses = useExpenseStore((state) => state.expenses);

  useEffect(() => {
    const recent = expenses.slice(-3).reverse();
    setRecentExpenses(recent);
  }, [expenses]);

  return (
    <>
      <p>直近の3件の履歴</p>
      <ul className="space-y-2 mb-4">
        {recentExpenses.map((exp) => (
          <li
            key={exp.id}
            className="border p-2 rounded flex justify-between bg-gray-100 dark:bg-gray-800"
          >
            <div>
              <p>{exp.date}</p>
              <p className="font-medium">{exp.selectedCategory}</p>
              <p className="text-sm text-gray-600">{exp.note}</p>
            </div>
            <p className="font-bold text-[18px] flex items-center">
              {exp.amount}円
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
