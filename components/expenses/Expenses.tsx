"use client";
import { useExpenseStore } from "@/stores/expenseStore";
import { useEffect, useMemo, useState } from "react";
import { ExpenseType } from "../display/Display.types";
import { useDateArrStore } from "@/stores/dateArrStore";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Expenses() {
  const { expenses, expensesByDate, removeExpense } = useExpenseStore();
  const [selectedDate, setSelectedDate] = useState<string>("全てのデータ");
  const [dailyData, setDailyData] = useState<ExpenseType[]>([]);
  const { dateArr } = useDateArrStore();

  useEffect(() => {
    if (selectedDate === "全てのデータ") {
      setDailyData(expenses);
    } else {
      setDailyData(expensesByDate[selectedDate]);
    }
  }, [selectedDate, expenses, expensesByDate]);

  const total = dailyData.reduce((sum, exp) => sum + exp.amount, 0);

  if (expenses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div
          className="card p-6 sm:p-8 mx-auto text-center text-gray-500 dark:text-gray-400 text-lg"
          aria-live="polite"
        >
          データがありません。
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 my-8 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-[var(--foreground)]">
        支出管理
      </h1>
      <div className="relative mb-6">
        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input-common pl-4 pr-10 appearance-none w-full"
          aria-label="日付を選択"
        >
          <option value="全てのデータ">全てのデータ</option>
          {dateArr.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <ul className="space-y-3 mb-6">
        {dailyData.map((exp) => (
          <li
            key={exp.id}
            className="card p-4 flex justify-between items-center transition-all duration-200 hover:shadow-lg animate-fade-in"
            role="listitem"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {exp.date}
              </p>
              <p className="font-medium text-[var(--card-foreground)]">
                {exp.selectedCategory}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {exp.note}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold text-lg text-[var(--card-foreground)]">
                {exp.amount.toLocaleString()}円
              </p>
              <button
                onClick={() => removeExpense(exp.id)}
                className="btn-delete"
                aria-label={`「${exp.selectedCategory} ${exp.amount}円」を削除`}
              >
                <TrashIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="card p-4 text-center">
        <p className="text-lg font-semibold text-[var(--card-foreground)]">
          合計金額: {total.toLocaleString()}円
        </p>
      </div>
    </div>
  );
}