"use client";
import { useExpenseStore } from "@/stores/expenseStore";
import { useEffect, useState } from "react";
import { ExpenseType } from "../display/Display.types";
import { useDateArrStore } from "@/stores/dateArrStore";

export default function Expenses() {
  const { expenses, expensesByDate } = useExpenseStore();
  const [selectedDate, setSelectedDate] = useState<string>("全てのデータ");
  const [dateData, setDateData] = useState<ExpenseType[]>([]);
  const { dateArr } = useDateArrStore();

  useEffect(() => {
    if (selectedDate === "全てのデータ") {
      setDateData(expenses);
    } else {
      setDateData(expensesByDate[selectedDate]);
    }
  }, [selectedDate, expenses, expensesByDate]);

  if (expenses.length === 0) {
    return <p>データがありません。</p>;
  }

  return (
    <>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border rounded p-2 mb-4"
      >
        {dateArr.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <ul>
        {dateData.map((exp) => ( 
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

      {/* <p>合計金額: {total}</p> */}
    </>
  );
}
